(() => {
	const isMarketPlaceExcluded = url => /(?:%3A|=)AN1VRQENFRJN5&/i.test(url + '&');

	const isSearchPage = url => {
		if (!url) {
			return false;
		}
		url = url.toLowerCase();
		return url.indexOf('https://amazon.co.jp/s?') === 0 || url.indexOf('https://www.amazon.co.jp/s?') === 0;
	};
	
	const toggleForBookmarklet = l => {
		const url = l.href;
		if (!isSearchPage(url)) {
			return;
		}
	
		if (isMarketPlaceExcluded(url)) {
			l.replace(url.replace(/([?&])[^=]+=[^&]*AN1VRQENFRJN5(&|$)/ig, '$1'));
		} else {
			l.replace(url + '&emi=AN1VRQENFRJN5');
		}
	};
	
	toggleForBookmarklet(window.location);
})();
