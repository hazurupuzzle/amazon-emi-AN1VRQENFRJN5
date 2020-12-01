## 説明

`amazon.co.jp` の商品検索結果で「Amazon販売・Amazon発送のみの表示」のオプション(`&emi=AN1VRQENFRJN5` パラメータ)の付け外しをするChrome拡張機能です。

[Chromeウェブストアのリンク](https://chrome.google.com/webstore/detail/%E3%80%8Camazon%E8%B2%A9%E5%A3%B2%E3%83%BB%E7%99%BA%E9%80%81%E3%81%AE%E3%81%BF%E3%81%AE%E8%A1%A8%E7%A4%BA%E3%80%8D%E5%88%87%E6%9B%BF/dpcbfimhpjacdgoflenjamkkgjmecgng/related?hl=ja)

## 使い方

1. Amazonの商品の検索結果ページ(例えば https://www.amazon.co.jp/s?k=mp3player) で拡張機能の赤いアイコンをクリックすると「Amazon販売・Amazon発送のみの表示」の絞り込み表示に切り替わり、青いアイコンに色が変わります。
2. 拡張機能の青いアイコンをクリックすると絞り込み表示を解除します
3. この拡張機能を利用できないページでは拡張機能のアイコンが灰色になります。

## ブックマークレット

拡張機能いれたくない場合はブックマークレットをつかってください (githubにはブックマークレットのリンクを貼れないので手動でいれてください…)

```txt
javascript:(function()%7Bvar%20r%3Dfunction%20r(e)%7Breturn%2F(%3F%3A%253A%7C%3D)AN1VRQENFRJN5%26%2Fi.test(e%2B%22%26%22)%7D%3Bvar%20t%3Dfunction%20t(e)%7Bif(!e)%7Breturn%20false%7De%3De.toLowerCase()%3Breturn%20e.indexOf(%22https%3A%2F%2Famazon.co.jp%2Fs%3F%22)%3D%3D%3D0%7C%7Ce.indexOf(%22https%3A%2F%2Fwww.amazon.co.jp%2Fs%3F%22)%3D%3D%3D0%7D%3Bvar%20a%3Dfunction%20a(e)%7Bvar%20n%3De.href%3Bif(!t(n))%7Breturn%7Dif(r(n))%7Be.replace(n.replace(%2F(%5B%3F%26%5D)%5B%5E%3D%5D%2B%3D%5B%5E%26%5D*AN1VRQENFRJN5(%26%7C%24)%2Fgi%2C%22%241%22))%7Delse%7Be.replace(n%2B%22%26emi%3DAN1VRQENFRJN5%22)%7D%7D%3Ba(window.location)%7D)()%3B
```

よくわからないスクリプトを動かしたくない場合は [ブックマークレット用のminify前のコード](https://github.com/hazurupuzzle/amazon-emi-AN1VRQENFRJN5/blob/main/bookmarklet.js) があるのでそれを使ってください。3秒で読める短いコードです。

# 自動では動きません

最初は自動で切り替わるように作っていたのですが、カテゴリによってはうまく機能しない問題が発覚しました。
たとえば、Androidアプリのカテゴリで検索したページで `&emi=AN1VRQENFRJN5` をつけると検索結果が0件になってしまいます。頑張ればできるとは思いますが面倒すぎて諦めました。

[GitHubに自動で動くかもしれないソース](https://github.com/hazurupuzzle/amazon-emi-AN1VRQENFRJN5/blob/main/bg_for_auto.js) が打ち捨てられているので察してください。

