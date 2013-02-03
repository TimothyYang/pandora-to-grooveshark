
// Hashing for making API signatures
var md5 = document.createElement("script");
md5.type = "text/javascript";
md5.src = "md5.js";

//var jq = document.createElement('script');
//jq.src = "http://code.jquery.com/jquery-latest.min.js";
//document.getElementsByTagName('head')[0].appendChild(jq);
//jQuery.noConflict();
//function (a,b){return new e.fn.init(a,b,h)}

// Set up API variables
var sig;
var secret = "secret";
var key = "timyangmit";
var message = {
	"method":[], 
	"parameters":{}, 
	"header":{}
};
message["header"]["wsKey"] = key;


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

// Clear the message JSON variable.
function clearMessage(){
	message = {
		"method":[], 
		"parameters":{}, 
		"header":{}
	};
	message["header"]["wsKey"] = key;
}

// Submit POST request to Grooveshark API using sig.
function postURL(sig) {
	var path = "http://api.grooveshark.com/ws3.php?sig=";

    var form = document.createElement("form");
    form.setAttribute("method", method);

    path = path+sig;
    form.setAttribute("action", path);

    document.body.appendChild(form);
    form.submit();
}

function addSong(){
	// Get song information from Pandora HTML.
	var songTitle = document.getElementsByClassName("songTitle")[0].innerHTML;
	var artistSummary = document.getElementsByClassName("artistSummary")[0].innerHTML;
	var albumTitle = document.getElementsByClassName("albumTitle")[0].innerHTML;

	// Get user login information.
	var login = prompt("Grooveshark Login?");
	var password = prompt("Grooveshark Password?");
	message["method"] = "startSession";
	sig = HmacMD5(message, secret);
	var sessionID = postURL(sig);
	clearMessage();

	// Authenticate (login) user.
	// TODO: Do this only once at the setup of extension? or upon clicking on button
	//authenticate(login, password);
	message["method"] = "authenticate";
	message["parameters"]["login"] = login;
	message["parameters"]["password"] = password;
	sig = HmacMD5(message, secret);
	postURL(sig);
	clearMessage();

	// Search for song on Grooveshark.
	var query = songTitle+" "+artistSummary+" "+albumTitle;
	var country = getCountry();
	message["method"] = "getSongSearchResults";
	message["parameters"]["query"] = query;
	message["parameters"]["country"] = country;
	sig = HmacMD5(message, secret);	
	var search = postURL(sig);
	clearMessage();

	// If no results, try searching without album.
	if(search.length <= 0){
		query = songTitle+" "+artistSummary;
		search = getSongSearchResults(query, country);
		message["method"] = "getSongSearchResults";
		message["parameters"]["query"] = query;
		message["parameters"]["country"] = country;
		sig = HmacMD5(message, secret);	
		search = postURL(sig);
		clearMessage();

	}

	// Add first song result to user library
	var song = search["result"]["songs"][1];
	var SongID = song["SongID"];
	var AlbumID = song["AlbumID"];
	var ArtistID = song["ArtistID"];
	message["method"] = "addUserLibrarySongs";
	message["parameters"]["SongID"] = SongID;
	message["parameters"]["AlbumID"] = AlbumID;
	message["parameters"]["ArtistID"] = ArtistID;
	message["headers"]["sessionID"] = sessionID;
	sig = HmacMD5(message, secret);	
	postURL(sig);
	clearMessage();

}

function undoAddSong(){
	
}

