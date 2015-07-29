# 技術共有会Promise編

## 概要

### Promiseとは？

> Promiseは非同期処理を抽象化したオブジェクトとそれを操作する仕組みの事をいいます。

http://azu.github.io/promises-book/

JavaScript における非同期処理といえば、コールバックを利用する場合が多い

```js
asyncFunc('/users', {
  success: function(error, res) {//ここで
    if(error) {// 失敗時の処理
      throw new Erroe(error);
    }
    // 成功時の処理
    console.log(res);
  }
});
```

`$.ajax` の第2引数に渡したオプションオブジェクトの `success` メソッドに通信成功時コールバックを指定する方法

ご存知コールバック地獄の始まり

## 同期、非同期のおさらい

スレッドからはずれる処理（語弊あり）

```js
setTimeout(function() {
  console.log('1');
}, 0);
console.log('2');
```

上記の結果は？

`window.setTimeout` は非同期関数

同期は上から順に実行される

### jQuery.Deferred

jQuery で提唱されているPromise的な仕様もある

Promiseが出てくる前は主流だった

```js
var d = new $.Deferred();

```
