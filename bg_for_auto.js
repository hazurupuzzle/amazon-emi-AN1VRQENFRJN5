// ※このスクリプトは利用しないが個人的なメモとして残す
// 開発初期は自動で切り替わるよう実装していたが、
// カテゴリによって検索結果が0件になったりする問題が発覚 (例えば、Androidアプリなどのカテゴリ)
// Amazonの仕様を調べてメンテし続ける気力はないので自動での切り替わりの開発はストップ
const off = () => localStorage.off,
	run = (id, code) => chrome.tabs.executeScript(id, { code }),
	isEmiAn = url => /(?:%3A|=)AN1VRQENFRJN5&/i.test(url + '&'),
	toggleBase = `
(s => {
	s.innerHTML = '* { display: none!important; }';
	document.body.append(s);	
})(document.createElement('style'));
window.location.replace`;
toggle = (tab, on) => {
	if (on) {
		if (!isEmiAn(tab.url)) {
			run(tab.id, toggleBase + '(window.location + "&emi=AN1VRQENFRJN5")');
		}
	} else {
		if (isEmiAn(tab.url)) {
			run(tab.id, toggleBase + '(window.location.href.replace(/([?&])[^=]+=[^&]*AN1VRQENFRJN5(&|$)/ig, "$1"))');
		}
	}
};

const filterUrls = ["https://amazon.co.jp/s?*", "https://www.amazon.co.jp/s?*"],
	updateTabs = () => chrome.tabs.query({ url: filterUrls }, tabs => tabs.forEach(tab => toggle(tab, !off())));

fetch(chrome.extension.getURL('manifest.json')).then(res => res.text()).then(json => {
	json = JSON.parse(json.replace(/\/\*[\s\S]+\*\//g, ''));
	if (!json.background.persistent) {
		chrome.tabs.onUpdated.addListener((id, info, tab) => {
			if (tab.url && info.status && info.status === 'loading' && /^https?:\/\/(?:www\.)?amazon\.co\.jp\/s\?./i.test(tab.url)) {
				toggle(tab, !off());
			}
		});
	} else {
		// 常駐するまでもないと思ったが動作が不快だったので、常駐する実装にした
		chrome.webRequest.onBeforeRequest.addListener(
			e => off()
				? (isEmiAn(e.url) ? { redirectUrl: e.url.replace(/([?&])[^=]+=[^&]*AN1VRQENFRJN5(&|$)/ig, '$1') } : void 0)
				: (isEmiAn(e.url) ? void 0 : { redirectUrl: e.url + '&emi=AN1VRQENFRJN5' }),
			{ urls: filterUrls, types: ["main_frame"] },
			["blocking"]);
	}
});

chrome.browserAction.onClicked.addListener(callback => {
	off() ? localStorage.removeItem('off') : (localStorage.off = 1);

	chrome.browserAction.setIcon({ path: off() ? "off48.png" : "on.png" });

	updateTabs();
});

chrome.runtime.onInstalled.addListener(updateTabs);
chrome.runtime.onStartup.addListener(updateTabs);
