$(document).ready(function(){var e=new Frontpage,t=new Nextbus,n=new Geocoder;e.init(),t.init("rutgers",function(t){e.write_prediction(t)}),n.init(function(n){t.set_location(n.lat,n.lng,function(t){e.set_title(t.title)})})});var Data=function(){function n(e){console.log(e.val())}function r(){t.config=new Firebase("https://gamma.firebase.com/nextbeezy/rutgers/config"),t.config.once("value",n)}var e={},t={};return e.init=r,e},Frontpage=function(){function t(e){$("h3#title").html(e)}function n(e){times=[];for(var t in e.predictions)times.push(e.predictions[t].minutes);var n=times.shift(),r="label-inverse";n<5&&(r="label-warning"),n<3&&(r="label-important");var i="<td><b>"+e.line.title+'</b><br><span class="direction">'+e.line.direction.title+'</span></td><td><span class="label '+r+'">'+n+" minutes</span><br />"+times.join(", ")+"</td>",s=$("tr."+e.line.tag+"."+e.line.direction.tag);s.is("*")?s.html(i):$("tbody").append('<tr class="'+e.line.tag+" "+e.line.direction.tag+'">'+i+"</tr>")}function r(){}var e={};return e.set_title=t,e.write_prediction=n,e.init=r,e},Geocoder=function(){function r(e,n){t.lat=e,t.lng=n}function i(){return t}function s(e){r(e.coords.latitude,e.coords.longitude),n.success(i())}function o(){n.error()}function u(e,t){n.success=e,n.error=t,navigator.geolocation?navigator.geolocation.getCurrentPosition(s,o):o()}var e={},t={},n={};return e.get_location=i,e.init=u,e},Nextbus=function(){function i(e,t,n,r){var i=6371,s=(n-e)*Math.PI/180,o=(r-t)*Math.PI/180,u=Math.sin(s/2)*Math.sin(s/2)+Math.cos(e*Math.PI/180)*Math.cos(n*Math.PI/180)*Math.sin(o/2)*Math.sin(o/2),a=2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u)),f=i*a;return f}function s(e,n,s){o(function(o){var u=o.stops,a=null,f=null,l=999999999;for(var c in u){var h=0,p=0;for(var d in u[c]){var v=u[c][d].latLng;h+=i(e,n,v.lat,v.lng),p++}var m=h/p;m<l&&(f=u[c],l=m,a=c)}s({title:a,stop:f,distance:l});var g=f;for(var y in g)for(var b in g[y].lines){console.log("registered endpoint",y,b);var w=new Firebase("https://gamma.firebase.com/nextbeezy/"+t+"/predictions/"+b+"/"+y);w.on("value",function(e){var t=e.val();if(t==null)return;console.log(e.ref().path);var n=e.ref().path.k[3],i=e.ref().path.k[2];r({line:g[n].lines[i],predictions:t})})}})}function o(e){var n=new Firebase("https://gamma.firebase.com/nextbeezy/"+t+"/config");n.once("value",function(t){e(t.val())})}function u(e,n){t=e,r=n}var e={},t="",n=null,r=null;return e.set_location=s,e.init=u,e};