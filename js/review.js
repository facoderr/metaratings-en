$(document).ready(function() {

	// Review Event

	$('.js-select .select-field').click(function () {
		$(this).parent().toggleClass('is-active');
		$(this).parent().find('.select-dropdown').slideToggle(300);
	});
	$('.js-select-input').keyup(function() {
		$this = $(this);
		$value = $(this).val();
		$this.parents('.js-select').find('li').each(function() {
			let reg = new RegExp($value, 'i');
			if (!$(this).text().match(reg)) {
				$(this).hide();
			} else {
				$(this).show();
			}
		});
	});
	$('.js-select-search li').click(function () {
		let selectValue = $(this).data('value');
		$(this).parents('.js-select').find('.select-field-text').text($(this).text());
		$(this).parents('.js-select').find('.select-input').val(selectValue);
		$('.js-select-search li').show();
		$this.val('');
		$this.parents('.js-select').removeClass('is-active');
		$this.parents('.js-select').find('.select-dropdown').slideUp(300);
	});

	const range = $('.review-publish-range input');

	range.bind('input', (e) => {
		let rangeValue = e.target.value;

		if (rangeValue > 33 && rangeValue < 66) {
			range.parent().removeClass('is-success is-danger');
		} else if (rangeValue <= 33) {
			range.parent().removeClass('is-success');
			range.parent().addClass('is-danger');
		} else if (rangeValue >= 66) {
			range.parent().removeClass('is-danger');
			range.parent().addClass('is-success');
		}
	});

	//
	
});