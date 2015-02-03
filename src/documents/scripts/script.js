$(function () {
	refreshPositions();

	setTimeout(function () {
		$('#header').addClass('disable-transition');
	}, 400);

	$(window).on('scroll', refreshPositions);

	function refreshPositions () {
		var scroll = document.body.scrollTop / 120;

		$('.triangle').each(function (i, e) {
			e = $(e);

			var data = {},
				transform = '';

			if (scroll > 1) {
				scroll = 1;
			}

			$.each(e.data(), function (prop, value) {
				var matches = prop.match(/(pr[1-9])(.*)/),
					propName, propData;

				if (matches && matches.length > 1) {
					propName = matches[1];
					propData = matches[2].toLowerCase();
				}

				if (!data[propName]) {
					data[propName] = {};
				}

				data[propName][propData] = value;
			});

			$.each(data, function (i, e) {
				var diff = e.to - e.from,
					val;

				transform += e.prop + '(';

				val = e.from + (diff * scroll);

				transform += val;

				if (/translate/.test(e.prop)) {
					transform += 'px';
				}

				if (/rotate/.test(e.prop)) {
					transform += 'deg';
				}

				transform += ')';
			});

			transform += ' translateZ(0) ';

			e.css({
				transform: transform
			});
		});
	}
});