# InfiniteLoading-for-Movable-Type
Movable Type 6のData APIを使って、インデックス、カテゴリアーカイブに無限スクロールを実装するJavascript

【使い方】
① headタグ内に下のスクリプトを入れる。
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

- インデックスアーカイブの場合
②テンプレートのheadタグ内に下のスクリプトを入れる。
<script src="//hoge.com/js/InfiniteLoading.js" id="loading" data-mode="index" data-style="pc"></script>

- カテゴリアーカイブの場合
②テンプレートのheadタグ内に下のスクリプトを入れる。
<script src="//hoge.com/js/InfiniteLoading.js" id="loading" data-mode="category"  data-categoryid="<$MTCategoryID$>" data-style="pc"></script>
※もちろんInfiniteLoadingは指定したURLにアップロードしておいてください。

③MTのテンプレートを以下のように構成。（InfiniteLoading.js内でidの指定は可能）

<div id="recentPart">
<MTEntries limit="30">
<!-- 中略 -->
</MTEntries>
</div>
<div id="nowloading"></div>

④CSSで#nowloadingを設定します。
#nowloading {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30px;
  height: 30px;
  background-image: url("http://hoge.com/images/loading.gif"); //ローディング画像のURL（30x30）
  background-position: center;
  background-repeat: no-repeat;
}

⑤あとはスクロールすれば無限スクロールします。

【デザインのカスタマイズ】
scriptのdata-styleの中身を「pc」にすればInfiniteLoading内のfunction pcStyle()のテンプレートでHTMLをはき出します。
scriptのdata-styleの中身を「mobile」にすればInfiniteLoading内のfunction mobileStyle()のテンプレートでHTMLをはき出します。
オリジナルのHTMLにしたい場合は、pcStyle、mobileStyleの中身をいじればOKです。

例)
<script src="//hoge.com/js/InfiniteLoading.js" id="loading" data-mode="index" data-style="mobile"></script>
<script src="//hoge.com/js/InfiniteLoading.js" id="loading" data-mode="category"  data-categoryid="<$MTCategoryID$>" data-style="pc"></script>

【注意】
・data-styleの引数は、"pc"と"mobile"の2つです。
・data-modeの引数は、"index"と"category"の2つです。
・data-modeで"category"をした場合は、data-categoryid=を必ず指定してください。

【免責事項】
・自由に使って頂いてかまいません。クレジットを消さずに使ってくれると大変嬉しいでございます。
・このスクリプトを使ったことによるいかなる損失・損害についても当方では責任を負うものではありませんのでご了承ください。

【参考】
外部ファイルを読み込んだ、無限スクロール(2)
http://creator.mynavi-agent.jp/sougou/feature/webtech/0029.html

Quick reference - Movable Type Data API
https://github.com/movabletype/Documentation/wiki/Quick-reference

javascript 正規表現 画像のURL href のみ抜き出し
http://matomater.com/592/
