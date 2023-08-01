(function(){var e={7200:function(e,t,n){"use strict";var a=n(9242),i=n(3396);function s(e,t,n,a,s,r){const o=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(o)}var r=n(7327),o=n(6520),l=n(2578),c=n(6750),u=n(7365),d=n(8473),p=n(3922),b=n(3297),y=n(672),m=n(9511);const f={testnet:m.lT,mainnet:m.qy,contractName:"HolderRoyaltiesClaim",contractAddress:"0x062cA495408245d78aDbA29CFc2d88d8Af2ba8Ae"};var h=f;const g=[{type:"event",anonymous:!1,inputs:[{name:"previousOwner",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{stateMutability:"payable",type:"fallback"},{stateMutability:"nonpayable",type:"function",inputs:[{name:"addresses",internalType:"address[]",type:"address[]"},{name:"balances",internalType:"uint256[]",type:"uint256[]"}],name:"addWallets",outputs:[]},{stateMutability:"payable",type:"function",inputs:[],name:"claim",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"uint256",type:"uint256"}],name:"claimed",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"fee",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"paused",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"nonpayable",type:"function",inputs:[],name:"renounceOwnership",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_fee",internalType:"uint256",type:"uint256"}],name:"setFee",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_state",internalType:"bool",type:"bool"}],name:"setPause",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"addresses",internalType:"address[]",type:"address[]"},{name:"balances",internalType:"uint256[]",type:"uint256[]"}],name:"setWallets",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"walletBalance",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[],name:"withdraw",outputs:[]},{stateMutability:"payable",type:"receive"}],w={contract:null,initDone:!1,userAddress:null,network:null,feePrice:BigInt(0),walletBalance:BigInt(0),networkConfig:h.mainnet,isPaused:!0,loading:!1,isUserInWhitelist:!1,errorMessage:null},v="665d687852032cfc7d1c167792f3c74b",{chains:k,publicClient:_,webSocketPublicClient:C}=(0,d.QB)([p.yu],[(0,b.I)()]),T=(0,d._g)({autoConnect:!0,connectors:(0,c.gu)({projectId:v,chains:k}),publicClient:_,webSocketPublicClient:C}),U=new c.J0(T,k),W=new u.E({projectId:v},U),M={address:h.contractAddress,abi:g},A=(0,l.Q_)("Web3",{state:()=>w,actions:{async init(){console.log("Web3 init start"),this.registerWalletEvents(),this.contract=(0,d.uN)({...M,walletClient:U});try{this.$patch({feePrice:await this.contract.read.fee([]),isPaused:await this.contract.read.paused([]),isUserInWhitelist:await this.contract.read.walletBalance([this.userAddress])>BigInt(0)})}catch(e){}this.initDone=!0},async registerWalletEvents(){U.watchAccount((async({isConnected:e,address:t})=>{e?(this.userAddress=t,this.walletBalance=await this.contract.read.walletBalance([this.userAddress])):this.userAddress=null})),U.watchNetwork((({chain:e})=>{this.network=e?{name:e.name,chainId:e.id}:null}))},setError(e=null){let t="Unknown error...";null===e||"string"===typeof e?t=e:"object"===typeof e&&(e?.details?t=e.details:void 0!==e?.error?.message?t=e.error.message:void 0!==e?.data?.message?t=e.data.message:void 0!==e?.message&&(t=e.message)),this.errorMessage=null===t?null:t.charAt(0).toUpperCase()+t.slice(1)},async connectWallet(){await W.openModal()},async handleTransaction(e){const{hash:t}=await(0,d.n9)(e);y.Am.info(`\n        <p>Transaction sent! Please wait...</p>\n        <a href=${this.generateTransactionUrl(t)} target="_blank" rel="noopener">View on ${this.networkConfig.blockExplorer.name}</a>\n      `,{dangerouslyHTMLString:!0,position:"bottom-center"}),await(0,d.Mn)({hash:t}),y.Am.info(`\n        <p>Success!</p>\n        <a href=${this.generateTransactionUrl(t)} target="_blank" rel="noopener">View on ${this.networkConfig.blockExplorer.name}</a>\n      `,{dangerouslyHTMLString:!0,position:"bottom-center"})},async claim(){try{this.loading=!0;const e=this.feePrice,{request:t}=await(0,d.$q)({...M,functionName:"claim",args:void 0,value:e});await this.handleTransaction(t),this.loading=!1}catch(e){this.setError(e),this.loading=!1}}},getters:{getUserAddress(){return this.userAddress},isWalletConnected(){return!!this.userAddress},isContractReady(){return void 0!==this.contract&&this.initDone},isNotMainnet(){return null!==this.network&&this.network.chainId!==h.mainnet.chainId},generateContractUrl(){return this.networkConfig.blockExplorer.generateContractUrl(h.contractAddress)},generateTransactionUrl(e){return t=>e.networkConfig.blockExplorer.generateTransactionUrl(t)}}});class x extends o.w3{constructor(...e){super(...e),(0,r.Z)(this,"Web3",A())}mounted(){this.Web3.init()}}var P=n(89);const S=(0,P.Z)(x,[["render",s]]);var O=S,j=n(2483),N=n(7139),D=n(4870),E=n.p+"img/boxbiesLogo.ce558381.jpg",B=n.p+"img/boxbiesLogo_negative.e9c3ccaf.jpg";const I={className:"collection-status"},q={className:"user-address"},$=(0,i._)("span",{className:"label"},"Wallet address:",-1),H={className:"address"},L={className:"current-sale"},Z=(0,i._)("span",{className:"label"},"Claim status",-1);function z(e,t,n,a,s,r){return(0,i.wg)(),(0,i.iD)("div",I,[(0,i._)("div",q,[$,(0,i._)("span",H,(0,N.zw)(e.Web3.userAddress),1)]),(0,i._)("div",L,[Z,(0,i.Uk)(" "+(0,N.zw)(e.isSaleOpen?e.Web3.isPaused?"Whitelist only":"Open":"Closed"),1)])])}class Y extends o.w3{constructor(...e){super(...e),(0,r.Z)(this,"Web3",A())}get isSaleOpen(){return!this.Web3.isPaused}}const F=(0,P.Z)(Y,[["render",z]]);var R=F;const V={key:0,class:"mint-widget"},Q={className:"price"},J=(0,i._)("strong",null,"Claim Available:",-1),G={className:"controls"},K=["disabled"],X={key:1},ee={className:"cannot-mint"},te=(0,i._)("strong",null,"Claim",-1),ne=(0,i._)("strong",null,"paused",-1),ae=(0,i._)("br",null,null,-1);function ie(e,t,n,a,s,r){return(0,i.wg)(),(0,i.iD)("div",null,[e.canMint?((0,i.wg)(),(0,i.iD)("div",V,[(0,i._)("div",Q,[J,(0,i.Uk)(" "+(0,N.zw)(e.formattedPrice)+" "+(0,N.zw)(e.Web3.networkConfig.symbol),1)]),(0,i._)("div",G,[(0,i._)("button",{className:"primary",onClick:t[0]||(t[0]=(...t)=>e.claim&&e.claim(...t)),disabled:e.Web3.loading},"Claim",8,K)])])):((0,i.wg)(),(0,i.iD)("div",X,[(0,i._)("div",ee,[e.Web3.isUserInWhitelist?((0,i.wg)(),(0,i.iD)(i.HY,{key:1},[(0,i.Uk)("The contract is "),ne,(0,i.Uk)(".")],64)):((0,i.wg)(),(0,i.iD)(i.HY,{key:0},[(0,i.Uk)("You are not included in the "),te,(0,i.Uk)(".")],64)),ae,(0,i.Uk)(" Please come back later! ")])]))])}var se=n(758);class re extends o.w3{constructor(...e){super(...e),(0,r.Z)(this,"Web3",A()),(0,r.Z)(this,"mintAmount",0)}get canMint(){return!this.Web3.isPaused&&this.Web3.isUserInWhitelist}get canWhitelistMint(){return!0}get formattedPrice(){return se.dF(this.Web3.walletBalance).toString()}async claim(){this.Web3.isPaused||await this.Web3.claim()}}const oe=(0,P.Z)(re,[["render",ie]]);var le=oe;const ce=(0,i._)("div",{class:"links"},[(0,i._)("ul",null,[(0,i._)("li",null,[(0,i._)("a",{href:"https://discord.gg/boxbies",target:"_blank"},"Discord")]),(0,i._)("li",null,[(0,i._)("a",{href:"https://twitter.com/boxbies",target:"_blank"},"twitter")]),(0,i._)("li",null,[(0,i._)("a",{href:"https://opensea.io/collection/boxbiesnft",target:"_blank"},"Opensea")])])],-1),ue={class:"darkTheme"},de={class:"mainCont"},pe=(0,i._)("img",{class:"logo",src:E,alt:"Boxbies Logo"},null,-1),be={class:"container"},ye=(0,i._)("div",{class:"countDown"},[(0,i._)("h2",{class:"cdTitle"},"Claim is updated every Monday")],-1),me={key:0,class:"alert alert-warning",role:"alert"},fe={class:"small"},he={key:1,class:"alert alert-warning alert-dismissible fade show",role:"alert"},ge={key:3,class:"collection-not-ready"},we={key:4,class:"no-wallet"},ve=(0,i._)("div",{class:"poweredBy"},[(0,i.Uk)(" powered by: "),(0,i._)("a",{href:"https://boxbies.io",target:"_blank"},[(0,i._)("img",{src:B,alt:"Boxbies logo"})])],-1);var ke=(0,i.aZ)({__name:"HomeView",setup(e){const t=(0,D.iH)(!1),n=A(),a=(0,D.iH)("");return(0,i.YP)((()=>n.userAddress),(e=>{!a.value&&e&&(a.value=e?.toString())})),(e,a)=>((0,i.wg)(),(0,i.iD)("div",{id:"minting-dapp",class:(0,N.C_)({dark:t.value})},[ce,(0,i._)("div",ue,[(0,i._)("button",{onClick:a[0]||(a[0]=e=>t.value=!t.value)})]),(0,i._)("div",de,[pe,(0,i._)("div",be,[ye,(0,D.SU)(n).isNotMainnet?((0,i.wg)(),(0,i.iD)("div",me,[(0,i.Uk)(" You are not connected to the main network. "),(0,i._)("span",fe,[(0,i.Uk)("Current network: "),(0,i._)("strong",null,(0,N.zw)((0,D.SU)(n).network?.name),1)])])):(0,i.kq)("",!0),(0,D.SU)(n).errorMessage?((0,i.wg)(),(0,i.iD)("div",he,[(0,i.Uk)((0,N.zw)((0,D.SU)(n).errorMessage)+" ",1),(0,i._)("button",{onClick:a[1]||(a[1]=e=>(0,D.SU)(n).setError()),type:"button",class:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})])):(0,i.kq)("",!0),(0,D.SU)(n).isWalletConnected&&(0,D.SU)(n).isContractReady?((0,i.wg)(),(0,i.iD)(i.HY,{key:2},[(0,i.Wm)(R),((0,i.wg)(),(0,i.j4)(le,{key:0}))],64)):(0,i.kq)("",!0),(0,D.SU)(n).isContractReady?(0,D.SU)(n).isWalletConnected?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",we,[(0,i._)("button",{class:"primary",onClick:a[2]||(a[2]=(...e)=>(0,D.SU)(n).connectWallet&&(0,D.SU)(n).connectWallet(...e))},"Connect Wallet")])):((0,i.wg)(),(0,i.iD)("div",ge," Loading collection data... "))]),ve])],2))}});const _e=ke;var Ce=_e;const Te=[{path:"/",name:"home",component:Ce}],Ue=(0,j.p7)({history:(0,j.r5)(),routes:Te});var We=Ue;const Me=(0,l.WB)();var Ae=Me,xe=(n(2166),n(5361));window.Buffer=window.Buffer||xe.lW,(0,a.ri)(O).use(We).use(Ae).mount("#app")},9511:function(e,t){"use strict";t.qy=t.lT=void 0,t.lT={chainId:80001,symbol:"MATIC (test)",blockExplorer:{name:"Polygonscan (Mumbai)",generateContractUrl:e=>`https://mumbai.polygonscan.com/address/${e}`,generateTransactionUrl:e=>`https://mumbai.polygonscan.com/tx/${e}`}},t.qy={chainId:137,symbol:"MATIC",blockExplorer:{name:"Polygonscan",generateContractUrl:e=>`https://polygonscan.com/address/${e}`,generateTransactionUrl:e=>`https://polygonscan.com/tx/${e}`}}},6601:function(){}},t={};function n(a){var i=t[a];if(void 0!==i)return i.exports;var s=t[a]={id:a,loaded:!1,exports:{}};return e[a].call(s.exports,s,s.exports,n),s.loaded=!0,s.exports}n.m=e,function(){var e=[];n.O=function(t,a,i,s){if(!a){var r=1/0;for(u=0;u<e.length;u++){a=e[u][0],i=e[u][1],s=e[u][2];for(var o=!0,l=0;l<a.length;l++)(!1&s||r>=s)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(o=!1,s<r&&(r=s));if(o){e.splice(u--,1);var c=i();void 0!==c&&(t=c)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[a,i,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,a){return n.f[a](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{281:"ad500d5d",335:"afcc76cf",649:"0f0109bb",776:"5c8b68a0",780:"b08d9cf2",916:"fbee0df2",943:"fc0d1c76"}[e]+".js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vue-web3:";n.l=function(a,i,s,r){if(e[a])e[a].push(i);else{var o,l;if(void 0!==s)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+s){o=d;break}}o||(l=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,n.nc&&o.setAttribute("nonce",n.nc),o.setAttribute("data-webpack",t+s),o.src=a),e[a]=[i];var p=function(t,n){o.onerror=o.onload=null,clearTimeout(b);var i=e[a];if(delete e[a],o.parentNode&&o.parentNode.removeChild(o),i&&i.forEach((function(e){return e(n)})),t)return t(n)},b=setTimeout(p.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=p.bind(null,o.onerror),o.onload=p.bind(null,o.onload),l&&document.head.appendChild(o)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){var e={143:0};n.f.j=function(t,a){var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)a.push(i[2]);else{var s=new Promise((function(n,a){i=e[t]=[n,a]}));a.push(i[2]=s);var r=n.p+n.u(t),o=new Error,l=function(a){if(n.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var s=a&&("load"===a.type?"missing":a.type),r=a&&a.target&&a.target.src;o.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",o.name="ChunkLoadError",o.type=s,o.request=r,i[1](o)}};n.l(r,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,a){var i,s,r=a[0],o=a[1],l=a[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(i in o)n.o(o,i)&&(n.m[i]=o[i]);if(l)var u=l(n)}for(t&&t(a);c<r.length;c++)s=r[c],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(u)},a=self["webpackChunkvue_web3"]=self["webpackChunkvue_web3"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(7200)}));a=n.O(a)})();
//# sourceMappingURL=app.7e40a5eb.js.map