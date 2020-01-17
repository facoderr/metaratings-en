$(document).ready(function() {

	// ToBack Event

	function toBack() {
		let windowWidth = $(window).innerWidth();
				containerWidth = $('.container').width();
				emptyWidth = (windowWidth - containerWidth) / 2;

		if ($(window).outerWidth() <= 1259) {
			$('.toback').css('width', emptyWidth);
		} else if ($(window).outerWidth() <= 1499) {
			$('.toback').css('width', 140);
		} else {
			$('.toback').css('width', emptyWidth);
		}
	}

	toBack();

	$(window).resize(function() {
		toBack();
	});
	$(window).bind('scroll', function() {
		if ($(this).scrollTop() > 100) {
			$('.toback').addClass('js-toback is-active');
		} else {
			$('.toback').removeClass('js-toback is-active');
		}
	});

	$(document).on('click', '.js-toback', function(e) {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});

	//

	// Forecast Event

	let forecastBest = new Swiper('.forecast-best .swiper-container', {
		slidesPerView: 'auto',
		freeMode: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		breakpointsInverse: true,
		breakpoints: {
			992: {
				slidesPerView: 3,
				spaceBetween: 16,
				freeMode: false
			},
		}
	});

	$('.forecast-best').each(function() {
		if ($(this).find('.swiper-slide').length < 4) {
			$(this).find('.swiper-container').addClass('is-disable');
			$(this).find('.swiper-pagination').addClass('is-disable');
		}
	});

	let forecastSlider = new Swiper('.forecast-slider .swiper-container', {
		slidesPerView: 'auto',
		freeMode: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpointsInverse: true,
		breakpoints: {
			992: {
				slidesPerView: 3,
				spaceBetween: 16,
				freeMode: false
			},
		}
	});

	$(document).on('click', '.js-forecast-toggle', function() {
		$(this).toggleClass('is-active');
		$('.forecast-menu').slideToggle(300);
	});

	//
	
});