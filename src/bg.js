const isMarketPlaceExcluded = url => /(?:%3A|=)AN1VRQENFRJN5&/i.test(url + '&');

const isSearchPage = url => {
	if (!url) {
		return false;
	}
	url = url.toLowerCase();
	return url.startsWith('https://amazon.co.jp/s?') || url.startsWith('https://www.amazon.co.jp/s?');
};

const toggle = (tab, on) => {
	if (!isSearchPage(tab.url)) {
		return;
	}

	if (on) {
		if (!isMarketPlaceExcluded(tab.url)) {
			chrome.tabs.update(tab.id, { url: tab.url + "&emi=AN1VRQENFRJN5"});
		}
	} else {
		if (isMarketPlaceExcluded(tab.url)) {
			chrome.tabs.update(tab.id, { url: tab.url.replace(/([?&])[^=]+=[^&]*AN1VRQENFRJN5(&|$)/ig, "$1")});
		}
	}
};

const updateIcon = (tab, on) => {
	let path, title;
	if (isSearchPage(tab.url)) {
		if (on) {
			path = 'on';
			title = 'クリックすると「Amazon販売・Amazon発送のみの表示」を解除します';
		} else {
			path = 'icon48';
			title = 'クリックすると「Amazon販売・Amazon発送のみの表示」に切り替えます';
		}
	} else {
		path = 'disabled';
		title = 'この画面では利用できません';
	}

	chrome.browserAction.setIcon({ path: path + '.png' });
	chrome.browserAction.setTitle({ title });
};

chrome.tabs.onActivated.addListener(info => {
	chrome.tabs.get(info.tabId, tab => {
		updateIcon(tab, isMarketPlaceExcluded(tab.url));
	});
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
	if (info.status === 'loading') {
		updateIcon(tab, isMarketPlaceExcluded(tab.url));
	}
});

chrome.browserAction.onClicked.addListener(tab => {
	toggle(tab, !isMarketPlaceExcluded(tab.url));
	updateIcon(tab, isMarketPlaceExcluded(tab.url));
});

chrome.windows.onFocusChanged.addListener(windowId => {
	chrome.tabs.query({ windowId, active: true}, tabs => {
		let t = tabs[0];
		if (t) {
			updateIcon(t, isMarketPlaceExcluded(t.url));
		}
	});
});
