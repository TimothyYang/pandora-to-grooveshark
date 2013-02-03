//var jq = document.createElement('script');
//jq.src = "http://code.jquery.com/jquery-latest.min.js";
//document.getElementsByTagName('head')[0].appendChild(jq);
//jQuery.noConflict();
//function (a,b){return new e.fn.init(a,b,h)}

var gsButton=document.createElement("div");
var textnode=document.createTextNode("TESTING");
gsButton.appendChild(textnode);
gsButton.setAttribute("style", "margin: 6px 3px 0 3px; float:left;");
gsButton.onclick=function(){console.log("did something")};

var playbackControl=document.getElementById("playbackControl");
var buttondiv = null;
for (var i = 0; i < playbackControl.childNodes.length; i++) {
    if (playbackControl.childNodes[i].className == "buttons") {
      buttondiv = playbackControl.childNodes[i];
      break;
    }        
}
if(buttondiv!=null){
buttondiv.appendChild(gsButton);
}