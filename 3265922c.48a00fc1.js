(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{146:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return s})),r.d(t,"default",(function(){return p}));var n=r(2),a=r(9),o=(r(0),r(160)),i={id:"presentation",title:"Presentation Layer",sidebar_label:"Presentation Layer"},c={id:"presentation",title:"Presentation Layer",description:"In common software architecture patterns, the presentation layer is responsible for handling the user interface (UI), and is most commonly associated with how humans are presented with data stored and retrieved from other layers in the application.",source:"@site/docs/presentation.md",permalink:"/docs/presentation",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/presentation.md",sidebar_label:"Presentation Layer",sidebar:"someSidebar",previous:{title:"Load Balancer",permalink:"/docs/lb"},next:{title:"Business Logic Layer",permalink:"/docs/bizlogic"}},s=[],l={rightToc:s};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"In common software architecture patterns, the presentation layer is responsible for handling the user interface (UI), and is most commonly associated with how humans are presented with data stored and retrieved from other layers in the application."),Object(o.b)("p",null,"For this example, the most common pattern for the presentation layer is a webserver, running on one or more virtual machines. Public cloud providers offer some handy ways of ensuring there is always at least 1 of your system available to handle requests, and can even scale based off some built in metrics to increaase or decrease capacity as needed."),Object(o.b)("p",null,"In order for us to have consistent uptime with this application, we'd like to have:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"A loadbalancer to handle and route requests to our web app"),Object(o.b)("li",{parentName:"ul"},"A pool of virtual machines that dynamically scales to our users needs")),Object(o.b)("p",null,"To make that happen, we'll need to configure:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"A load balancer to help route traffic"),Object(o.b)("li",{parentName:"ol"},"Some type of capability for automatically scaling vm instances as needed\na. A consitently configured machine image that can be rapidly deployed -- often referred to as a machine or instance template"),Object(o.b)("li",{parentName:"ol"},"A metric to increase or decrease sets")),Object(o.b)("p",null,"Each cloud provider covered in this guide provides these components, it's just a matter of reviewing their documentation and materials to learn how each is associated together."))}p.isMDXComponent=!0},160:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return b}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c({},t,{},e)),r},u=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(r),m=n,b=u["".concat(i,".").concat(m)]||u[m]||d[m]||o;return r?a.a.createElement(b,c({ref:t},l,{components:r})):a.a.createElement(b,c({ref:t},l))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var l=2;l<o;l++)i[l]=r[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);