---
title: '关于 Cherry UI'
nav:
  title: 开发指南
---

# cherry UI

`Cherry-UI`，是一款基于 `Dumi`，由 `React` + `TypeScript` 开发的组件库 。UI 设计方面大量参考 [Ant Design](https://ant.design/index-cn)

## 快速上手

使用`create-react-App`创建一个`react`项目，并引入 `cherry-ui-antd`

### 安装和初始化

```powershell
 npm install "cherry-ui-antd"
```

### 使用组件

以使用`Button`组件为例

#### 完整引入

会引入所有组件的样式

```javascript
import React from 'react';
import { Button } from 'cherry-ui-antd';
<<<<<<< HEAD
import 'cherry-ui-antd/lib/index.css';
=======
import 'rabbit-ui-antd/lib/index.css';
>>>>>>> 7adccf4aa081b4f7cd75a4191b4b929c05638383

const App = () => (
  <>
    <Button>Button</Button>
  </>
);
export default App;
```

#### 按需引入

```javascript
import React from 'react';
import { Button } from 'cherry-ui-antd';
import 'cherry-ui-antd/lib/button/style/index.css';

const App = () => (
  <>
    <Button>Button</Button>
  </>
);
```
