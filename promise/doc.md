# Promise 技術共有会

## 目次

1. 概要
2. 非同期と同期
3. パターン

## 概要

### Promise とは

> Promiseは非同期処理を抽象化したオブジェクトとそれを操作する仕組みの事をいいます。

http://azu.github.io/promises-book/

> PromiseはJavaScriptで発見された概念ではありません。

http://azu.github.io/promises-book/

#### ブラウザ対応状況

http://caniuse.com/#feat=promises

## 非同期と同期

### 同期処理

**JavaScript ではコードは上から順に1行ずつ実行され、関数を呼び出すと、その関数の実行が終了するまで次の行には進まない**

例えば以下の様な関数があった場合

```js
function search() {
  var result = heavyProcess(); // 結果を返すのに10秒かかる関数
  return result;
}
```

10秒たたないと（`heavyProcess()` が終了するまで）次の行へは進みません。

いわゆるブラウザはフリーズしたようになる

**通常、関数を呼び出すと、戻り値にはその関数の結果（returnで返された値）が返ってくる => 「同期呼び出し」**

### 非同期おさらい

以下の結果は？

```js
console.log('メッセージ1');

setTimeout(function() {
  console.log('メッセージ2');
}, 1000);

console.log('メッセージ3');
```

では以下は？

```js
console.log('メッセージ1');

setTimeout(function() {
  console.log('メッセージ2');
}, 0);

console.log('メッセージ3');
```

`setTimeout` は非同期関数です

非同期処理に関しての参考：

* http://www.slideshare.net/checkpoint77/python-39105106
* https://www.htmlhifive.com/conts/web/view/study-room/async-programming-with-deferred

### Promise

**JavaScriptでの非同期パターンはコールバックが主流だった**

いわゆるコールバック地獄の懸念がある

そこで、

**ある関数が呼び出されたとき、戻り値として本来渡したい結果を返すのではなく、あるオブジェクトを返しておき、一度関数としては終了（呼び出し元に戻る）し、後で本来返したかった値を返せる状態になったときに、呼び出し元にその値を通知する**

```js
function promiseSetTimeout(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, time);
  }
}

promiseSetTimeout(1000).then(function() {
  console.log('message');
})
```

## パターン

例えば、

> 「$.ajax で何かデータを取ってきて、そのデータを使った要素を作成しDOMに反映したのち、 $.animate でその要素を動かし、完了後に別の要素を $.animate でアニメーションさせ、完了後、1秒待ってから何か処理をする」

というようなことやりたい場合

コールバックパターン雑な一例：

```js
$.ajax('/api/path', {
  success: function(res) {
    var el = '<div id="el">' + res.title + '</div>';
    $(document).append(el);

    $('#el').animate({
      left: 100
    }, {
      success: function() {
        $('#other').animte({
          opacity: 1
        }, {
          success: function() {
            setTimeout(function() {
              alert('完了');
            }, 1000);
          }
        });
      }
    });
  }
});
```

**コールバック地獄**

上記を Promise パターンで実装した場合

雑な一例：

```js
fetchData('/api/path')
  .then(function(res) {
    var el = '<div id="el">' + res.title + '</div>';
    $(document).append(el);
  })
  .then(function() {
    // jQueryではDeferredというPromiseと似た仕様の非同期パターン実装があって
    // これはそれをPromiseオブジェクトに変換し利用した一例
    return Promise.resolve($('#el').animate({left: 100}));
  })
  .then(function() {
    return Promise.resolve($('#other').animate({opacity: 1}));
  })
  .then(function() {
    return promiseSetTimeout(1000);
  })
  .then(function() {
    alert('完了');
  });
```

### エラー処理

```js
function getGeoPosition() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

getGeoPosition()
  .then(function(res) {
    console.log(res.coords.latitude, res.coords.longitude);
  })
  .catch(function(error) {
    console.log(error);
  });
```

### Promise.all

復数の非同期関数を並列で実行し、すべて完了したあとに何か処理したい

`Promise.all` は引数に promise オブジェクトの配列を受け取って、それらがすべて解決（resolve） されたら自身も resolve される

雑な一例：

```js
function async1() {
  return new Promise(function(resolve, reject) {
    // 処理
  });
}

function async2() {
  return new Promise(function(resolve, reject) {
    // 処理
  });
}

function async3() {
  return new Promise(function(resolve, reject) {
    // 処理
  });
}

Promise.all([async1(), async2(), async3()]).then(function(res) {
  // 結果（res）はそれぞれの結果が入った配列で渡される
});
```

### Promise.race

復数の非同期関数を並列で実行し、どれか一つが resolve したら resolve

雑な一例：

```js
function async1() {
  return new Promise(function(resolve, reject) {
    // 処理
  });
}

function async2() {
  return new Promise(function(resolve, reject) {
    // 処理
  });
}

function async3() {
  return new Promise(function(resolve, reject) {
    // 処理
  });
}

Promise.race([async1(), async2(), async3()]).then(function(res) {
  // 仮に `async2()` が一番早く完了したとすると `async2()` の結果だけが渡ってくる
});
```

## 利用には

IE や古い Android ではサポートされていないので対応が必要

ライブラリ

* https://github.com/jakearchibald/es6-promise
* https://github.com/kriskowal/q
* https://github.com/petkaantonov/bluebird （おすすめ）
* https://github.com/then/promise
* https://github.com/getify/native-promise-only

jQuery を使うプロジェクトでは、わざわざ上記ライブラリを利用して Promise で書かなくても、$.Deferred でいいと思う

ただ、 Promise は標準仕様なので、いずれ $.Deferred もただの Promise のラッパーになる可能性もあるかもしれない

上記ライブラリの古いIEサポート状況を調べて、可能な限り Promise を使ったほうがいいかも

$.Deferred の雑な一例：

```js
function deferFunc() {
  return $.Deferred(function(defer) {
    // 処理
    defer.resolve();
  });
}

deferFunc.done(function(res) {

});
```
