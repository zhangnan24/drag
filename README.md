# drag V1.1

# drag
使一个dom元素变得可拖动，同时兼容PC端和移动端，性能好流畅度高。

# 使用方法
1，引入这个类
示例:
```javascript
import Drag from './drag.js'
```

2,进行类的实例化
示例：
```javascript
let box = document.getElementById('box');
let fn = (e) =>{
  console.log(e)
};
new Drag(box,fn);
```

解析：
- new Drag()传入的第一个参数为dom元素，必须确定dom元素是存在的
- 第二个参数为可选参数,意为拖动结束后执行的回调函数，fn接收一个对象作为传入参数，对象格式示例{x:100,y:300},属性值类型均为number,其中x,y分别表示该dom元素此时的left,top值.

# 注意事项
- 传入的dom必须是存在的
- 传入的dom的定位方式必须为绝对定位