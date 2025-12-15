$(document).ready(function () {


	// hide header on scroll
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.header').outerHeight();

	$(window).scroll(function (event) {
		didScroll = true;
	});

	setInterval(function () {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();

		if (Math.abs(lastScrollTop - st) <= delta)
			return;

		if (st > lastScrollTop && st > navbarHeight) {
			$('.header').removeClass('nav-down').addClass('nav-up');
			{
			}
		} else {
			if (st + $(window).height() < $(document).height()) {
				$('.header').removeClass('nav-up').addClass('nav-down');
			}
		}

		lastScrollTop = st;
	}
	//прилипающие меню
	var $menu = $(".header");
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0 && $menu.hasClass("default")) {
			$menu.removeClass("default").addClass("fixed");
		} else if ($(this).scrollTop() <= 0 && $menu.hasClass("fixed")) {
			$menu.removeClass("fixed").addClass("default");
		}

	});

	if ($(this).scrollTop() > 0 && $menu.hasClass("default")) {
		$menu.removeClass("default").addClass("fixed");
	} else if ($(this).scrollTop() <= 0 && $menu.hasClass("fixed")) {
		$menu.removeClass("fixed").addClass("default");
	}

	 /*range slider*/

	$('.input-range').each(function () {
		var $range = $(this).find(".range-controls__slider"),
		$from_input = $(this).find(".input-range__from"),
		$to_input = $(this).find(".input-range__to"),
		from = +$range.attr("from"),
		to = +$range.attr("to"),
		min = +$range.attr("min"),
		max = +$range.attr("max");

		function formatNumber(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		}

		function cleanNumber(str) {
			return str.replace(/\s+/g, '');
		}

		$range.ionRangeSlider({
			type: "double",
			min: min,
			max: max,
			from: from,
			to: to,
			prettify_enabled: true,
			onChange: function () {
				updateValues();
			}
		});

		$range = $range.data("ionRangeSlider");

		var updateValues = function () {
			var res = $range.result;
			$from_input.val(formatNumber(res.from));
			$to_input.val(formatNumber(res.to));
		};

		$from_input
			.on("focus", function () {
				this.value = cleanNumber(this.value);
				this.selectionStart = this.value.length;
			})
			.on("input", function () {
				var val = cleanNumber(this.value);
				$range.update({ from: val });
			})
			.on("blur", updateValues);

		$to_input
			.on("focus", function () {
				this.value = cleanNumber(this.value);
				this.selectionStart = this.value.length;
			})
			.on("input", function () {
				var val = cleanNumber(this.value);
				$range.update({ to: val });
			})
			.on("blur", updateValues);

		updateValues();
	});



	//кнопка sandwich
	$(".sandwich").click(function () {
		if ($(".header__bottom").is(":hidden")) {
			$(".sandwich").addClass("active");
			$(".header__bottom").slideDown(200);
			$(".menu-overlay").fadeIn(200);
			$("body").addClass("no-scroll");
		} else {
			$(".sandwich").removeClass("active");
			$(".header__bottom").slideUp(200);
			$(".menu-overlay").fadeOut(200);
			$("body").removeClass("no-scroll");
		}
	});

	$(".menu-overlay").click(function () {
		$(".sandwich").removeClass("active");
		$(".header__bottom").slideUp(200);
		$(".menu-overlay").fadeOut(200);
		$("body").removeClass("no-scroll");
	});

	//show all chekboxes	
$(".show-more-checkboxes").on("click", function () {
	const $btn = $(this);
	const $list = $btn.siblings(".list-checkboxes");
	const $items = $list.find(".checkbox:nth-child(n+10)");

	const defaultText = $btn.data("text") || $btn.html();

	// сохраняем исходный текст один раз
	$btn.data("text", defaultText);

	if ($items.is(":hidden")) {
		$btn.addClass("active");
		$btn.html('Свернуть <i class="far fa-chevron-down"></i>');
		$items.slideDown(200);
	} else {
		$btn.removeClass("active");
		$btn.html(defaultText);
		$items.slideUp(200);
	}
});

	//footer
	{
		if ($(window).width() < 992) {
			$(".footer__title").click(function () {
				$(this).toggleClass("active");
				$(this).next(".footer__content").slideToggle(200);
			});
		}
	}

	//слайдер

	$('.slider-catalog').slick({
		arrows: true,
		dots: false,
		infinite: true,
		touchThreshold: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					variableWidth: true
				}
			}
		]
	});

	$('.slider-categories').slick({
		arrows: true,
		dots: false,
		infinite: true,
		touchThreshold: 1000,
		slidesToShow: 6,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
					variableWidth: true
				}
			}
		]
	});

		//sidebar catalog
	$(".btn-main_filter").click(function (e) {
		e.preventDefault();
		$(".sidebar-catalog").slideToggle(200);
	});

	$(".input-phone").mask("+7 (999) 999-99-99");


	//Попап менеджер FancyBox
	$(".fancybox").fancybox({
		autoFocus: false,
		backFocus: false,
	});


	objectFitImages();


});


/*polifyl*/
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages = function () { "use strict"; function t(t, e) { return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E" } function e(t) { if (t.srcset && !p && window.picturefill) { var e = window.picturefill._; t[e.ns] && t[e.ns].evaled || e.fillImg(t, { reselect: !0 }), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, { reselect: !0 })), t.currentSrc = t[e.ns].curSrc || t.src } } function i(t) { for (var e, i = getComputedStyle(t).fontFamily, r = {}; null !== (e = u.exec(i));)r[e[1]] = e[2]; return r } function r(e, i, r) { var n = t(i || 1, r || 0); b.call(e, "src") !== n && h.call(e, "src", n) } function n(t, e) { t.naturalWidth ? e(t) : setTimeout(n, 100, t, e) } function c(t) { var c = i(t), o = t[l]; if (c["object-fit"] = c["object-fit"] || "fill", !o.img) { if ("fill" === c["object-fit"]) return; if (!o.skipTest && f && !c["object-position"]) return } if (!o.img) { o.img = new Image(t.width, t.height), o.img.srcset = b.call(t, "data-ofi-srcset") || t.srcset, o.img.src = b.call(t, "data-ofi-src") || t.src, h.call(t, "data-ofi-src", t.src), t.srcset && h.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height), t.srcset && (t.srcset = ""); try { s(t) } catch (t) { window.console && console.warn("https://bit.ly/ofi-old-browser") } } e(o.img), t.style.backgroundImage = 'url("' + (o.img.currentSrc || o.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = c["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(c["object-fit"]) ? n(o.img, function () { o.img.naturalWidth > t.width || o.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto" }) : t.style.backgroundSize = c["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), n(o.img, function (e) { r(t, e.naturalWidth, e.naturalHeight) }) } function s(t) { var e = { get: function (e) { return t[l].img[e ? e : "src"] }, set: function (e, i) { return t[l].img[i ? i : "src"] = e, h.call(t, "data-ofi-" + i, e), c(t), e } }; Object.defineProperty(t, "src", e), Object.defineProperty(t, "currentSrc", { get: function () { return e.get("currentSrc") } }), Object.defineProperty(t, "srcset", { get: function () { return e.get("srcset") }, set: function (t) { return e.set(t, "srcset") } }) } function o() { function t(t, e) { return t[l] && t[l].img && ("src" === e || "srcset" === e) ? t[l].img : t } d || (HTMLImageElement.prototype.getAttribute = function (e) { return b.call(t(this, e), e) }, HTMLImageElement.prototype.setAttribute = function (e, i) { return h.call(t(this, e), e, String(i)) }) } function a(t, e) { var i = !y && !t; if (e = e || {}, t = t || "img", d && !e.skipTest || !m) return !1; "img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]); for (var r = 0; r < t.length; r++)t[r][l] = t[r][l] || { skipTest: e.skipTest }, c(t[r]); i && (document.body.addEventListener("load", function (t) { "IMG" === t.target.tagName && a(t.target, { skipTest: e.skipTest }) }, !0), y = !0, t = "img"), e.watchMQ && window.addEventListener("resize", a.bind(null, t, { skipTest: e.skipTest })) } var l = "fregante:object-fit-images", u = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g, g = "undefined" == typeof Image ? { style: { "object-position": 1 } } : new Image, f = "object-fit" in g.style, d = "object-position" in g.style, m = "background-size" in g.style, p = "string" == typeof g.currentSrc, b = g.getAttribute, h = g.setAttribute, y = !1; return a.supportsObjectFit = f, a.supportsObjectPosition = d, o(), a }();

