# InfiniteLoading for Movable Type
Movable Type 6のData APIを使って、インデックス、カテゴリアーカイブに無限スクロールを実装するJavascript

##特徴

- 少しテンプレートをいじってスクリプトを貼り付けるだけで、簡単にMT6に無限スクロールを実装できます。
- 外部ファイルで動作するためスッキリした検索エンジンに優しいHTMLに出来ます。
- assetsをセットしていない記事でもサムネイルを取得出来ます。（記事の1枚目の画像を取得）
- 1つのjsでインデックスアーカイブ、カテゴリアーカイブに対応し、PC版、スマホ版でHTMLの生成を分けることが出来ます。

##使い方

####1. headタグ内に下のスクリプトを入れる。
<pre>&lt;script src=&quot;//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js&quot;&gt;&lt;/script&gt;</pre>

####2. InfiniteLoading.jsを自分用にカスタマイズする。
<pre>
const LIMIT       = 30;                     //読み込むエントリー数
const MT_PATH     = "http://hoge.com/mt/";  //mt.cgiのあるディレクトリのURL
const LOADING_DIV = "#nowloading";          //ローディングを表示するdivの名前
const APPEND_DIV  = "#recentPart";          //生成したHTML追加するdivの名前
const SCRIPT_ID   = "#loading";             //スクリプトのIDの名前</pre>

####3. テンプレートのheadタグ内に下のスクリプトを入れる。

インデックスアーカイブの場合
<pre>&lt;script src=&quot;//hoge.com/js/InfiniteLoading.js&quot; id=&quot;loading&quot; data-mode=&quot;index&quot; data-style=&quot;pc&quot;&gt;&lt;/script&gt;</pre>

カテゴリアーカイブの場合
<pre>&lt;script src=&quot;//hoge.com/js/InfiniteLoading.js&quot; id=&quot;loading&quot; data-mode=&quot;category&quot;  data-categoryid=&quot;&lt;$MTCategoryID$&gt;&quot; data-style=&quot;pc&quot;&gt;&lt;/script&gt;</pre>

※もちろんInfiniteLoadingは指定したURLにアップロードしておいてください。

####4. MTのテンプレートを以下のように構成。

<pre>&lt;div id=&quot;recentPart&quot;&gt;
　&lt;MTEntries limit=&quot;30&quot;&gt;
　　&lt;!-- 中略 --&gt;
　&lt;/MTEntries&gt;
&lt;/div&gt;
&lt;div id=&quot;nowloading&quot;&gt;&lt;/div&gt;</pre>

####5. CSSでnowloadingを設定したら完了。
<pre>#nowloading {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30px;
  height: 30px;
  background-image: url("http://hoge.com/images/loading.gif"); //ローディング画像のURL（30x30）
  background-position: center;
  background-repeat: no-repeat;
}</pre>

ローディング画像は以下のサービスを使うとサクッと作れます。↓↓
http://wayohoo.com/web-service/loader-generator.html

##デザインのカスタマイズ

- scriptのdata-styleの中身を「pc」にすればInfiniteLoading内のfunction pcStyle()のテンプレートでHTMLをはき出します。
- scriptのdata-styleの中身を「mobile」にすればInfiniteLoading内のfunction mobileStyle()のテンプレートでHTMLをはき出します。
- オリジナルのHTMLにしたい場合は、pcStyle、mobileStyleの中身をいじればOKです。

例)
<pre>&lt;script src=&quot;//hoge.com/js/InfiniteLoading.js&quot; id=&quot;loading&quot; data-mode=&quot;index&quot; data-style=&quot;mobile&quot;&gt;&lt;/script&gt;</pre>
<pre>&lt;script src=&quot;//hoge.com/js/InfiniteLoading.js&quot; id=&quot;loading&quot; data-mode=&quot;category&quot;  data-categoryid=&quot;&lt;$MTCategoryID$&gt;&quot; data-style=&quot;pc&quot;&gt;&lt;/script&gt;</pre>

##注意

- data-styleの引数は、"pc"と"mobile"の2つです。
- data-modeの引数は、"index"と"category"の2つです。
- data-modeで"category"をした場合は、data-categoryid=を必ず指定してください。

##クレジット

- 自由に使って頂いてかまいません。
- クレジットを消さずに使ってくれると大変嬉しいです。

##免責事項

- このスクリプトを使ったことによるいかなる損失・損害についても当方では責任を負うものではありませんのでご了承ください。

##参考

外部ファイルを読み込んだ、無限スクロール(2)<br />
http://creator.mynavi-agent.jp/sougou/feature/webtech/0029.html

Quick reference - Movable Type Data API<br />
https://github.com/movabletype/Documentation/wiki/Quick-reference

javascript 正規表現 画像のURL href のみ抜き出し<br />
http://matomater.com/592/

##記事
Movable Type 6のData APIを使ってカンタンに無限スクロールを実装できるJavascript作った！<br />
http://wayohoo.com/programming/javascript/infinite-loading-for-movable-type.html
