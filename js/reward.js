$(document).ready(function() {

	// Reward Event

	let uAg = navigator.userAgent.toLowerCase();
	let isAndroid = uAg.indexOf('android') > -1;
	if (isAndroid) {
		$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
	} else {
		$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1');
	}

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

	$('.reward-best').each(function() {
		if ($(this).find('.swiper-slide').length < 4) {
			$(this).find('.swiper-container').addClass('is-disable');
			$(this).find('.swiper-pagination').addClass('is-disable');
		}
	});

	let rewardSlider = new Swiper('.reward-slider .swiper-container', {
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

	$('.js-select').click(function () {
		$(this).toggleClass('is-active');
		$(this).find('.select-menu').slideToggle(300);
	});
	$('.js-select li').click(function () {
		let selectValue = $(this).data('value');
		$(this).parents('.select').find('.select-field-text').text($(this).text());
		$(this).parents('.select').find('.select-input').val(selectValue);
	});
	$('.js-select-input').keyup(function() {
		$this = $(this);
		$value = $(this).val();
		$this.parents('.select').find('li').each(function() {
			let reg = new RegExp($value, 'i');
			if (!$(this).text().match(reg)) {
				$(this).hide();
				if ($this.parents('.select').find('li:visible').length === 0) {
					$this.parents('.select').removeClass('is-active');
					$this.parents('.select').find('.select-menu').slideUp(300);
				}
			}  else if ($value === '') {
				$(this).hide();
				$this.parents('.select').removeClass('is-active');
				$this.parents('.select').find('.select-menu').slideUp(300);
			} else {
				$(this).show();
				setTimeout(function() {
					$this.parents('.select').addClass('is-active');
					$this.parents('.select').find('.select-menu').slideDown(300);
				}, 100);
			}
		});
	});
	$('.js-select-search li').click(function () {
		let selectValue = $(this).data('value');
		$(this).parents('.select').find('.js-select-input').val($(this).text());
		$(this).parents('.select').find('.select-input').val(selectValue);
		$this.parents('.select').removeClass('is-active')
		$this.parents('.select').find('.select-menu').slideUp(300);
	});
	$(document).bind('mouseup touchend', function(e) {
		if ($(e.target).closest('.js-select').length || $(e.target).closest('.js-select-search').length) return;
		$('.select').removeClass('is-active');
		$('.select').find('.select-menu').slideUp(300);
	});

	//
	
});