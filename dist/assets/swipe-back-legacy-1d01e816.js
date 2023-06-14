System.register(["./index-legacy-f149b695.js"],(function(t,e){"use strict";var r,n,o;return{setters:[t=>{r=t.G,n=t.i,o=t.c}],execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
const e=(t,e,r,n)=>{const o=s(t)?{capture:!!n.capture,passive:!!n.passive}:!!n.capture;let c,a;return t.__zone_symbol__addEventListener?(c="__zone_symbol__addEventListener",a="__zone_symbol__removeEventListener"):(c="addEventListener",a="removeEventListener"),t[c](e,r,o),()=>{t[a](e,r,o)}},s=t=>{if(void 0===c)try{const e=Object.defineProperty({},"passive",{get:()=>{c=!0}});t.addEventListener("optsTest",(()=>{}),e)}catch(e){c=!1}return!!c};let c;const a=t=>t instanceof Document?t:t.ownerDocument,i=t=>{let n=!1,o=!1,s=!0,c=!1;const i=Object.assign({disableScroll:!1,direction:"x",gesturePriority:0,passive:!0,maxAngle:40,threshold:10},t),v=i.canStart,m=i.onWillStart,p=i.onStart,y=i.onEnd,X=i.notCaptured,h=i.onMove,Y=i.threshold,g=i.passive,b=i.blurOnStart,f={type:"pan",startX:0,startY:0,startTime:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,currentTime:0,event:void 0,data:void 0},_=((t,e,r)=>{const n=r*(Math.PI/180),o="x"===t,s=Math.cos(n),c=e*e;let a=0,i=0,u=!1,l=0;return{start(t,e){a=t,i=e,l=0,u=!0},detect(t,e){if(!u)return!1;const r=t-a,n=e-i,d=r*r+n*n;if(d<c)return!1;const v=Math.sqrt(d),m=(o?r:n)/v;return l=m>s?1:m<-s?-1:0,u=!1,!0},isGesture:()=>0!==l,getDirection:()=>l}})(i.direction,i.threshold,i.maxAngle),S=r.createGesture({name:t.gestureName,priority:t.gesturePriority,disableScroll:t.disableScroll}),T=()=>{n&&(c=!1,h&&h(f))},w=()=>!!S.capture()&&(n=!0,s=!1,f.startX=f.currentX,f.startY=f.currentY,f.startTime=f.currentTime,m?m(f).then(E):E(),!0),E=()=>{b&&(()=>{if("undefined"!=typeof document){const t=document.activeElement;(null==t?void 0:t.blur)&&t.blur()}})(),p&&p(f),s=!0},D=()=>{n=!1,o=!1,c=!1,s=!0,S.release()},M=t=>{const e=n,r=s;D(),r&&(u(f,t),e?y&&y(f):X&&X(f))},x=((t,r,n,o,s)=>{let c,i,u,l,d,v,m,p=0;const y=o=>{p=Date.now()+2e3,r(o)&&(!i&&n&&(i=e(t,"touchmove",n,s)),u||(u=e(o.target,"touchend",h,s)),l||(l=e(o.target,"touchcancel",h,s)))},X=o=>{p>Date.now()||r(o)&&(!v&&n&&(v=e(a(t),"mousemove",n,s)),m||(m=e(a(t),"mouseup",Y,s)))},h=t=>{g(),o&&o(t)},Y=t=>{b(),o&&o(t)},g=()=>{i&&i(),u&&u(),l&&l(),i=u=l=void 0},b=()=>{v&&v(),m&&m(),v=m=void 0},f=()=>{g(),b()},_=(r=!0)=>{r?(c||(c=e(t,"touchstart",y,s)),d||(d=e(t,"mousedown",X,s))):(c&&c(),d&&d(),c=d=void 0,f())};return{enable:_,stop:f,destroy:()=>{_(!1),o=n=r=void 0}}})(i.el,(t=>{const e=d(t);return!(o||!s)&&(l(t,f),f.startX=f.currentX,f.startY=f.currentY,f.startTime=f.currentTime=e,f.velocityX=f.velocityY=f.deltaX=f.deltaY=0,f.event=t,(!v||!1!==v(f))&&(S.release(),!!S.start()&&(o=!0,0===Y?w():(_.start(f.startX,f.startY),!0))))}),(t=>{n?!c&&s&&(c=!0,u(f,t),requestAnimationFrame(T)):(u(f,t),_.detect(f.currentX,f.currentY)&&(_.isGesture()&&w()||L()))}),M,{capture:!1,passive:g}),L=()=>{D(),x.stop(),X&&X(f)};return{enable(t=!0){t||(n&&M(void 0),D()),x.enable(t)},destroy(){S.destroy(),x.destroy()}}},u=(t,e)=>{if(!e)return;const r=t.currentX,n=t.currentY,o=t.currentTime;l(e,t);const s=t.currentX,c=t.currentY,a=(t.currentTime=d(e))-o;if(a>0&&a<100){const e=(s-r)/a,o=(c-n)/a;t.velocityX=.7*e+.3*t.velocityX,t.velocityY=.7*o+.3*t.velocityY}t.deltaX=s-t.startX,t.deltaY=c-t.startY,t.event=e},l=(t,e)=>{let r=0,n=0;if(t){const e=t.changedTouches;if(e&&e.length>0){const t=e[0];r=t.clientX,n=t.clientY}else void 0!==t.pageX&&(r=t.pageX,n=t.pageY)}e.currentX=r,e.currentY=n},d=t=>t.timeStamp||Date.now();t("createSwipeBackGesture",((t,e,r,s,c)=>{const a=t.ownerDocument.defaultView;let u=n(t);const l=t=>u?-t.deltaX:t.deltaX;return i({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:r=>(u=n(t),(t=>{const{startX:e}=t;return u?e>=a.innerWidth-50:e<=50})(r)&&e()),onStart:r,onMove:t=>{const e=l(t)/a.innerWidth;s(e)},onEnd:t=>{const e=l(t),r=a.innerWidth,n=e/r,s=(t=>u?-t.velocityX:t.velocityX)(t),i=s>=0&&(s>.2||e>r/2),d=(i?1-n:n)*r;let v=0;if(d>5){const t=d/Math.abs(s);v=Math.min(t,540)}c(i,n<=0?.01:o(0,n,.9999),v)}})}))}}}));
