var searchResults = document.querySelector('.js-search-results');
var UI = {};
//initialisze
//Search on pres enter
UI.enterPress = function(text,event) {
	if(event.which === 13) {
		searchResults.innerHTML = "";
		SoundCloudApi.getTrack(text.value);
		text.value = "";
	}
};

//Serach on click button
UI.buttonPress = function(text,event){
	searchResults.innerHTML = "";
	SoundCloudApi.getTrack(text.value);
	text.value = "";
};

//adding enter and button press event
var search = document.querySelector('.js-search');
search.addEventListener('keypress',function(){
	UI.enterPress(search,event);

});

var button = document.querySelector('.js-submit');
button.addEventListener('click',function(){
	UI.buttonPress(search,event);
});


var SoundCloudApi = {};

SoundCloudApi.init = (function() {
	SC.initialize({
  	client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
});
})();
// find all sounds of buskers licensed under 'creative commons share alike'
SoundCloudApi.getTrack = function(inputValue) {
	SC.get('/tracks', {
  q: inputValue
}).then(function(tracks) {
  SoundCloudApi.renderTracks(tracks);
});
}
SoundCloudApi.renderTracks = function(tracks) {
	//card
	tracks.forEach(function(track) {
		var card = document.createElement('div');
		card.classList.add('card');
		//img
		var image_div = document.createElement('div');
		image_div.classList.add('image');
		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || 'https://lorempixel.com/100/100/abstract/';
		image_div.appendChild(image_img);

		//content
		var content = document.createElement('div');
		content.classList.add('content');

		//header
		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = `<a href = "#" target = "_blank">` + track.title +  `</a>`;

		//button
		var button = document.createElement('div');
		button.classList.add('ui','bottom','attached','button','js-button');

		var icon = document.createElement('i');
		icon.classList.add('add','icon');

		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add to playlist';

		button.addEventListener('click',function() {
			SoundCloudApi.getEmbed(track.permalink_url);
		});
		//append child
		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);

		card.appendChild(image_div);
		card.appendChild(content);
		card.appendChild(button);

		//attachToDom
		searchResults.appendChild(card);

		})
}
SoundCloudApi.getEmbed = function(input) {
		SC.oEmbed(input, {
			auto_play: true
		}).then(function(embed){
		  console.log('oEmbed response: ', embed);
		  var play = document.querySelector('.js-playlist');
		  var box  = document.createElement('div');
		  box.innerHTML = embed.html;
		  play.insertBefore(box, play.firstChild);
		  localStorage.setItem("key", play.innerHTML);
		});

}
var sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML = localStorage.getItem('key');

// var clear = document.querySelector('.clear');
// clear.addEventListener('click',function(){
// 	console.log("here");
// 	sidebar.innerHTML = "";
// 	localStorage.clear();
// });
