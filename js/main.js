$(document).ready(function() {

	// Tools Event

	$('.nav-user').clone().prependTo('.head-mobile');
	$('.nav-logo').clone().prependTo('.head-mobile');
	$('.nav-close').clone().prependTo('.head-mobile');
	$(document).on('click', '.js-search', function() {
		$(this).toggleClass('is-active');
		$('.nav-head').toggleClass('is-active');
		$('.nav-search').toggleClass('is-active');
	});
	$(document).on('click', '.js-alert', function() {
		$(this).toggleClass('is-active');
	});
	let uAg = navigator.userAgent.toLowerCase();
	let isAndroid = uAg.indexOf('android') > -1;
	if (isAndroid) {
		$(document).on('click', '.js-search-input', function() {
			setTimeout(function() {
				$('.nav-overflow').animate({
					scrollTop: $('.nav-search').offset().top + $('.nav-search').outerHeight()
				}, 300);
			}, 500);
			setTimeout(function() {
				$('html, body').animate({
					scrollTop: $('html').offset().top
				}, 300);
			}, 500);
		});
	} else {
		$(document).on('click', '.js-toggle-menu', function() {
			if ($(this).hasClass('is-active')) {
				$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
			} else {
				$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1');
			}
		});
		$(document).on('click', '.js-nav-close', function() {
			if ($('.js-toggle-menu').hasClass('is-active')) {
				$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
			} else {
				$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1');
			}
		});
	}
	
	//

	// Responsive Function

	let slinky = $('.nav-wrap').slinky({title: true});

	function inMobile() {
		if (typeof slinky !== 'undefined') {
			slinky.destroy();
		}
		slinky = $('.nav-wrap').slinky({title: true});
		slinky.home();
		$('.nav').removeClass('is-desktop');
		$('.nav-head').removeClass('is-active');
		$('.nav-menu').addClass('is-active');
		$('.nav-menu-more')
			.children('.nav-submenu')
			.children('.nav-menu-item')
			.addClass('nav-menu-clone')
			.appendTo('.nav-menu');
		$(document).on('click', '.js-toggle-menu', function() {
			slinky.home();
			$('.js-toggle-menu').toggleClass('is-active');
			$('.head-mobile').toggleClass('is-active');
			$('.nav').toggleClass('is-open');
			$('.nav-head').removeClass('is-active');
			$('.nav-menu').addClass('is-active');
		});
		$(document).on('click', '.js-next', function() {
			$('.nav-head-back').html('<span class="nav-menu-arrow"><svg><use xlink:href="#arrow"></use></svg></span>');
			$('.nav-submenu').removeClass('is-active');
			$(this).next('ul')
				.addClass('is-active')
				.children('.nav-menu-header')
				.find('.js-title').clone()
				.removeClass('js-title')
				.appendTo('.nav-head-back');
			if ($('.nav-submenu').hasClass('is-active')) {
				$('.nav-head').addClass('is-active');
				$('.nav-menu').removeClass('is-active');
			} else {
				$('.nav-head').removeClass('is-active');
				$('.nav-menu').addClass('is-active');
			}
		});
		$(document).on('click', '.js-prev', function() {
			$('.nav-head-back').html('<span class="nav-menu-arrow"><svg><use xlink:href="#arrow"></use></svg></span>');
			$('.nav-submenu').removeClass('is-active');
			$('.nav-submenu.active')
				.parents('.nav-submenu')
				.addClass('is-active')
				.children('.nav-menu-header')
				.find('.js-title').clone()
				.removeClass('js-title')
				.appendTo('.nav-head-back');
			$('.nav-submenu.active').find('.js-back').trigger('click');
			if ($('.nav-submenu').hasClass('is-active')) {
				$('.nav-head').addClass('is-active');
				$('.nav-menu').removeClass('is-active');
			} else {
				$('.nav-head').removeClass('is-active');
				$('.nav-menu').addClass('is-active');
			}
		});
	}
	function inDesktop() {
		if (typeof slinky !== 'undefined') {
			slinky.destroy();
		}
		$('.nav').addClass('is-desktop');
		$('.nav-submenu').removeAttr('style');
		$('.nav-menu-clone')
			.removeClass('nav-menu-clone')
			.appendTo('.nav-menu-more .nav-submenu');
		$(document).on('mouseover', '.is-desktop .nav-menu-item', function() {
			if ($(this).children('.nav-submenu').length) {
				$('.is-desktop .nav-head').addClass('is-active');
			} else {
				$('.is-desktop .nav-head').removeClass('is-active');
			}
			$('.is-desktop .nav-search').css({
				opacity: 0,
				visibility: 'hidden'
			});
			$(this).siblings('.nav-menu-item').removeClass('is-hover');
			$(this).addClass('is-hover');
		});
		$(document).on('mouseout', '.is-desktop .nav-menu-item', function() {
			if ($('.is-desktop .nav-search').hasClass('is-active')) {
				$('.is-desktop .nav-head').addClass('is-active');
			} else {
				$('.is-desktop .nav-head').removeClass('is-active');
			}
			$('.is-desktop .nav-search').css({
				opacity: 1,
				visibility: 'visible'
			});
			$(this).removeClass('is-hover');
		});
		$(document).bind('mouseup touchend', function(e) {
			if ($(e.target).closest('.js-search').length || $(e.target).closest('.nav-menu').length || $(e.target).closest('.nav-search').length) return;
			$('.js-search').removeClass('is-active');
			$('.is-desktop .nav-head').removeClass('is-active');
			$('.is-desktop .nav-search').removeClass('is-active');
		});
	}

	//

	// Resize Event

	if ($(window).outerWidth() <= 1099) {
		inMobile();
	} else {
		inDesktop();
	}

	setTimeout(function() {
		if ($(window).outerWidth() <= 1099) {
			$('.toolbar').addClass('is-animate');
		} else {
			$('.toolbar').removeClass('is-animate');
		}
	}, 500);

	let width = $(window).outerWidth();
	$(window).resize(function() {
		if ($(this).outerWidth() != width) {
			width = $(this).outerWidth();
			if ($(window).outerWidth() <= 1099) {
				slinky = $('.nav-wrap').slinky({title: true});
				inMobile();
				$('.toolbar').addClass('is-animate');
			} else {
				inDesktop();
				$('.toolbar').removeClass('is-animate');
			}
		}
	});

	//

	// Load Event

	$('.js-logo').fadeOut('slow');
	$('.js-preloader').delay(400).fadeOut('slow');

	//
	
});