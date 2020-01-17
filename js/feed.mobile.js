$(document).ready(function() {

	// Feed Mobile Event

	$(document).bind('scroll', function() {
		$('.js-feed-totop').toggleClass('is-active', $(this).scrollTop() >= 1000);
		if ($(this).scrollTop() + $(window).height() >= $(this).height() - 25) {
			$('.feed-tabBlock.is-open .feed-box').first().clone().appendTo($('.feed-tabBlock.is-open'));
		}
		if ($(this).scrollTop() > 100) {
			$('.feed-toback').addClass('is-active');
		} else {
			$('.feed-toback').removeClass('is-active');
		}
	});

	let feedEvent = new Swiper('.feed-event .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		freeMode: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	});
	
	let feedTopic = new Swiper('.feed-topic .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 15
	});

	$(document).on('click', '.js-daily-btn', function() {
		$(this).toggleClass('is-active');
		if ($(this).hasClass('is-active')) {
			$('.js-daily-body').slideUp(300).css('opacity', 0);
		} else {
			$('.js-daily-body').slideDown(300).css('opacity', 1);
		}
		setTimeout(function() {
			let tabWrapper = $('.js-tabWrap');
					activeTab = tabWrapper.find('.is-open');
					activeTabHeight = activeTab.outerHeight();
			tabWrapper.css('min-height', activeTabHeight);
		}, 300);
	});
	$(document).on('click', '.js-daily-more', function() {
		setTimeout(function() {
			let tabWrapper = $('.js-tabWrap');
					activeTab = tabWrapper.find('.is-open');
					activeTabHeight = activeTab.outerHeight();
			tabWrapper.css('min-height', activeTabHeight);
		}, 300);
	});
	$(document).on('click', '.js-feed-totop', function() {
		let lastScroll = $(document).scrollTop();
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
		$('.js-feed-toback').addClass('is-active').attr('data-scroll', lastScroll);
	});
	$(document).on('click', '.js-feed-toback', function() {
		$('html, body').animate({
			scrollTop: $(this).attr('data-scroll')
		}, 1000);
		$(this).removeClass('is-active');
	});

	//
	
});