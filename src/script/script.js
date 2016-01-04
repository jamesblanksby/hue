/* //////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////// DOCUMENT /// */
/* //////////////////////////////////////////////////////////////////////////////// */

/* ---------------------------------------------------------------------- READY --- */
$(document).ready(function() {
	init();
});

/* ------------------------------------------------------------------------ VAR --- */


/* ----------------------------------------------------------------------- INIT --- */
function init() {
	convert_init();
	compare_init();
	board_init();
}


/* //////////////////////////////////////////////////////////////////////////////// */
/* ////////////////////////////////////////////////////////////////// CLIPBOARD /// */
/* //////////////////////////////////////////////////////////////////////////////// */

/* ----------------------------------------------------------------------- COPY --- */
function clipboard_copy() {
	var client = new ZeroClipboard($('[data-clipboard-text]'));
	var timeout;

	client.on('ready', function() {
		client.on('aftercopy', function(event) {
			var text = $(event.target).attr('data-clipboard-text');
			clearTimeout(timeout);
			$('body .message').remove();
			$('body').append('<div class="message">copied: <span>' + text + '</span></div>');
			timeout = setTimeout(function() {
				$('body .message').remove();
			}, 3000);
	  	});
	});
}


/* //////////////////////////////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////// CONVERT /// */
/* //////////////////////////////////////////////////////////////////////////////// */

/* ----------------------------------------------------------------------- INIT --- */
function convert_init() {
	convert_focus();
	convert_keydown();
}

/* ---------------------------------------------------------------------- FOCUS --- */
function convert_focus() {
	if ($('.input').length > 0) {
		$('.input input[type="text"]').focus();
	}
}

/* -------------------------------------------------------------------- KEYDOWN --- */
function convert_keydown() {
	$('.input input[type="text"]').on('keyup', function(event) {
		var color = $(this).val();

		if (color === '') convert_reset();

		color = tinycolor(color);
		if (color.isValid()) {
			$result = $('.result');
			$result.find('.hex').text(color.toHexString()).attr('data-clipboard-text', color.toHexString());
			$result.find('.rgb').text(color.toRgbString()).attr('data-clipboard-text', color.toRgbString());
			$result.find('.hsl').text(color.toHslString()).attr('data-clipboard-text', color.toHslString());

			if (color.toName() !== false) {
				$result.find('.name').text(color.toName()).attr('data-clipboard-text', color.toName());
			}

			$('.convert').css('background-color', color.toHexString());
			$('body').removeClass('dark');
			if (color.isDark()) {
				$('body').addClass('dark');
			}

			$result.addClass('display');

			history.replaceState({}, '', BASE_URL + '/' + color.toHex());

			clipboard_copy();

			if (event.originalEvent !== undefined) {
				convert_save(color.getOriginalInput(), event);
			}
		}
	}).trigger('keyup');
}

/* ----------------------------------------------------------------------- SAVE --- */
function convert_save(color, event) {
	$.ajax({
		url: BASE_URL + '/src/include/color-save.php', 
		type: 'post',
		cache: false,
		data: {color:color},
		success: function(data) {
			if ($.trim(data) == 'true') {
				board_update(color);
			}
		}
	});
}

/* ---------------------------------------------------------------------- RESET --- */
function convert_reset() {
	$result = $('.result');
	$result.find('div').text('');
	$result.removeClass('display');
	$('.convert').css('background-color', '');
	$('body').removeClass('dark');
	history.replaceState({}, '', BASE_URL);
}


/* //////////////////////////////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////// COMPARE /// */
/* //////////////////////////////////////////////////////////////////////////////// */

/* ----------------------------------------------------------------------- INIT --- */
function compare_init() {
	if ($('.compare').length > 0) {
		compare_render();
	}
}

/* --------------------------------------------------------------------- RENDER --- */
function compare_render() {
	if ($('.compare .palette').length > 0) {
		var okay_count = 0;
		$('.compare .palette').each(function() {
			var $palette = $(this);
			var color = $palette.data('color');

			color = tinycolor(color);
			if (color.isValid()) {
				okay_count++;
				$palette.css('background-color', color.toHexString());
				$palette.find('.hex').text(color.toHexString()).attr('data-clipboard-text', color.toHexString());
				$palette.find('.rgb').text(color.toRgbString()).attr('data-clipboard-text', color.toRgbString());
				$palette.find('.hsl').text(color.toHslString()).attr('data-clipboard-text', color.toHslString());

				if (color.isDark()) {
					$palette.addClass('dark');
				}
			} else {
				$palette.remove();
			}
		});

		if (okay_count > 0) {
			clipboard_copy();
		}
	}
}


/* //////////////////////////////////////////////////////////////////////////////// */
/* ////////////////////////////////////////////////////////////////////// BOARD /// */
/* //////////////////////////////////////////////////////////////////////////////// */

/* ----------------------------------------------------------------------- INIT --- */
function board_init() {
	if ($('.board').length > 0) {
		board_render();
	}
}

/* --------------------------------------------------------------------- RENDER --- */
function board_render() {
	if ($('.board .palette').length > 0) {
		var okay_count = 0;
		$('.board .palette').each(function() {
			var $palette = $(this);
			var color = $palette.data('color');

			color = tinycolor(color);
			if (color.isValid()) {
				okay_count++;
				$palette.css('background-color', color.toHexString());
				$palette.find('.hex').text(color.toHexString()).attr('data-clipboard-text', color.toHexString());
				$palette.find('.rgb').text(color.toRgbString()).attr('data-clipboard-text', color.toRgbString());
				$palette.find('.hsl').text(color.toHslString()).attr('data-clipboard-text', color.toHslString());

				if (color.isDark()) {
					$palette.addClass('dark');
				}
			} else {
				$palette.remove();
			}
		});

		if (okay_count > 0) {
			clipboard_copy();
		}
	}
}

/* --------------------------------------------------------------------- UPDATE --- */
function board_update(color) {
	var code = '';
	code += '<div class="palette" data-color="' + color + '">';
	code += '<div class="info">';
	code += '<div class="hex"></div>';
	code += '<div class="rgb"></div>';
	code += '<div class="hsl"></div>';
	code += '</div>';
	code += '</div>';

	$('.board').prepend(code);

	board_render();	
}