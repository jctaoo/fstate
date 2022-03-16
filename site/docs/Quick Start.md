# Quick Start

## Quick Start
fstate 的本质是一个单向数据图, 用一个图来说明:

![](Quick%20Start/Screen%20Shot%202022-03-16%20at%2010.22.21%20PM.png)

从图中，可以看出，有许多类似 `State Node`、 `link`、 `Selector` 之类的概念，我们稍后会详细地介绍它们的性质及其用法和场景。在开始时，我们不妨用简单的话和代码来解释这个过程, 来让使用者对 fstate 有个大概的了解:

首先， 我们的数据存储在 `State Node` 中，我们可以使用一个初始值来创建一个 `State Node`, 其中可以放置一个值或者一个对象，实际上，`State Node` 就是一个用来放需要被 fstate 管理的数据的箱子，是 fstate 的**数据源**。除此之外，我们还可以通过 Api 请求来创建一个 `State Node` 用来存放其结果， 比如我们可以将搜索结构存放到一个 `State Node` 之中，或者将用户信息存放在 `State Node` 之中。

像其他所有状态管理库那样，我们先构建一个简易的计数器，我们需要用以下的方式创建一个 `State Node`

```javascript
const counter = state({
  initial: 0,
  actions: {
    increment: () => counter.value += 1,
    decrement: () => counter.value -= 1,
  }
});
```

> 代码中出现了一个新的名词 —— `action`， 简单滴说， `action` 就是一个修改 `State Node` 的函数，它的好处在于把一系列操作包裹在一个函数中，而且函数有名字，方便使用者理解或者复用逻辑。  

`state` 函数用于定义一个 `State Node`，其告诉 fstate 该如何创建一个 `State Node` 以及如何初始化，如何更新其值等等。因此 `state` 所定义的 counter 其实是一个创建 `State Node` 的**模版**，我们可以用 counter 创建多个 `State Node`。 这种关系有点类似于 类 和 类的实例（如果你了解面向对象的话），也类似于 React 中的 Component 和 Element。（如果你了解 React 的话）

既然我们提到模版，类甚至类的实例等关键字，那我们当然也可以用一个类去定义 `State Node` 的模版：

```javascript
class Counter extends State {
  initial = 0;

  actions() {
    return {
      increment: () => counter.value += 1,
      decrement: () => counter.value -= 1,
    };
  }
}
```

这样设计的目的在于，你可以用一个状态模版创建多个 `State Node`, 比如我们构建的计数器应用需要多个计数器，那状态模版的机制便可以很好的组织代码。

有了创建 `State Node` 的模版，就开始创建 `State Node` 了， 我们用 `use` 函数来创建一个 `State Node`，注意到用 `use` 创建的是全局唯一的，即即使多次创建，其实例依旧只有一个。

```javascript
const counter = use(counter);
```

这个新的 counter 变量就是我们创建的 `State Node` （上图中的黄色部分）， 可以直接用到视图中，其是可变的，同时也是可观察的，像下面的代码这样:

```javascript
// 在 Dom 中使用
document.querySelector("#counter-label")?.textContent = `${counter.value}`;

// state 是可变的
counter.value += 1;
```

在上面的代码中我们修改了 counter 的值，还记得我们早就定义了 actions 嘛？于是我们可以这样:

```javascript
const { increment } = useActions(counter);
increment(); // 等价于 counter.value += 1;
```

我们之前说 `State Node` 的模版是可以被重复创建，接下来介绍一个来干这件事的函数 —— `useMultiple`, 这样我们就可创建多个计数器了！

```javascript
// counter.js 计数器内部
class Counter {
  ...
  const counter = useMultiple(counter);
  const { increment } = useActions(counter);
  
  this.addBtn.addEventListener("click", () => increment());
  bind(counter, textContent(this.counterLabel));
  ...
}

// counterList.js 计数器列表
addCounterBtn.addEventListener("click", () => {
  const counter = new Counter();
  counterList.appendChild(counter.render());
});
```

完整的代码见 (马上就有了)

> 我们在该 Demo 中使用了两个新的函数，`bind` 和 `textContent`，这是来自 `@fstate/dom` 包下的工具，让 dom 和 fstate 连接在一起，并提供响应式能力。  

在 Quick Start 部分中，你已经学会了：
1. 定义 state 模版，并声明 Actions
2. 创建单例 State Node
3. 创建多实例 State Node
4. 在 dom 中使用 State Node
5. 直接更新 State Node
6. 通过 Actions 更新 State Node

接下来，将进入下一个部分，「数据图中的传递者 — Selector」






