"use strict";function hasClass(s,a){return s.classList?s.classList.contains(a):new RegExp("(^| )"+a+"( |$)","gi").test(s.className)}function addClass(s,a){s.classList?s.classList.add(a):s.className+=" "+a}function removeClass(s,a){s.classList?s.classList.remove(a):s.className=s.className.replace(new RegExp("(^|\\b)"+a.split(" ").join("|")+"(\\b|$)","gi")," ")}
"use strict";var sidebar=function(){var d,e="sidebar--active",n="body--backdrop",t="content--sidebar",a=document.getElementById("content"),s=document.body;function i(){hasClass(d,e)?((window.innerWidth<769||hasClass(s,n))&&removeClass(s,n),removeClass(d,e),removeClass(a,t)):(window.innerWidth<769&&addClass(s,n),addClass(d,e),addClass(a,t))}return{init:function(){var e=document.getElementById("header-burger");d=document.getElementById("sidebar"),e.addEventListener("click",function(e){e.preventDefault(),i()});for(var n=document.getElementsByClassName("js-sidebar-control"),t=0;t<n.length;t++){n[t].addEventListener("click",function(e){e.preventDefault(),i()})}}}}();document.addEventListener("DOMContentLoaded",function(){sidebar.init()});