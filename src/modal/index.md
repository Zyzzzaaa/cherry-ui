---
title: Modal 对话框
nav:
  title: 组件
  order: 1
group:
  title: 反馈
  order: 3
---

# Modal 对话框

弹出一个对话框展示对应内容

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用 App.useApp 封装的语法糖方法。

## 代码演示

<code src="./demo/basic.tsx"></code>

<code src="./demo/footer.tsx"></code>

<code src="./demo/center.tsx"></code>

## API

| 参数           | 说明                                 | 类型                  | 默认值         |
| :------------- | :----------------------------------- | :-------------------- | :------------- |
| onClose       | 点击遮罩层或右上角叉或取消按钮的回调 | `function`            | -              |
| onOk           | 点击确定回调                         | `function`            | -              |
| title          | 标题                                | `ReactNode`           | -              |
| close          | 是否显示关闭按钮                     | ` boolean`            | `true`      |
| mask           | 是否展示遮罩层                       | `boolean`             | `true`         |
| footerItem     | 自定义页脚内容                       | `Array`               | 确认和取消按钮 |
| footerType     | 页脚按钮样式                         | ` simple`\| `default` | `default`      |
| center         | 是否居中展示对话框                   | `boolean`             | `false`        |

### Modal.useModal()

该方法可以简化 modal 的启动方式，会返回一个函数方法 `modal`，但需要先使用返回的`init()`对话框进行初始化。

- `modal`：返回一个对象，拥有`init`方法，调用该函数之后，会返回一个引用，可以通过该引用更新和关闭弹窗。

  ```typescript
  const modal = Modal.init({
    title: '初始化的标题',
    content: `初始化的内容`,
  });

  modal.update({
    title: '修改的标题',
    content: '修改的内容',
  });

  modal.update((prevConfig) => ({
    ...prevConfig,
    title: `${prevConfig.title}（新）`,
  }));

  modal.destroy();
  ```

  返回的 `modal` 对象包括：

* modal.init()
* modal.update()
* modal.destroy()

具体属性：

| 参数    | 说明 | 类型        | 默认值 |
| :------ | :--- | :---------- | :----- |
| title   | 标题 | `ReactNode` | -      |
| content | 内容 | `ReactNode` | -      |

### Modal.confirm()

该方法同样可以简化 `modal` 的启动方式，会返回一个函数方法 `open`，需要传入两个必传参数`title`与 `content`。与`useModal`最大的不同是：该方法不提供更新和移除的方法，为一次性的弹窗。

使用方式：

```typescript
const open = Modal.confirm({ title: 'confirm', contetn: 'open confirm' });

return <button onClick={open}>open confirm</button>;
```
