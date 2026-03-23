window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel:not(.data-example-carousel)', options);

    bulmaCarousel.attach('.data-example-carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      navigation: true,
      pagination: true
    });

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    function activateLeaderboardQuery($panel, queryTarget) {
      if (!$panel || $panel.length === 0 || !queryTarget) {
        return;
      }

      $panel.find('.leaderboard-subnav-button').removeClass('is-active').attr('aria-selected', 'false');
      $panel.find('.leaderboard-subnav-button[data-query-target="' + queryTarget + '"]').addClass('is-active').attr('aria-selected', 'true');

      $panel.find('.leaderboard-query-panel').removeClass('is-active');
      $panel.find('.leaderboard-query-panel[data-query-panel="' + queryTarget + '"]').addClass('is-active');
    }

    $('.leaderboard-nav-button').on('click', function() {
      var target = $(this).data('leaderboard-target');
      if (!target) {
        return;
      }

      $('.leaderboard-nav-button').removeClass('is-active').attr('aria-selected', 'false');
      $(this).addClass('is-active').attr('aria-selected', 'true');

      $('.leaderboard-panel').removeClass('is-active');
      var $activePanel = $('.leaderboard-panel[data-leaderboard-panel="' + target + '"]');
      $activePanel.addClass('is-active');

      var selectedQuery = $activePanel.find('.leaderboard-subnav-button.is-active').data('query-target') || 'intent';
      activateLeaderboardQuery($activePanel, selectedQuery);
    });

    $('.leaderboard-subnav-button').on('click', function() {
      var queryTarget = $(this).data('query-target');
      if (!queryTarget) {
        return;
      }

      var $panel = $(this).closest('.leaderboard-panel');
      activateLeaderboardQuery($panel, queryTarget);
    });

})
