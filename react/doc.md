theme: jdan/cleaver-retro
style: ../slide.css

--

# React.js超入門

--

## Agenda

1. 概要
2. Hello world
3. Todoアプリ
4. 主なAPI、ライフサイクルメソッド
5. Flux
6. Redux
7. まとめ

--

## 概要

[github.com/facebook/react](//github.com/facebook/react)

Facebook製のライブラリでMVCでいうところのビューの部分

あくまでビューのライブラリであって全体のアーキテクチャを制約するものではないのでフレームワークとは呼べない

--

### 特長

--

**JUST THE UI**

* Componentを作るだけに徹している
* よって覚えるAPIや慣例も少ない
* ほかのフレームワークのビュー部分をReactで作るということも可能

--

**VirtualDOM**

DOMと対を成すツリー上の構造体を表したデータ（JavaScriptオブジェクト）

--

雑な例

```
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

それを用いたdiff/patchアルゴリズムを指す

`body h1 a` の `textContent` に差分が検出されると、

`document.querySelector('a').textContent = 'new text';`

が走るイメージ

http://qiita.com/mizchi/items/4d25bc26def1719d52e6

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

ただ、双方向バインディング（Angularとかvueとか）のように明らかにコード量が減ったりしない

データの流れを一方向にすることによって考慮することは減ってわかりやすくなる

--

### JSX

JSXというJavaScript中にXML的なもの書けてHTMLを表現できる

```
class Header extends React.Component {

  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
      </header>
    );
  }

}
```

[React JSFiddle](https://jsfiddle.net/reactjs/69z2wepo/)

react@v0.14.0以前では`react-tools`というツールでJSにコンパイルしてたが、現在は[Babel](https://babeljs.io/)の利用を推奨している

Babel => ES6, ES7のトランスパイラ

[https://github.com/sugarshin/study-mtg/blob/master/es6/doc.md](https://github.com/sugarshin/study-mtg/blob/master/es6/doc.md)

--

### サーバサイドレンダリング

`react-dom`にReactエレメントを文字列にして返すメソッド有

`require('react-dom/server').renderToString()`

JSの評価エンジンさえあればサーバ側でレンダリングしてhtml文字列としてクライアントに返せる

なので初回アクセス時はサーバでレンダリングしたhtmlを返して、みたいなことができるのでSEO的にも、SPAの問題としてよく上がる初回表示の遅さもなんとかなる

--

## Hello world

version

* react v0.14
* react-dom v0.14

--

```
import React, { Component } from 'react';
import ReacDOM from 'react-dom';

class Hello extends Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReacDOM.render(<Hello name="world" />, document.getElementById('root'));
```

[http://codepen.io/sugarshin/pen/wKmPry](http://codepen.io/sugarshin/pen/wKmPry)

--

* 1つのコンポーネントを返す
* `state`で自身の状態を保持する
* `props`で外部とやりとりする

`React.createClass()`に`render`メソッドをもつオブジェクトを渡すことでも作成できる

--

Componentについて

[http://qiita.com/koba04/items/4f874e0da8ebd7329701](http://qiita.com/koba04/items/4f874e0da8ebd7329701)

> ところで、React.jsではComponentとして、マークアップとViewのロジックをcreateClassの中に書いていくのですが、他のフレームワークのようにマークアップはHTMLやmustacheで書いてViewのロジックをJSで書くみたいに分かれてなくて気持ち悪い！という人もいるのではないでしょうか？
それに対して、React.jsの開発者であるPete Huntはそれは「関心の分離(Separation of concerns)」ではなくて「技術の分離(Separation of technologies)」だとしていて、マークアップとViewのロジックは密であるべきとしています。
それにTemplateのSyntaxで不自由にコードを書くよりJavaScriptで書いた方がいいとしています。
テストが...という問題は、React.jsではTestUtilsというAddonでサポートしています。

--

## Todoアプリデモ

簡単なTodoアプリのデモ

[http://codepen.io/sugarshin/pen/dYmZgN](http://codepen.io/sugarshin/pen/dYmZgN)

--

```
import React, { Component } from 'react';

// Todoコンポーネント
class Todo extends Component {
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

  handleClickCheckbox() {
    this.props.onClickCheckbox(this.props.id);
  }

  handleClickDelete() {
    this.props.onClickDelete(this.props.id);
  }
}
```

--

```
import React, { Component } from 'react';

// 追加ボタン
class AddTodo extends Component {
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

```
import React, { Component } from 'react';

class TodoList extends Component {

  // 初期化処理
  // `React.createClass()`で`getInitialState()`していた部分は
  // ここで`this.state`で定義する
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }

  render() {
    // Reactエレメントの配列
    const todos = this.state.todos.map(todo => (
      // `key`属性に一意の値を渡す
      // warningがでる、 diff/patchが遅くなる
      <Todo key={todo.id} onClickDelete={this.deleteTodo.bind(this)} onClickCheckbox={this.changeComplete.bind(this)} {...todo} />
    ));

    return (
      <div>
        // propsとしてAddボタンがクリックされたときの処理を渡す
        <AddTodo onClickAdd={this.addTodo.bind(this)} />
        // 配列もうまく展開してくれる
        <ul>{todos}</ul>
      </div>
    );
  }

  // 各イベントハンドラ
  addTodo(text) {

    // `setState()`で自身のstateを更新する
    // `this.state`を直接触らない（diff/patchがうまく走らなくなって適切にrenderされなくなる）
    this.setState({
      todos: [...this.state.todos, {
        id: Date.now(),
        text,
        complete: false
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

```
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList ftom './TodoList';

// 第２引数にマウント先のDOMを指定してレンダリング
ReactDOM.render(<TodoList />, document.getElementById('root'));
// document.bodyを指定するとwarning
```

--

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
  constructor(props) {
    super(props);

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
        text,
        complete: false
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

ReactDOM.render(<TodoList />, document.getElementById('root'));
```

--

## 主なAPI、ライフサイクルメソッド

コンポーネントの状態の変化や適切なタイミングで呼ばれる決まったメソッドがある

例えば、

* DOMに追加されたとき、される直前
* renderが走ったあと
* propsが更新される前

などなど

[http://qiita.com/koba04/items/66e9c5be8f2e31f28461](http://qiita.com/koba04/items/66e9c5be8f2e31f28461)

--

```
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

`componentDidMount()`でコンポーネントが追加されたあとにDOMにイベントリスナを登録し、

`componentWillUnmount()`でコンポーネントがDOMから削除される前にイベントリスナを解除してメモリリーク対策

--

`shouldComponentUpdate()`

パフォーマンス対策に利用

`true`か`false`を返す

`false`だとdiff/patchが行われなくなる

無駄な計算や処理を削減しパフォーマンス向上をはかれる

[http://qiita.com/koba04/items/66e9c5be8f2e31f28461#shouldcomponentupdate](http://qiita.com/koba04/items/66e9c5be8f2e31f28461#shouldcomponentupdate)

--

## まとめ

* [https://github.com/sugarshin/react-redux-starter](https://github.com/sugarshin/react-redux-starter)

* [https://github.com/sugarshin/figleditr](https://github.com/sugarshin/figleditr)
* [https://github.com/sugarshin/translate-annotator](https://github.com/sugarshin/translate-annotator)
* [https://github.com/sugarshin/noto](https://github.com/sugarshin/noto)
* [https://github.com/sugarshin/sobap](https://github.com/sugarshin/sobap)
* [https://github.com/sugarshin/rmd](https://github.com/sugarshin/rmd)

* [https://github.com/sugarshin/react-social](https://github.com/sugarshin/react-social)
* [https://github.com/sugarshin/react-timer](https://github.com/sugarshin/react-timer)
* [https://github.com/sugarshin/react-floatvox](https://github.com/sugarshin/react-floatvox)
