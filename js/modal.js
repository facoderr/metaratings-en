$(document).ready(function() {

	// Modal Event

	$(document).on('click', '.js-success', function() {
		$('.js-modal-success').fadeIn().addClass('is-open');
	});
	$(document).on('click', '.js-modal-close', function() {
		$('.js-modal-success').fadeOut().removeClass('is-open');
	});
	$(document).bind('mouseup touchend', function(e) {
		if ($(e.target).closest('.modal-success-wrap').length) return;
		$('.js-modal-success').fadeOut().removeClass('is-open');
	});

	function getSelectedText() {
		let text = ' ';
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection) {
			text = document.selection.createRange().text;
		}
		return text;
	}
	function getSelectedPoint() {
		var sel = document.selection, range;
		var top = 0, left = 0, width = 0, height = 0;
		if (sel) {
			if (sel.type != "Control") {
				range = sel.createRange();
				top = range.boundingTop;
				left = range.boundingLeft;
				width = range.boundingWidth;
				height = range.boundingHeight;
			}
		} else if (window.getSelection) {
			sel = window.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0).cloneRange();
				if (range.getBoundingClientRect) {
					var rect = range.getBoundingClientRect();
					top = rect.top;
					left = rect.left;
					width = rect.right - rect.left;
					height = rect.bottom - rect.top;
				}
			}
		}
		return { top: top, left: left, width: width, height: height };
	}
	$(document).bind('mouseup touchend', function(e) {
		let text = getSelectedText();
		let point = getSelectedPoint();
		if ($(e.target).closest('.js-modal-error').length) {
			return false;
		} else {
			if (text != '' && text != ' ') {
				if (point.height > 30) {
					$('.js-modal-error').css('top', point.top - $('.js-modal-error').outerHeight()).css('left', point.left);
					$('.js-modal-error').show();
				} else {
					$('.js-modal-error').css('top', (point.top + point.height) - 5).css('left', (point.left + point.width) - 15);
					$('.js-modal-error').show();
				}
			} else {
				$('.js-modal-error').hide();
			}
		}
	});

	//

});