# CoffeeScript 勉強会

## 目次

1. 概要
2. 環境準備
3. 基本文法
4. メリット・デメリット

## 概要

[http://coffeescript.org/](http://coffeescript.org/)

Ruby, Python, Haskell から影響を受けた JavaScript の**シンタックスシュガー**

JavaScript に比べて読みやすい、書きやすい、タイプ量が少ない

**JavaScript**

```javascript
var add = function(x, y) {
  return x + y;
};
```

**CoffeeScript**

```coffeescript
add = (x, y) -> x + y
```

`.coffee` ファイルをコンパイルすることで `.js` ファイルが生成されます

コンパイルされた JavaScript は人間にも読みやすいきれいなコード

Node.js での採用率1位


Ruby on Rails で標準サポート

Asset Pipeline という仕組みを使って CoffeeScript を自動的にコンパイル

## 環境準備

### インストール

#### Node.js, npm

[https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

* nodebrew [https://github.com/hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)

```shell
brew install nodebrew

nodebrew install-binary <version>
nodebrew use <version>
```

```
node -v
v0.10.31

npm -v
1.4.23
```

#### CoffeeScript

```shell
npm i coffee-script -g
```


## 文法

### コメント

```coffeescript
# 一行コメント これはコンパイル結果に反映されない

###
ブロックコメント
コンパイル結果に反映される
###
```


### 変数

`var` はいらない

```coffeescript
hoge = '変数'
```

### 関数

`function` が `->`

`{}` はいらない

インデントで入れ子を表現

最後の文が暗黙的に `return` される

```coffeescript
func = -> 'hoge'
```

```coffeescript
add = (x, y) ->
  x + y
```

引数にはデフォルト値をとれる

```coffeescript
add = (x = 2, y = 4) ->
  x + y
```

#### 実行時

`()` は省略可能（曖昧性がない場合）

```coffeescript
add 10, 20
```

```coffeescript
add()
```

jQuery

```coffeescript
$ '#id'
  .css 'color', '#ff0'
```




## メリット・デメリット

### 問題点

* 読みづらい >> 慣れ
* デバッグが難しい >> ソースマップサポートされている
* JS の理解が必要 >> そうでもない
* 将来の保証がない >> Node.js で採用率高　Ruby on Rails で標準サポート

### メリット

* 小さな機能をまとめやすい
* 簡潔な関数
* thisのバインド
* 文字列埋め込み + ヒアドキュメント
* イテレーション
* 配列内包
* プロパティの存在チェック

* JS の理解が必要
* コンパイル作業の手間


[CoffeeScriptのメリット・デメリット](http://matome.naver.jp/odai/2133344529212410501)

**altJS** は他に [TypeScript](//www.typescriptlang.org/) や [Haxe](//haxe.org/) が有名
