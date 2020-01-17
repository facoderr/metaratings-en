$(document).ready(function() {

	// Feed Desktop Event

	let scrollbarWidth = $(window).outerWidth() - $(window).innerWidth();
	$('.feed-bar-list').css('margin-right', -scrollbarWidth);

	$(window).resize(function() {
		$('.feed-bar-list').css('margin-right', -scrollbarWidth);
	});

	if ('backdropFilter' in document.documentElement.style === false) {
		$('.feed-anchor').addClass('is-bg');
	}

	$('.feed-bar-list').bind('scroll', function() {
		$('.feed-bar-head').css({'transform': 'translateY(' + '-' + $(this).scrollTop() + 'px' + ')'});
		$('.feed-bar-head').toggleClass('is-active', $(this).scrollTop() >= 1);
		$('.js-feed-totop').toggleClass('is-active', $(this).scrollTop() >= 700);
		if ($(this).scrollTop() + $(this).outerHeight() >= $(this).prop('scrollHeight') - 25) {
			$('.feed-box').clone().appendTo($(this));
		}
	});

	$(document).on('click', '.js-setting', function() {
		$(this).addClass('is-active');
		$('.feed-bar').addClass('is-active');
		$('.feed-setting').addClass('is-open');
	});
	$(document).on('click', '.js-setting-close', function() {
		$('.js-setting').removeClass('is-active');
		$('.feed-bar').removeClass('is-active');
		$('.feed-setting').removeClass('is-open');
	});
	$(document).on('click', '.js-feed-totop', function() {
		let lastScroll = $('.feed-bar-list').scrollTop();
		$('.feed-bar-list').animate({
			scrollTop: 0
		}, 1000);
		$('.js-feed-toback').addClass('is-active').attr('data-scroll', lastScroll);
	});
	$(document).on('click', '.js-feed-toback', function() {
		$('.feed-bar-list').animate({
			scrollTop: $(this).attr('data-scroll')
		}, 1000);
		$(this).removeClass('is-active');
	});

	$('.feed-box-link').each(function() {
		if ($(this).find('.feed-primary-bg').hasClass('feed-primary-bg')) {
			$(this).addClass('feed-primary');
		} else if ($(this).find('.feed-success-bg').hasClass('feed-success-bg')) {
			$(this).addClass('feed-success');
		}
	});
	$('.feed-box-subtitle').each(function() {
		if ($(this).outerHeight() >= 46) {
			$(this).addClass('is-max');
		} else {
			$(this).removeClass('is-max');
		}
	});

	//
	
});