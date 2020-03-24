(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../blocks/sentiment/sentiment.js":
/*!****************************************!*\
  !*** ../blocks/sentiment/sentiment.js ***!
  \****************************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highcharts */ "../../node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_0__);


__webpack_require__(/*! highcharts/highcharts-more.js */ "../../node_modules/highcharts/highcharts-more.js")(highcharts__WEBPACK_IMPORTED_MODULE_0___default.a);

__webpack_require__(/*! highcharts/modules/drilldown.js */ "../../node_modules/highcharts/modules/drilldown.js")(highcharts__WEBPACK_IMPORTED_MODULE_0___default.a);

function init() {
  // Hightlight Text
  $.fn.highlight = function (str, index, className, classGap) {
    var regex = new RegExp(str, 'i');
    return this.each(function () {
      $(this).contents().filter(function () {
        return this.nodeType == 3 && regex.test(this.nodeValue);
      }).replaceWith(function () {
        return (this.nodeValue || "").replace(regex, function (total) {
          return '<span class="' + className + '" data-series="' + index + '"><span class="' + classGap + '"></span>' + total + '</span>';
        });
      });
    });
  }; // Sentiment Varibles


  var win = $(window),
      doc = $(document),
      html = $(document.documentElement),
      sentiment = 'js-sentiment',
      sentimentLoad = $('.js-sentiment-load'),
      sentimentTool = $('.js-sentiment-tool'),
      sentimentTitle = $('.js-sentiment-title'),
      sentimentBack = '.js-sentiment-back',
      sentimentIndicator = $('.js-sentiment-indicator'),
      sentimentBg = $('.js-sentiment-bg'),
      sentimentBgSuccess = $('.js-sentiment-bg-success'),
      sentimentBgDanger = $('.js-sentiment-bg-danger'),
      sentimentList = $('.js-sentiment-list'),
      sentimentScroll = $('.js-sentiment-scroll'),
      sentimentScrollSuccess = $('.is-success.js-sentiment-scroll'),
      sentimentScrollDanger = $('.is-danger.js-sentiment-scroll'),
      sentimentTotalSuccess = $('.is-success.js-sentiment-total'),
      sentimentTotalDanger = $('.is-danger.js-sentiment-total'),
      sentimentItem = '.js-sentiment-item',
      sentimentFull = '.js-sentiment-full',
      sentimentPagination = $('.js-pagination-sentiment'),
      sentimentPaginationBtn = '.js-more-sentiment',
      sentimentSources = $('.js-sources-sentiment'),
      sentimentSourcesItem = $('.js-sources-item'),
      sentimentTone = '.sentiment-graph-status',
      sentimentBookmaker = '.js-bookmaker',
      sentimentSourcesViewList = $('.js-sources-sentiment-view'),
      sentimentSourcesHideList = $('.js-sources-list-hide'),
      reviewList = $('.js-review-list'),
      reviewBody = $('.js-review-body'),
      reviewText = $('.js-review-text'),
      reviewFull = '.js-review-full',
      reviewHighlight = '.js-review-highlight',
      reviewGap = '.js-review-gap',
      sentimentSliderNav = $('.js-review-slideNav'),
      sentimentSliderFor = $('.js-review-slideFor'),
      bodyScrollLock = __webpack_require__(/*! body-scroll-lock */ "../../node_modules/body-scroll-lock/lib/bodyScrollLock.min.js"),
      disableBodyScroll = bodyScrollLock.disableBodyScroll,
      enableBodyScroll = bodyScrollLock.enableBodyScroll,
      BodyScrollOptions = bodyScrollLock.BodyScrollOptions,
      modalWrap = $('.js-modal-wrap'),
      modalTarget = document.querySelectorAll('.js-review-body'),
      modalShow = '.js-modal-show',
      modalHide = '.js-modal-hide';

  sentimentTool.clone().prependTo('.sentiment-graph-tag');
  sentimentTool = $('.js-sentiment-tool');
  var positiveArray = [],
      negativeArray = [],
      sumPositive,
      sumNegative; // Sentiment Chart

  var params = sentimentLoad.data('settings');
  params = $.extend({}, {
    action: 'load-comments',
    drilldown: [],
    series: [],
    ajaxPath: '',
    bookmakerId: 0,
    tagId: 0,
    slider: false,
    count: 10,
    sources: 0,
    status: 0,
    paginationTemplate: ''
  }, params);
  var sentimentChart = highcharts__WEBPACK_IMPORTED_MODULE_0___default.a.chart(sentiment, {
    // Global Options
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      plotBorderColor: '#e2e2e2',
      style: {
        'fontFamily': 'Helvetica Neue, Helvetica, Arial, sans-serif',
        'z-index': '1'
      },
      zoomType: '',
      margin: [1, 1, null, 1],
      events: {
        render: function render() {
          setTimeout(function () {
            var chartHeight = $('.highcharts-plot-background').height();
            sentimentIndicator.height(chartHeight + 2);
            sentimentBg.height(chartHeight + 2);
          }, 500);
          var minVal = Math.abs(this.yAxis[0].min),
              maxVal = Math.abs(this.yAxis[0].max);

          if (this.yAxis[0].min > 0 && this.yAxis[0].max > 0) {
            minVal = 0;
          } else if (this.yAxis[0].min < 0 && this.yAxis[0].max < 0) {
            maxVal = 0;
          }

          var totalVal = minVal + maxVal,
              minHalf = minVal * 100 / totalVal,
              maxHalf = maxVal * 100 / totalVal;

          if (minHalf < maxHalf || minHalf > maxHalf) {
            sentimentIndicator.css({
              background: 'linear-gradient(to top, #d0021b ' + minHalf + '%, #20a94a ' + minHalf + '%)'
            });
            sentimentBgSuccess.css('height', maxHalf + '%');
            sentimentBgDanger.css('height', minHalf + '%');
          } else {
            sentimentIndicator.css({
              background: 'linear-gradient(to top, #d0021b 50%, #20a94a 50%)'
            });
            sentimentBgSuccess.css('height', maxHalf + '%');
            sentimentBgDanger.css('height', minHalf + '%');
          }
        },
        drilldown: function drilldown() {
          setTimeout(function () {
            var sentimentVal = sentimentChart.series[0].chart.drilldownLevels[0].pointOptions.y,
                sentimentName = sentimentChart.drilldownLevels[0].pointOptions.name;
            sentimentTool.css('display', 'flex');

            if ($('.is-success.js-sentiment-status.is-select').length != 0) {
              sentimentTool.find('.sentiment-graph-back-text').html('All positive entities');
            } else {
              sentimentTool.find('.sentiment-graph-back-text').html('All negative entities');
            }

            if (sentimentVal >= 0) {
              sentimentTitle.addClass('is-success');
            } else {
              sentimentTitle.addClass('is-danger');
            }

            sentimentTitle.html(sentimentName);
            sentimentScroll.html('');
            params.tagId = sentimentChart.drilldownLevels[0].pointOptions.id;
            loadReviews();
            positiveArray = [];
            negativeArray = [];
            $(sentimentChart.series[0].data).each(function (i, data) {
              var parseDrillDown = $.parseHTML('<a href="javascript:void(0);" class="sentiment-graph-item js-sentiment-item" data-series="' + i + '" data-id="' + data.dataId + '">' + data.name + ' <span>(' + data.z + ')</span></a>');
              $(reviewGap).unwrap().remove();
              setTimeout(function () {
                reviewText.highlight(data.name, i, 'sentiment-review-highlight js-review-highlight ' + data.class + '', 'js-review-gap');

                if (data.y >= 0) {
                  positiveArray.push(data.z);
                  sumPositive = parseInt(eval(positiveArray.join('+')));
                  sentimentTotalSuccess.html('');
                  $($.parseHTML('' + sumPositive + '')).prependTo(sentimentTotalSuccess);
                  $(parseDrillDown).appendTo(sentimentScrollSuccess);
                  $('' + reviewHighlight + '[data-series=' + i + ']').addClass('is-success');
                } else {
                  negativeArray.push(data.z);
                  sumNegative = parseInt(eval(negativeArray.join('+')));
                  sentimentTotalDanger.html('');
                  $($.parseHTML('' + sumNegative + '')).prependTo(sentimentTotalDanger);
                  $(parseDrillDown).appendTo(sentimentScrollDanger);
                  $('' + reviewHighlight + '[data-series=' + i + ']').addClass('is-danger');
                }

                sentimentList.each(function () {
                  $(this).find(sentimentScrollSuccess).parent().toggle(sentimentScrollSuccess.children().length > 0);
                  $(this).find(sentimentScrollDanger).parent().toggle(sentimentScrollDanger.children().length > 0);
                });
              }, 1);
            });
            setTimeout(function () {
              sentimentTotalSuccess.clone().prependTo(sentimentScrollSuccess);
              sentimentTotalDanger.clone().prependTo(sentimentScrollDanger);
              autoHeight();
            }, 1);
          }, 1);
        },
        drillup: function drillup() {
          sentimentLoad.removeClass('is-load');
          setTimeout(function () {
            if ($('.js-sentiment-status.is-select').length === 0) {
              sentimentTool.hide();
              sentimentTitle.removeClass('is-success is-danger').html('All entities');
            } else {
              sentimentTool.hide();
              $('.sentiment-graph-tag').find(sentimentTool).css('display', 'flex');

              if ($('.is-success.js-sentiment-status.is-select').length != 0) {
                sentimentTitle.removeClass('is-success is-danger').html('All positive entities');
                sentimentTool.find('.sentiment-graph-back-text').html('All entities');
              } else {
                sentimentTitle.removeClass('is-success is-danger').html('All negative entities');
                sentimentTool.find('.sentiment-graph-back-text').html('All entities');
              }
            }

            sentimentScroll.html('');
            params.tagId = 0;
            loadReviews();
            afterLoad();
            chartSeries = $('.highcharts-series');
          }, 1);
        }
      }
    },
    // Disabled Chart title, tooltip, legend
    title: {
      text: null
    },
    tooltip: {
      enabled: false
    },
    legend: {
      enabled: false
    },
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
          fontSize: '15px'
        }
      }
    },
    // Vertical Coordinates
    yAxis: {
      title: {
        enabled: false
      },
      gridLineWidth: 1,
      gridLineColor: '#e2e2e2',
      plotLines: [{
        color: '#9c9c9c',
        width: 1,
        value: 0,
        zIndex: 2
      }],
      labels: {
        enabled: false
      }
    },
    // Sentiment Options
    plotOptions: {
      bubble: {
        minSize: 5,
        maxSize: '11%',
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
          className: 'zone-no'
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
          formatter: function formatter() {
            if (win.outerWidth() <= 1099) {
              if (this.point.y >= 0) {
                return '<span class="is-success" style="position:relative;bottom:-' + (this.point.marker.radius + 5) + 'px;">' + this.point.name + '</span>';
              } else {
                return '<span class="is-danger" style="position:relative;bottom:-' + (this.point.marker.radius + 5) + 'px;">' + this.point.name + '</span>';
              }
            } else {
              if (this.point.y >= 0) {
                return '<span class="is-success" style="position:relative;bottom:-' + (this.point.marker.radius + 10) + 'px;">' + this.point.name + '</span>';
              } else {
                return '<span class="is-danger" style="position:relative;bottom:-' + (this.point.marker.radius + 10) + 'px;">' + this.point.name + '</span>';
              }
            }
          },
          style: {
            fontSize: '14px',
            textOutline: 'none'
          }
        },
        events: {
          mouseOver: function mouseOver() {
            setTimeout(function () {
              if (sentimentChart.drillUpButton === undefined) {
                $(sentimentChart.series).each(function (i, serie) {
                  $('' + sentimentItem + '[data-series=' + i + ']').toggleClass('is-hover', $('.highcharts-series-' + i + '.highcharts-series-hover').length > 0);
                  $('.highcharts-series-hover').find('span').addClass('is-hover');

                  if ($('.highcharts-series-' + i + '.highcharts-series-hover').length > 0) {
                    $(reviewHighlight).addClass('is-disable');
                    $('' + reviewHighlight + '[data-series=' + i + ']').removeClass('is-disable');
                  } else {
                    $('' + reviewHighlight + '[data-series=' + i + ']').addClass('is-disable');
                  }
                });
              } else {
                return false;
              }
            }, 1);
          },
          mouseOut: function mouseOut() {
            setTimeout(function () {
              if (sentimentChart.drillUpButton === undefined) {
                $(sentimentItem).removeClass('is-hover');
                $('.highcharts-label').find('span').removeClass('is-hover');
                $(reviewHighlight).removeClass('is-disable');
              } else {
                return false;
              }
            }, 1);
          }
        }
      }
    },
    // Main Series Data
    series: [],
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
      series: []
    },
    // Responsive
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            height: 250
          },
          xAxis: {
            tickPixelInterval: 50,
            labels: {
              style: {
                fontSize: '10px'
              }
            }
          },
          yAxis: {
            tickPixelInterval: 30
          },
          plotOptions: {
            series: {
              dataLabels: {
                style: {
                  fontSize: '8px'
                }
              }
            }
          }
        }
      }]
    }
  });
  sentimentChart.update(params.series, true, true);
  sentimentChart.options.drilldown = highcharts__WEBPACK_IMPORTED_MODULE_0___default.a.merge(sentimentChart.options.drilldown, {
    series: params.drilldown.series
  }); // Init Sentiment Tags, Sentiment Reviews, Sentiment Highlight, Sentiment Block Height, Sentiment Pagination

  function autoHeight() {
    if (win.outerWidth() >= 1100) {
      sentimentList.each(function () {
        var maxH = 54,
            sentimentScrollHeight = $(this).find(sentimentScroll).outerHeight();

        if (sentimentScrollHeight > maxH) {
          $(this).css('max-height', maxH);
          $(this).find(sentimentFull).css('display', 'flex');
        } else {
          $(this).css('max-height', '');
          $(this).find(sentimentFull).css('display', 'none');
        }
      });
    }

    reviewBody.each(function () {
      var maxH = 102,
          reviewTextHeight = $(this).parent().find(reviewText).outerHeight();

      if (reviewTextHeight > maxH) {
        $(this).css('max-height', maxH);
        $(this).parent().find(reviewFull).css('display', 'flex');
      } else {
        $(this).css('max-height', '');
        $(this).parent().find(reviewFull).css('display', 'none');
      }
    });
  }

  function addCommentsSlider(comments) {
    var listNav = $('.js-review-slideNav .swiper-wrapper'),
        listFor = $('.js-review-slideFor .swiper-wrapper');
    listNav.html('');
    listFor.html('');
    $(comments).each(function (i, comment) {
      var parseSlide = $.parseHTML('<div class="swiper-slide">\n' + '<a class="sentiment-review-block-link js-modal-show" href="#review"></a>\n' + '<div class="sentiment-review-item">\n' + '<div class="sentiment-review-item-head">\n' + '<div class="sentiment-review-item-user">\n' + '<div class="sentiment-review-item-img">\n' + '<img src="/local/templates/main/img/icons/user.svg" alt="User" />\n' + '</div>\n' + '<div class="sentiment-review-item-info">\n' + '<div class="sentiment-review-item-name">' + comment.author + '</div>\n' + (comment.source.name ? '<span class="sentiment-review-item-link">' + comment.source.name + '</span>' : ' ') + '\n' + '</div>\n' + '</div>\n' + '<div class="sentiment-review-item-date">' + comment.date + '</div>\n' + '</div>\n' + '<div class="sentiment-review-item-body js-review-body">\n' + '<div class="sentiment-review-item-text js-review-text">' + comment.text + '</div>\n' + '<div class="sentiment-review-item-full js-review-full">еще</div>\n' + '</div>\n' + '</div>\n' + '</div>');
      $(parseSlide).clone().appendTo(listNav);
      $(parseSlide).clone().appendTo(listFor);
    });
    sentimentSliderNav.get(0).swiper.update();
    sentimentSliderNav.get(0).swiper.slideTo(0);
    sentimentSliderFor.get(0).swiper.update();
    sentimentSliderFor.get(0).swiper.slideTo(0);
    reviewBody = $('.js-review-body');
    reviewText = $('.js-review-text');
    reviewFull = '.js-review-full';
    modalTarget = document.querySelectorAll('.js-review-body');
    autoHeight();
  }

  function addComments(comments) {
    reviewList.html('');
    $(comments).each(function (i, comment) {
      $($.parseHTML(' <div class="sentiment-review-box ' + comment.classAppend + '">\n' + '<div class="sentiment-review-box-head">\n' + '<div class="sentiment-review-box-user">\n' + '<div class="sentiment-review-box-img">\n' + '<img src="/local/templates/main/img/icons/user.svg" alt="User" />\n' + '</div>\n' + '<div class="sentiment-review-box-info">\n' + '<div class="sentiment-review-box-name">' + comment.author + '</div>\n' + (comment.source.name ? '<span class="sentiment-review-box-link">' + comment.source.name + '</span>' : ' ') + '\n' + '</div>\n' + '</div>\n' + '<div class="sentiment-review-box-trusted">\n' + '<div class="sentiment-review-box-feedback">' + (comment.classAppend === 'is-success' ? 'Positive feedback' : 'Negative feedback') + '</div>\n' + '<div class="sentiment-review-box-check">trusted<img src="/local/templates/main/img/icons/check.svg" alt=""></div>\n' + '</div>\n' + '<div class="sentiment-review-box-date">' + comment.date + '</div>\n' + '</div>\n' + '<div class="sentiment-review-box-body js-review-body">\n' + '<div class="sentiment-review-box-text js-review-text">' + comment.text + '</div>\n' + '</div>\n' + '<div class="sentiment-review-box-button">\n' + '<div class="sentiment-review-box-full js-review-full">Full review</div>\n' + '<div class="sentiment-review-box-favorite" data-id="' + comment.id + '">\n' + '<button class="sentiment-review-box-like js-review-like" data-type="like" type="button">\n' + '<span>' + comment.like + '</span>\n' + '<svg>\n' + '<use xlink:href="#like"></use>\n' + '</svg>\n' + '</button>\n' + '<button class="sentiment-review-box-dislike js-review-like" data-type="dislike" type="button">\n' + '<svg>\n' + '<use xlink:href="#dislike"></use>\n' + '</svg>\n' + '<span>' + comment.dislike + '</span>\n' + '</button>\n' + '</div>\n' + '</div>\n' + '</div>')).appendTo(reviewList);
    });
    reviewBody = $('.js-review-body');
    reviewText = $('.js-review-text');
    reviewFull = '.js-review-full';
    autoHeight();
  }

  function addPagination(pagination) {
    var htmlPag = $(pagination);

    if (sentimentPagination.length > 0) {
      var newPagination = htmlPag.is('.js-pagination-sentiment') ? htmlPag.filter('.js-pagination-sentiment') : htmlPag.find('.js-pagination-sentiment');
      sentimentPagination.empty().append(newPagination.children()); // sentimentPagination.replaceWith(pagination);
    } else {
      reviewList.after(pagination);
    }
  }

  function loadReviews(page) {
    var data = {
      action: params.action,
      bookmaker: params.bookmakerId,
      tag: params.tagId,
      count: params.count,
      slider: params.slider,
      sources: params.sources,
      subTag: params.subTag,
      status: params.status,
      paginationTemplate: params.paginationTemplate
    };
    if (page && page > 1) data['page'] = 'page-' + page;
    $.get(params.ajaxPath, data, function (response) {
      if (params.slider) {
        addCommentsSlider(response.comments);
      } else {
        addComments(response.comments);
      }

      if (!sentimentLoad.hasClass('is-load')) sentimentLoad.addClass('is-load');
      if (response.series) sentimentChart.update(response.series, true, true);
      if (response.drilldown) sentimentChart.options.drilldown = highcharts__WEBPACK_IMPORTED_MODULE_0___default.a.merge(sentimentChart.options.drilldown, {
        series: response.drilldown.series
      });
      if (response.sources) addSource(response.sources);
      if (params.paginationTemplate) addPagination(response.pagination);
    }, 'json');
  }

  function addSource(arSources) {
    sentimentSourcesViewList.html('');
    sentimentSourcesHideList.html('');
    var viewArSources = arSources.slice(0, 4),
        hideArSources = arSources.slice(4),
        sentimentFromMore = $('.sentiment-from-more.js-sentiment-from-more');
    sentimentFromMore.hide();

    for (var i = 0; i < viewArSources.length; i++) {
      $($.parseHTML('<button class="sentiment-from-item js-sources-item" type="button"\n' + 'data-sources="' + viewArSources[i].id + '">\n' + (viewArSources[i].img ? '<img src="' + viewArSources[i].img['SRC'] + '"/>' : '<span>' + viewArSources[i].name + '</span>') + '\n' + '</button>\n')).appendTo(sentimentSourcesViewList);
    }

    if (hideArSources.length > 0) {
      sentimentFromMore.show();
      sentimentFromMore.html(hideArSources.length + ' more<span>reviews</span>');

      for (var _i = 0; _i < hideArSources.length; _i++) {
        $($.parseHTML('<button class="sentiment-from-item js-sources-item" type="button"  data-sources="' + hideArSources[_i].id + '">\n' + (hideArSources[_i].img ? ' <img src="' + hideArSources[_i].img['SRC'] + '"/>' : '<span>' + hideArSources[_i].name + '</span>') + '\n' + '</button>\n')).appendTo(sentimentSourcesHideList);
      }
    }
  }

  function pagination() {
    sentimentPagination.on('click', 'a', function (e) {
      e.preventDefault();
      var html = $(document.body).add(document.documentElement),
          page = parseInt($(this).attr('data-page'));

      if (!isNaN(page) && page > 0 && !$(this).parent().hasClass('.is-active')) {
        html.animate({
          scrollTop: reviewList.offset().top - 15
        }, 200);
        loadReviews(page);
      }

      updateUrlMetaByPage(page);
    });
    doc.on('click', sentimentPaginationBtn, function (e) {
      e.preventDefault();
      var html = $(document.body).add(document.documentElement),
          page = parseInt($(this).attr('data-page'));

      if (!isNaN(page) && page > 0) {
        html.animate({
          scrollTop: reviewList.offset().top - 15
        }, 200);
        loadReviews(page);
      }

      updateUrlMetaByPage(page);
    });
  }

  function updateUrlMetaByPage(page) {
    var $sentimentMain = $('.sentiment-main');
    var title = $sentimentMain.attr('data-title');
    var desc = $sentimentMain.attr('data-desc');
    var url = document.location.pathname;

    if (page > 1) {
      title = $sentimentMain.attr('data-nav-title-template') + page;
      desc = $sentimentMain.attr('data-nav-desc-template') + page;
      url += '?page=page-' + page;
    }

    history.pushState('', '', url);
    document.title = title;
    $(document).find('meta[name=description]').attr('content', desc);
  }

  function afterLoad() {
    positiveArray = [];
    negativeArray = [];
    $(sentimentChart.series).each(function (i, serie) {
      var parseMain = $.parseHTML('<a href="javascript:void(0);" class="sentiment-graph-item js-sentiment-item" data-series="' + i + '">' + serie.data[0].name + ' <span>(' + serie.zData[0] + ')</span></a>');
      $(reviewGap).unwrap().remove();
      setTimeout(function () {
        reviewText.highlight(serie.data[0].name, i, 'sentiment-review-highlight js-review-highlight ' + serie.data[0].drilldown + '', 'js-review-gap');

        if (serie.yData[0] >= 0) {
          positiveArray.push(serie.zData[0]);
          sumPositive = parseInt(eval(positiveArray.join('+')));
          sentimentTotalSuccess.html('');
          $($.parseHTML('' + sumPositive + '')).prependTo(sentimentTotalSuccess);
          $(parseMain).appendTo(sentimentScrollSuccess);
          $('' + reviewHighlight + '[data-series=' + i + ']').addClass('is-success');
        } else {
          negativeArray.push(serie.zData[0]);
          sumNegative = parseInt(eval(negativeArray.join('+')));
          sentimentTotalDanger.html('');
          $($.parseHTML('' + sumNegative + '')).prependTo(sentimentTotalDanger);
          $(parseMain).appendTo(sentimentScrollDanger);
          $('' + reviewHighlight + '[data-series=' + i + ']').addClass('is-danger');
        }

        sentimentList.each(function () {
          $(this).find(sentimentScrollSuccess).parent().toggle(sentimentScrollSuccess.children().length != 0);
          $(this).find(sentimentScrollDanger).parent().toggle(sentimentScrollDanger.children().length != 0);
        });
      }, 500);
    });
    setTimeout(function () {
      sentimentTotalSuccess.clone().prependTo(sentimentScrollSuccess);
      sentimentTotalDanger.clone().prependTo(sentimentScrollDanger);
      autoHeight();
      sentimentLoad.addClass('is-load');
    }, 500);
  }

  afterLoad();
  doc.on('click', sentimentTone, function () {
    var status = $(this).data('status');
    params.status = status;
    params.action = 'all';
    sentimentLoad.removeClass('is-load');
    loadReviews();
    params.action = 'load-comments';
    $(sentimentTone).removeClass('is-select');
    $(this).addClass('is-select');
    $('.sentiment-graph-tag').find(sentimentTool).css('display', 'flex');

    if ($('.is-success.js-sentiment-status.is-select').length != 0) {
      sentimentTitle.removeClass('is-success is-danger').html('All positive entities');
      sentimentTool.find('.sentiment-graph-back-text').html('All entities');
    } else {
      sentimentTitle.removeClass('is-success is-danger').html('All negative entities');
      sentimentTool.find('.sentiment-graph-back-text').html('All entities');
    }

    sentimentScroll.html('');
    afterLoad();
    setTimeout(function () {
      sentimentChart.update({
        chart: {
          zoomType: ''
        }
      });
    }, 500);
  });
  doc.on('click', sentimentBookmaker, function () {
    $(sentimentBookmaker).removeClass('is-select');
    params.bookmakerId = $(this).attr('data-id');
    $(this).addClass('is-select');
    params.action = 'all';
    sentimentLoad.removeClass('is-load');
    loadReviews();
    params.action = 'load-comments';
    return false;
  }); // Interaction

  var sentimentFromMore = '.js-sentiment-from-more',
      sentimentFromBlock = $('.js-sentiment-from-block');
  doc.on('click', sentimentFromMore, function () {
    sentimentFromBlock.toggleClass('is-open');
  });
  var chartSeries = $('.highcharts-series'),
      chartPoint = '.highcharts-point',
      chartLabel = '.highcharts-label';
  doc.on('click', sentimentItem, function () {
    var seriesVal = $(this).data('series'),
        tagId = $(this).data('id');

    if (sentimentChart.drillUpButton === undefined) {
      sentimentChart.series[seriesVal].data[0].doDrilldown();
    } else {
      $(sentimentItem).removeClass('is-focus');
      $(this).addClass('is-focus');
      params.tagId = tagId;
      loadReviews();
      return false;
    }
  });
  doc.on('mouseover mouseout', sentimentItem, function () {
    var seriesVal = $(this).data('series');

    if (sentimentChart.drillUpButton === undefined) {
      chartSeries.toggleClass('highcharts-series-inactive');
      $('.highcharts-series-' + seriesVal).removeClass('highcharts-series-inactive');
      $('.highcharts-series-' + seriesVal).find('span').toggleClass('is-hover');
      $(reviewHighlight).toggleClass('is-disable');
      $('' + reviewHighlight + '[data-series=' + seriesVal + ']').removeClass('is-disable');
    } else {
      $(chartPoint).toggleClass('is-disable');
      $(chartPoint).eq(seriesVal).removeClass('highcharts-point-hover is-disable');
      $('.highcharts-data-label:nth-child(' + (seriesVal + 1) + ')').find('span').toggleClass('is-hover');
      $(reviewHighlight).toggleClass('is-disable');
      $('' + reviewHighlight + '[data-series=' + seriesVal + ']').removeClass('is-disable');
    }
  });
  doc.on('click', chartLabel, function () {
    if (sentimentChart.drillUpButton === undefined) {
      return false;
    } else {
      $(sentimentChart.series[0].data).each(function (i, data) {
        var condition = $(chartPoint).eq(i).hasClass('highcharts-point-hover');

        if (condition) {
          $('' + sentimentItem + '[data-series=' + i + ']').trigger('click');
        }
      });
    }
  });
  doc.on('mouseover', chartLabel, function () {
    if (sentimentChart.drillUpButton === undefined) {
      return false;
    } else {
      $(this).addClass('highcharts-label-hover');
      var activePoint = $('.highcharts-label-hover'),
          activePointIndex = activePoint.index();
      $(chartPoint).eq(activePointIndex).addClass('highcharts-point-hover');
      $(sentimentChart.series[0].data).each(function (i, data) {
        var condition = $(chartPoint).eq(i).hasClass('highcharts-point-hover');
        $('' + sentimentItem + '[data-series=' + i + ']').toggleClass('is-hover', condition);
        $('.highcharts-label-hover').find('span').addClass('is-hover');

        if (condition) {
          $(chartPoint).addClass('is-disable');
          $('.highcharts-point.highcharts-point-hover').removeClass('is-disable');
          $(reviewHighlight).addClass('is-disable');
          $('' + reviewHighlight + '[data-series=' + i + ']').removeClass('is-disable');
        }
      });
    }
  });
  doc.on('mouseout', chartLabel, function () {
    if (sentimentChart.drillUpButton === undefined) {
      return false;
    } else {
      $(sentimentItem).removeClass('is-hover');
      $(chartPoint).removeClass('highcharts-point-hover is-disable');
      $(chartLabel).removeClass('highcharts-label-hover').find('span').removeClass('is-hover');
      $(reviewHighlight).removeClass('is-disable');
    }
  });
  if (sentimentPagination.length > 0) pagination();
  doc.on('click', sentimentBack, function () {
    if (sentimentChart.drillUpButton === undefined) {
      if ($('.js-sentiment-status.is-select').length === 0) {
        $('.highcharts-drillup-button').trigger('click');
      } else {
        params.status = 0;
        params.action = 'all';
        sentimentLoad.removeClass('is-load');
        loadReviews();
        params.action = 'load-comments';
        $(sentimentTone).removeClass('is-select');
        sentimentTool.hide();
        sentimentTitle.removeClass('is-success is-danger').html('All entities');
        sentimentScroll.html('');
        afterLoad();
        setTimeout(function () {
          sentimentChart.update({
            chart: {
              zoomType: ''
            }
          });
        }, 500);
      }
    } else {
      $('.highcharts-drillup-button').trigger('click');
    }
  });
  doc.on('click', sentimentFull, function () {
    var sentimentScrollHeight = $(this).siblings().outerHeight();
    $(this).fadeOut(300);
    $(this).parent().css('max-height', sentimentScrollHeight + 10);
  });
  doc.on('click', reviewFull, function () {
    var reviewTextHeight = $(this).parent().parent().find(reviewText).outerHeight();
    $(this).fadeOut(300);
    $(this).parent().parent().find(reviewBody).css('max-height', reviewTextHeight);
  });
  doc.on('click', modalShow, function () {
    html.css('overflow', 'initial');
    modalTarget.forEach(function (modalTarget) {
      disableBodyScroll(modalTarget, BodyScrollOptions = {
        reserveScrollBarGap: true
      });
    });
    doc.on('mouseup touchend', function (e) {
      if ($(e.target).closest(modalWrap).length) return;
      html.css('overflow', '');
      modalTarget.forEach(function (modalTarget) {
        enableBodyScroll(modalTarget);
      });
    });
    return false;
  });
  doc.on('click', modalHide, function () {
    html.css('overflow', '');
    modalTarget.forEach(function (modalTarget) {
      enableBodyScroll(modalTarget);
    });
  });
  sentimentSources.on('click', 'button', function (e) {
    e.preventDefault();
    sentimentSourcesItem.removeClass('is-select');
    $(this).addClass('is-select');
    params.action = 'all';
    sentimentLoad.removeClass('is-load');
    params.sources = parseInt($(this).attr('data-sources'));
    loadReviews();
    params.action = 'load-comments';
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js")))

/***/ })

}]);