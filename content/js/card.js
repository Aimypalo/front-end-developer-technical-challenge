document.addEventListener("DOMContentLoaded", function() {
    objectFitImages();
});

jQuery(document).ready(function($){

	// Favorite button
	$('.favorite').on('click', function(event){
		event.preventDefault();

		$(this).toggleClass('enabled');
	});

});