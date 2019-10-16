document.addEventListener("DOMContentLoaded", function() {
    objectFitImages();

    var dialogEl = document.getElementById('my-accessible-dialog');
    var mainEl = document.getElementById('main');
    var dialog = new window.A11yDialog(dialogEl, mainEl);
    dialog.on('show', function (dialogEl, triggerEl) {
      console.log(dialogEl);
      console.log(triggerEl);
    });

});

jQuery(document).ready(function($){

	// Favorite button
	$('.favorite').on('click', function(event){
		event.preventDefault();

		$(this).toggleClass('enabled');
	});

});

