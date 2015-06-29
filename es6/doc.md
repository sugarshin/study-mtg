# ES6 (ECMAScript 2015), Babel 技術共有会

## 目次

1. 概要
2. 環境準備
3. 機能
4. メリット・デメリット

## 概要

### ES6 (ECMAScript 2015)

2015年6月18日に正式に仕様策定完了

[http://www.ecma-international.org/ecma-262/6.0/](http://www.ecma-international.org/ecma-262/6.0/)

ブラウザによってはすでに対応済みの機能（Firefox -> Arrow Function、 Chrome -> Template Strings）もあり、今後、順次ブラウザが対応していくはず

Node.js でもすでにオプションで有効可

### Babel

https://babeljs.io/

ES6, ES7 用トランスパイラ

ES6, ES7 で書かれたファイルを ES5 に変換

#### トランスパイラ主要2つ

* https://github.com/babel
  * 今のところの主流
  * 機能、文法のカバー率が高く ES7 のカバー率も高い http://kangax.github.io/compat-table/es7/
  * だいたいのビルドツール、タスクランナー用のプラグインや、エディタのシンタックスハイライト用プラグイン、Browserify Transformなども公式で有
  * JSX をコンパイラ通さなくても理解してくれる
* https://github.com/google/traceur-compiler
  * Google 製
  * ランタイムエンジンも配布してるのでアクセス時変換可

## 環境準備

### REPL

ブラウザで試せます

https://babeljs.io/repl/

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
6. 監視コンパイル

## 機能

参考：

https://babeljs.io/docs/learn-es2015/
https://github.com/lukehoban/es6features#readme

### Arrow Function

```js
var multi = (num) => {
  return num * num;
};

var multi = num => {
  return num * num;
};

var multi = num => num * num;

var result = array.map(el => el + 2);
```

デフォルト引数

```js
var multi = (num = 2) => {
  return num * num;
};
```

this の束縛

```js
class Button {
  constructor(el) {
    this.el = el;
    this.addClickListener();
  }

  addClickListener(callback) {
    this.el.addEventListener('click', callback);
  }

  rmClickListener(callback) {
    this.el.removeEventListener('click', callback);
  }
}

var person = {
  name: 'sato',
  show: function() {
    return this.name;
  }
};

var el = document.querySelector('.el');
el.addEventListener('click', ev => {});
```

## メリット・デメリット

### 問題点

### メリット

### デメリット

http://kangax.github.io/compat-table/es5/
