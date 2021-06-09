const fs = require('fs')
const $ = new Env('京喜领88红包');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message, currentToken = {};
const BASE_URL = 'https://wq.jd.com/cubeactive/steprewardv3'
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
}
$.packetIdArr = [];
$.activeId = '489177';


var _0xodP='jsjiami.com.v6',_0x3e37=[_0xodP,'cMK+IMKSw5bCgMK+KQ==','w6Xor6PphYfmlbbnm43lvrvoj7nljJzCgMK5wqDDgsK9bxDCj8O2w60/W8KYcsK8wpoDeMKZwrvCjlBf','MVIsARIB','A8O5M8K5QA==','T3ZCccO/','w4okYsOBwq825bas5ae15pedwozCvMKi','enImwqplKhnCtg==','5Lmt5Luw6LSr5Y25','wr7orLjphYnmlannm7TlvKvoj6XljL4Qw7vDmcKOMn0=','GjjDmw==','6I6n5Y2r5YqP5Ym556Kk5oi85Yik77+z','a2A3wrk=','w5fDvsKnc0bCjMO9c2DCnw==','woDCrU/Dlw==','TeS7k+mYg+ahmOe4quWNkuW2ueWFvemDn+aKg+Wtvn4=','c3V2bMOiw6IswpPDv8Kd','KEABBRMQwqtiwrxYwps=','YMOvVMKHw7Q=','AsOMP8KZTw==','CMKcQcKTw6kjKg==','wpfCvMKQBcOFw448BQ==','dHNTZg==','Q8Os5aWf6LWzw5TCtOWOpeWalMKCTw==','wqDCiErDr8OR','wqtLwoQyw4g=','w4rDq8K4Qw==','w4At5aa/6LaTwpXDpeWMlOWZnsKFw6k=','w4LDo8K7R1nChcO2','e8ObbcKg','KsKrEMKLw58=','wrpPwpQBw4HDjsKxw4hVwqDDlw==','dcOFT8KRw5Ffw6jCkMOlwqY=','w5HDuyLCjUTDkcKgw5LCpcKjEcOd','w6/Dg37DpjYZcC3CqBJPwoQ=','CsKOIcOuwqXDtsKiDsOPwoTDiFPCsw==','woDDkRvDqcOVJCZow4EUIknDtsOBOMKCwrQoUsK/w6gh','IsO/FsKKacONwpchw5hQwqQ=','w5jCoMOj','wpNpwrJVw7RyFcO1Tg==','5pex5Lqh5YSl5YWG5oqS5Ymn','wo1lFRJi','GBrDu1rDrQ==','P8K+OMO+wqI=','wqXCrljDksOTM8KWwrrDtcO+w4TDpTDCimJBw5TCo8OcTsKIw71/wqvCmyV7SGDDp8O4QiTCmm4R','wrRKICVz','w6/CsMO4wp9BA0vCjxPCuQ==','R0srAxw=','A8KQZsKiw7k=','w4tKXMKDw7E=','w57CijfDscOdOA==','w5fDq8KsZVM=','TsOZRV58','d8OYUg==','T2tRWMOD','w5MYZ8KFUA==','Y8OhV0R4','F8KWUg==','5rWU5Ym65b+45ZGC5aW76LS/776K','w4fCisO2wqvDgg01','wrRpOBFw','w7E+UkHDvg==','w54WTA==','C8KADVA=','wqFpFMK0cMOf5pyk6K6d6KyE5rKs5aSs6Lefwp7igb7vuYDig4zvuIc=','F8KWUsKyw7ol','wqRFwpc=','wq/CjWDDqw==','HgdHAyDDn+adseitsuium+axnuWktei3vsKU4oCj77uh4oCa77qZ','wqNJw48ow4bDiw==','L1fChcOuGw==','a14tCyU=','TcOPIxXCog==','woPCuX4owrw=','Q24k','5rag5Yuh5by05ZOa5oiw5YiJw63li5bliajpga7or6rno7vkuoR4','H0rCo8OsD8KuNsKWD8KP','5reE5Yme5b+k5ZGO5oi/5Yqdw4Plionli77pgJbor6/no63kuLDDmA==','w6DDq8KhRw==','wqXCiWsbwozCiULDqcO8wrI=','5rSk5Yic5byD5ZOq5aeH6LaZ772y','aVdMccOIw77DvQ==','bcOVbcKhwpnDkQ==','SEIJJQTDvg==','wqfCvMK2AcKJw5E=','w6DCjcKvw6hw','A8K9wp8=','w6xlfsKS','wp7CqsO1Z2XCoOadquivgeivvuays+Wnlui0vsKi4oGU77uJ4oGH77u9','wodbLw1q','wrPCmMKFPcKi','HsO8F8KTQA==','wpHCmG0bwozCiULDsMO7wrrDqQ==','fsOXd8KswoDDmSEzwqJ6wqQ6wpvClcKPd8Otw5sywpjCnkctVcOOYsK1QDwoLxpFbAvCrVXDnFXCmzBfwqfClsKYTyUcDMKAwpQWwovDtcOX','w7gbf8KCVA==','BMKmFjrCmg==','w6LCnArDs8O4','OcOrcMKxwp3CgQ==','PcKpfsKvw6U=','TUkELgXDssOxw6M=','YkRvdcOc','wodFPks=','wrHCokzDusOw','w4XCjTbCvRY=','wpXCu8KWCkE=','w7kxbQHCig==','TMOVcA==','EMK7R8Knw5k=','6I6o5Y2i5Yqq5Yme56O35aaN6LWN772N','dsOiEQvCjg==','GsK5Cx7CnQ==','cVtTe8OB','w4rCry4=','b8OVccK2wpM=','TXUCNg==','w6bDsF0w','FsKVEmDDkcKFwrhGfMK5','w7PCsxfClyM=','wqR8wrRd','wroHTy8D','wr0AbMOiw7Y=','WeS7uOmbjuajgue7qOWMn+W1ouWGkOmAnuaIvuWtmRM=','P8KrwqAjGg==','wrvCu1jDnjg=','woxLwoQw','X2AgwrNOPz3Ct8KLDMO/','w5DCoMOqwrw=','w4zChMOQwqDDlg==','w6nDpMKiS0M=','6I+B5Y6B5YiV5Yq456KD5aeJ6LeX776q','BsK8wqIcLQ==','HcKtADLCmsO5','w54cRVPDqcOt','D8KWZsKDw7o+JXI=','w6fCnQbCkyc=','AsK2w40=','WcOEAzXCig==','wrXCvELDrzoaVhvCrE9kwrsQbsOtOcKjw7/Cql3Dh8OfIsKUwqPDpBhGF8Oga34=','GjjDm2bDsMKK','DMKeJSHCgQ==','wrTCpFTDmMOTPMKV','wqJow4/DhcOB','w6IFw5o=','w57DosO4RVs=','w7BHw4sZw53DjyjCiCXDrzTDiMKsw5QLwpgvw6BIw4LDs8KAZ8KEw5oSLmcrwonDrMOGw4bDt8OoAh/DvlLDsGU=','w6NEVUYuwrPDl8OOc8O3f2V2w4FpOsK4G8Kywqxaw7DDuDPDhG/Cr8OvDSrDiBnDiA9DaCY=','w7ZtfsKSw7MAcXDDog==','wojCoVU=','w4bClsK7','woDCnzpLUMKSwpE=','wonCikPDtB0=','woDCsCFQW8OKw4nCvMK6','w7DCjm0rwo/CnlXDjsO0wq7DojrCqz1KwrwtDl7Chg==','w6zCnQDCnRAbwrPCk8KuHQfDnA==','U8OQdcKrw7Q=','GGfCk8OBDw==','w63CjMKiMMKQwp4=','ZsOwLj3CmcKPw54=','P8KMDFjDmw==','w4hCNlrCqFw3D8K+wo/Dj8KSw5c7RFzCpGDCvMOBcMOsecOBGsKMGMO6AcOzJHw9O8O4wp85AGPCosKXw4bDjhBYaSYEw5nCkTHDnmZUCsKyw7FrFm17w60Cc8KMwo/DssKyOQ3CrMOzw41MUzkCw4rDgVTDgXJyOMOBwpbCmh3DsRIIaSBPwojCkFHDnCNlw4bCoCTDolxGFMKHZsK9ICZ8w4vCpVgVCmw1wr3DjCvDugM/RwJwwqggZMO+DTHDhwjCqSTDsRHCpcKfwpHDrTPCmxjDk0dtwpUvw5PDpxnCgDPDgmAXD3IHBh4Awr8Ew5zDgnXCiWfDgAhOwq/DtkkeacKNwqrDvMK0NMKuGMKTEWRwBMKGwrtgEAEZwrbDs8O9w77Dh1rDqXXDhMKoGsOQfjDCiEzCtGrCqsOjKcOZwrF5cGchw73Cml5nIDZWwoLCj8KXEBt+wpoMwqFfwqFDwovDgxXDgCzDln7DqgbDvMKQwqorw6NeE2/DrGjDswjChcOgwrXDs3RcL8OBwp4bwqTCvcOIw480TFJtwro/wovDu8OcNy7DthnCm2xwdRhTw5kgEQ7DmsKzw65jwo4yJ8Kfwq1+RsOwLCQzw6gIJkQnwr/CrSnCjBhRaCUoGsKB','wo5EY1cP','w4PDiMKNbnI=','w5XDrcKHTFY=','wr06WsOzw5E=','wpRuC2bCmA==','wqYXf8Ocw6g=','IcK6LcK6w4UY','wpFpFDpxwpY=','wq3Cg2rDiyUZ','wp/CtFY4wqU=','w5HCsMOCwoVyCVHCgQ==','wpLCsGQ=','JXfCnsOPJg==','J8KLDMK/w4cEWkrDqyPDmHDCpcOawq3DtwxHw77DiMOww5bCo8OPTcOiMsOww7QUAsO+','GcKLC8OvwrLDgsKuDMOewpDDg1zCtHQ=','UsOcDhHCrcK5','44Ov5oyE56Wr44O06K+S5Yer6I2y5Y2H5Lmm5Lub6LWS5Y2Z5LmuwrDDq8OBwozDisO9wqLnmKvmjozkvo7nlqJDR8O0RMOMw6TnmLvkurnkuqTnrKPliILojZrljIM=','woRlw7Iow6c=','HMK0wpo+Dg==','RUIIwpxs','wpPDviojAg==','w74nQg==','wrnCmMKLFsO1','NsKjKsKq','wrnCtsK1FMKaw4DCoFjDpRQX','AU3Ctg==','wpHCtTzCgA==','OMKINMKkw4M=','w4fClR5yeA==','wrXChsKoI8Oh','csO8dVVa','wqcEZCQKwop6wqs=','w5/CtD3DtsOc','AV/CpcOaFA==','QmA3wrtD','SsOKUsK3w68=','wpFjHQ==','woVjw6rDk8OM','E8KVK8Oxwo7DkcKmBw==','wrLDoCQQGTHCmsKb','P8K/cHPDksORwpVxw40g','ecOOasKNw4JFw5U=','wpB/HQ==','wo58wq1Z','5Liu5LiY6LS15YyA','w6xtcMKcw44VfXg=','jOstqjOxinamgiQ.cCom.v6tCtdBRT=='];(function(_0x239192,_0x3e3e7c,_0x591e86){var _0x5daedf=function(_0x51021f,_0x4245fa,_0x45814e,_0x1098f2,_0x2e37d1){_0x4245fa=_0x4245fa>>0x8,_0x2e37d1='po';var _0x52fabb='shift',_0x53fa20='push';if(_0x4245fa<_0x51021f){while(--_0x51021f){_0x1098f2=_0x239192[_0x52fabb]();if(_0x4245fa===_0x51021f){_0x4245fa=_0x1098f2;_0x45814e=_0x239192[_0x2e37d1+'p']();}else if(_0x4245fa&&_0x45814e['replace'](/[OtqOxngQCtCtdBRT=]/g,'')===_0x4245fa){_0x239192[_0x53fa20](_0x1098f2);}}_0x239192[_0x53fa20](_0x239192[_0x52fabb]());}return 0x8dd2f;};return _0x5daedf(++_0x3e3e7c,_0x591e86)>>_0x3e3e7c^_0x591e86;}(_0x3e37,0xad,0xad00));var _0x3ff5=function(_0x414d45,_0x21dcbd){_0x414d45=~~'0x'['concat'](_0x414d45);var _0x179197=_0x3e37[_0x414d45];if(_0x3ff5['xAAtIr']===undefined){(function(){var _0x31751f=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x2f1500='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x31751f['atob']||(_0x31751f['atob']=function(_0xf3d235){var _0xe8d984=String(_0xf3d235)['replace'](/=+$/,'');for(var _0x54eced=0x0,_0x20b501,_0x4a083a,_0xdad504=0x0,_0x18b34e='';_0x4a083a=_0xe8d984['charAt'](_0xdad504++);~_0x4a083a&&(_0x20b501=_0x54eced%0x4?_0x20b501*0x40+_0x4a083a:_0x4a083a,_0x54eced++%0x4)?_0x18b34e+=String['fromCharCode'](0xff&_0x20b501>>(-0x2*_0x54eced&0x6)):0x0){_0x4a083a=_0x2f1500['indexOf'](_0x4a083a);}return _0x18b34e;});}());var _0x4dbbc1=function(_0x579b9a,_0x21dcbd){var _0x223c34=[],_0x261406=0x0,_0x5c8853,_0x3871c4='',_0x2208b4='';_0x579b9a=atob(_0x579b9a);for(var _0x12e62a=0x0,_0x1a9687=_0x579b9a['length'];_0x12e62a<_0x1a9687;_0x12e62a++){_0x2208b4+='%'+('00'+_0x579b9a['charCodeAt'](_0x12e62a)['toString'](0x10))['slice'](-0x2);}_0x579b9a=decodeURIComponent(_0x2208b4);for(var _0x2b07d1=0x0;_0x2b07d1<0x100;_0x2b07d1++){_0x223c34[_0x2b07d1]=_0x2b07d1;}for(_0x2b07d1=0x0;_0x2b07d1<0x100;_0x2b07d1++){_0x261406=(_0x261406+_0x223c34[_0x2b07d1]+_0x21dcbd['charCodeAt'](_0x2b07d1%_0x21dcbd['length']))%0x100;_0x5c8853=_0x223c34[_0x2b07d1];_0x223c34[_0x2b07d1]=_0x223c34[_0x261406];_0x223c34[_0x261406]=_0x5c8853;}_0x2b07d1=0x0;_0x261406=0x0;for(var _0x2f085a=0x0;_0x2f085a<_0x579b9a['length'];_0x2f085a++){_0x2b07d1=(_0x2b07d1+0x1)%0x100;_0x261406=(_0x261406+_0x223c34[_0x2b07d1])%0x100;_0x5c8853=_0x223c34[_0x2b07d1];_0x223c34[_0x2b07d1]=_0x223c34[_0x261406];_0x223c34[_0x261406]=_0x5c8853;_0x3871c4+=String['fromCharCode'](_0x579b9a['charCodeAt'](_0x2f085a)^_0x223c34[(_0x223c34[_0x2b07d1]+_0x223c34[_0x261406])%0x100]);}return _0x3871c4;};_0x3ff5['ATuwWT']=_0x4dbbc1;_0x3ff5['VLQrap']={};_0x3ff5['xAAtIr']=!![];}var _0x4c3d42=_0x3ff5['VLQrap'][_0x414d45];if(_0x4c3d42===undefined){if(_0x3ff5['jCqsPC']===undefined){_0x3ff5['jCqsPC']=!![];}_0x179197=_0x3ff5['ATuwWT'](_0x179197,_0x21dcbd);_0x3ff5['VLQrap'][_0x414d45]=_0x179197;}else{_0x179197=_0x4c3d42;}return _0x179197;};!(async()=>{var _0x538934={'iKUOV':_0x3ff5('0','kZfp'),'tmkAU':function(_0x12ca50,_0x52a74d){return _0x12ca50>_0x52a74d;},'mKtxY':_0x3ff5('1','@gUT'),'kSwzi':_0x3ff5('2','vk1J'),'aUWMM':'https://bean.m.jd.com/','YLqaR':function(_0x10adb3,_0x26e7c6){return _0x10adb3<_0x26e7c6;},'qJUwh':function(_0x4dd077,_0x3efb52){return _0x4dd077(_0x3efb52);},'ZwtUJ':function(_0x5f0f9d,_0x51af36){return _0x5f0f9d+_0x51af36;},'QgFXL':_0x3ff5('3','!3h3'),'OwFHn':_0x3ff5('4','L*!C'),'YDtar':function(_0x3c5a75,_0x52aac4){return _0x3c5a75!==_0x52aac4;},'pRreQ':'cjgfv','PRJxC':_0x3ff5('5','8eGE'),'dDqYg':function(_0x1781b7){return _0x1781b7();}};if(_0x538934[_0x3ff5('6','$dIt')](JSON['stringify'](process[_0x3ff5('7','Ez7e')])['indexOf'](_0x538934[_0x3ff5('8','R27g')]),-0x1))process[_0x3ff5('9','qxSM')](0x0);$[_0x3ff5('a','(&s2')]=[];if(!cookiesArr[0x0]){$[_0x3ff5('b','VFHJ')]($[_0x3ff5('c','vk1J')],_0x538934[_0x3ff5('d','qxSM')],_0x538934[_0x3ff5('e','yEL]')],{'open-url':_0x538934[_0x3ff5('f','R27g')]});return;}for(let _0x5274e0=0x0;_0x538934[_0x3ff5('10','pber')](_0x5274e0,cookiesArr['length']);_0x5274e0++){if(cookiesArr[_0x5274e0]){cookie=cookiesArr[_0x5274e0];$[_0x3ff5('11','b*jj')]=_0x538934[_0x3ff5('12','wzl5')](decodeURIComponent,cookie[_0x3ff5('13','VFHJ')](/pt_pin=(.+?);/)&&cookie[_0x3ff5('14','8eGE')](/pt_pin=(.+?);/)[0x1]);$['index']=_0x538934[_0x3ff5('15','Ihi3')](_0x5274e0,0x1);$['isLogin']=!![];$['nickName']='';message='';await TotalBean();console[_0x3ff5('16','tNNn')]('\x0a******开始【京东账号'+$[_0x3ff5('17','2E6I')]+'】'+($[_0x3ff5('18','kZfp')]||$[_0x3ff5('19','$dIt')])+_0x3ff5('1a','@gUT'));if(!$[_0x3ff5('1b','Ihi3')]){$[_0x3ff5('1c','tNNn')]($[_0x3ff5('1d','kfO$')],'【提示】cookie已失效',_0x3ff5('1e','tO!n')+$['index']+'\x20'+($[_0x3ff5('1f','tO!n')]||$[_0x3ff5('20','u5b0')])+_0x3ff5('21','0&Qh'),{'open-url':_0x538934['aUWMM']});if($[_0x3ff5('22','(4x6')]()){if(_0x538934[_0x3ff5('23','BrO^')]!==_0x538934[_0x3ff5('24','HQtD')]){await notify['sendNotify']($['name']+_0x3ff5('25','!71E')+$[_0x3ff5('26','8eGE')],_0x3ff5('27','li3M')+$['index']+'\x20'+$['UserName']+_0x3ff5('28','Jiq2'));}else{console[_0x3ff5('29','zzLw')](_0x3ff5('2a','Ihi3')+data[_0x3ff5('2b','8eGE')][_0x3ff5('2c','5dSW')]+'\x0a');if(data[_0x3ff5('2d','yR2t')][_0x538934['iKUOV']]>=0x6){console['log'](_0x3ff5('2e','h**5'));}else{if(data['Data'][_0x3ff5('2f','HQtD')])$[_0x3ff5('30','(4x6')]['push'](data['Data']['strUserPin']);}}}else{if(_0x538934['YDtar'](_0x538934[_0x3ff5('31','Ihi3')],_0x538934[_0x3ff5('32','BrO^')])){$[_0x3ff5('33','h**5')]('',_0x3ff5('34','R27g')+(_0x5274e0?_0x538934[_0x3ff5('15','Ihi3')](_0x5274e0,0x1):''));}else{$[_0x3ff5('16','tNNn')]('','❌\x20'+$[_0x3ff5('35','%H(h')]+_0x3ff5('36','$Jgz')+e+'!','');}}continue;}await _0x538934[_0x3ff5('37','yR2t')](main);}}await _0x538934['dDqYg'](writeFile);})()[_0x3ff5('38','dG%K')](_0x30d4bc=>{$['log']('','❌\x20'+$[_0x3ff5('39','5dSW')]+_0x3ff5('3a','2E6I')+_0x30d4bc+'!','');})[_0x3ff5('3b','5dSW')](()=>{$[_0x3ff5('3c','!F8R')]();});async function main(){var _0x308be3={'ypSUu':function(_0x1fbcb4){return _0x1fbcb4();}};await joinActive();await _0x308be3[_0x3ff5('3d','qxSM')](getUserInfo);}async function writeFile(){if(!$[_0x3ff5('3e','dG%K')])return;if(!fs[_0x3ff5('3f','Ihi3')](_0x3ff5('40','vk1J')))fs['mkdirSync'](_0x3ff5('41','li3M'));await fs[_0x3ff5('42','kZfp')](_0x3ff5('43','wzl5'),JSON['stringify']({'codes':$[_0x3ff5('44','BrO^')],'activeId':$['activeId']}));console[_0x3ff5('45','Jiq2')]('\x0a'+JSON[_0x3ff5('46','kfO$')]($['packetIdArr'])+'\x0a');console['log'](_0x3ff5('47','zzLw'));}function joinActive(){var _0xa88c28={'OjUaR':function(_0x345f9c,_0xb7b20d){return _0x345f9c!==_0xb7b20d;},'HQSpp':_0x3ff5('48','tNNn'),'YZggd':function(_0xcd06ab,_0x4390e8){return _0xcd06ab!==_0x4390e8;},'CGyuc':_0x3ff5('49','zzLw'),'xCYdr':'FjQMT','DkpMc':_0x3ff5('4a','kZfp'),'CiTWg':function(_0x4b39af,_0x24d3c5){return _0x4b39af===_0x24d3c5;},'OyJIU':function(_0x52fa0a,_0x537786){return _0x52fa0a!==_0x537786;},'XZyLZ':'VLcoh','UDgfC':'aTPeb','HtcCT':function(_0x127881){return _0x127881();},'clLAl':_0x3ff5('4b','yR2t'),'xiSUq':function(_0x4f8014,_0x4d34f4){return _0x4f8014<_0x4d34f4;},'INOtq':_0x3ff5('4c','tNNn'),'sayCf':function(_0x54a232,_0x12dbac,_0x29936f,_0x550f93){return _0x54a232(_0x12dbac,_0x29936f,_0x550f93);},'emTPu':_0x3ff5('4d','hJgy'),'eiAjt':'activeId,channel,phoneid,publishFlag,stepreward_jstoken,timestamp'};return new Promise(async _0x3be174=>{var _0x2cde5e={'OSXhK':_0xa88c28[_0x3ff5('4e','&J#q')],'PMSWU':function(_0x17e879,_0x567b79){return _0xa88c28[_0x3ff5('4f','h**5')](_0x17e879,_0x567b79);}};if('AVNOy'!==_0xa88c28[_0x3ff5('50','tO!n')]){if(cookie['includes'](_0x3ff5('51','wzl5')))await getJxToken();const _0x1d4d1c='';const _0x5390d2=_0xa88c28[_0x3ff5('52','5dSW')](taskurl,_0xa88c28['emTPu'],_0x1d4d1c,_0xa88c28[_0x3ff5('53','pber')]);$[_0x3ff5('54','Ihi3')](_0x5390d2,(_0x55f5d6,_0x28bfe2,_0x1e21d0)=>{if(_0xa88c28[_0x3ff5('55','HQtD')](_0xa88c28[_0x3ff5('56','Ez7e')],_0xa88c28[_0x3ff5('57','pber')])){console[_0x3ff5('58','h**5')](_0x3ff5('59','L*!C')+_0x1e21d0[_0x3ff5('5a','Jiq2')]+'\x0a');}else{try{if(_0x55f5d6){if(_0xa88c28['YZggd'](_0x3ff5('5b','tNNn'),_0xa88c28[_0x3ff5('5c','H)E]')])){console[_0x3ff5('5d','H)E]')]('\x0a'+$[_0x3ff5('5e','[JsE')]+_0x3ff5('5f','Ez7e'));$[_0x3ff5('60','h**5')](_0x55f5d6);}else{console[_0x3ff5('61','dG%K')]('\x0a'+$[_0x3ff5('62','li3M')]+_0x3ff5('63','&J#q'));$[_0x3ff5('64','!3h3')](_0x55f5d6);}}else{if(_0xa88c28['xCYdr']!==_0xa88c28['DkpMc']){_0x1e21d0=JSON['parse'](_0x1e21d0);if(_0xa88c28[_0x3ff5('65','VFHJ')](_0x1e21d0['iRet'],0x0)){if(_0xa88c28[_0x3ff5('66','&J#q')](_0xa88c28[_0x3ff5('67','@gUT')],_0xa88c28[_0x3ff5('68','Ra3F')])){console[_0x3ff5('69','8eGE')](_0x3ff5('6a','Ez7e')+_0x1e21d0['Data'][_0x3ff5('6b','VFHJ')]+'\x0a');}else{console['log'](_0x3ff5('6c','tUgy')+_0x1e21d0[_0x3ff5('6d','5dSW')][_0x3ff5('6e','Ra3F')]+'\x0a');}}else{console['log'](_0x3ff5('6f','!F8R')+_0x1e21d0[_0x3ff5('70','%H(h')]+'\x0a');}}else{let _0x313ed8=_0x2cde5e['OSXhK'];let _0x5b5729='';for(var _0x314df0=0x0;_0x2cde5e['PMSWU'](_0x314df0,count);_0x314df0++){_0x5b5729+=_0x313ed8[parseInt(Math[_0x3ff5('71','!F8R')]()*_0x313ed8[_0x3ff5('72','&J#q')])];}return _0x5b5729;}}}catch(_0x439238){$[_0x3ff5('73','(&s2')](_0x439238,_0x28bfe2);}finally{_0xa88c28[_0x3ff5('74','ew&D')](_0x3be174);}}});}else{console[_0x3ff5('75','L*!C')]('\x0a'+$[_0x3ff5('76','tO!n')]+_0x3ff5('77','5dSW'));$['logErr'](err);}});}function getUserInfo(){var _0x4045e0={'kBrPQ':function(_0x2dff47,_0x45832b){return _0x2dff47!==_0x45832b;},'cwKRv':function(_0x49a0b4,_0x1e71e3){return _0x49a0b4===_0x1e71e3;},'uueHh':'jogdR','iQCQJ':'Sxjxw','qZWBP':'fvVtF','yOegl':function(_0x48aa4e,_0x2c645a){return _0x48aa4e>=_0x2c645a;},'HpNyG':'dwCurrentGrade','GCjlk':'UwjNS','CRLMX':function(_0x2c67ba,_0x5a8a36){return _0x2c67ba===_0x5a8a36;},'PyXNP':_0x3ff5('78','tNNn'),'Mnwmv':_0x3ff5('79','(&s2'),'cRKwt':function(_0x10da37,_0x5c3bd4){return _0x10da37(_0x5c3bd4);},'AsTux':function(_0x2b90e1,_0x8324eb){return _0x2b90e1(_0x8324eb);},'kjxlo':_0x3ff5('7a','BrO^'),'XRWLp':'pt_pin','xVQvY':function(_0x542e9e){return _0x542e9e();},'unwLF':'yyyyMMdd','OqDMY':function(_0x2c68ef,_0x3e3e30,_0x192b07,_0x9c0bb4){return _0x2c68ef(_0x3e3e30,_0x192b07,_0x9c0bb4);},'jMrkn':_0x3ff5('7b','Ra3F'),'XGxNI':_0x3ff5('7c','!F8R')};return new Promise(async _0x3ef80f=>{var _0x18c276={'FPKXm':function(_0x3a3382,_0x9af953){return _0x4045e0[_0x3ff5('7d','Ez7e')](_0x3a3382,_0x9af953);},'LQYlr':function(_0x1a520b,_0x200384){return _0x4045e0['AsTux'](_0x1a520b,_0x200384);}};if(_0x4045e0[_0x3ff5('7e','$Jgz')]!==_0x3ff5('7f','wzl5')){url+=_0x3ff5('80','!F8R')+_0x18c276[_0x3ff5('81','h**5')](encodeURIComponent,stk);}else{if(cookie[_0x3ff5('82','&J#q')](_0x4045e0['XRWLp']))await _0x4045e0[_0x3ff5('83','%H(h')](getJxToken);const _0x3a1d87='joinDate='+$[_0x3ff5('84','j#pK')](_0x4045e0[_0x3ff5('85','yR2t')]);const _0x14b37a=_0x4045e0[_0x3ff5('86','KRww')](taskurl,_0x4045e0[_0x3ff5('87','tUgy')],_0x3a1d87,_0x4045e0[_0x3ff5('88','!5o9')]);$[_0x3ff5('89','pber')](_0x14b37a,(_0x14689f,_0x49c9f1,_0x59581c)=>{var _0x1d01c9={'dCnMD':function(_0xc5501c,_0x574a6a){return _0xc5501c(_0x574a6a);},'inZqg':function(_0x465381,_0x37f829){return _0x465381*_0x37f829;}};if(_0x4045e0[_0x3ff5('8a','h**5')]('NrMOD','NrMOD')){console['log'](_0x3ff5('8b','!F8R')+_0x59581c['sErrMsg']+'\x0a');}else{try{if(_0x4045e0[_0x3ff5('8c','@gUT')](_0x4045e0['uueHh'],_0x4045e0[_0x3ff5('8d','$Jgz')])){if(_0x14689f){if(_0x4045e0['cwKRv'](_0x4045e0['iQCQJ'],_0x4045e0[_0x3ff5('8e','HQtD')])){_0x3ef80f(_0x59581c);}else{console[_0x3ff5('8f','yEL]')]('\x0a'+$['name']+':\x20\x20API查询请求失败\x20‼️‼️');$['logErr'](_0x14689f);}}else{_0x59581c=JSON[_0x3ff5('90','!F8R')](_0x59581c);if(_0x59581c[_0x3ff5('91','&J#q')]===0x0){console['log']('获取助力码成功：'+_0x59581c[_0x3ff5('92','l&w)')][_0x3ff5('93','[JsE')]+'\x0a');if(_0x4045e0[_0x3ff5('94','KRww')](_0x59581c[_0x3ff5('95','kfO$')][_0x4045e0[_0x3ff5('96','b*jj')]],0x6)){if(_0x4045e0['GCjlk']!==_0x3ff5('97','kLpM')){console['log']('6个阶梯红包已全部拆完\x0a');}else{console['log'](_0x3ff5('98','L*!C'));}}else{if(_0x4045e0['CRLMX'](_0x4045e0[_0x3ff5('99','L*!C')],_0x3ff5('9a','li3M'))){if(_0x59581c[_0x3ff5('9b','dG%K')]['strUserPin'])$[_0x3ff5('9c','8eGE')]['push'](_0x59581c['Data']['strUserPin']);}else{$[_0x3ff5('9d','Jiq2')]();}}}else{if(_0x3ff5('9e','Jiq2')===_0x4045e0[_0x3ff5('9f','5dSW')]){console['log'](_0x3ff5('a0','zzLw')+_0x59581c['sErrMsg']+'\x0a');}else{str+=_sym[_0x1d01c9['dCnMD'](parseInt,_0x1d01c9[_0x3ff5('a1','L*!C')](Math[_0x3ff5('a2','$Jgz')](),_sym[_0x3ff5('a3','H)E]')]))];}}}}else{let _0x29221b=uuid(0x28);let _0x556a87=(+new Date())[_0x3ff5('a4','h**5')]();let _0x4c1a73=cookie[_0x3ff5('a5','KRww')](/pt_pin=([^; ]+)(?=;?)/)[0x1];let _0x8be3e=$[_0x3ff5('a6','L*!C')](''+_0x18c276[_0x3ff5('a7','@gUT')](decodeURIComponent,_0x4c1a73)+_0x556a87+_0x29221b+_0x3ff5('a8','li3M'));currentToken={'timestamp':_0x556a87,'phoneid':_0x29221b,'farm_jstoken':_0x8be3e};_0x3ef80f();}}catch(_0xf8e1d3){$[_0x3ff5('a9','zzLw')](_0xf8e1d3,_0x49c9f1);}finally{_0x4045e0[_0x3ff5('aa','$Jgz')](_0x3ef80f,_0x59581c);}}});}});}function taskurl(_0x4d1a20,_0x5b7d21='',_0x3388ac){var _0x31fa29={'Zmlmy':function(_0x18f5d1,_0xd28f63){return _0x18f5d1+_0xd28f63;},'HnCpY':function(_0xe02816,_0x32e968){return _0xe02816+_0x32e968;},'HfNzJ':_0x3ff5('ab','yR2t'),'CmSIQ':function(_0x22e642,_0x4814b0){return _0x22e642===_0x4814b0;},'tYBxs':_0x3ff5('ac','2E6I'),'eTKiF':function(_0xb64f21,_0x553c12){return _0xb64f21(_0x553c12);},'RfXvH':_0x3ff5('ad','dG%K'),'KsUtO':_0x3ff5('ae','5dSW'),'YKjwx':'https://wqactive.jd.com/cube/front/activePublish/step_reward/489177.html?aid=489177'};let _0xefc480=BASE_URL+'/'+_0x4d1a20+_0x3ff5('af','!3h3')+_0x5b7d21+_0x3ff5('b0','fjtU')+currentToken[_0x3ff5('b1','tO!n')]+_0x3ff5('b2','wzl5')+_0x31fa29['HnCpY'](Date[_0x3ff5('b3','ew&D')](),0x2)+_0x3ff5('b4','yEL]');const _0x32beb7=currentToken[_0x31fa29[_0x3ff5('b5','li3M')]];_0xefc480+=_0x3ff5('b6','yEL]')+_0x32beb7;_0xefc480+=_0x3ff5('b7','Ra3F')+currentToken[_0x3ff5('b8','KRww')];if(_0x3388ac){if(_0x31fa29[_0x3ff5('b9','Ihi3')](_0x31fa29[_0x3ff5('ba','VFHJ')],_0x31fa29['tYBxs'])){_0xefc480+=_0x3ff5('bb','(&s2')+_0x31fa29['eTKiF'](encodeURIComponent,_0x3388ac);}else{$[_0x3ff5('bc','@gUT')]('','CookieJD'+(i?_0x31fa29[_0x3ff5('bd','[JsE')](i,0x1):''));}}return{'url':_0xefc480,'headers':{'Host':'wq.jd.com','Cookie':cookie,'accept':_0x31fa29['RfXvH'],'user-agent':'jdpingou;iPhone;4.8.2;14.5.1;'+_0x32beb7+_0x3ff5('be','j#pK'),'accept-language':_0x31fa29[_0x3ff5('bf','fjtU')],'referer':_0x31fa29['YKjwx']}};}function getJxToken(){var _0x261881={'XiRKj':function(_0x23053d,_0x54e31b){return _0x23053d===_0x54e31b;},'CDwdS':_0x3ff5('c0','5dSW'),'NuUvL':_0x3ff5('c1','5dSW'),'IIOvZ':function(_0x14891b,_0x13f041){return _0x14891b(_0x13f041);},'szHlE':function(_0x5ec9e5,_0x3d93b7){return _0x5ec9e5*_0x3d93b7;}};function _0x4b7c32(_0x5ed849){if(_0x261881[_0x3ff5('c2','kLpM')](_0x3ff5('c3','j#pK'),_0x261881[_0x3ff5('c4','kLpM')])){let _0x4ec516='abcdefghijklmnopqrstuvwxyz1234567890';let _0x1a208d='';for(var _0x2b6f74=0x0;_0x2b6f74<_0x5ed849;_0x2b6f74++){if(_0x261881['NuUvL']===_0x261881['NuUvL']){_0x1a208d+=_0x4ec516[_0x261881['IIOvZ'](parseInt,_0x261881['szHlE'](Math[_0x3ff5('c5','qxSM')](),_0x4ec516[_0x3ff5('c6','tNNn')]))];}else{$[_0x3ff5('c7','li3M')](e,resp);}}return _0x1a208d;}else{resolve();}}return new Promise(_0x3d3814=>{let _0x504f0c=_0x261881[_0x3ff5('c8','Ra3F')](_0x4b7c32,0x28);let _0x4baaab=(+new Date())[_0x3ff5('c9','hJgy')]();let _0xed57c5=cookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1];let _0x2f4283=$[_0x3ff5('ca','vk1J')](''+_0x261881[_0x3ff5('cb','VFHJ')](decodeURIComponent,_0xed57c5)+_0x4baaab+_0x504f0c+_0x3ff5('cc','qxSM'));currentToken={'timestamp':_0x4baaab,'phoneid':_0x504f0c,'farm_jstoken':_0x2f4283};_0x3d3814();});};_0xodP='jsjiami.com.v6';



function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      headers: {
        Host: "me-api.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: cookie,
        "User-Agent":  "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
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

// prettier-ignore
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
