# CoffeeScript 勉強会

## 目次

1. 概要
2. 環境準備
3. 基本文法（さわってみる）
4. メリット・デメリット

## 概要

[http://coffeescript.org/](http://coffeescript.org/)

JavaScript のトランスレータ（**シンタックスシュガー**、 **AltJS**）

AltJS は他に [TypeScript](//www.typescriptlang.org/) や [Haxe](//haxe.org/)
、[JSX](http://jsx.github.io/) 、 [Dart](https://www.dartlang.org/) も有名

> AltJS の種類
> 
> * 単純に JavaScript のシンタックスシュガーという位置付けの言語 (CoffeeScript)
> * 完全に別言語なクライアントサイド言語 (Dart)
> * 言語として独自の機能は有するが最終的には JavaScript に変換する言語 (TypeScript, Haxe, JSX)

---

Ruby, Python などに影響を受けた簡易な文法

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

**コンパイルされた JavaScript は人間にも読みやすいきれいなコードでベストプラクティスなコード**

現在策定中の次期 JavaScript （ECMAScript 6） の元になっている

Node.js での採用率が高い

Ruby on Rails で標準サポート

GitHub で採用されている

## 環境準備

### インストール

#### Node.js, npm

[https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

```shell
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

### コンパイル

```shell
coffee -c script.coffee
```

```shell
coffee -c -w script.coffee
```

[http://coffeescript.org/#usage](http://coffeescript.org/#usage)

* [Grunt](http://gruntjs.com/)
* [gulp.js](http://gulpjs.com/)

[Try CoffeeScript](http://coffeescript.org/#try:)

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

### 文字列、ヒアドキュメント

```coffeescript
html = '''
       <div>
         <h1>title</h1>
       </div>
       '''
```

`"` (ダブルクオート) で式展開

```coffeescript
name = 'sato'

say = "Hello #{name}"
```

## オブジェクト、配列

```coffeescript
obj =
  name: 'sato'
  age: 30
  sex: 'male'

arr = [
  'name1'
  'name2'
  'name3'
  'name4'
]

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
add = (x, y) -> x + y
```

引数にはデフォルト値をとれる

```coffeescript
add = (x = 2, y = 4) -> x + y
```

可変長引数

```coffeescript
func = (arg1, arg2, args...) ->
  alert arg1 # -> 1
  alert arg2 # -> 2
  alert args # -> 3, 4, 5

a = [
  1, 2, 3, 4, 5
]

func a...
```

#### 呼び出し

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

`if` 文
```coffeescript
if hoge
  console.log hoge
else
  console.log fuga
```

後置 `if`
```coffeescript
console.log hoge if hoge
```

`unless` 文

```coffeescript
unless hoge
  console.log hoge
```

一行で

```coffeescript
if hoge then console.log hoge
```

連結

```coffeescript
if 0 < 3 < 6
  console.log true
```

`for`

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
  sex: 'male'

for val, key in obj
  console.log key
  console.log val
```

```coffeescript
obj =
  name: 'sato'
  age: 30
  sex: 'male'

for key of obj
  console.log key
```

### 三項演算子

```coffeescript
sum = if x? then x else y
```

### 演算子

CoffeeScript   | JavaScript
------------   | ----------
is             | ===
isnt           | !==
not            | !
and            | &&
or             | &#124;&#124;
true, yes, on  | true
false, no, off | false
@, this        | this
of             | in

### 存在演算子

`?`

```coffeescript
sato = true if sato? and not female and age is 30

speed = 0
speed ?= 60

func?()
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

```coffeescript
class Rollover

  # クラス変数
  @defaults =
    offStr: '_off'
    onStr: '_on'

  # プライベート関数
  _prepareSrcs = ->
    opt = @options

    @srcOff = @$img.attr 'src'
    @srcOn = @srcOff.replace opt.offStr, opt.onStr

  _preload = -> $('<img />').attr 'src', @srcOn



  # コンストラクタ関数
  constructor: (el, options) ->
    @options = $.extend {}, Rollover.defaults, options
    @el = el
    @$el = $(el)
    @$img = $el.find 'img'

    _prepareSrcs.call @
    _preload.call @
    @eventify()


  # パブリックメソッド（prototypeメソッド）
  toOver: ->
    @$img.attr 'src', @srcOn
    return this

  toNormal: ->
    @$img.attr 'src', @srcOff
    return this

  eventify: ->
    @$el.on 'mouseenter.rollover', => @toOver()
    @$el.on 'mouseleave.rollover', => @toNormal()
    return this

  rmEvent: ->
    @$el.off 'mouseenter.rollover'
    @$el.off 'mouseleave.rollover'
    return this

  destroy: ->
    @$el.remove()
    delete @
```


## `=>` (ファットアロー)

`this` の束縛

`this` が常に現在のインスタンスになる

```coffeescript
class Person
  message: 'Hello'

  say: => alert @message

person = new Person
$('#say').click person.say
```


## `` ` ` `` (バックティック)

素の JavaScript も書ける

```coffeescript
`var add = function(x, y) {
  return x + y;
};`

add 3, 4
```

## メリット・デメリット

### 問題点

* 読みづらい >> 慣れ
* デバッグが難しい >> ソースマップがサポートされている
* JavaScript の理解が必要 >> そうでもない
* 将来の保証がない >> Node.js で採用率高、Ruby on Rails で標準サポート、実際に ES6 の元になった

---

### メリット

* 記述量が大幅に減る 半分から1/3 
* 実績があり、良い意味で枯れている (2009~)
* JavaScript からの移行コストが低い
* オブジェクト指向と相性が良い
* 生成コードが綺麗で読みやすく、良いコード

### デメリット

* コンパイル作業の手間
* JavaScript の理解が必要
