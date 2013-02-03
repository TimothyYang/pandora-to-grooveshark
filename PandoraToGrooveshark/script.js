

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

