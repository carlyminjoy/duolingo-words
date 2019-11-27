(function(t){function e(e){for(var r,s,l=e[0],c=e[1],i=e[2],p=0,d=[];p<l.length;p++)s=l[p],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&d.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(d.length)d.shift()();return o.push.apply(o,i||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,l=1;l<n.length;l++){var c=n[l];0!==a[c]&&(r=!1)}r&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},a={app:0},o=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var i=0;i<l.length;i++)e(l[i]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"#78c800",dark:""}},[n("div",{staticClass:"d-flex align-center text-center"},[n("h2",[t._v("My Duolingo Words")])]),n("v-spacer")],1),n("v-content",[n("HelloWorld")],1)],1)},o=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-layout",{staticClass:"py-5",attrs:{wrap:""}},[n("v-select",{staticClass:"pa-3",attrs:{items:t.langs,label:"Language"},model:{value:t.lang,callback:function(e){t.lang=e},expression:"lang"}}),n("v-select",{staticClass:"pa-3",attrs:{items:t.strengths,label:"Strength"},model:{value:t.strength,callback:function(e){t.strength=e},expression:"strength"}}),n("v-select",{staticClass:"pa-3",attrs:{items:t.types,label:"Type"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}}),"es"==t.lang?n("v-container",{staticClass:"my-5",attrs:{fluid:""}},t._l(t.filteredWords,(function(e,r){return n("v-row",{key:r,staticClass:"word-container",on:{click:function(n){return t.getDetails(e)}}},[n("v-col",{staticClass:"word",attrs:{cols:"3"}},[n("h2",[t._v(t._s(e.word_string))])]),n("v-col",{attrs:{cols:"2"}},[n("p",[t._v(t._s(e.pos))])]),n("v-col",{staticClass:"translation",attrs:{cols:"3"}},[n("p",[t._v(t._s(e.translation))])]),n("v-col",{staticClass:"sentence",attrs:{cols:"3"}},[e.sentence?n("p",[t._v('"'),n("em",{domProps:{innerHTML:t._s(e.sentence)}}),t._v('"')]):t._e()])],1)})),1):t._e(),"en"==t.lang?n("v-container",{attrs:{fluid:""}},t._l(t.filteredWords,(function(e,r){return n("v-row",{key:r,staticClass:"word-container"},[n("v-col",{staticClass:"word",attrs:{cols:"3"}},[n("h2",[t._v(t._s(e.translation)+" ")])]),n("v-col",{attrs:{cols:"3"}},[n("p",[t._v(t._s(e.pos))])]),n("v-col",{staticClass:"translation",attrs:{cols:"6"}},[n("h3",[t._v(t._s(e.word_string))])])],1)})),1):t._e()],1)],1)},l=[],c=(n("4de4"),n("a15b"),n("d81d"),n("fb6a"),n("4e82"),n("b64b"),n("bc3a")),i=n.n(c),u={name:"Words",data:function(){return{words:[],langs:["en","es"],strengths:["All","Weak","Strong"],types:["All","Adjective","Noun","Verb","Proper noun","Pronoun","Adverb","Preposition","Determiner","Numeral","Interjection","Conjunction"],type:"All",lang:"es",strength:"All"}},computed:{filteredWords:function(){var t=this;return t&&t.words?t.words.filter((function(e){var n,r=!t.type||"All"==t.type||e.pos==t.type;return n=!t.strength||"All"==t.strength||("Strong"==t.strength?e.strength>=.5:e.strength<=.5),r&&n})):[]},parsedWords:function(){var t=this;return Object.keys(t.words)}},methods:{capitalize:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},getDetails:function(t){var e="https://www.duolingo.com/api/1/dictionary_page?lexeme_id=".concat(t.lexeme_id,"&use_cache=false&_=1573392387059");i.a.get(e).then((function(e){return t.sentence=e.data.alternative_forms[0].example_sentence}))}},mounted:function(){var t=this;i.a.get("/words").then((function(e){var n=e.data.vocab_overview;i.a.get("/translations").then((function(e){t.words=n.map((function(n){var r=e.data[n.word_string]||e.data[n.normalized_string]||e.data[t.capitalize(n.word_string)]||e.data[t.capitalize(n.normalized_string)];return n.translation=r?r.join(", "):null,n.sentence=null,n})).filter((function(t){return t.translation})).sort((function(t,e){return t.last_practiced_ms>e.last_practiced_ms?-1:1}))}))}))}},p=u,d=(n("f371"),n("2877")),f=n("6544"),v=n.n(f),g=n("62ad"),_=n("a523"),h=n("a722"),b=n("0fd9"),y=n("b974"),m=Object(d["a"])(p,s,l,!1,null,"d670432e",null),w=m.exports;v()(m,{VCol:g["a"],VContainer:_["a"],VLayout:h["a"],VRow:b["a"],VSelect:y["a"]});var C={name:"App",components:{HelloWorld:w},data:function(){return{}}},j=C,x=(n("5c0b"),n("7496")),O=n("40dc"),k=n("a75b"),A=n("2fa4"),P=Object(d["a"])(j,a,o,!1,null,null,null),S=P.exports;v()(P,{VApp:x["a"],VAppBar:O["a"],VContent:k["a"],VSpacer:A["a"]});var V=n("f309");r["a"].use(V["a"]);var W=new V["a"]({});r["a"].config.productionTip=!1,new r["a"]({vuetify:W,render:function(t){return t(S)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("91cd"),a=n.n(r);a.a},7892:function(t,e,n){},"91cd":function(t,e,n){},f371:function(t,e,n){"use strict";var r=n("7892"),a=n.n(r);a.a}});
//# sourceMappingURL=app.1db1241d.js.map