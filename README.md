# 某状态管理库初稿

## 状态节点 (State)

状态节点存储一个值或者一个对象, 是整个状态管理的 `数据源`. 状态节点可以从初始值 (initialValue) 创建, 也可以来自外部数据源. 除此之外, 状态节点是分散开的, 不会类似 redux 那样有统一的 store 概念, 然后状态存储在 store 之下.

状态节点里的值应该是可变 (mutable) 的, 且状态节点内的值是可以被观察到的. 其中, 修改状态节点里的值的方法有:

- 使用 Action
- 直接修改值
- 使用 updateState 工具函数来用函数式的方式更新值

> Action 是对状态节点进行操作的一个函数

### 没有统一 store 的好处

1. 代码分割
2. 动态加载

### Demo

```javascript
// 创建状态并声明 Actions
const count = state(
 0,
 { increment: () => count.value += 1; }
);
const message = state("Hello World");

// 使用状态
const [count, updateCount] = use(count);
const count = useValue(count);
const updateCount = useUpdateValue(count);
const observer = useObserver(count);
const { increment } = useActions(count);

// 修改状态
count.value = 100;
updateCount(old => old + 1);
increment();

// 观察状态
observer.on((newCount, oldCount) => console.log(`new count is ${newCount}`));
observer.close(); // 取消观察
```

### 从外部数据源创建状态节点

注意, 尽管称之为外部数据源, 但仅仅是把外部的可观察到数据用某些方法 **迁移** 到状态节点, 在概念上, 数据源本身仍然是状态节点 (State).

以 `href` 作为数据源为例子:

```javascript
// 第一个参数用于返回当前状态, 第二个参数用于执行监听等操作
const href = externState(
 () => {
  return window.location.href;
 },
 (callback) => {
   window.addEventListener("popstate", callback);
   return () => window.removeEventListener("popstate", callback);
 }
);
```

### 与外部数据源同步

除了从外部数据迁移, 即外面怎么变, 里面怎么变; 还需要里面怎么变, 外面怎么变.

以 `localStorage` 为例子, 来实现多个页面之间的数据同步:

```javascript
const href = externState(
 ({ newValue, key }) => {
  if (!key !== 'count') return;
  return newValue;
 },
 (callback) => {
  window.addEventListener('storage', callback);
   return () => window.removeEventListener("storage", callback);
 },
 (newValue) => {
     localStorage.setItem('count', newValue);
 }
);
```

> 注意到:

## 状态流

在该状态管理库中, 除了状态节点, 还有状态流. 状态流是一个更大的概念, 如图所示:
![Data Flow](images/Data%20Flow.png)

状态节点可以被包装成 `Selector`, 这使得数据源可以被转化成其他内容, 比如制作一个 Todo App, 数据源为 Todo 列表, 那我们就可以通过 Selector 来选出那些完成了的项目, 或者是过期的项目. 这些数据源 (State) 和 Selector 一个一个串在一起, 最终显示在界面上, 叫做状态流.

### Demo

```javascript
// store/todo.js
const todoList = state(
 [],
 {
  addTodo: (title) => { todoList.push({ title, completed: false, id: generateId() }) };
 }
);

const completedTodos = selector(todoList, (list) => { return list.filter(i => i.commpleted) });

// views/todoList.js
···
const completedTodos = useValue(completedTodos);
return <ul>
 {
  completedTodos.map(todo => (
   <li>{ todo.title }</li>
  ))
 }
</ul>
...
```

未完待续...

## Api 参考

马上好…
