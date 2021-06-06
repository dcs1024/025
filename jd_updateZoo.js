const $ = new Env('618动物联萌');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const pKHelpFlag = true;//是否PK助力  true 助力，false 不助力
const pKHelpAuthorFlag = true;//是否助力作者PK  true 助力，false 不助力
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [];
$.cookie = '';
$.inviteList = [];
$.pkInviteList = [
];
$.secretpInfo = {};
$.innerPkInviteList = [
];
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [
    $.getdata("CookieJD"),
    $.getdata("CookieJD2"),
    ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      $.cookie = cookiesArr[i];
      $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = $.UserName;
      $.hotFlag = false; //是否火爆
      await TotalBean();
      console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}*****\n`);
      console.log(`\n如有未完成的任务，请多执行几次\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await zoo();
      if($.hotFlag)$.secretpInfo[$.UserName] = false;//火爆账号不执行助力
    }
  }
  await writeFile()
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
async function writeFile() {
  if (!fs.existsSync(`./shareCodes`)) fs.mkdirSync(`./shareCodes`);
  await fs.writeFileSync(`./shareCodes/jd_zoo.json`, JSON.stringify($.pkInviteList));
  console.log(`文件写入成功,inviteCode已经替换`);
}
async function zoo() {
    try {
      $.signSingle = {};
      $.homeData = {};
      $.secretp = ``;
      $.taskList = [];
      $.shopSign = ``;
      await takePostRequest('zoo_signSingle');
      if (JSON.stringify($.signSingle) === `{}` || $.signSingle.bizCode !== 0) {
        console.log($.signSingle.bizMsg);
        return;
      } else {
        console.log(`\n获取活动信息`);
      }
      await $.wait(1000);
      await takePostRequest('zoo_getHomeData');
      $.userInfo =$.homeData.result.homeMainInfo
      console.log(`\n\n当前分红：${$.userInfo.raiseInfo.redNum}份，当前等级:${$.userInfo.raiseInfo.scoreLevel}\n当前金币${$.userInfo.raiseInfo.remainScore}，下一关需要${$.userInfo.raiseInfo.nextLevelScore - $.userInfo.raiseInfo.curLevelStartScore}\n\n`);
      await $.wait(1000);
      await takePostRequest('zoo_getSignHomeData');
      await $.wait(1000);
      if($.signHomeData.todayStatus === 0){
        console.log(`去签到`);
        await takePostRequest('zoo_sign');
        await $.wait(1000);
      }else{
        console.log(`已签到`);
      }
      let raiseInfo = $.homeData.result.homeMainInfo.raiseInfo;
      if (Number(raiseInfo.totalScore) > Number(raiseInfo.nextLevelScore) && raiseInfo.buttonStatus === 1) {
        console.log(`满足升级条件，去升级`);
        await $.wait(3000);
        await takePostRequest('zoo_raise');
      }
      raiseInfo = $.homeData.result.homeMainInfo.raiseInfo;
      //======================================================怪兽大作战=================================================================================
      $.pkHomeData = {};
      await takePostRequest('zoo_pk_getHomeData');
      if (JSON.stringify($.pkHomeData) === '{}') {
        console.log(`获取PK信息异常`);
        return;
      }
      await $.wait(1000);
      $.pkTaskList = [];
      if(!$.hotFlag) await takePostRequest('zoo_pk_getTaskDetail');
      await $.wait(1000);
      for (let i = 0; i < $.pkTaskList.length; i++) {
        $.oneTask = $.pkTaskList[i];
        if ($.oneTask.status === 1) {
          $.activityInfoList = $.oneTask.shoppingActivityVos || $.oneTask.brandMemberVos || $.oneTask.followShopVo || $.oneTask.browseShopVo
          for (let j = 0; j < $.activityInfoList.length; j++) {
            $.oneActivityInfo = $.activityInfoList[j];
            if ($.oneActivityInfo.status !== 1) {
              continue;
            }
            console.log(`做任务：${$.oneActivityInfo.title || $.oneActivityInfo.taskName || $.oneActivityInfo.shopName};等待完成`);
            await takePostRequest('zoo_pk_collectScore');
            await $.wait(2000);
            console.log(`任务完成`);
          }
        }
      }
      await $.wait(1000);
      if (new Date().getHours() >= 18) {
        console.log(`\n******开始【怪兽大作战守护红包】******\n`);
        //await takePostRequest('zoo_pk_getTaskDetail');
        let skillList = $.pkHomeData.result.groupInfo.skillList || [];
        //activityStatus === 1未开始，2 已开始
        $.doSkillFlag = true;
        for (let i = 0; i < skillList.length && $.pkHomeData.result.activityStatus === 2 && $.doSkillFlag; i++) {
          if (Number(skillList[i].num) > 0) {
            $.skillCode = skillList[i].code;
            for (let j = 0; j < Number(skillList[i].num) && $.doSkillFlag; j++) {
              console.log(`使用技能`);
              await takePostRequest('zoo_pk_doPkSkill');
              await $.wait(2000);
            }
          }
        }
      }
    } catch (e) {
      $.logErr(e)
    }
  }

  async function takePostRequest(type) {
    let body = ``;
    let myRequest = ``;
    switch (type) {
      case 'zoo_signSingle':
        body = `functionId=zoo_signSingle&body={}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_signSingle`, body);
        break;
      case 'zoo_getHomeData':
        body = `functionId=zoo_getHomeData&body={}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_getHomeData`, body);
        break;
      case 'helpHomeData':
        body = `functionId=zoo_getHomeData&body={"inviteId":"${$.inviteId}"}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_getHomeData`, body);
        break;
      case 'zoo_collectProduceScore':
        body = getPostBody(type);
        myRequest = await getPostRequest(`zoo_collectProduceScore`, body);
        break;
      case 'zoo_getFeedDetail':
        body = `functionId=zoo_getFeedDetail&body={"taskId":"${$.taskId}"}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_getFeedDetail`, body);
        break;
      case 'zoo_getTaskDetail':
        body = `functionId=zoo_getTaskDetail&body={}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_getTaskDetail`, body);
        break;
      case 'zoo_collectScore':
        body = getPostBody(type);
        //console.log(body);
        myRequest = await getPostRequest(`zoo_collectScore`, body);
        break;
      case 'zoo_raise':
        body = `functionId=zoo_raise&body={}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_raise`, body);
        break;
      case 'help':
        body = getPostBody(type);
        //console.log(body);
        myRequest = await getPostRequest(`zoo_collectScore`, body);
        break;
      case 'zoo_pk_getHomeData':
        body = `functionId=zoo_pk_getHomeData&body={}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_pk_getHomeData`, body);
        break;
      case 'zoo_pk_getTaskDetail':
        body = `functionId=zoo_pk_getTaskDetail&body={}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_pk_getTaskDetail`, body);
        break;
      case 'zoo_pk_collectScore':
        body = getPostBody(type);
        //console.log(body);
        myRequest = await getPostRequest(`zoo_pk_collectScore`, body);
        break;
      case 'zoo_pk_doPkSkill':
        body = `functionId=zoo_pk_doPkSkill&body={"skillType":"${$.skillCode}"}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_pk_doPkSkill`, body);
        break;
      case 'pkHelp':
        body = getPostBody(type);
        myRequest = await getPostRequest(`zoo_pk_assistGroup`, body);
        break;
      case 'zoo_getSignHomeData':
        body = `functionId=zoo_getSignHomeData&body={"notCount":"1"}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_getSignHomeData`,body);
        break;
      case 'zoo_sign':
        body = `functionId=zoo_sign&body={}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_sign`,body);
        break;
      case 'wxTaskDetail':
        body = `functionId=zoo_getTaskDetail&body={"appSign":"2","channel":1,"shopSign":""}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_getTaskDetail`,body);
        break;
      case 'zoo_shopLotteryInfo':
        body = `functionId=zoo_shopLotteryInfo&body={"shopSign":"${$.shopSign}"}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_shopLotteryInfo`,body);
        break;
      case 'zoo_bdCollectScore':
        body = getPostBody(type);
        myRequest = await getPostRequest(`zoo_bdCollectScore`,body);
        break;
      case 'qryCompositeMaterials':
        body = `functionId=qryCompositeMaterials&body={"qryParam":"[{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"resultData\\",\\"id\\":\\"05371960\\"}]","activityId":"2s7hhSTbhMgxpGoa9JDnbDzJTaBB","pageId":"","reqSrc":"","applyKey":"jd_star"}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`qryCompositeMaterials`,body);
        break;
      case 'zoo_boxShopLottery':
        body = `functionId=zoo_boxShopLottery&body={"shopSign":"${$.shopSign}"}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_boxShopLottery`,body);
        break;
      case `zoo_wishShopLottery`:
        body = `functionId=zoo_wishShopLottery&body={"shopSign":"${$.shopSign}"}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_boxShopLottery`,body);
        break;
      case `zoo_myMap`:
        body = `functionId=zoo_myMap&body={}&client=wh5&clientVersion=1.0.0`;
        myRequest = await getPostRequest(`zoo_myMap`,body);
        break;
      case 'zoo_getWelfareScore':
        body = getPostBody(type);
        myRequest = await getPostRequest(`zoo_getWelfareScore`,body);
        break;
      case 'jdjrTaskDetail':
        body = `reqData={"eid":"","sdkToken":"jdd014JYKVE2S6UEEIWPKA4B5ZKBS4N6Y6X5GX2NXL4IYUMHKF3EEVK52RQHBYXRZ67XWQF5N7XB6Y2YKYRTGQW4GV5OFGPDPFP3MZINWG2A01234567"}`;
        myRequest = await getPostRequest(`listTask`,body);
        break;
      case 'jdjrAcceptTask':
        body = `reqData={"eid":"","sdkToken":"jdd014JYKVE2S6UEEIWPKA4B5ZKBS4N6Y6X5GX2NXL4IYUMHKF3EEVK52RQHBYXRZ67XWQF5N7XB6Y2YKYRTGQW4GV5OFGPDPFP3MZINWG2A01234567","id":"${$.taskId}"}`;
        myRequest = await getPostRequest(`acceptTask`,body);
        break;
      case 'add_car':
        body = getPostBody(type);
        myRequest = await getPostRequest(`zoo_collectScore`,body);
        break;
      default:
        console.log(`错误${type}`);
    }
    return new Promise(async resolve => {
      $.post(myRequest, (err, resp, data) => {
        try {
          //console.log(data);
          dealReturn(type, data);
        } catch (e) {
          $.logErr(e, resp)
        } finally {
          resolve();
        }
      })
    })
  }

  async function dealReturn(type, data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log(`返回异常：${data}`);
      return;
    }
    switch (type) {
      case 'zoo_signSingle':
        if (data.code === 0) $.signSingle = data.data
        break;
      case 'zoo_getHomeData':
        if (data.code === 0) {
          if (data.data['bizCode'] === 0) {
            $.homeData = data.data;
            $.secretp = data.data.result.homeMainInfo.secretp;
            $.secretpInfo[$.UserName] = $.secretp;
          }
        }
        break;
      case 'helpHomeData':
        console.log(data)
        if (data.code === 0) {
          $.secretp = data.data.result.homeMainInfo.secretp;
          //console.log(`$.secretp：${$.secretp}`);
        }
        break;
      case 'zoo_collectProduceScore':
        if (data.code === 0 && data.data && data.data.result) {
          console.log(`收取成功，获得：${data.data.result.produceScore}`);
        }else{
          console.log(JSON.stringify(data));
        }
        if(data.code === 0 && data.data && data.data.bizCode === -1002){
          $.hotFlag = true;
          console.log(`该账户脚本执行任务火爆，暂停执行任务，请手动做任务或者等待解决脚本火爆问题`)
        }
        break;
      case 'zoo_getTaskDetail':
        if (data.code === 0) {
          console.log(`互助码：${data.data.result.inviteId || '助力已满，获取助力码失败'}`);
          if (data.data.result.inviteId) {
            $.inviteList.push({
              'ues': $.UserName,
              'secretp': $.secretp,
              'inviteId': data.data.result.inviteId,
              'max': false
            });
          }
          $.taskList = data.data.result.taskVos;
        }
        break;
      case 'zoo_collectScore':
        $.callbackInfo = data;
        break;
      case 'zoo_raise':
        if (data.code === 0) console.log(`升级成功`);
        break;
      case 'help':
      case 'pkHelp':
        //console.log(data);
        switch (data.data.bizCode) {
          case 0:
            console.log(`助力成功`);
            break;
          case -201:
            console.log(`助力已满`);
            $.oneInviteInfo.max = true;
            break;
          case -202:
            console.log(`已助力`);
            break;
          case -8:
            console.log(`已经助力过该队伍`);
            break;
          case -6:
          case 108:
            console.log(`助力次数已用光`);
            $.canHelp = false;
            break;
          default:
            console.log(`怪兽大作战助力失败：${JSON.stringify(data)}`);
        }
        break;
      case 'zoo_pk_getHomeData':
        if (data.code === 0) {
          console.log(`PK互助码：${data.data.result.groupInfo.groupAssistInviteId}`);
          if (data.data.result.groupInfo.groupAssistInviteId) $.pkInviteList.push(data.data.result.groupInfo.groupAssistInviteId);
          $.pkHomeData = data.data;
        }
        break;
      case 'zoo_pk_getTaskDetail':
        if (data.code === 0) {
          $.pkTaskList = data.data.result.taskVos;
        }
        break;
      case 'zoo_getFeedDetail':
        if (data.code === 0) {
          $.feedDetailInfo = data.data.result.addProductVos[0];
        }
        break;
      case 'zoo_pk_collectScore':
        break;
      case 'zoo_pk_doPkSkill':
        if (data.data.bizCode === 0) console.log(`使用成功`);
        if (data.data.bizCode === -2) {
          console.log(`队伍任务已经完成，无法释放技能!`);
          $.doSkillFlag = false;
        }else if(data.data.bizCode === -2003){
          console.log(`现在不能打怪兽`);
          $.doSkillFlag = false;
        }
        break;
      case 'zoo_getSignHomeData':
        if(data.code === 0) {
          $.signHomeData = data.data.result;
        }
        break;
      case 'zoo_sign':
        if(data.code === 0 && data.data.bizCode === 0) {
          console.log(`签到获得成功`);
          if (data.data.result.redPacketValue) console.log(`签到获得：${data.data.result.redPacketValue} 红包`);
        }else{
          console.log(`签到失败`);
          console.log(data);
        }
        break;
      case 'wxTaskDetail':
        if (data.code === 0) {
          $.wxTaskList = data.data.result.taskVos;
        }
        break;
      case 'zoo_shopLotteryInfo':
        if (data.code === 0) {
          $.shopResult = data.data.result;
        }
        break;
      case 'zoo_bdCollectScore':
        if (data.code === 0) {
          console.log(`签到获得：${data.data.result.score}`);
        }
        break;
      case 'qryCompositeMaterials':
        //console.log(data);
        if (data.code === '0') {
          $.shopInfoList = data.data.resultData.list;
          console.log(`获取到${$.shopInfoList.length}个店铺`);
        }
        break
      case 'zoo_boxShopLottery':
        let result = data.data.result;
        switch (result.awardType) {
          case 8:
            console.log(`获得金币：${result.rewardScore}`);
            break;
          case 5:
            console.log(`获得：adidas能量`);
            break;
          case 2:
          case 3:
            console.log(`获得优惠券：${result.couponInfo.usageThreshold} 优惠：${result.couponInfo.quota}，${result.couponInfo.useRange}`);
            break;
          default:
            console.log(`抽奖获得未知`);
            console.log(JSON.stringify(data));
        }
        break
      case 'zoo_wishShopLottery':
        console.log(JSON.stringify(data));
        break
      case `zoo_myMap`:
        if (data.code === 0) {
          $.myMapList = data.data.result.sceneMap.sceneInfo;
        }
        break;
      case 'zoo_getWelfareScore':
        if (data.code === 0) {
          console.log(`分享成功，获得：${data.data.result.score}`);
        }
        break;
      case 'jdjrTaskDetail':
        if (data.resultCode === 0) {
          $.jdjrTaskList = data.resultData.top;
        }
        break;
      case 'jdjrAcceptTask':
        if (data.resultCode === 0) {
          console.log(`领任务成功`);
        }
        break;
      case 'add_car':
        if (data.code === 0) {
          let acquiredScore = data.data.result.acquiredScore;
          if(Number(acquiredScore) > 0){
            console.log(`加购成功,获得金币:${acquiredScore}`);
          }else{
            console.log(`加购成功`);
          }
        }else{
          console.log(JSON.stringify(data));
          console.log(`加购失败`);
        }
        break
      default:
        console.log(`未判断的异常${type}`);
    }
  }
function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      headers: {
        Host: "me-api.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: cookie,
        "User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-cn",
        "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === "1001") {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
          } else {
            $.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e)
      } finally {
        resolve();
      }
    })
  })
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
