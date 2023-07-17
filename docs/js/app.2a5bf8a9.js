(function(){var e={3412:function(e,t,n){"use strict";var a=n(9242),s=n(3396);function i(e,t,n,a,i,r){const o=(0,s.up)("router-view");return(0,s.wg)(),(0,s.j4)(o)}var r=n(7327),o=n(6520),l=n(2578),c=n(6750),u=n(7365),d=n(8473),p=n(3922),m=n(3297),b=n(672);const f={chainId:80001,symbol:"MATIC (test)",blockExplorer:{name:"Polygonscan (Mumbai)",generateContractUrl:e=>`https://mumbai.polygonscan.com/address/${e}`,generateTransactionUrl:e=>`https://mumbai.polygonscan.com/tx/${e}`}},y={chainId:137,symbol:"MATIC",blockExplorer:{name:"Polygonscan",generateContractUrl:e=>`https://polygonscan.com/address/${e}`,generateTransactionUrl:e=>`https://polygonscan.com/tx/${e}`}},h={testnet:f,mainnet:y,contractName:"HolderRoyaltiesClaim",contractAddress:"0x062cA495408245d78aDbA29CFc2d88d8Af2ba8Ae"};var g=h;const w=[{type:"event",anonymous:!1,inputs:[{name:"previousOwner",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{stateMutability:"payable",type:"fallback"},{stateMutability:"nonpayable",type:"function",inputs:[{name:"addresses",internalType:"address[]",type:"address[]"},{name:"balances",internalType:"uint256[]",type:"uint256[]"}],name:"addWallets",outputs:[]},{stateMutability:"payable",type:"function",inputs:[],name:"claim",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"uint256",type:"uint256"}],name:"claimed",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"fee",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"paused",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"nonpayable",type:"function",inputs:[],name:"renounceOwnership",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_fee",internalType:"uint256",type:"uint256"}],name:"setFee",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_state",internalType:"bool",type:"bool"}],name:"setPause",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"addresses",internalType:"address[]",type:"address[]"},{name:"balances",internalType:"uint256[]",type:"uint256[]"}],name:"setWallets",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"walletBalance",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[],name:"withdraw",outputs:[]},{stateMutability:"payable",type:"receive"}],v={contract:null,initDone:!1,userAddress:null,network:null,feePrice:BigInt(0),walletBalance:BigInt(0),networkConfig:g.mainnet,isPaused:!0,loading:!1,isUserInWhitelist:!1,errorMessage:null},_="665d687852032cfc7d1c167792f3c74b",{chains:k,publicClient:C,webSocketPublicClient:T}=(0,d.QB)([p.yu],[(0,m.I)()]),U=(0,d._g)({autoConnect:!0,connectors:(0,c.gu)({projectId:_,chains:k}),publicClient:C,webSocketPublicClient:T}),M=new c.J0(U,k),W=new u.E({projectId:_},M),A={address:g.contractAddress,abi:w},x=(0,l.Q_)("Web3",{state:()=>v,actions:{async init(){console.log("Web3 init start"),this.registerWalletEvents(),this.contract=(0,d.uN)({...A,walletClient:M});try{this.$patch({feePrice:await this.contract.read.fee([]),isPaused:await this.contract.read.paused([]),isUserInWhitelist:await this.contract.read.walletBalance([this.userAddress])>BigInt(0)})}catch(e){}this.initDone=!0},async registerWalletEvents(){M.watchAccount((async({isConnected:e,address:t})=>{e?(this.userAddress=t,this.walletBalance=await this.contract.read.walletBalance([this.userAddress])):this.userAddress=null})),M.watchNetwork((({chain:e})=>{this.network=e?{name:e.name,chainId:e.id}:null}))},setError(e=null){let t="Unknown error...";null===e||"string"===typeof e?t=e:"object"===typeof e&&(e?.details?t=e.details:void 0!==e?.error?.message?t=e.error.message:void 0!==e?.data?.message?t=e.data.message:void 0!==e?.message&&(t=e.message)),this.errorMessage=null===t?null:t.charAt(0).toUpperCase()+t.slice(1)},async connectWallet(){await W.openModal()},async handleTransaction(e){const{hash:t}=await(0,d.n9)(e);b.Am.info(`\n        <p>Transaction sent! Please wait...</p>\n        <a href=${this.generateTransactionUrl(t)} target="_blank" rel="noopener">View on ${this.networkConfig.blockExplorer.name}</a>\n      `,{dangerouslyHTMLString:!0,position:"bottom-center"}),await(0,d.Mn)({hash:t}),b.Am.info(`\n        <p>Success!</p>\n        <a href=${this.generateTransactionUrl(t)} target="_blank" rel="noopener">View on ${this.networkConfig.blockExplorer.name}</a>\n      `,{dangerouslyHTMLString:!0,position:"bottom-center"})},async claim(){try{this.loading=!0;const e=this.feePrice,{request:t}=await(0,d.$q)({...A,functionName:"claim",args:void 0,value:e});await this.handleTransaction(t),this.loading=!1}catch(e){this.setError(e),this.loading=!1}}},getters:{getUserAddress(){return this.userAddress},isWalletConnected(){return!!this.userAddress},isContractReady(){return void 0!==this.contract&&this.initDone},isNotMainnet(){return null!==this.network&&this.network.chainId!==g.mainnet.chainId},generateContractUrl(){return this.networkConfig.blockExplorer.generateContractUrl(g.contractAddress)},generateTransactionUrl(e){return t=>e.networkConfig.blockExplorer.generateTransactionUrl(t)}}});class D extends o.w3{constructor(...e){super(...e),(0,r.Z)(this,"Web3",x())}mounted(){this.Web3.init()}}var S=n(89);const P=(0,S.Z)(D,[["render",i]]);var O=P,I=n(2483),N=n(7139),j=n(4870),E=n.p+"img/boxbiesLogo.ce558381.jpg",B=n.p+"img/boxbiesLogo_negative.e9c3ccaf.jpg";const H={className:"collection-status"},z={className:"user-address"},L=(0,s._)("span",{className:"label"},"Wallet address:",-1),$={className:"address"},Z={className:"current-sale"},q=(0,s._)("span",{className:"label"},"Claim status",-1);function Y(e,t,n,a,i,r){return(0,s.wg)(),(0,s.iD)("div",H,[(0,s._)("div",z,[L,(0,s._)("span",$,(0,N.zw)(e.Web3.userAddress),1)]),(0,s._)("div",Z,[q,(0,s.Uk)(" "+(0,N.zw)(e.isSaleOpen?e.Web3.isPaused?"Whitelist only":"Open":"Closed"),1)])])}class F extends o.w3{constructor(...e){super(...e),(0,r.Z)(this,"Web3",x())}get isSaleOpen(){return!this.Web3.isPaused}}const R=(0,S.Z)(F,[["render",Y]]);var V=R;const J={key:0,class:"mint-widget"},Q={className:"price"},G=(0,s._)("strong",null,"Claim Available:",-1),K={className:"controls"},X=["disabled"],ee={key:1},te={className:"cannot-mint"},ne=(0,s._)("strong",null,"Claim",-1),ae=(0,s._)("strong",null,"paused",-1),se=(0,s._)("br",null,null,-1);function ie(e,t,n,a,i,r){return(0,s.wg)(),(0,s.iD)("div",null,[e.canMint?((0,s.wg)(),(0,s.iD)("div",J,[(0,s._)("div",Q,[G,(0,s.Uk)(" "+(0,N.zw)(e.formattedPrice)+" "+(0,N.zw)(e.Web3.networkConfig.symbol),1)]),(0,s._)("div",K,[(0,s._)("button",{className:"primary",onClick:t[0]||(t[0]=(...t)=>e.claim&&e.claim(...t)),disabled:e.Web3.loading},"Claim",8,X)])])):((0,s.wg)(),(0,s.iD)("div",ee,[(0,s._)("div",te,[e.Web3.isUserInWhitelist?((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[(0,s.Uk)("The contract is "),ae,(0,s.Uk)(".")],64)):((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s.Uk)("You are not included in the "),ne,(0,s.Uk)(".")],64)),se,(0,s.Uk)(" Please come back later! ")])]))])}var re=n(758);class oe extends o.w3{constructor(...e){super(...e),(0,r.Z)(this,"Web3",x()),(0,r.Z)(this,"mintAmount",0)}get canMint(){return!this.Web3.isPaused&&this.Web3.isUserInWhitelist}get canWhitelistMint(){return!0}get formattedPrice(){return re.dF(this.Web3.walletBalance).toString()}async claim(){this.Web3.isPaused||await this.Web3.claim()}}const le=(0,S.Z)(oe,[["render",ie]]);var ce=le;const ue=e=>((0,s.dD)("data-v-4a09f26c"),e=e(),(0,s.Cn)(),e),de={class:"countDown"},pe=ue((()=>(0,s._)("h2",{class:"cdTitle"},"Next claim in:",-1))),me={class:"timer"},be=ue((()=>(0,s._)("p",null,[(0,s._)("small",null,"Days")],-1))),fe=ue((()=>(0,s._)("span",null,":",-1))),ye=ue((()=>(0,s._)("p",null,[(0,s._)("small",null,"Hrs")],-1))),he=ue((()=>(0,s._)("span",null,":",-1))),ge=ue((()=>(0,s._)("p",null,[(0,s._)("small",null,"Min")],-1))),we=ue((()=>(0,s._)("span",null,":",-1))),ve=ue((()=>(0,s._)("p",null,[(0,s._)("small",null,"Sec")],-1)));function _e(e,t,n,a,i,r){return(0,s.wg)(),(0,s.iD)("div",de,[(0,s._)("div",null,[pe,(0,s._)("section",null,[(0,s._)("section",me,[(0,s._)("div",null,[(0,s._)("section",null,[(0,s._)("p",null,(0,N.zw)(i.days),1),be]),fe,(0,s._)("section",null,[(0,s._)("p",null,(0,N.zw)(i.hours),1),ye]),he,(0,s._)("section",null,[(0,s._)("p",null,(0,N.zw)(i.minutes),1),ge]),we,(0,s._)("section",null,[(0,s._)("p",null,(0,N.zw)(i.seconds),1),ve])])])])])])}var ke={name:"CountDownTimer",created(){this.startTimer()},data(){return{days:0,hours:0,minutes:0,seconds:0,isLive:!1,displayCountDown:!1}},methods:{startTimer(){const e=new Date("July 17, 2023 17:00:00").getTime(),t=setInterval((()=>{const n=new Date,a=new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds()).getTime(),s=e-a,i=Math.floor(s/864e5),r=Math.floor(s%864e5/36e5),o=Math.floor(s%36e5/6e4),l=Math.floor(s%6e4/1e3);s<=0?(this.isLive=!0,clearInterval(t)):(this.days=i,this.hours=r,this.minutes=o,this.seconds=l),this.displayCountDown=!0}),1e3)}}};const Ce=(0,S.Z)(ke,[["render",_e],["__scopeId","data-v-4a09f26c"]]);var Te=Ce;const Ue=(0,s._)("div",{class:"links"},[(0,s._)("ul",null,[(0,s._)("li",null,[(0,s._)("a",{href:"https://discord.gg/boxbies",target:"_blank"},"Discord")]),(0,s._)("li",null,[(0,s._)("a",{href:"https://twitter.com/boxbies",target:"_blank"},"twitter")]),(0,s._)("li",null,[(0,s._)("a",{href:"https://opensea.io/collection/boxbiesnft",target:"_blank"},"Opensea")])])],-1),Me={class:"darkTheme"},We={class:"mainCont"},Ae=(0,s._)("img",{class:"logo",src:E,alt:"Boxbies Logo"},null,-1),xe={class:"container"},De={key:0,class:"alert alert-warning",role:"alert"},Se={class:"small"},Pe={key:1,class:"alert alert-warning alert-dismissible fade show",role:"alert"},Oe={key:3,class:"collection-not-ready"},Ie={key:4,class:"no-wallet"},Ne=(0,s._)("div",{class:"poweredBy"},[(0,s.Uk)(" powered by: "),(0,s._)("a",{href:"https://boxbies.io",target:"_blank"},[(0,s._)("img",{src:B,alt:"Boxbies logo"})])],-1);var je=(0,s.aZ)({__name:"HomeView",setup(e){const t=(0,j.iH)(!1),n=x(),a=(0,j.iH)("");return(0,s.YP)((()=>n.userAddress),(e=>{!a.value&&e&&(a.value=e?.toString())})),(e,a)=>((0,s.wg)(),(0,s.iD)("div",{id:"minting-dapp",class:(0,N.C_)({dark:t.value})},[Ue,(0,s._)("div",Me,[(0,s._)("button",{onClick:a[0]||(a[0]=e=>t.value=!t.value)})]),(0,s._)("div",We,[Ae,(0,s._)("div",xe,[(0,s.Wm)(Te),(0,j.SU)(n).isNotMainnet?((0,s.wg)(),(0,s.iD)("div",De,[(0,s.Uk)(" You are not connected to the main network. "),(0,s._)("span",Se,[(0,s.Uk)("Current network: "),(0,s._)("strong",null,(0,N.zw)((0,j.SU)(n).network?.name),1)])])):(0,s.kq)("",!0),(0,j.SU)(n).errorMessage?((0,s.wg)(),(0,s.iD)("div",Pe,[(0,s.Uk)((0,N.zw)((0,j.SU)(n).errorMessage)+" ",1),(0,s._)("button",{onClick:a[1]||(a[1]=e=>(0,j.SU)(n).setError()),type:"button",class:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})])):(0,s.kq)("",!0),(0,j.SU)(n).isWalletConnected&&(0,j.SU)(n).isContractReady?((0,s.wg)(),(0,s.iD)(s.HY,{key:2},[(0,s.Wm)(V),((0,s.wg)(),(0,s.j4)(ce,{key:0}))],64)):(0,s.kq)("",!0),(0,j.SU)(n).isContractReady?(0,j.SU)(n).isWalletConnected?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",Ie,[(0,s._)("button",{class:"primary",onClick:a[2]||(a[2]=(...e)=>(0,j.SU)(n).connectWallet&&(0,j.SU)(n).connectWallet(...e))},"Connect Wallet")])):((0,s.wg)(),(0,s.iD)("div",Oe," Loading collection data... "))]),Ne])],2))}});const Ee=je;var Be=Ee;const He=[{path:"/",name:"home",component:Be}],ze=(0,I.p7)({history:(0,I.r5)(),routes:He});var Le=ze;const $e=(0,l.WB)();var Ze=$e,qe=(n(2166),n(5361));window.Buffer=window.Buffer||qe.lW,(0,a.ri)(O).use(Le).use(Ze).mount("#app")},6601:function(){}},t={};function n(a){var s=t[a];if(void 0!==s)return s.exports;var i=t[a]={id:a,loaded:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){var e=[];n.O=function(t,a,s,i){if(!a){var r=1/0;for(u=0;u<e.length;u++){a=e[u][0],s=e[u][1],i=e[u][2];for(var o=!0,l=0;l<a.length;l++)(!1&i||r>=i)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(o=!1,i<r&&(r=i));if(o){e.splice(u--,1);var c=s();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[a,s,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,a){return n.f[a](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{281:"ad500d5d",335:"afcc76cf",649:"0f0109bb",776:"5c8b68a0",780:"b08d9cf2",916:"fbee0df2",943:"fc0d1c76"}[e]+".js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vue-web3:";n.l=function(a,s,i,r){if(e[a])e[a].push(s);else{var o,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+i){o=d;break}}o||(l=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,n.nc&&o.setAttribute("nonce",n.nc),o.setAttribute("data-webpack",t+i),o.src=a),e[a]=[s];var p=function(t,n){o.onerror=o.onload=null,clearTimeout(m);var s=e[a];if(delete e[a],o.parentNode&&o.parentNode.removeChild(o),s&&s.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(p.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=p.bind(null,o.onerror),o.onload=p.bind(null,o.onload),l&&document.head.appendChild(o)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){var e={143:0};n.f.j=function(t,a){var s=n.o(e,t)?e[t]:void 0;if(0!==s)if(s)a.push(s[2]);else{var i=new Promise((function(n,a){s=e[t]=[n,a]}));a.push(s[2]=i);var r=n.p+n.u(t),o=new Error,l=function(a){if(n.o(e,t)&&(s=e[t],0!==s&&(e[t]=void 0),s)){var i=a&&("load"===a.type?"missing":a.type),r=a&&a.target&&a.target.src;o.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",o.name="ChunkLoadError",o.type=i,o.request=r,s[1](o)}};n.l(r,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,a){var s,i,r=a[0],o=a[1],l=a[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(s in o)n.o(o,s)&&(n.m[s]=o[s]);if(l)var u=l(n)}for(t&&t(a);c<r.length;c++)i=r[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},a=self["webpackChunkvue_web3"]=self["webpackChunkvue_web3"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(3412)}));a=n.O(a)})();
//# sourceMappingURL=app.2a5bf8a9.js.map