$(document).ready(function() {

	// Sentiment Event

	let uAg = navigator.userAgent.toLowerCase();
	let isAndroid = uAg.indexOf('android') > -1;
	if (isAndroid) {
		$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
	} else {
		$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1');
	}

	$('.widget-calendar').clone().appendTo('.widget-head');
	$('.js-calendar').datepicker({
		language: {
			monthsShort: ['янв.','фев.','мар.','апр.','май','июн.','июл.','авг.','сен.','окт.','ноя.','дек.']
		},
		dateFormat: 'dd M',
		range: true,
		maxDate: new Date(),
		todayButton: new Date(),
		autoClose: true,
		onSelect: function(formattedDate, date, inst) {
			let today = new Date();
			if (today.getDate() === date[0].getDate() && today.getMonth() === date[0].getMonth() && today.getFullYear() === date[0].getFullYear()) {
				$('.js-calendar').val('Сегодня ' + formattedDate);
			} else if (date.length == 1) {
				$('.js-calendar').val(date[0].getDate() + ' ' + date[0].toLocaleString('ru', {month: 'long'}));
			} else {
				minMonth = $('.js-calendar').data('datepicker').minRange.getMonth();
				maxMonth = $('.js-calendar').data('datepicker').maxRange.getMonth();
				minMonthName = $('.js-calendar').data('datepicker').loc.monthsShort[minMonth];
				maxMonthName = $('.js-calendar').data('datepicker').loc.monthsShort[maxMonth];
				$('.js-calendar').val(date[0].getDate() + ' ' + minMonthName + ' - ' + date[1].getDate() + ' ' + maxMonthName);
			}
		}
	});
	$('.js-calendar').data('datepicker').selectDate(new Date());

	$('.js-widget-input').keyup(function() {
		$this = $(this);
		$value = $(this).val();
		$this.parent().find('li').each(function() {
			let reg = new RegExp($value, 'i');
			if (!$(this).text().match(reg)) {
				$(this).hide();
				if ($this.parent().find('li:visible').length === 0) {
					$this.parent().removeClass('is-active');
					$this.parent().find('.js-widget-result').slideUp(300);
				}
			} else if ($value === '') {
				$(this).hide();
				$this.parent().removeClass('is-active');
				$this.parent().find('.js-widget-result').slideUp(300);
			} else {
				$(this).show();
				setTimeout(function() {
					$this.parent().addClass('is-active');
					$this.parent().find('.js-widget-result').slideDown(300);
				}, 100);
			}
		});
	});
	$(document).bind('mouseup touchend', function(e) {
		if ($(e.target).closest('.js-widget-input').length || $(e.target).closest('.js-widget-result').length) return;
		$('.js-widget-result').removeClass('is-active');
		$('.js-widget-result').slideUp(300);
	});

	$(document).on('click', '.js-bk-search', function () {
		$('.widget-bk-list').toggleClass('is-active');
		$('.js-widget-input').toggleClass('is-active');
	});
	$(document).on('click', '.js-resource', function () {
		if ($(this).is(':first-child')) {
			$(this).parent().find('.js-resource').find('input').prop('checked', false);
			$(this).parent().find('.js-resource').first().find('input').prop('checked', true);
		} else {
			$(this).parent().find('.js-resource').first().find('input').prop('checked', false);
		}
		$('.js-resource').each(function () {
			if ($(this).find('input').is(':checked')) {
				$(this).addClass('is-checked');
			} else {
				$(this).removeClass('is-checked');
			}
		});
		if ($(this).parent().find('.js-resource:not(:first-child).is-checked').length === 0) {
			$(this).parent().find('.js-resource').first().find('input').prop('checked', true);
		} else {
			$(this).parent().find('.js-resource').first().find('input').prop('checked', false);
		}
		$('.js-resource').each(function () {
			if ($(this).find('input').is(':checked')) {
				$(this).addClass('is-checked');
			} else {
				$(this).removeClass('is-checked');
			}
		});
	});
	$(document).on('click', '.js-resource-more', function() {
		$('.js-widget-modal').fadeIn().addClass('is-open');
	});
	$(document).on('click', '.js-widget-modal-close', function() {
		$('.js-widget-modal').fadeOut().removeClass('is-open');
	})
	$(document).bind('mouseup', function(e) {
		if ($(e.target).closest('.widget-modal-wrap').length) return;
		$('.js-widget-modal').fadeOut().removeClass('is-open');
	});
	$(document).on('click', '.js-graph-btn', function() {
		$(this).toggleClass('is-active');
		if ($(this).hasClass('is-active')) {
			$(this).parent().parent().find('.js-graph-list').slideUp(300).css('opacity', 0);
		} else {
			$(this).parent().parent().find('.js-graph-list').slideDown(300).css('opacity', 1);
		}
	});
	$(document).on('click', '.js-review-full', function() {
		$(this).slideUp(300);
		$(this).parent().find('.widget-review-text').css('max-height', '500px');
	});

	// Hightlight Text

	jQuery.fn.highlight = function (str, index, className, classGap,) {
		var regex = new RegExp(str, 'gi');
		return this.each(function () {
			$(this).contents().filter(function() {
				return this.nodeType == 3 && regex.test(this.nodeValue);
			}).replaceWith(function() {
				return (this.nodeValue || "").replace(regex, function(match) {
					return '<span class="' + className + '" data-series="' + index + '"><span class="' + classGap + '"></span>' + match + '</span>';
				});
			});
		});
	};

	// Sentiment Chart

	let sentimentChart = Highcharts.chart('js-sentiment', {

		// Global Options

		chart: {
			type: 'bubble',
			plotBorderWidth: 1,
			plotBorderColor:'#e2e2e2',
			style: {
				'fontFamily': 'Helvetica Neue, Helvetica, Arial, sans-serif'
			},
			zoomType: 'xy',
			margin: [1, 1, null, 14],
			events: {
				load: function(e) {
					let minVal = Math.abs(this.axes[1].min);
							maxVal = Math.abs(this.axes[1].max);
							if (this.axes[1].min > 0 && this.axes[1].max > 0) {
								minVal = 0
							} else if (this.axes[1].min < 0 && this.axes[1].max < 0) {
								maxVal = 0
							}
							totalVal = minVal + maxVal;
							minHalf = (minVal * 100) / totalVal;
							maxHalf = (maxVal * 100) / totalVal;
					if (minHalf < maxHalf) {
						$('.js-sentiment-indicator').css({
							background: 'linear-gradient(to top, #d0021b 0%, #39af61 ' + minHalf + '%)' 
						});
					} else if (minHalf > maxHalf) {
						$('.js-sentiment-indicator').css({
							background: 'linear-gradient(to top, #d0021b ' + minHalf + '%, #39af61 100%)' 
						});
					} else {
						$('.js-sentiment-indicator').css({
							background: 'linear-gradient(to top, #d0021b 0%, #39af61 100%)' 
						});
					}
				},
				drilldown: function() {
					$('.widget-graph-item').each(function() {
						if ($(this).hasClass('is-hover')) {
							let seriesVal = $(this).data('series');
									className = sentimentChart.series[seriesVal].data[0].drilldown;
							//$('.widget-review-item').hide();
							$('.' + className).show();
						}
					});
					setTimeout(function() {
						sentimentChart.update({chart: {zoomType: ''}})
						$('.js-graph-list').html('');
						$(sentimentChart.series[0].data).each(function(i, data) {
							if (data.y >= 0) {
								$($.parseHTML('<a href="javascript:void(0);" class="widget-graph-item js-graph-item" data-series="' + i + '">' + data.name + ' <span>(' + data.z + ')</span></a>')).appendTo('.widget-graph-yes .js-graph-list');
							} else {
								$($.parseHTML('<a href="javascript:void(0);" class="widget-graph-item js-graph-item" data-series="' + i + '">' + data.name + ' <span>(' + data.z + ')</span></a>')).appendTo('.widget-graph-no .js-graph-list');
							}
							setTimeout(function() {
								if ($('.widget-graph-yes .js-graph-list').children().length === 0) {
									$('.widget-graph-yes').slideUp(300);
									$('.widget-review-yes').slideUp(300);
								} else if ($('.widget-graph-no .js-graph-list').children().length === 0) {
									$('.widget-graph-no').slideUp(300);
									$('.widget-review-no').slideUp(300);
								}
							}, 1);
							$('.widget-review-highlight').find('.js-review-gap').unwrap();
							$('.js-review-gap').remove();
							setTimeout(function() {
								$('.widget-review-text').highlight(data.name, i, 'widget-review-highlight '+ data.class +'', 'js-review-gap');
							}, 1);
						});
						$('.widget-sentiment-title').hide();
						$('.js-sentiment-back').css('display', 'flex');
						$('.widget-sentiment-subtitle').html('Подсентименты тега ' + sentimentChart.drilldownLevels[0].pointOptions.name).show();
					}, 1);
				},
				drillup: function() {
					setTimeout(function() {
						sentimentChart.update({chart: {zoomType: 'xy'}})
						$('.js-graph-list').html('');
						setTimeout(function() {
							if ($('.widget-graph-yes .js-graph-list').children().length === 0) {
								$('.widget-graph-yes').slideUp(300);
								$('.widget-review-yes').slideUp(300);
							} else if ($('.widget-graph-no .js-graph-list').children().length === 0) {
								$('.widget-graph-no').slideUp(300);
								$('.widget-review-no').slideUp(300);
							}  else {
								$('.widget-graph-tag').slideDown(300);
								$('.widget-review-item').slideDown(300);
							}
						}, 1);
						$(sentimentChart.series).each(function(i, serie) {
							if (serie.yData[0] >= 0) {
								$($.parseHTML('<a href="javascript:void(0);" class="widget-graph-item js-graph-item" data-series="' + i + '">' + serie.data[0].name + ' <span>(' + serie.zData[0] + ')</span></a>')).appendTo('.widget-graph-yes .js-graph-list');
							} else {
								$($.parseHTML('<a href="javascript:void(0);" class="widget-graph-item js-graph-item" data-series="' + i + '">' + serie.data[0].name + ' <span>(' + serie.zData[0] + ')</span></a>')).appendTo('.widget-graph-no .js-graph-list');
							}
							$('.widget-review-highlight').find('.js-review-gap').unwrap();
							$('.js-review-gap').remove();
							setTimeout(function() {
								$('.widget-review-text').highlight(serie.data[0].name, i, 'widget-review-highlight '+ serie.data[0].drilldown +'', 'js-review-gap');
							}, 1);
						});
						$('.widget-sentiment-title').show();
						$('.js-sentiment-back').hide();
						$('.widget-sentiment-subtitle').hide();
					}, 1);
				}
			}
		},

		// Disabled Chart title, tooltip, legend

		title: {text: null}, tooltip: {enabled: false}, legend: {enabled: false},

		// Horizontal Coordinates

		xAxis: {
			title: {
				enabled: false
			},
			startOnTick: true,
			endOnTick: true,
			gridLineWidth: 1,
			gridLineColor: '#e2e2e2',
			gridLineDashStyle: 'ShortDash',
			tickColor: '#e2e2e2',
			tickLength: 15,
			tickPixelInterval: 100,
			showLastLabel: false,
			labels: {
				y: 30,
				style: {
					color: '#777777',
					fontSize: '10px'
				}
			}
		},

		// Vertical Coordinates

		yAxis: {
			title: {
				enabled: false
			},
			gridLineWidth: 1,
			gridLineColor:'#e2e2e2',
			plotLines: [{
				color: '#e2e2e2',
				width: 2,
				value: 0,
				zIndex: 3
			}],
			labels: {
				enabled: false
			},
			events: {
				afterSetExtremes: function(e) {
					let minVal = Math.abs(e.min);
							maxVal = Math.abs(e.max);
					if (e.min > 0 && e.max > 0) {
						minVal = 0
					} else if (e.min < 0 && e.max < 0) {
						maxVal = 0
					}
							totalVal = minVal + maxVal;
							minHalf = (minVal * 100) / totalVal;
							maxHalf = (maxVal * 100) / totalVal;
					if (minHalf < maxHalf) {
						$('.js-sentiment-indicator').css({
							background: 'linear-gradient(to top, #d0021b 0%, #39af61 ' + minHalf + '%)' 
						});
					} else if (minHalf > maxHalf) {
						$('.js-sentiment-indicator').css({
							background: 'linear-gradient(to top, #d0021b ' + minHalf + '%, #39af61 100%)' 
						});
					} else {
						$('.js-sentiment-indicator').css({
							background: 'linear-gradient(to top, #d0021b 0%, #39af61 100%)' 
						});
					}
				}
			}
		},

		// Sentiment Options

		plotOptions: {
			bubble: {
				minSize: 0,
				maxSize: '10%',
				zMin: 0,
				zMax: null,
				animation: {
					duration: 500
				}
			},
			series: {
				stickyTracking: false,
				zoneAxis: 'y',
				zones: [{
					value: 0,
					className: 'zone-no',
				}, {
					className: 'zone-yes'
				}],
				states: {
					inactive: {
						opacity: 1
					}
				},
				marker: {
					fillOpacity: 1,
					lineWidth: 2,
					states: {
						hover: {
							enabled: false
						}
					}
				},
				dataLabels: {
					enabled: true,
					//allowOverlap: true,
					useHTML: true,
					formatter: function() {
						if ($(window).outerWidth() <= 1099) {
							return '<span style="position:relative;bottom:-' + (this.point.marker.radius + 9) + 'px;">' + this.point.name + '</span>';
						} else {
							return '<span style="position:relative;bottom:-' + (this.point.marker.radius + 16) + 'px;">' + this.point.name + '</span>';
						}
					},
					style: {
						fontSize: '8px',
						color: '#000000',
						textOutline: 'none'
					}
				},
				events: {
					mouseOver: function() {
						setTimeout(function() {
							if (sentimentChart.drillUpButton === undefined) {
								$(sentimentChart.series).each(function(i, serie) {
									if ($('.highcharts-series-' + i).hasClass('highcharts-series-hover')) {
										let className = serie.data[0].drilldown;
										$('.js-graph-item[data-series=' + i + ']').addClass('is-hover');
										$('.widget-review-highlight').addClass('is-disable');
										$('.widget-review-highlight.'+ className).removeClass('is-disable');
									} else {
										let className = serie.data[0].drilldown;
										$('.js-graph-item[data-series=' + i + ']').removeClass('is-hover');
										$('.widget-review-highlight.'+ className).addClass('is-disable');
									}
								});
							} else {
								return false;
							}
						}, 1);
					},
					mouseOut: function() {
						setTimeout(function() {
							if (sentimentChart.drillUpButton === undefined) {
								$('.js-graph-item').removeClass('is-hover');
								$('.widget-review-highlight').removeClass('is-disable');
							} else {
								return false;
							}
						}, 1);
					}
				}
			}
		},

		// Main Series Data

		series: [
			{
				data: [
					{name: 'Линия', x: 14, y: 12, z: 14, drilldown: 'Like-1'}
				]
			},
			{
				data: [
					{name: 'Коэффициент', x: 17, y: 5, z: 17, drilldown: 'Like-2'}
				]
			},
			{
				data: [
					{name: 'Веб-сайт', x: 19, y: 17, z: 19, drilldown: 'Like-3'}
				]
			},
			{
				data: [
					{name: 'ППС', x: 27, y: 6, z: 27, drilldown: 'Like-4'}
				]
			},
			{
				data: [
					{name: 'Ставки', x: 32, y: 14, z: 32, drilldown: 'Like-5'}
				]
			},
			{
				data: [
					{name: 'Выплаты', x: 34, y: 6, z: 34, drilldown: 'Like-6'}
				]
			},
			{
				data: [
					{name: 'Моб. приложение', x: 44, y: 11, z: 44, drilldown: 'Like-7'}
				]
			},
			{
				data: [
					{name: 'Бонусы', x: 13, y: -10, z: 13, drilldown: 'Dislike-1'}
				]
			},
			{
				data: [
					{name: 'Регистрация', x: 19, y: -6, z: 19, drilldown: 'Dislike-2'}
				]
			},
			{
				data: [
					{name: 'Верификация', x: 23, y: -14, z: 23, drilldown: 'Dislike-3'}
				]
			},
			{
				data: [
					{name: 'Поддержка', x: 29, y: -8, z: 29, drilldown: 'Dislike-4'}
				]
			},
			{
				data: [
					{name: 'Баланс', x: 36, y: -6, z: 36, drilldown: 'Dislike-5'}
				]
			},
			{
				data: [
					{name: 'нет РПЛ', x: 40, y: -12, z: 40, drilldown: 'Dislike-6'}
				]
			},
			{
				data: [
					{name: 'cash out', x: 45, y: -5, z: 45, drilldown: 'Dislike-7'}
				]
			}
		],

		// Drilldown Series Data

		drilldown: {
			activeDataLabelStyle: {
				color: '#000000',
				textDecoration: 'none'
			},
			activeAxisLabelStyle: {
				color: '#777777',
				textDecoration: 'none'
			},
			drillUpButton: {
				theme: {
					display: 'none'
				}
			},
			series: [
				{
					id: 'Like-1',
					data: [
						{name: 'Кешбек', x: 13, y: 17, z: 13, class: 'Like-1'},
						{name: 'Обкат', x: 16, y: -3, z: 16, class: 'Like-2'},
						{name: 'Фрибет', x: 17, y: -15, z: 17, class: 'Like-3'},
						{name: 'Первый депозит', x: 23, y: 6, z: 23, class: 'Like-4'},
						{name: 'Приведи друга', x: 26, y: 16, z: 26, class: 'Like-5'},
						{name: 'Экспресс дня', x: 33, y: 8, z: 33, class: 'Like-6'},
						{name: 'Подарки', x: 37, y: 14, z: 37, class: 'Like-7'},
						{name: 'Страховка', x: 42, y: 5, z: 42, class: 'Like-8'},
						{name: 'Акции', x: 46, y: -10, z: 46, class: 'Like-9'}
					]
				},
				{
					id: 'Like-2',
					data: [
						{name: 'Кешбек', x: 13, y: 17, z: 13, class: 'Like-1'},
						{name: 'Обкат', x: 16, y: -3, z: 16, class: 'Like-2'},
						{name: 'Фрибет', x: 17, y: -15, z: 17, class: 'Like-3'},
						{name: 'Первый депозит', x: 23, y: 6, z: 23, class: 'Like-4'},
						{name: 'Приведи друга', x: 26, y: 16, z: 26, class: 'Like-5'},
						{name: 'Экспресс дня', x: 33, y: 8, z: 33, class: 'Like-6'},
						{name: 'Подарки', x: 37, y: 14, z: 37, class: 'Like-7'},
						{name: 'Страховка', x: 42, y: 5, z: 42, class: 'Like-8'},
						{name: 'Акции', x: 46, y: -10, z: 46, class: 'Like-9'}
					]
				},
				{
					id: 'Like-3',
					data: [
						{name: 'Кешбек', x: 13, y: 17, z: 13, class: 'Like-1'},
						{name: 'Обкат', x: 16, y: -3, z: 16, class: 'Like-2'},
						{name: 'Фрибет', x: 17, y: -15, z: 17, class: 'Like-3'},
						{name: 'Первый депозит', x: 23, y: 6, z: 23, class: 'Like-4'},
						{name: 'Приведи друга', x: 26, y: 16, z: 26, class: 'Like-5'},
						{name: 'Экспресс дня', x: 33, y: 8, z: 33, class: 'Like-6'},
						{name: 'Подарки', x: 37, y: 14, z: 37, class: 'Like-7'},
						{name: 'Страховка', x: 42, y: 5, z: 42, class: 'Like-8'},
						{name: 'Акции', x: 46, y: -10, z: 46, class: 'Like-9'}
					]
				},
				{
					id: 'Like-4',
					data: [
						{name: 'Кешбек', x: 13, y: 17, z: 13, class: 'Like-1'},
						{name: 'Обкат', x: 16, y: -3, z: 16, class: 'Like-2'},
						{name: 'Фрибет', x: 17, y: -15, z: 17, class: 'Like-3'},
						{name: 'Первый депозит', x: 23, y: 6, z: 23, class: 'Like-4'},
						{name: 'Приведи друга', x: 26, y: 16, z: 26, class: 'Like-5'},
						{name: 'Экспресс дня', x: 33, y: 8, z: 33, class: 'Like-6'},
						{name: 'Подарки', x: 37, y: 14, z: 37, class: 'Like-7'},
						{name: 'Страховка', x: 42, y: 5, z: 42, class: 'Like-8'},
						{name: 'Акции', x: 46, y: -10, z: 46, class: 'Like-9'}
					]
				},
				{
					id: 'Like-5',
					data: [
						{name: 'Кешбек', x: 13, y: 17, z: 13, class: 'Like-1'},
						{name: 'Обкат', x: 16, y: -3, z: 16, class: 'Like-2'},
						{name: 'Фрибет', x: 17, y: -15, z: 17, class: 'Like-3'},
						{name: 'Первый депозит', x: 23, y: 6, z: 23, class: 'Like-4'},
						{name: 'Приведи друга', x: 26, y: 16, z: 26, class: 'Like-5'},
						{name: 'Экспресс дня', x: 33, y: 8, z: 33, class: 'Like-6'},
						{name: 'Подарки', x: 37, y: 14, z: 37, class: 'Like-7'},
						{name: 'Страховка', x: 42, y: 5, z: 42, class: 'Like-8'},
						{name: 'Акции', x: 46, y: -10, z: 46, class: 'Like-9'}
					]
				},
				{
					id: 'Like-6',
					data: [
						{name: 'Кешбек', x: 13, y: 17, z: 13, class: 'Like-1'},
						{name: 'Обкат', x: 16, y: -3, z: 16, class: 'Like-2'},
						{name: 'Фрибет', x: 17, y: -15, z: 17, class: 'Like-3'},
						{name: 'Первый депозит', x: 23, y: 6, z: 23, class: 'Like-4'},
						{name: 'Приведи друга', x: 26, y: 16, z: 26, class: 'Like-5'},
						{name: 'Экспресс дня', x: 33, y: 8, z: 33, class: 'Like-6'},
						{name: 'Подарки', x: 37, y: 14, z: 37, class: 'Like-7'},
						{name: 'Страховка', x: 42, y: 5, z: 42, class: 'Like-8'},
						{name: 'Акции', x: 46, y: -10, z: 46, class: 'Like-9'}
					]
				},
				{
					id: 'Like-7',
					data: [
						{name: 'Кешбек', x: 13, y: 17, z: 13, class: 'Like-1'},
						{name: 'Обкат', x: 16, y: -3, z: 16, class: 'Like-2'},
						{name: 'Фрибет', x: 17, y: -15, z: 17, class: 'Like-3'},
						{name: 'Первый депозит', x: 23, y: 6, z: 23, class: 'Like-4'},
						{name: 'Приведи друга', x: 26, y: 16, z: 26, class: 'Like-5'},
						{name: 'Экспресс дня', x: 33, y: 8, z: 33, class: 'Like-6'},
						{name: 'Подарки', x: 37, y: 14, z: 37, class: 'Like-7'},
						{name: 'Страховка', x: 42, y: 5, z: 42, class: 'Like-8'},
						{name: 'Акции', x: 46, y: -10, z: 46, class: 'Like-9'}
					]
				},
				{
					id: 'Dislike-1',
					data: [
						{name: 'Кешбек', x: 13, y: -15, z: 13, class: 'Dislike-1'},
						{name: 'Обкат', x: 16, y: 5, z: 16, class: 'Dislike-2'},
						{name: 'Фрибет', x: 17, y: -12, z: 17, class: 'Dislike-3'},
						{name: 'Первый депозит', x: 23, y: -5, z: 23, class: 'Dislike-4'},
						{name: 'Приведи друга', x: 26, y: 15, z: 26, class: 'Dislike-5'},
						{name: 'Экспресс дня', x: 33, y: -6, z: 33, class: 'Dislike-6'},
						{name: 'Подарки', x: 37, y: -14, z: 37, class: 'Dislike-7'},
						{name: 'Страховка', x: 42, y: -5, z: 42, class: 'Dislike-8'},
						{name: 'Акции', x: 46, y: 10, z: 46, class: 'Dislike-9'}
					]
				},
				{
					id: 'Dislike-2',
					data: [
						{name: 'Кешбек', x: 13, y: -15, z: 13, class: 'Dislike-1'},
						{name: 'Обкат', x: 16, y: 5, z: 16, class: 'Dislike-2'},
						{name: 'Фрибет', x: 17, y: -12, z: 17, class: 'Dislike-3'},
						{name: 'Первый депозит', x: 23, y: -5, z: 23, class: 'Dislike-4'},
						{name: 'Приведи друга', x: 26, y: 15, z: 26, class: 'Dislike-5'},
						{name: 'Экспресс дня', x: 33, y: -6, z: 33, class: 'Dislike-6'},
						{name: 'Подарки', x: 37, y: -14, z: 37, class: 'Dislike-7'},
						{name: 'Страховка', x: 42, y: -5, z: 42, class: 'Dislike-8'},
						{name: 'Акции', x: 46, y: 10, z: 46, class: 'Dislike-9'}
					]
				},
				{
					id: 'Dislike-3',
					data: [
						{name: 'Кешбек', x: 13, y: -15, z: 13, class: 'Dislike-1'},
						{name: 'Обкат', x: 16, y: 5, z: 16, class: 'Dislike-2'},
						{name: 'Фрибет', x: 17, y: -12, z: 17, class: 'Dislike-3'},
						{name: 'Первый депозит', x: 23, y: -5, z: 23, class: 'Dislike-4'},
						{name: 'Приведи друга', x: 26, y: 15, z: 26, class: 'Dislike-5'},
						{name: 'Экспресс дня', x: 33, y: -6, z: 33, class: 'Dislike-6'},
						{name: 'Подарки', x: 37, y: -14, z: 37, class: 'Dislike-7'},
						{name: 'Страховка', x: 42, y: -5, z: 42, class: 'Dislike-8'},
						{name: 'Акции', x: 46, y: 10, z: 46, class: 'Dislike-9'}
					]
				},
				{
					id: 'Dislike-4',
					data: [
						{name: 'Кешбек', x: 13, y: -15, z: 13, class: 'Dislike-1'},
						{name: 'Обкат', x: 16, y: 5, z: 16, class: 'Dislike-2'},
						{name: 'Фрибет', x: 17, y: -12, z: 17, class: 'Dislike-3'},
						{name: 'Первый депозит', x: 23, y: -5, z: 23, class: 'Dislike-4'},
						{name: 'Приведи друга', x: 26, y: 15, z: 26, class: 'Dislike-5'},
						{name: 'Экспресс дня', x: 33, y: -6, z: 33, class: 'Dislike-6'},
						{name: 'Подарки', x: 37, y: -14, z: 37, class: 'Dislike-7'},
						{name: 'Страховка', x: 42, y: -5, z: 42, class: 'Dislike-8'},
						{name: 'Акции', x: 46, y: 10, z: 46, class: 'Dislike-9'}
					]
				},
				{
					id: 'Dislike-5',
					data: [
						{name: 'Кешбек', x: 13, y: -15, z: 13, class: 'Dislike-1'},
						{name: 'Обкат', x: 16, y: 5, z: 16, class: 'Dislike-2'},
						{name: 'Фрибет', x: 17, y: -12, z: 17, class: 'Dislike-3'},
						{name: 'Первый депозит', x: 23, y: -5, z: 23, class: 'Dislike-4'},
						{name: 'Приведи друга', x: 26, y: 15, z: 26, class: 'Dislike-5'},
						{name: 'Экспресс дня', x: 33, y: -6, z: 33, class: 'Dislike-6'},
						{name: 'Подарки', x: 37, y: -14, z: 37, class: 'Dislike-7'},
						{name: 'Страховка', x: 42, y: -5, z: 42, class: 'Dislike-8'},
						{name: 'Акции', x: 46, y: 10, z: 46, class: 'Dislike-9'}
					]
				},
				{
					id: 'Dislike-6',
					data: [
						{name: 'Кешбек', x: 13, y: -15, z: 13, class: 'Dislike-1'},
						{name: 'Обкат', x: 16, y: 5, z: 16, class: 'Dislike-2'},
						{name: 'Фрибет', x: 17, y: -12, z: 17, class: 'Dislike-3'},
						{name: 'Первый депозит', x: 23, y: -5, z: 23, class: 'Dislike-4'},
						{name: 'Приведи друга', x: 26, y: 15, z: 26, class: 'Dislike-5'},
						{name: 'Экспресс дня', x: 33, y: -6, z: 33, class: 'Dislike-6'},
						{name: 'Подарки', x: 37, y: -14, z: 37, class: 'Dislike-7'},
						{name: 'Страховка', x: 42, y: -5, z: 42, class: 'Dislike-8'},
						{name: 'Акции', x: 46, y: 10, z: 46, class: 'Dislike-9'}
					]
				},
				{
					id: 'Dislike-7',
					data: [
						{name: 'Кешбек', x: 13, y: -15, z: 13, class: 'Dislike-1'},
						{name: 'Обкат', x: 16, y: 5, z: 16, class: 'Dislike-2'},
						{name: 'Фрибет', x: 17, y: -12, z: 17, class: 'Dislike-3'},
						{name: 'Первый депозит', x: 23, y: -5, z: 23, class: 'Dislike-4'},
						{name: 'Приведи друга', x: 26, y: 15, z: 26, class: 'Dislike-5'},
						{name: 'Экспресс дня', x: 33, y: -6, z: 33, class: 'Dislike-6'},
						{name: 'Подарки', x: 37, y: -14, z: 37, class: 'Dislike-7'},
						{name: 'Страховка', x: 42, y: -5, z: 42, class: 'Dislike-8'},
						{name: 'Акции', x: 46, y: 10, z: 46, class: 'Dislike-9'}
					]
				}
			]
		}

	});

	// Init Sentiment Tags, Sentiment Indicator, Sentiment Highlight

	$(sentimentChart.series).each(function(i, serie) {
		if (serie.yData[0] >= 0) {
			$($.parseHTML('<a href="javascript:void(0);" class="widget-graph-item js-graph-item" data-series="' + i + '">' + serie.data[0].name + ' <span>(' + serie.zData[0] + ')</span></a>')).appendTo('.widget-graph-yes .js-graph-list');
		} else {
			$($.parseHTML('<a href="javascript:void(0);" class="widget-graph-item js-graph-item" data-series="' + i + '">' + serie.data[0].name + ' <span>(' + serie.zData[0] + ')</span></a>')).appendTo('.widget-graph-no .js-graph-list');
		}
		if ($('.widget-graph-yes .js-graph-list').children().length === 0) {
			$('.widget-graph-yes').slideUp(300);
			$('.widget-review-yes').slideUp(300);
		} else if ($('.widget-graph-no .js-graph-list').children().length === 0) {
			$('.widget-graph-no').slideUp(300);
			$('.widget-review-no').slideUp(300);
		} else {
			$('.widget-graph-tag').slideDown(300);
			$('.widget-review-item').slideDown(300);
		}
		$('.widget-review-text').highlight(serie.data[0].name, i, 'widget-review-highlight '+ serie.data[0].drilldown +'', 'js-review-gap');
	});

	let chartHeight = $('.highcharts-plot-background').height();
	$('.js-sentiment-indicator').height(chartHeight + 2);
	$('.js-sentiment-indicator').appendTo('.widget-sentiment-graph');

	// Interaction

	$(document).on('click', '.js-graph-item', function() {
		let seriesVal = $(this).data('series');
		if (sentimentChart.series[seriesVal].data[0].drilldown === undefined) {
			return false;
		} else {
			let className = sentimentChart.series[seriesVal].data[0].drilldown;
			$('.widget-review-item').hide();
			$('.' + className).show();
			sentimentChart.series[seriesVal].data[0].doDrilldown();
		}
	});
	$(document).on('mouseover', '.js-graph-item', function() {
		let seriesVal = $(this).data('series');
		if (sentimentChart.drillUpButton === undefined) {
			let className = sentimentChart.series[seriesVal].data[0].drilldown;
			$('.highcharts-series').addClass('highcharts-series-inactive');
			$('.highcharts-series-' + seriesVal).removeClass('highcharts-series-inactive');
			$('.widget-review-highlight').addClass('is-disable');
			$('.widget-review-highlight.'+ className).removeClass('is-disable');
		} else {
			let className = sentimentChart.series[0].data[seriesVal].class;
			$('.highcharts-point').addClass('is-disable');
			$('.highcharts-point').eq(seriesVal).removeClass('is-disable');
			$('.widget-review-highlight').addClass('is-disable');
			$('.widget-review-highlight.'+ className).removeClass('is-disable');
		}
	});
	$(document).on('mouseout', '.js-graph-item', function() {
		$('.highcharts-series').removeClass('highcharts-series-inactive');
		$('.highcharts-point').removeClass('highcharts-point-hover is-disable');
		$('.widget-review-highlight').removeClass('is-disable');
	});
	$(document).on('mouseover', '.highcharts-label', function() {
		if (sentimentChart.drillUpButton === undefined) {
			return false;
		} else {
			$(this).addClass('highcharts-label-hover');
			let activePoint = $('.highcharts-label-hover');
					activePointIndex = activePoint.index();
			$('.highcharts-point').eq(activePointIndex).addClass('highcharts-point-hover');
			$(sentimentChart.series[0].data).each(function(i, data) {
				if ($('.highcharts-point').eq(i).hasClass('highcharts-point-hover')) {
					let className = data.class;
					$('.js-graph-item[data-series=' + i + ']').addClass('is-hover');
					$('.highcharts-point').addClass('is-disable');
					$('.highcharts-point.highcharts-point-hover').removeClass('is-disable');
					$('.widget-review-highlight').addClass('is-disable');
					$('.widget-review-highlight.'+ className).removeClass('is-disable');
				} else {
					let className = data.class;
					$('.js-graph-item[data-series=' + i + ']').removeClass('is-hover');
					$('.widget-review-highlight.'+ className).addClass('is-disable');
				}
			});
		}
	});
	$(document).on('mouseout', '.highcharts-label', function() {
		if (sentimentChart.drillUpButton === undefined) {
			return false;
		} else {
			$('.js-graph-item').removeClass('is-hover');
			$('.highcharts-point').removeClass('highcharts-point-hover is-disable');
			$('.highcharts-label').removeClass('highcharts-label-hover');
			$('.widget-review-highlight').removeClass('is-disable');
		}
	});
	$(document).on('click', '.js-sentiment-back', function() {
		$('.highcharts-drillup-button').trigger('click');
	});

	//
	
});