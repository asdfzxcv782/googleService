(function(t){function e(e){for(var n,s,i=e[0],l=e[1],u=e[2],f=0,d=[];f<i.length;f++)s=i[f],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);c&&c(e);while(d.length)d.shift()();return o.push.apply(o,u||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,i=1;i<a.length;i++){var l=a[i];0!==r[l]&&(n=!1)}n&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={index:0},o=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var c=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";a("3ebb")},1459:function(t,e,a){var n=a("23c4");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=a("499e").default;r("04d88b2c",n,!0,{sourceMap:!1,shadowMode:!1})},"16e3":function(t,e,a){"use strict";a("1459")},"199c":function(t,e){},"23be":function(t,e,a){"use strict";var n=a("199c"),r=a.n(n);e["default"]=r.a},"23c4":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,"h2 h1 p[data-v-5c8ae73e]{margin:40px 0 0}",""]),t.exports=e},"3dfd":function(t,e,a){"use strict";var n=a("bc15"),r=a("23be"),o=(a("034f"),a("2877")),s=Object(o["a"])(r["default"],n["a"],n["b"],!1,null,null,null);e["default"]=s.exports},"3ebb":function(t,e,a){var n=a("e31a");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=a("499e").default;r("517436b3",n,!0,{sourceMap:!1,shadowMode:!1})},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=a("3dfd"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-1"},[a("div",{staticClass:"list-group",attrs:{id:"list-tab",role:"tablist"}},[a("a",{staticClass:"list-group-item list-group-item-action",attrs:{id:"list-profile-list","data-bs-toggle":"list",role:"tab","aria-controls":"profile"},on:{click:function(e){return t.adminRequest()}}},[t._v("Profile")]),a("a",{staticClass:"list-group-item list-group-item-action",attrs:{id:"list-messages-list","data-bs-toggle":"list",role:"tab","aria-controls":"messages"},on:{click:function(e){return t.getDriver()}}},[a("span",{staticClass:"fa fa-google"}),t._v("Get Driver List")]),a("a",{staticClass:"list-group-item list-group-item-action",attrs:{id:"list-settings-list","data-bs-toggle":"list",href:"logout",role:"tab","aria-controls":"settings"}},[t._v("Logout")])])]),a("div",{staticClass:"container col-4"},[a("div",{staticClass:"jumbotron text-center text-info"},[a("b-avatar",{staticClass:"mr-3",attrs:{variant:"info",src:t.userinfo.picture}}),a("h1",{staticClass:"display-4"},[t._v("Hello!")]),a("h1",[t._v(t._s(t.userinfo.name))])],1),t.adminRequestShow?a("div",{staticClass:"jumbotron text-left text-info"},[a("button",{staticClass:"btn-close",attrs:{type:"button","data-bs-dismiss":"toast","aria-label":"Close"},on:{click:function(e){t.adminRequestShow=!t.adminRequestShow}}}),a("button",{staticClass:"btn-close text-reset",attrs:{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close"},on:{click:function(e){t.adminRequestShow=!t.adminRequestShow}}}),a("adminRequest",{attrs:{data:t.adminRequestValue}})],1):t._e(),t.DriverShow?a("div",{staticClass:"jumbotron text-left text-info"},[a("Driver",{attrs:{data:t.DriverValue}})],1):t._e()])])},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-primary"},t._l(t.data,(function(e){return a("div",{key:e.id},[a("li",{directives:[{name:"show",rawName:"v-show",value:e.seen,expression:"users.seen"}]},[t._v(" "+t._s(e.id)+" : "+t._s(e.user)+" "),a("a",{staticClass:"btn btn-danger",on:{click:function(a){return t.allowUser(e)}}},[t._v("allow "+t._s(e.user))])])])})),0)},l=[],u={props:["data"],methods:{allowUser:function(t){var e=this;this.$http.get("/admin/allow?userId="+t.id).then((function(e){console.log(e),t.seen=!t.seen})).catch((function(t){console.log("error"),e.$router.push({name:"error",params:{alert:t}})}))}}},c=u,f=a("2877"),d=Object(f["a"])(c,i,l,!1,null,"a54f3de6",null),p=d.exports,h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-primary"},t._l(t.data,(function(e){return a("div",{key:e.id},[a("li",[t._v(" "+t._s(e.name)+" ")])])})),0)},v=[],m={props:["data"],methods:{allowUser:function(t){var e=this;this.$http.get("/admin/allow?userId="+t.id).then((function(e){console.log(e),t.seen=!t.seen})).catch((function(t){console.log("error"),e.$router.push({name:"error",params:{alert:t}})}))}}},g=m,b=Object(f["a"])(g,h,v,!1,null,"c1060d20",null),_=b.exports,w={name:"HelloWorld",components:{adminRequest:p,Driver:_},data:function(){return{userinfo:"",adminRequestShow:!1,adminRequestValue:"",DriverShow:!1,DriverValue:""}},beforeMount:function(){var t=this;this.$http.get("/userinfo").then((function(e){console.log(e),1==e.data.NeedPermission?t.$router.push({name:"error",params:{alert:"needAdminPermission",home:"/logout"}}):t.userinfo=e.data})).catch((function(e){console.log("error"),t.$router.push({name:"error",params:{alert:e}})}))},methods:{adminRequest:function(){var t=this;this.$http.get("/admin/getRequestMenu").then((function(e){t.adminRequestValue=e.data})).catch((function(e){console.log("error"),t.$router.push({name:"error",params:{alert:e}})})),this.adminRequestShow=!0},getDriver:function(){var t=this;this.$http.get("/getDriver").then((function(e){console.log(e),t.DriverValue=e.data,t.DriverShow=!0})).catch((function(t){console.log(t),window.location="https://gcptest.u-show777.com/login/googleApi"}))}}},x=w,y=(a("8e75"),Object(f["a"])(x,o,s,!1,null,"2973972f",null)),C=y.exports,$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h2",[t._v("Error")]),a("p",[t._v(t._s(this.$route.params.alert))]),a("b-button",{attrs:{variant:"outline-primary",href:"/"}},[t._v("Back To Home")]),a("b-button",{attrs:{variant:"outline-primary",href:"/logout"}},[t._v("Back To login")])],1)},j=[],O={},S=O,k=(a("16e3"),Object(f["a"])(S,$,j,!1,null,"5c8ae73e",null)),q=k.exports,M=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},R=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"jumbotron text-center text-primary"},[a("h1",[a("span",{staticClass:"fa fa-lock"}),t._v(" Social Authentication")]),a("p",[t._v("Login with:")]),a("a",{staticClass:"btn btn-danger",attrs:{href:"/login/googleAuth"}},[a("span",{staticClass:"fa fa-google"}),t._v(" SignIn with Google")])])])}],D={},P=D,E=Object(f["a"])(P,M,R,!1,null,"83a534e2",null),A=E.exports,V=[{path:"/",name:"main",component:C},{path:"/login",name:"login",component:A},{path:"*",name:"error",component:q}],T=V,H=a("8c4f"),I=a("bc3a"),L=a.n(I),U=a("5f5b"),B=a("b1e0");a("f9e3"),a("2dd8");n["default"].use(H["a"]),n["default"].prototype.$http=L.a,n["default"].config.productionTip=!1,n["default"].use(U["a"]),n["default"].use(B["a"]);var G=new H["a"]({mode:"history",base:"/",routes:T});new n["default"]({render:function(t){return t(r["default"])},router:G}).$mount("#app")},"8e75":function(t,e,a){"use strict";a("f547")},bc15:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},r=[]},e31a:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,"#app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px}",""]),t.exports=e},f034:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,"h3[data-v-2973972f]{margin:40px 0 0}ul[data-v-2973972f]{list-style-type:none;padding:0}li[data-v-2973972f]{display:inline-block;margin:0 10px}a[data-v-2973972f]{color:#42b983}",""]),t.exports=e},f547:function(t,e,a){var n=a("f034");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=a("499e").default;r("43d13284",n,!0,{sourceMap:!1,shadowMode:!1})}});