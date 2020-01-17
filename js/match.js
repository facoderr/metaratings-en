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

	// Tab Event

	let clickedTab = $('.js-tabItem.is-select');
			tabWrapper = $('.js-tabWrap');
			activeTab = tabWrapper.find('.js-tabBlock.is-open');
			activeTabHeight = activeTab.outerHeight();
	tabWrapper.css('min-height', activeTabHeight);
	function tabInit() {
		clickedTab = $('.js-tabItem.is-select');
		activeTab.fadeOut(100, function() {
			$('.js-tabBlock').removeClass('is-open');
			let clickedTabIndex = clickedTab.index('.js-tabItem');
			$('.js-tabBlock').eq(clickedTabIndex).addClass('is-open');
			activeTab = tabWrapper.find('.is-open');
			activeTabHeight = activeTab.outerHeight();
			tabWrapper.stop().delay(25).animate({
				'min-height': activeTabHeight
			}, 50, function() {
				activeTab.delay(25).fadeIn(100);
			});
		});
	}
	$('.js-tabList').on('click', '.js-tabItem', function() {
		$('.js-tabItem').removeClass('is-select');
		$(this).addClass('is-select');
		tabInit();
	});

	$('.js-tabMain').each(function() {
		let $tabMain = $(this);
		$tabMain.find('.js-tabMain-list').on('click', '.js-tabMain-item', function() {
			let $tabItem = $(this);

			$tabMain.find('.js-tabMain-item').removeClass('is-select');
			$tabItem.addClass('is-select');

			let clickedTab = $tabItem
					clickedTabIndex = clickedTab.index();
 
			$tabMain.find('.js-tabMain-block.is-open').hide();
			$tabMain.find('.js-tabMain-block').removeClass('is-open');
			
			$tabMain.find('.js-tabMain-block').eq(clickedTabIndex).show().addClass('is-open');
		});
	});

	$('.js-tabInner').each(function() {
		let $tabInner = $(this);
		$tabInner.find('.js-tabInner-list').on('click', '.js-tabInner-item', function() {
			let $tabItem = $(this);

			$tabInner.find('.js-tabInner-item').removeClass('is-select');
			$tabItem.addClass('is-select');

			let clickedTab = $tabItem
					clickedTabIndex = clickedTab.index();
 
			$tabInner.find('.js-tabInner-block.is-open').hide();
			$tabInner.find('.js-tabInner-block').removeClass('is-open');
			
			$tabInner.find('.js-tabInner-block').eq(clickedTabIndex).show().addClass('is-open');
		});
	});

	//

	/// Match Event ///

	// -- Match Slider

	let matchBest = new Swiper('.match-best .swiper-container', {
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
	let matchArticle = new Swiper('.match-article .swiper-container', {
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
				freeMode: false,
				pagination: false
			},
		}
	});
	let rewardBest = new Swiper('.reward-best .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 10,
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
			375: {
				spaceBetween: 15
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 16
			}
		}
	});

	// -- Match Search

	$('.js-match-search').keyup(function() {
		if ($(window).outerWidth() <= 1099) {
			$('html, body').animate({
				scrollTop: $(this).offset().top - 15
			}, 300);
		} else {
			$('html, body').animate({
				scrollTop: $(this).offset().top - 80
			}, 300);
		}
		if ($(this).val().length > 3) {
			$('.match-search').addClass('is-active');
		} else {
			$('.match-search').removeClass('is-active');
		}
	});

	$(document).bind('mouseup', function(e) {
		if ($(e.target).closest('.match-search-block').length) return;
		$('.match-search').removeClass('is-active');
	});

	$(document).bind('touchmove', function() {
		$('.js-match-search').blur();
	});

	// -- Match Interaction

	$('.js-match-item').swipe({
		swipeStatus: function(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
			let $this = $(this);
			if (phase == 'end') {
				if (direction == 'left') {
					$this.addClass('is-swipe is-swiping');
					setTimeout(function() {
						$this.removeClass('is-swiping');
					}, 300);
				}
				if (direction == 'right') {
					$this.addClass('is-swiping');
					$this.removeClass('is-swipe');
					setTimeout(function() {
						$this.removeClass('is-swiping');
					}, 300);
				}
			}
		},
		triggerOnTouchEnd: false,
		threshold: 20
	});

	if ($('.js-match-search').length != 0) {
		$(window).bind('scroll',  function() {
			if ($(this).scrollTop() >= $('.js-match-search').offset().top) {
				$('.match-block').first().find('.match-acc').first().find('.js-match-item').first().addClass('is-swipe');
				$(this).off('scroll');
			}
		});
	}

	$(document).on('click', '.js-match-toggle', function() {
		$(this).toggleClass('is-close');
		$(this).parent().find('.js-match-body').slideToggle(300);
		setTimeout(function() {
			let tabWrapper = $('.js-tabWrap');
					activeTab = tabWrapper.find('.is-open');
					activeTabHeight = activeTab.outerHeight();
			tabWrapper.animate({
				'min-height': activeTabHeight
			}, 300);
		}, 300);
	});

	$(document).on('click', '.js-matchList-toggle', function() {
		if ($(window).outerWidth() <= 991) {
			$(this).toggleClass('is-close');
			$(this).parent().find('.js-matchList-body').slideToggle(300);
			setTimeout(function() {
				let tabWrapper = $('.js-tabWrap');
				activeTab = tabWrapper.find('.is-open');
				activeTabHeight = activeTab.outerHeight();
				tabWrapper.animate({
					'min-height': activeTabHeight
				}, 300);
			}, 300);
		} else {
			return false;
		}
	});

	$('.js-match-info').clone().appendTo('.match-head');

	$(document).on('click', '.js-match-full', function() {
		$(this).slideUp(300);
		$(this).parent().find('.match-comment-text').css('max-height', '300px');
	});

	///
	
});