/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */(function(e,t){typeof exports=="object"&&exports?module.exports=t:typeof define=="function"&&define.amd?define(t):e.Mustache=t})(this,function(){function e(e,t){return y.call(e,t)}function t(t){return!e(d,t)}function n(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function r(e){return String(e).replace(/[&<>"'\/]/g,function(e){return E[e]})}function i(e){this.string=e,this.tail=e,this.pos=0}function s(e,t){this.view=e,this.parent=t,this._cache={}}function o(){this.clearCache()}function u(e,t,n,r){var i="",s,o,a;for(var f=0,l=e.length;f<l;++f){s=e[f],o=s[1];switch(s[0]){case"#":a=n.lookup(o);if(typeof a=="object")if(w(a))for(var h=0,p=a.length;h<p;++h)i+=u(s[4],t,n.push(a[h]),r);else a&&(i+=u(s[4],t,n.push(a),r));else if(typeof a=="function"){var d=r==null?null:r.slice(s[3],s[5]);a=a.call(n.view,d,function(e){return t.render(e,n)}),a!=null&&(i+=a)}else a&&(i+=u(s[4],t,n,r));break;case"^":a=n.lookup(o);if(!a||w(a)&&a.length===0)i+=u(s[4],t,n,r);break;case">":a=t.getPartial(o),typeof a=="function"&&(i+=a(n));break;case"&":a=n.lookup(o),a!=null&&(i+=a);break;case"name":a=n.lookup(o),a!=null&&(i+=c.escape(a));break;case"text":i+=o}}return i}function a(e){var t=[],n=t,r=[],i;for(var s=0,o=e.length;s<o;++s){i=e[s];switch(i[0]){case"#":case"^":r.push(i),n.push(i),n=i[4]=[];break;case"/":var u=r.pop();u[5]=i[2],n=r.length>0?r[r.length-1][4]:t;break;default:n.push(i)}}return t}function f(e){var t=[],n,r;for(var i=0,s=e.length;i<s;++i)n=e[i],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(r=n,t.push(n)));return t}function l(e){return[new RegExp(n(e[0])+"\\s*"),new RegExp("\\s*"+n(e[1]))]}var c={};c.name="mustache.js",c.version="0.7.2",c.tags=["{{","}}"],c.Scanner=i,c.Context=s,c.Writer=o;var h=/\s*/,p=/\s+/,d=/\S/,v=/\s*=/,m=/\s*\}/,g=/#|\^|\/|>|\{|&|=|!/,y=RegExp.prototype.test,b=Object.prototype.toString,w=Array.isArray||function(e){return b.call(e)==="[object Array]"},E={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};c.escape=r,i.prototype.eos=function(){return this.tail===""},i.prototype.scan=function(e){var t=this.tail.match(e);return t&&t.index===0?(this.tail=this.tail.substring(t[0].length),this.pos+=t[0].length,t[0]):""},i.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n),this.pos+=n}return t},s.make=function(e){return e instanceof s?e:new s(e)},s.prototype.push=function(e){return new s(e,this)},s.prototype.lookup=function(e){var t=this._cache[e];if(!t){if(e==".")t=this.view;else{var n=this;while(n){if(e.indexOf(".")>0){t=n.view;var r=e.split("."),i=0;while(t&&i<r.length)t=t[r[i++]]}else t=n.view[e];if(t!=null)break;n=n.parent}}this._cache[e]=t}return typeof t=="function"&&(t=t.call(this.view)),t},o.prototype.clearCache=function(){this._cache={},this._partialCache={}},o.prototype.compile=function(e,t){var n=this._cache[e];if(!n){var r=c.parse(e,t);n=this._cache[e]=this.compileTokens(r,e)}return n},o.prototype.compilePartial=function(e,t,n){var r=this.compile(t,n);return this._partialCache[e]=r,r},o.prototype.getPartial=function(e){return!(e in this._partialCache)&&this._loadPartial&&this.compilePartial(e,this._loadPartial(e)),this._partialCache[e]},o.prototype.compileTokens=function(e,t){var n=this;return function(r,i){if(i)if(typeof i=="function")n._loadPartial=i;else for(var o in i)n.compilePartial(o,i[o]);return u(e,n,s.make(r),t)}},o.prototype.render=function(e,t,n){return this.compile(e)(t,n)},c.parse=function(e,r){function s(){if(w&&!E)while(b.length)delete y[b.pop()];else b=[];w=!1,E=!1}e=e||"",r=r||c.tags,typeof r=="string"&&(r=r.split(p));if(r.length!==2)throw new Error("Invalid tags: "+r.join(", "));var o=l(r),u=new i(e),d=[],y=[],b=[],w=!1,E=!1,S,x,T,N,C;while(!u.eos()){S=u.pos,T=u.scanUntil(o[0]);if(T)for(var k=0,L=T.length;k<L;++k)N=T.charAt(k),t(N)?b.push(y.length):E=!0,y.push(["text",N,S,S+1]),S+=1,N=="\n"&&s();if(!u.scan(o[0]))break;w=!0,x=u.scan(g)||"name",u.scan(h),x==="="?(T=u.scanUntil(v),u.scan(v),u.scanUntil(o[1])):x==="{"?(T=u.scanUntil(new RegExp("\\s*"+n("}"+r[1]))),u.scan(m),u.scanUntil(o[1]),x="&"):T=u.scanUntil(o[1]);if(!u.scan(o[1]))throw new Error("Unclosed tag at "+u.pos);C=[x,T,S,u.pos],y.push(C);if(x==="#"||x==="^")d.push(C);else if(x==="/"){if(d.length===0)throw new Error('Unopened section "'+T+'" at '+S);var A=d.pop();if(A[1]!==T)throw new Error('Unclosed section "'+A[1]+'" at '+S)}else if(x==="name"||x==="{"||x==="&")E=!0;else if(x==="="){r=T.split(p);if(r.length!==2)throw new Error("Invalid tags at "+S+": "+r.join(", "));o=l(r)}}var A=d.pop();if(A)throw new Error('Unclosed section "'+A[1]+'" at '+u.pos);return y=f(y),a(y)};var S=new o;return c.clearCache=function(){return S.clearCache()},c.compile=function(e,t){return S.compile(e,t)},c.compilePartial=function(e,t,n){return S.compilePartial(e,t,n)},c.compileTokens=function(e,t){return S.compileTokens(e,t)},c.render=function(e,t,n){return S.render(e,t,n)},c.to_html=function(e,t,n,r){var i=c.render(e,t,n);if(typeof r!="function")return i;r(i)},c}());