# CoffeeScript 勉強会

## 目次

1. 概要
2. 環境準備
3. 基本文法
4. メリット・デメリット

## 概要

[http://coffeescript.org/](http://coffeescript.org/)

Ruby, Python, Haskell から影響を受けた JavaScript の**シンタックスシュガー** (AltJS)

他に [TypeScript](//www.typescriptlang.org/) や [Haxe](//haxe.org/) も有名

JavaScript に比べて読みやすい、書きやすい、タイプ量が少ない

**JavaScript**

```js
var add = function(x, y) {
  return x + y;
};
```

**CoffeeScript**

```coffeescript
add = (x, y) -> x + y
```

**コンパイルされた JavaScript は人間にも読みやすいきれいなコード**

Node.js での採用率1位

Ruby on Rails で標準サポート

## 環境準備

[Try CoffeeScript](http://coffeescript.org/#try:)

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

coffee -v
CoffeeScript version 1.8.0
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

可変長引数

```coffeescript
func = (arg1, arg2, args...) ->
  alert arg1 # -> 1
  alert arg2 # -> 2
  alert args # -> 3, 4, 5
  return

a = [
  1, 2, 3, 4, 5
]

func a...
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

## 制御構文

```coffeescript
if hoge
  console.log hoge
else
  console.log fuga
```

```coffeescript
if hoge then console.log hoge
```

```coffeescript
len = 8

for i in [0...len]
  console.log i
```

```coffeescript
len = 8

for i in [0..len]
  console.log i
```


```coffeescript
arr = [1, 3, 4, 6, 7]

for num, index in arr
  console.log num
  console.log index
```


```coffeescript
obj =
  name: 'sato'
  age: 30
  sex: male

for val, key in obj
  console.log key
  console.log val
```

```coffeescript
obj =
  name: 'sato'
  age: 30
  sex: male

for key of obj
  console.log key
```

### 三項演算子

```coffeescript
sum = if x? then x else y
```


## `class` 構文

```coffeescript
class Animal
```

```js
var Animal;

Animal = (function() {
  function Animal() {}

  return Animal;

})();
```

## `=>`

`this` の束縛

`this` は常に現在のインスタンスになる

```coffeescript
class Person
  message: 'Hello'

  say: =>
    alert @message

person = new Person
$('#say').click person.say

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
* 配列内包
* プロパティの存在チェック

### デメリット

* JS の理解が必要
* コンパイル作業の手間


[CoffeeScriptのメリット・デメリット](http://matome.naver.jp/odai/2133344529212410501)
