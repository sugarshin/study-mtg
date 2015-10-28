style: ../slide.css

--

# React.js超入門

--

## Agenda

1. 概要
2. Hello world
3. デモ
4. ライフサイクルメソッド
5. Flux
6. Redux
7. まとめ

--

## 概要

[github.com/facebook/react](//github.com/facebook/react)

Facebook 製のライブラリで MVC でいうところのビューの部分

あくまでビューのライブラリであって全体のアーキテクチャを制約するものではないのでフレームワークではない

--

### 主な特長3つ

--

**JUST THE UI**

* Component を作るだけに徹している
* よって覚える API や慣例も少ない
* ほかのフレームワークのビュー部分を React で作るということも可能

--

**VirtualDOM**

DOM と対を成すツリー上の構造体を表したデータ（JavaScript オブジェクト）

--

雑な例

```javascript
{
  html: {
    attributes: {...},
    children: {
      head: {
        children: {
          title: 'title',
          meta: {...}
        }
      },
      body: {
        attributes: {
          className: 'body-class'
        },
        children: {
          h1: {
            textContent: 'h1',
            attributes: {...}
            children: {
              a: {
                textContent: 'link',
                attributes: {
                  href: 'url'
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--

と、

それを用いた diff/patch アルゴリズムを指す

例えば

`body h1 a.link` の `href` 属性に差分が検出されると、

`document.querySelector('a.link').setAttribute('href', '/new/link')`

だけが走るイメージ

> HTMLとはツリー構造であり、2つのツリー構造のdiffを算出して、それをDOMにpatchするアクションを作れば、常に最小のコストで状態遷移を表現できるよね、ってのがVirtual DOMという発想のスタート地点となります。

> このHTMLの生成する元となるツリー構造は、生のDOM(HTMLのインスタンス)である必要はなく、DOMと1対1に対応する単純な構造体で表現し、それを仮想DOMと呼びます。

> 単純なJSの構造体なので、基本的に仮想DOM実装はブラウザ環境である必要がなく、node.jsやピュアなV8でも仮想DOMの構築とdiff生成までは可能です。

[http://qiita.com/mizchi/items/4d25bc26def1719d52e6](http://qiita.com/mizchi/items/4d25bc26def1719d52e6)

--

**DATA FLOW**

> アプリケーションのstateを管理しているルートコンポーネントがいて、
そのstateを子のコンポーネントに流して、子のコンポーネントはそれを受け取って、レンダリングする
という、一方向なデータの流れを提供する

データの流れは一方向（単方向バインディング）

ただ、双方向バインディング（Angular とか vue とか）のように明らかにコード量が減ったりしない

データの流れを一方向にすることによって考慮することは減ってわかりやすくなる

--

### JSX

JSX という JavaScript 中に XML 的なものを書けて HTML を表現できる

```javascript
class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <h1>{this.props.title}</h1>
      </header>
    );
  }

}
```

`render()` の部分はこうコンパイルされる

```javascript
render() {
  return React.createElement('header', { className: 'header' },
          React.createElement('h1', null, this.props.title)
         );
}
```

[React JSFiddle](https://jsfiddle.net/reactjs/69z2wepo/)

react@v0.14.0 以前では `react-tools` というツールで JS にコンパイルしてたが、現在は [Babel](https://babeljs.io/) の利用を推奨している

Babel => ES6, ES7のトランスパイラ JSXも面倒みてくれる => 作者 Facebook に入社 => 現在18, 9歳

ES6について：

[https://github.com/sugarshin/study-mtg/blob/master/es6/doc.md](https://github.com/sugarshin/study-mtg/blob/master/es6/doc.md)

--

### サーバサイドレンダリング

`react-dom` に React コンポーネントを文字列にして返すメソッドがある

**`require('react-dom/server').renderToString()`**

`require('react-dom/server').renderToStaticMarkup()` というのもあるけど、これは純粋な html 文字列が返される（React エレメントとして必要な data 属性等を含まない）

JS の評価エンジンさえあればサーバ側でレンダリングして html 文字列としてクライアントに返せる

なので初回アクセス時はサーバでレンダリング済みの html を返して、みたいなことができるので SEO 的にも、 SPA の問題としてよくあがる初回表示の遅さもなんとかなる

--

## Hello world

version

* react v0.14
* react-dom v0.14

--

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';

class Hello extends Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

render(<Hello name="world" />, document.getElementById('root'));
```

[http://codepen.io/sugarshin/pen/wKmPry](http://codepen.io/sugarshin/pen/wKmPry)

`React.createClass()` に `render` メソッドをもつオブジェクトを渡すことでも作成できる

--

Component のビューとロジックの密結合について

[http://qiita.com/koba04/items/4f874e0da8ebd7329701](http://qiita.com/koba04/items/4f874e0da8ebd7329701)

> ところで、React.jsではComponentとして、マークアップとViewのロジックをcreateClassの中に書いていくのですが、他のフレームワークのようにマークアップはHTMLやmustacheで書いてViewのロジックをJSで書くみたいに分かれてなくて気持ち悪い！という人もいるのではないでしょうか？
それに対して、React.jsの開発者であるPete Huntはそれは「関心の分離(Separation of concerns)」ではなくて「技術の分離(Separation of technologies)」だとしていて、マークアップとViewのロジックは密であるべきとしています。
それにTemplateのSyntaxで不自由にコードを書くよりJavaScriptで書いた方がいいとしています。
テストが...という問題は、React.jsではTestUtilsというAddonでサポートしています。

--

## デモ

### カウンター

[http://codepen.io/sugarshin/pen/RWMmQX](http://codepen.io/sugarshin/pen/RWMmQX)

[https://github.com/sugarshin/study-mtg/tree/master/react/counter](https://github.com/sugarshin/study-mtg/tree/master/react/counter)

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';

class Counter extends Component {

  constructor() {
    super();

    // 初期state（状態）をここで定義
    // `React.createClass()` でコンポーネントを作る場合の `getInitialState()` と同じ
    this.state = {
      count: 0
    };
  }

  render() {
    // 必ず1つのコンポーネント（html）を返すようにする
    return (
      <div>
        // `{}` はJavaScriptの式として評価してくれる
        <span>{this.state.count}</span>
        // DOMのイベントは 'on + イベント名' でハンドリングする
        <button onClick={this.handleClickUp.bind(this)}>Count up</button>
        <button onClick={this.handleClickDown.bind(this)}>Count down</button>
      </div>
    );
  }

  handleClickUp() {
    // `setState()` で自身の状態を更新する
    // `this.state`を直接触らない
    this.setState({ count: this.state.count + 1 });
  }

  handleClickDown() {
    this.setState({ count: this.state.count - 1 });
  }

}

// 第1引数にマウントするコンポーネント、第2引数にマウント先のDOMの参照を渡してレンダリング
render(<Counter />, document.getElementById('root'));
```

--

* 1つのコンポーネントを返す
* `state` で自身の状態を保持できる
* `setState()` で `state` を更新すると `render()` が走ってレンダリングしてくれる
* `props` で外部とやりとりもできる

--

### Stateless Component

react@v0.14 から `state` を持たない、 `props` だけに依存するようなコンポーネントの新しい定義の仕方ができるようになった

```javascript
import React, { PropTypes } from 'react';

// コンポーネントを返すだけの関数として定義
// 引数に props が渡ってくる
export default function Footer(props) {
  return <footer>{props.copyright}</footer>;
}

// propTypesやdefaultPropsも
// 関数のプロパティとして定義できる
Footer.propTypes = {
  copyright: PropTypes.string.isRequired
};
```

ライフサイクルメソッドは利用できない

react@v0.15 ではパフォーマンス改善等のリリースになるようで、この Stateless Component の書き方で書いておくとパフォーマンスの支援を受けられる

今後はこの方法を主に使っていくことになると思う

--

### Todoアプリ

簡単なTodoアプリのデモ

[http://codepen.io/sugarshin/pen/dYmZgN](http://codepen.io/sugarshin/pen/dYmZgN)

[https://github.com/sugarshin/study-mtg/tree/master/react/todo](https://github.com/sugarshin/study-mtg/tree/master/react/todo)

--

Todoコンポーネント

```javascript
import React, { Component, PropTypes } from 'react';

class Todo extends Component {

  // 外部から受け取る`props`に対してそれぞれのバリデーションをスタティックプロパティとして定義できる
  // エラーを検出した場合エラーは投げられず、warningになるのみ
  // しかもproduction環境では無視される
  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      onClickCheckbox: PropTypes.func.isRequired,
      onClickDelete: PropTypes.func.isRequired
    };
  }

  render() {
    const { complete, text } = this.props;

    // 必ず1つのコンポーネント（html）を返す
    return (
      // インラインcssは`style`属性にオブジェクトを渡す
      <div style={{
        opacity: complete ? .5 : 1,
        textDecoration: complete ? 'line-through' : 'none'
      }}>
        // 各DOMのイベントは `on + イベント名` みたいは感じでハンドリングする
        <input type="checkbox" checked={complete} onChange={this.handleClickCheckbox.bind(this)} />
        <span>{text}</span>
        <button onClick={this.handleClickDelete.bind(this)}>Delete</button>
      </div>
    );
  }

  // propsとして外部（親）から渡された関数を実行
  handleClickCheckbox() {
    this.props.onClickCheckbox(this.props.id);
  }

  handleClickDelete() {
    this.props.onClickDelete(this.props.id);
  }
}
```

--

AddTodoボタンコンポーネント

```javascript
import React, { Component } from 'react';

class AddTodo extends Component {

  static get propTypes() {
    return {
      onClickAdd: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <div>
        // `ref` 属性を指定しておくと同コンポーネントから`this.refs[名前]`で参照できる
        <input type="text" ref="input" placeholder="Todo name" />
        <button onClick={this.handleClickButtonAdd.bind(this)}>Add</button>
      </div>
    );
  }

  handleClickButtonAdd() {
    this.props.onClickAdd(this.refs.input.value);
  }
}
```

--

TodoListコンポーネント

```javascript
import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {

  constructor() {
    super();

    this.state = {
      todos: []
    };
  }

  render() {
    // `this.state.todos`からTodo Reactエレメントの配列をつくる
    const todos = this.state.todos.map(todo => (
      // `key`属性に一意の値を渡す
      // 必須ではないけどwarningがでる、 diff/patch処理が遅くなる
      <Todo key={todo.id}
            onClickDelete={this.deleteTodo.bind(this)}
            onClickCheckbox={this.changeComplete.bind(this)}
            {...todo} />
    ));

    return (
      <div>
        // propsとしてAddボタンがクリックされたときのコールバックを渡す
        <AddTodo onClickAdd={this.addTodo.bind(this)} />
        // 配列もうまく展開してくれる
        <ul>{todos}</ul>
      </div>
    );
  }

  // 各イベントハンドラ
  addTodo(text) {
    this.setState({
      todos: [...this.state.todos, {
        id: Date.now(),
        complete: false,
        text
      }]
    });
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  changeComplete(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    });
  }
}
```

--

実行部分

```javascript
import React from 'react';
import { render } from 'react-dom';
import TodoList ftom './TodoList';

// 第2引数にマウント先のDOMを指定してレンダリング
render(<TodoList />, document.getElementById('root'));
// document.bodyを指定するとwarning
```

--

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';

class Todo extends Component {
  render() {
    return (
      <div style={{
        opacity: this.props.complete ? .5 : 1,
        textDecoration: this.props.complete ? 'line-through' : 'none'
      }}>
        <input type="checkbox" checked={this.props.complete} onChange={this.handleClickCheckbox.bind(this)} />
        <span>{this.props.text}</span>
        <button onClick={this.handleClickDelete.bind(this)}>Delete</button>
      </div>
    );
  }

  handleClickCheckbox() {
    this.props.onClickCheckbox(this.props.id);
  }

  handleClickDelete() {
    this.props.onClickDelete(this.props.id);
  }
}

class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type="text" ref="input" placeholder="task name" />
        <button onClick={this.handleClickButtonAdd.bind(this)}>Add</button>
      </div>
    );
  }

  handleClickButtonAdd() {
    this.props.onClickAdd(this.refs.input.value);
  }
}

class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      todos: []
    };
  }

  render() {
    const todos = this.state.todos.map(todo => (
      <Todo key={todo.id} onClickDelete={this.deleteTodo.bind(this)} onClickCheckbox={this.changeComplete.bind(this)} {...todo} />
    ));

    return (
      <div>
        <AddTodo onClickAdd={this.addTodo.bind(this)} />
        <ul>{todos}</ul>
      </div>
    );
  }

  addTodo(text) {
    this.setState({
      todos: [...this.state.todos, {
        id: Date.now(),
        complete: false,
        text
      }]
    });
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  changeComplete(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    });
  }
}

render(<TodoList />, document.getElementById('root'));
```

--

## ライフサイクルメソッド

コンポーネントの状態の変化や適切なタイミングで呼ばれる決まったメソッドがある

例えば、

* DOMに追加されたとき、される直前
* renderが走ったあと
* propsが更新される前

などなど

[http://qiita.com/koba04/items/66e9c5be8f2e31f28461](http://qiita.com/koba04/items/66e9c5be8f2e31f28461)

--

```javascript
class Button extends Component {

  componentDidMount() {
    ...
  }

  componentDidUpdate() {
    ...
  }

  render() {
    return <button>Button</button>;
  }

}
```

--

よくやる例としては、

`componentDidMount()` でコンポーネントがDOMに追加されたあとにイベントリスナを登録し、 `componentWillUnmount()` でコンポーネントが DOM から削除される直前にイベントリスナを解除する、みたいなメモリリーク対策

--

`shouldComponentUpdate()`

パフォーマンス対策に利用

`true` か `false` を返す

`false` だと diff/patch 処理が行われなくなる

デフォルトは `true`

無駄な計算や処理を削減しパフォーマンス向上をはかれる

[http://qiita.com/koba04/items/66e9c5be8f2e31f28461#shouldcomponentupdate](http://qiita.com/koba04/items/66e9c5be8f2e31f28461#shouldcomponentupdate)

--

## Flux

Reactとペアでよく話されるアーキテクチャのこと

実装ではなくあくまでアーキテクチャの話

なのでオレオレFlux乱立

--

各種実装

* [https://github.com/facebook/flux](https://github.com/facebook/flux)
* [https://github.com/BinaryMuse/fluxxor](https://github.com/BinaryMuse/fluxxor)
* [https://github.com/azu/material-flux](https://github.com/azu/material-flux)
* [https://github.com/reflux/refluxjs](https://github.com/reflux/refluxjs)
* [https://github.com/yahoo/fluxible](https://github.com/yahoo/fluxible)
* [https://github.com/mizchi/arda](https://github.com/mizchi/arda)
* [https://github.com/rackt/redux/](https://github.com/rackt/redux/)

--

React を効率よく利用するために Facebook が提唱したもの

MVC アーキテクチャの改変版

ただの Observer パターン（Pub Subパターン）=> Node でいうところの EventEmitter みたいなもの

Facebook は「MVCはスケールしない」みたいに言ってるけど結局オレオレ MVC みたいなものだと思う

※ここでいう MVC はWebサーバ等の MVC ではなくて、 Smalltalk MVC など GUI 構築のための MVC のこと

> モデル - 問題対象としてのデータとそのデータに対する操作。

> ビュー - ディスプレイを通して、モデルからユーザへ情報を提供するもの。

> コントローラ - ユーザからの入力を解釈して、モデルあるいはビューに適切な調整を施すもの。

[http://www.cdl.im.dendai.ac.jp/~masuda/mvc.html](http://www.cdl.im.dendai.ac.jp/~masuda/mvc.html)

--

よく見る図

![Flux](https://raw.githubusercontent.com/facebook/flux/master/docs/img/flux-diagram-white-background.png)

**Flux　の最も優れている点は上記に「Flux」と名前をつけたところ**

--

**データの流れは常に一方向**

これにより React と相性が良い

主な層は

* ActionCreator => アクション（だいたいの場合 `type` キーとそのアクションごとのデータをもったオブジェクト）を作って Dispatcher に送る
* Dispatcher => 受けたアクションを Store の適切なところへ送る
* Store => 送られてきたアクションを元に自身の state（アプリケーションの状態）を更新
* View (React) => Store を listen しておいて、更新を検知し、適宜レンダリング
  * DOM イベント等を通じて ActionCreator を通してアクションを生成

という、一方向サイクル

--

### 簡単なFlux実装の例

データの流れが一方向、というのがポイントの1つなので、それを簡単に再現

ここでは `Dispatcher` は `EventEmitter` と考えます

--

イメージ

```
[View] DOMイベント等からアクションを呼ぶ ------> [ActionCreator] 適切なアクションを作ってStoreへ通知
                                               |
ViewはStoreを監視しておいて変更があるとレンダリング     |
  |                                            |
  ----------------------------------------- [Store] 受け取ったアクションを元に自身を更新
```

それぞれの架け渡し的な存在が Dispatcher (EventEmitter)

--

まずはStore層をつくる

```javascript
import { EventEmitter } from 'events';

class Store extends EventEmitter {

  // stateの初期化　これがアプリケーションの状態
  // dispatcherを受け取ってそれぞれのアクションの名前にリスナを登録
  constructor(dispatcher) {
    super();
    this.state = { count: 0 };
    dispatcher.on('countup', this.onCountUp.bind(this));
    dispatcher.on('countdown', this.onCountDown.bind(this));
  }

  // 外部からstateにアクセスできるようにしておく
  getState() {
    return this.state;
  }

  // 'countup'アクションが渡ってきたとき（'countup'イベントがemitされたとき）のコールバック
  // 同時に 'CHANGE' イベントをemitする
  // listenしてるView（React）にstateが更新されたことが通知される
  onCountUp(count) {
    this.state = { count: this.state.count + count };
    this.emit('CHANGE');
  }

  onCountDown(count) {
    this.state = { count: this.state.count - count };
    this.emit('CHANGE');
  }

}

```

--

EventEmitterの実装例

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, listener) {
    this.events[name] = this.events[name] || [];
    this.events[name] = [...this.events[name], listener];
  }

  off(name, listener) {
    if (listener) {
      this.events[name] = this.events[name].filter(l => l !== listener);
    } else {
      delete this.events[name];
    }
  }

  emit(name, payload) {
    this.events[name].forEach(listener => listener(payload));
  }
}

const emitter = new EventEmitter();

emitter.on('some', () => console.log('hoge'));
emitter.emit('some'); // => 'hoge'
```

ここでは Node の `require('events').EventEmitter` を使います

--

Action Creator

```javascript
class ActionCreator {

  // Storeと同じdispatcherを受け取る
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  // Viewから呼ばれるアクションたち
  // 'countup'イベントをemit
  countUp(count) {
    this.dispatcher.emit('countup', count);
  }

  countDown(count) {
    this.dispatcher.emit('countdown', count);
  }

}
```

--

```javascript
import React, { Component } from 'react';

// Dispatcher
const dispatcher = new EventEmitter();

const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);

class Counter extends Component {

  constructor() {
    super();

    // `state`の初期値をstoreから`getState`してとってくる
    const { count } = store.getState();
    this.state = { count };

    // `store`が更新されたとき（'CHANGE'イベントがemitされたとき）のコールバックをここで登録
    store.on('CHANGE', this.onChangeState.bind(this));
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.handleClickUp.bind(this)}>Count up</button>
        <button onClick={this.handleClickDown.bind(this)}>Count down</button>
        <select defaultValue="1" ref="rate">
          <option value="1">1</option>
          <option value="10">10</option>
        </select>
      </div>
    );
  }

  // `store`が更新されると呼ばれて`setState()`してレンダリングする
  onChangeState() {
    const { count } = store.getState();
    this.setState({ count });
  }

  // クリックイベントでアクションを呼ぶ
  handleClickUp() {
    action.countUp(+this.refs.rate.value);
  }

  handleClickDown() {
    action.countDown(+this.refs.rate.value);
  }

}

```
--

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import { EventEmitter } from 'events';

class Store extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.state = { count: 0 };
    dispatcher.on('countup', this.onCountUp.bind(this));
    dispatcher.on('countdown', this.onCountDown.bind(this));
  }

  getState() {
    return this.state;
  }

  onCountUp(count) {
    this.state = { count: this.state.count + count };
    this.emit('CHANGE');
  }

  onCountDown(count) {
    this.state = { count: this.state.count - count };
    this.emit('CHANGE');
  }
}

class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  countUp(count) {
    this.dispatcher.emit('countup', count);
  }

  countDown(count) {
    this.dispatcher.emit('countdown', count);
  }
}

const dispatcher = new EventEmitter()

const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);


class Counter extends Component {
  constructor() {
    super();

    const { count } = store.getState();
    this.state = { count };

    store.on('CHANGE', this.onChangeState.bind(this));
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.handleClickUp.bind(this)}>Count up</button>
        <button onClick={this.handleClickDown.bind(this)}>Count down</button>
        <select defaultValue="1" ref="rate">
          <option value="1">1</option>
          <option value="10">10</option>
        </select>
      </div>
    );
  }

  onChangeState() {
    const { count } = store.getState();
    this.setState({ count });
  }

  handleClickUp() {
    action.countUp(+this.refs.rate.value);
  }

  handleClickDown() {
    action.countDown(+this.refs.rate.value);
  }
}

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

render(<Counter />, rootEl);
```

[https://github.com/sugarshin/study-mtg/tree/master/react/flux](https://github.com/sugarshin/study-mtg/tree/master/react/flux)

--

## Redux

[https://github.com/rackt/redux](https://github.com/rackt/redux)

* Flux の仲間
* 作者は Flux であって Flux ではないって言ってる
* ヨーロッパの React カンファレンス2015で作者が登壇して Redux について発表
* Flux 実装で今一番盛り上がってる
* 日本だとまだあまり盛り上がってない
* もう Flux これでいいんじゃないの的な雰囲気

docs: [http://redux.js.org/](http://redux.js.org/)

作者：

[https://github.com/gaearon](https://github.com/gaearon)

[https://twitter.com/dan_abramov](https://twitter.com/dan_abramov)

最近 Facebook ジョインしたらしい

--

### 特長

* シンプル
* 内部実装が読める
* Hot reloading
* Reducer
* Middleware

**Redux == Reducers + Flux**

--

### 作った目的

**そもそもの目的 Hot reloading を可能にしたい**が発端

* **Hot reloading** => 開発中にコードを編集してリロードしても前の状態を維持したまま一部のコンポーネントを更新する

--

### ディレクトリ一例

* actions
* components
* reducers

見通しがよくなる

AngularのモデルレイヤーをReduxでということも可能

--

### デモ

--

参考：

[http://rebuild.fm/114/](http://rebuild.fm/114/)

--

## まとめ

参考資料

* [https://www.oreilly.co.jp/books/9784873117195/](https://www.oreilly.co.jp/books/9784873117195/)
* [http://qiita.com/advent-calendar/2014/reactjs](http://qiita.com/advent-calendar/2014/reactjs)
* [http://qiita.com/advent-calendar/2014/virtual-dom](http://qiita.com/advent-calendar/2014/virtual-dom)
* [https://speakerdeck.com/geta6/reacttofluxfalsekoto](https://speakerdeck.com/geta6/reacttofluxfalsekoto)

React, Flux周りを利用して書いたもの

* React, Redux実装のアプリ [https://github.com/sugarshin/figleditr](https://github.com/sugarshin/figleditr)
* React, Redux実装のアプリ [https://github.com/sugarshin/translate-annotator](https://github.com/sugarshin/translate-annotator)
* React, facebook/flux実装のアプリ [https://github.com/sugarshin/noto](https://github.com/sugarshin/noto)
* React, facebook/flux実装のアプリ [https://github.com/sugarshin/sobap](https://github.com/sugarshin/sobap)
* React, facebook/flux実装のアプリ [https://github.com/sugarshin/rmd](https://github.com/sugarshin/rmd)

* Reactコンポーネント [https://github.com/sugarshin/react-social](https://github.com/sugarshin/react-social)
* Reactコンポーネント [https://github.com/sugarshin/react-timer](https://github.com/sugarshin/react-timer)
* Reactコンポーネント [https://github.com/sugarshin/react-floatvox](https://github.com/sugarshin/react-floatvox)

* React, Reduxのスターターボイラープレート [https://github.com/sugarshin/react-redux-starter](https://github.com/sugarshin/react-redux-starter)
