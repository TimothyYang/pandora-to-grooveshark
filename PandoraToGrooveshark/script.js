//var jq = document.createElement('script');
//jq.src = "http://code.jquery.com/jquery-latest.min.js";
//document.getElementsByTagName('head')[0].appendChild(jq);
//jQuery.noConflict();
//function (a,b){return new e.fn.init(a,b,h)}

var gsButton=document.createElement("div");
var textnode=document.createTextNode("TESTING");
gsButton.appendChild(textnode);
gsButton.setAttribute("style", "margin: 6px 3px 0 3px; float:left;");
gsButton.onclick=function(){
	console.log("did something");
	addSong();
	console.log("lololol");
};
var imgurl = chrome.extension.getURL('btn_skip.png');
console.log(imgurl);
//gsButton.style.setAttribute("background", imgurl);
var image = document.createElement("img");
image.src=imgurl;

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
buttondiv.appendChild(image);
}

function addSong(){
	// Get song information from Pandora HTML.
	var songTitle = document.getElementsByClassName("songTitle")[0].innerHTML;
	var artistSummary = document.getElementsByClassName("artistSummary")[0].innerHTML;
	var albumTitle = document.getElementsByClassName("albumTitle")[0].innerHTML;

	// Get user login information.
	var login = prompt("Grooveshark Login?");
	var password = prompt("Grooveshark Password?");

	// Authenticate (login) user.
	// TODO: Do this only once at the setup of extension? or upon clicking on button
	authenticate(login, password);

	// Search for song on Grooveshark.
	var query = songTitle+" "+artistSummary+" "+albumTitle;
	var country = getCountry();
	var search = getSongSearchResults(query, country);

	// If no results, try searching without album.
	if(search.length <= 0){
		query = songTitle+" "+artistSummary;
		search = getSongSearchResults(query, country);
	}

	// Add first song result to user library
	var song = search["result"]["songs"][1];
	var SongID = song["SongID"];
	var AlbumID = song["AlbumID"];
	var ArtistID = song["ArtistID"];
	addUserLibrarySongs(SongID, AlbumID, ArtistID); // TODO: Maybe need session ID as a parameter?
}

function undoAddSong(){
	
}

