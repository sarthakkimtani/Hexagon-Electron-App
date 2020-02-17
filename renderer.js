// This file is required by the html file and will
// be executed in the renderer process for that window.

const remote = require('electron');
const {ipcRenderer} = require('electron');
const wallpaper = require('wallpaper');
const {saveAs} = require('file-saver');

var result
window.addEventListener('DOMContentLoaded',() => {
	ipcRenderer.send('setupComplete','This is a random string message');
});

function download (url) {
	saveAs(url,'image.jpeg');
}

const setWallpaper = async (url) => {
	await wallpaper.set(url);
}

function pixabay(str) {
	$('.flex-images').empty()
	var API_KEY = '<API_KEY>';
	var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(str);
	$.getJSON(URL, function(data) {
		if (parseInt(data.totalHits) > 0)
    		$.each(data.hits, function(i, hit) {
    				var btn = "<button class='btn btn-primary' id='wall'>Set As Wallpaper</button><button class='btn btn-primary' id='save'><img src='./assets/download.png'</button>"
    			 	result =
    			 	 `<div class="item" data-w="200" data-h="150"><a href="${hit.webformatURL}" data-toggle="lightbox" data-type="image" data-footer="${btn}"><img src="${hit.webformatURL}" class="test-popup-link" id="photos" alt="Error Loading Image"></a></div>`
				$(".flex-images").append(result);
				$('.flex-images').flexImages();
				$("#wall").click(() => {
					setWallpaper(hit.webformatURL)
				});
				$("#save").click(() => {
					download(hit.largeImageURL)
				});
    		});
		else
    		console.log('No hits');
});
}
const form = $(".form-inline md-form mb-4")

$(".form-control").keyup(function(e) {
    pixabay(e.target.value);
});
pixabay('');

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});