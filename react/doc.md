theme: jdan/cleaver-retro
style: ../slide.css

--

# React.js超入門

--

## Agenda

1. 概要
2. Hello world
3. 主なAPI、ライフサイクルメソッド
4. Todoアプリ
5. Flux
6. Redux
7. まとめ

--

## 概要

[github.com/facebook/react](//github.com/facebook/react)

Facebook製のライブラリでMVCでいうところのビューの部分を担当

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
