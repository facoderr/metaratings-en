$(document).ready(function() {

	///// Pulse Event /////

	let uAg = navigator.userAgent.toLowerCase();
	let isAndroid = uAg.indexOf('android') > -1;
	if (isAndroid) {
		$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
	} else {
		$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1');
	}

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

	// Highcharts Localization

	Highcharts.setOptions({
		lang: {
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
			weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
			shortWeekdays: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
		}
	});

	///// Pulse Chart /////

	let pulseChart = Highcharts.chart('js-pulse', {

		// Global Options

		chart: {
			pinchType: 'x',
			panning: true,
			plotBorderWidth: 1,
			plotBorderColor:'#e2e2e2',
			style: {
				'fontFamily': 'Helvetica Neue, Helvetica, Arial, sans-serif'
			},
			margin: [-25, 1, 50, 1],
			events: {
				load: function() {
					this.pulseTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
				}
			}
		},

		// Disabled Chart title

		title: {text: null},

		// Range Options

		rangeSelector: {
			enabled: true,
			buttons: [{
				type: 'week',
				count: 1,
				preserveDataGrouping: true,
				dataGrouping: {
					approximation: 'sum',
					enabled: true,
					forced: true,
					groupAll: true,
					units: [['day', [1]]],
				}
			}, {
				type: 'month',
				count: 1,
				preserveDataGrouping: true,
				dataGrouping: {
					approximation: 'sum',
					enabled: true,
					forced: true,
					groupAll: true,
					units: [['week', [1]]],
				}
			}, {
				type: 'year',
				count: 1,
				preserveDataGrouping: true,
				dataGrouping: {
					approximation: 'sum',
					enabled: true,
					forced: true,
					groupAll: true,
					units: [['month', [1]]],
				}
			}],
			inputEnabled: false,
			selected: 0
		},

		// Tooltip Options

		tooltip: {
			enabled: false,
			followTouchMove: false,
			borderWidth: 0,
			borderRadius: 20,
			shadow: false,
			hideDelay: 200,
			padding: 0,
			useHTML: true,
			formatter: function() {
				let serieIndex = this.series.index
						pointIndex = this.point.index
						pointVal = this.y
						time = Highcharts.dateFormat('%d %b %H:%M', this.x);
				if (serieIndex == 0) {
					$(pulseChart.series[0].processedYData).each(function (i, data) {
						if (data == pointVal || pulseChart.series[1].processedYData[i] == pointVal) {
							pulsePositive = data
							pulseNegative = pulseChart.series[1].processedYData[i]
							pulseTotal = pulsePositive - pulseNegative
						}
					});
					return '<div class="highcharts-tooltip-wrap" style="background-color: ' + this.color + ';"><div class="highcharts-tooltip-date">' + time + '</div><div class="highcharts-tooltip-val"><div class="highcharts-tooltip-yes">+ ' + Math.abs(pulsePositive) + ' Пол.</div><div class="highcharts-tooltip-no">- ' + Math.abs(pulseNegative) + ' Отр.</div></div><div class="highcharts-tooltip-total">' + Math.abs(pulseTotal) + '</div></div>'
				} else if (serieIndex == 1) {
					$(pulseChart.series[1].processedYData).each(function (i, data) {
						if (data == pointVal || pulseChart.series[0].processedYData[i] == pointVal) {
							pulsePositive = pulseChart.series[0].processedYData[i]
							pulseNegative = data
							pulseTotal = pulsePositive - pulseNegative
						}
					});
					return '<div class="highcharts-tooltip-wrap" style="background-color: ' + this.color + ';"><div class="highcharts-tooltip-date">' + time + '</div><div class="highcharts-tooltip-val"><div class="highcharts-tooltip-yes">+ ' + Math.abs(pulsePositive) + ' Пол.</div><div class="highcharts-tooltip-no">- ' + Math.abs(pulseNegative) + ' Отр.</div></div><div class="highcharts-tooltip-total">' + Math.abs(pulseTotal) + '</div></div>'
				} else if (serieIndex == 2) {
					$(pulseChart.series[2].processedYData).each(function (i, data) {
						if (data == pointVal) {
							pulseNeutral = data
						}
					});
					return '<div class="highcharts-tooltip-wrap" style="background-color: ' + this.color + ';"><div class="highcharts-tooltip-date">' + time + '</div><div class="highcharts-tooltip-val"><div class="highcharts-tooltip-other">' + Math.abs(pulseNeutral) + ' Нейтральных</div></div></div>'
				} else if (serieIndex == 3) {
					$(pulseChart.series[3].processedYData).each(function (i, data) {
						if (data == pointVal) {
							pulseSpam = data
						}
					});
					return '<div class="highcharts-tooltip-wrap" style="background-color: ' + this.color + ';"><div class="highcharts-tooltip-date">' + time + '</div><div class="highcharts-tooltip-val"><div class="highcharts-tooltip-spam">' + Math.abs(pulseSpam) + ' Спама</div></div></div>'
				}
			},
			//crosshairs: {},
			style: {
				color: '#ffffff'
			}
		},

		// Horizontal Coordinates

		xAxis: {
			type: 'datetime',
			title: {
				enabled: false
			},
			gridLineWidth: 1,
			gridLineColor: '#e2e2e2',
			gridLineDashStyle: 'ShortDash',
			tickColor: '#e2e2e2',
			tickLength: 15,
			minPadding: 0,
			maxPadding: 0,
			labels: {
				y: 30,
				style: {
					color: '#777777',
					fontSize: '10px'
				}
			},
			events: {
				afterSetExtremes: function(e) {
					$('.highcharts-data-round').css({
						width: this.series[0].points[0].shapeArgs.width - 2,
						height: this.series[0].points[0].shapeArgs.width - 2
					})
				}
			}
		},

		// Vertical Coordinates

		yAxis: {
			title: {
				enabled: false
			},
			opposite: true,
			gridLineWidth: 1,
			gridLineColor:'#e2e2e2',
			plotLines: [{
				color: '#e2e2e2',
				width: 2,
				value: 0,
				zIndex: 3
			}],
			labels: {
				x: 10,
				style: {
					color: '#777777',
					fontSize: '10px'
				}
			}
		},

		// Pulse Options

		plotOptions: {
			column: {
				pointStart: Date.UTC(2017, 00, 01),
				pointInterval: 36e5 * 24,
				maxPointWidth: 8,
				borderRadius: 4,
				borderWidth: 0,
				borderColor: '',
				point:{
					events:{
						click: function() {
							let serieIndex = this.series.index
							    pointDate = new Date(this.x).toLocaleDateString()
									pointTime = new Date(this.x).toLocaleTimeString([], {timeZone: 'Africa/Accra', hour: '2-digit', minute:'2-digit'})
							if (serieIndex == 0) {
								$('.widget-note-item').fadeOut(300);
								setTimeout(function() {
									$('.widget-note-yes .widget-note-clock').html(pointTime);
									$('.widget-note-yes .widget-note-date').html(pointDate);
									$('.widget-note-yes').fadeIn(300);
								}, 300);
							} else if (serieIndex == 1) {
								$('.widget-note-item').fadeOut(300);
								setTimeout(function() {
									$('.widget-note-no .widget-note-clock').html(pointTime);
									$('.widget-note-no .widget-note-date').html(pointDate);
									$('.widget-note-no').fadeIn(300);
								}, 300);
							} else {
								$('.widget-note-item').fadeOut(300);
							}
						}
					}
				},
				dataLabels: {
					enabled: true,
					useHTML: true,
					formatter: function() {
						let serieIndex = this.series.index
						if (serieIndex == 0 || serieIndex == 1) {
							maxVal = Math.max.apply(null, this.series.processedYData);
							if (this.y == maxVal) {
								return '<div style="text-align:center;color:#000;transform:translateY(17px)"><div class="highcharts-data-round" style="width: ' + (this.point.shapeArgs.width - 2) + 'px; height: ' + (this.point.shapeArgs.width - 2) + 'px"></div></div>';
							}
						}
					}
				},
				states: {
					hover: {
						enabled: false
					}
				}
			},
			series: {
				stickyTracking: false,
				states: {
					inactive: {
						opacity: 1
					}
				},
				events: {
					click: function(e) {
						this.chart.pulseTooltip.options.enabled = true;
						this.chart.pulseTooltip.refresh(e.point, e);
					},
					mouseOut: function() {
						this.chart.pulseTooltip.hide();
						this.chart.pulseTooltip.options.enabled = false;
					}
				}
			}
		},

		// Main Series Data

		series: [
			{
				type: 'column',
				name: 'Positive',
				data: (function () {
					let data = [],
					i;
					for (i = -999; i <= 0; i += 1) {
						data.push([Math.round(Math.random() * 100)]);
					}
					return data;
				}()),
				color: '#39af61'
			}, {
				type: 'column',
				name: 'Negative',
				data: (function () {
					let data = [],
					i;
					for (i = -999; i <= 0; i += 1) {
						data.push([Math.round(Math.random() * 100)]);
					}
					return data;
				}()),
				color: '#d0021b'
			}, {
				type: 'column',
				name: 'Neutral',
				data: (function () {
					let data = [],
					i;
					for (i = -999; i <= 0; i += 1) {
						data.push([Math.round(Math.random() * 20)]);
					}
					return data;
				}()),
				color: '#a5a5a5'
			}, {
				type: 'column',
				name: 'Spam',
				data: (function () {
					let data = [],
					i;
					for (i = -999; i <= 0; i += 1) {
						data.push([Math.round(Math.random() * 20)]);
					}
					return data;
				}()),
				color: '#f5a623'
			}
		]

	});

	// Responsive Chart Margin

	if ($(window).outerWidth() <= 1099) {
		pulseChart.update({chart: {margin: [-25, 1, 50, 1]}});
	} else {
		pulseChart.update({chart: {margin: [-25, 50, 50, 1]}});
	}
	$(window).resize(function() {
		if ($(window).outerWidth() <= 1099) {
			pulseChart.update({chart: {margin: [-25, 1, 45, 1]}});
		} else {
			pulseChart.update({chart: {margin: [-25, 50, 45, 1]}});
		}
	});

	// Switch Zoom Chart (Day, Month, Year)

	$('.highcharts-button').each(function() {
		let index = $(this).index() - 1;
		$('.widget-pulse-time').removeClass('is-disable');
		if ($(this).hasClass('highcharts-button-pressed')) {
			$('.widget-pulse-time').removeClass('is-select');
			$('.widget-pulse-time').eq(index).addClass('is-select');
		} else if ($(this).hasClass('highcharts-button-disabled')) {
			$('.widget-pulse-time').eq(index).addClass('is-disable');
		}
	});	
	$(document).on('click', '.widget-pulse-time', function() {
		let index = $(this).index();
		$('.widget-pulse-time').removeClass('is-select');
		$(this).addClass('is-select');
		$('.highcharts-button').eq(index).trigger('click');
	});

	// Switch Show/Hide Types

	$(document).on('click', '.js-pulse-yes', function() {
		$('.widget-pulse-item').toggleClass('is-disable');
		$(this).removeClass('is-disable');
		$('.highcharts-legend-item.highcharts-series-1').trigger('click');
		$('.highcharts-legend-item.highcharts-series-2').trigger('click');
		$('.highcharts-legend-item.highcharts-series-3').trigger('click');
	});
	$(document).on('click', '.js-pulse-no', function() {
		$('.widget-pulse-item').toggleClass('is-disable');
		$(this).removeClass('is-disable');
		$('.highcharts-legend-item.highcharts-series-0').trigger('click');
		$('.highcharts-legend-item.highcharts-series-2').trigger('click');
		$('.highcharts-legend-item.highcharts-series-3').trigger('click');
	});
	$(document).on('click', '.js-pulse-other', function() {
		$('.widget-pulse-item').toggleClass('is-disable');
		$(this).removeClass('is-disable');
		$('.highcharts-legend-item.highcharts-series-0').trigger('click');
		$('.highcharts-legend-item.highcharts-series-1').trigger('click');
		$('.highcharts-legend-item.highcharts-series-3').trigger('click');
	});
	$(document).on('click', '.js-pulse-spam', function() {
		$('.widget-pulse-item').toggleClass('is-disable');
		$(this).removeClass('is-disable');
		$('.highcharts-legend-item.highcharts-series-0').trigger('click');
		$('.highcharts-legend-item.highcharts-series-1').trigger('click');
		$('.highcharts-legend-item.highcharts-series-2').trigger('click');
	});

	// Hide Pulse Note

	$(document).bind('mouseup touchend', function(e) {
		if ($(e.target).closest('.widget-pulse-graph').length || $(e.target).closest('.widget-note-item').length) return;
		$('.widget-note-item').slideUp(300);
	});

});