theme: jdan/cleaver-retro
style: slide.css

--

# ES6 (ECMAScript 2015), Babel 技術共有会

--

## 目次

1. 概要
2. 環境準備
3. 文法や機能
4. メリット・デメリット

--

## 概要

--

### ES6 (ECMAScript 2015)

2015年6月18日に正式に仕様策定完了

[http://www.ecma-international.org/ecma-262/6.0/](http://www.ecma-international.org/ecma-262/6.0/)

ブラウザによってはすでに対応済みの機能（Firefox -> Arrow Function、 Chrome -> Template Strings）もあり、今後、順次ブラウザが対応していくはず

Node.js でもすでにオプションで有効可

--

### Babel

https://babeljs.io/

ES6, ES7 用トランスパイラ

ES6, ES7 で書かれたファイルを ES5 に変換

--

#### トランスパイラ主要2つ

* https://github.com/babel
  * 今のところの主流
  * 機能、文法のカバー率が高く ES7 のカバー率も高い http://kangax.github.io/compat-table/es7/
  * だいたいのビルドツール、タスクランナー用のプラグインや、エディタのシンタックスハイライト用プラグイン、Browserify Transformなども公式で有
  * JSX をコンパイラ通さなくても理解してくれる
* https://github.com/google/traceur-compiler
  * Google 製
  * ランタイムエンジンも配布してるのでアクセス時変換可

--

#### ES6, 7 の各ブラウザやトランスパイラの対応状況

http://kangax.github.io/compat-table/es6/

--

## 環境準備

--

### REPL

Babel はブラウザで試せます

https://babeljs.io/repl/

--

### トランスパイラ

https://github.com/babel/babel

それぞれビルドツールなどのプラグインも用意されてる

* https://github.com/babel/babel-loader
* https://github.com/babel/babel-sublime
* https://github.com/babel/babelify
* https://github.com/babel/grunt-babel
* https://github.com/babel/gulp-babel

当リポジトリをクローンして試せます

1. git clone git@github.com:sugarshin/study-mtg.git
2. cd study-mtg/es6
3. npm i
4. npm start
5. main.babel.js を編集
6. 監視トランスパイル => main.js

--

## 文法や機能

参考：

https://babeljs.io/docs/learn-es2015/
https://github.com/lukehoban/es6features#readme

--

### アロー関数

```
var multi = (num) => {
  return num * num;
};

var multi = num => {
  return num * num;
};

var multi = num => num * num;

var result = array.map(el => el + 2);
```
--

デフォルト引数

```
var multi = (num = 2) => {
  return num * num;
};
```

--

this の制御

```
class Button {
  constructor(el) {
    this.el = el;
    this.el.addEventListener('click', () => {
      this.show();
    });
  }

  show() {
    console.log(this.el.textContent);
  }
}

var el = document.querySelector('.button');
new Button(el);
```

--

### クラス

```
class SkinnedMesh extends THREE.Mesh {

  constructor(geometry, materials) {
    super(geometry, materials); // 親クラスのコンストラクタ関数を実行

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }

  update(camera) {
    //...
    super.update(); // 親クラスのメソッドを実行
  }

  static defaultMatrix() { // スタティックメソッド（クラスメソッド）
    return new THREE.Matrix4();
  }

}
```

--

### オブジェクトリテラルの機能強化

```
var obj = {
  // __proto__ を明示的に宣言可
  __proto__: theProtoObj,

  // handler: handler, のショートハンド
  handler,

  // メソッド
  toString() {
    // 親クラス（prototype を辿って最初に発見されたオブジェクト）のメソッドを参照、実行可
    return "d " + super.toString();
  },

  // オブジェクト定義時に動的にプロパティ名を指定可
  // これまで => var o = {}; o['prop' + (function() {return 1;})()] = 'value';
  [ "prop_" + (() => 42)() ]: 42
};
```

--

### Template Strings

ヒアドキュメント、変数展開など

[ここ](http://js-next.hatenablog.com/entry/2014/11/22/042055)が詳しい

```
var str1 = `あいうえお
かきくけこ`；

var str2 = 'あいうえお\nかきくけこ'；

str1 === str2; // true

var arg = 'hello';
var msg = `${arg} sato!`;
```

--

### 分割代入

http://js-next.hatenablog.com/entry/2015/05/18/181956

```
var [a, , b] = [1, 2, 3];
// a => 1, b => 3

var o = {
  a: 1,
  b: 2
};

var { a, b } = o;
// a => 1, b => 2

import React, { Componet, PropTypes } from 'react';
```

--

### import, export

```
import $ from 'jquery';

import 'whatwg-fetch'; // 代入が必要ない場合

import { EventEmitter } from 'events';



export default funtion add(x, y) {
  return x + y;
}

export default class Sub extends Super {

}

export const PI = 3.14;
```

などなど

--

## メリット・デメリット

Babel でも Traceur compiler でも、ES5 なので、IE8 以下もサポートの場合は対応が必要（[es5-shim](https://github.com/es-shims/es5-shim) とか）

--

### メリット

* 貧弱だった言語機能が強化
* AltJSなどで実現してきたものが組み込まれた
* 標準仕様なので信頼性、将来性は保証されている

--

### デメリット
