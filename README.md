# myelm
##本项目以github为基准，以自己所学知识对其进行重构，以及学习，方便自己的学习，理解

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 自己遇到的问题

* 引入iconfont报错,在字体引入的时候,应该为从项目根目录开始
* 评分问题,创建一个数组,长度为5,向下取整,为整数心个数,取余与半心,长度不足5时,使用空心,为span绑定样式,使用v-for循环,得到星星样式
* 不定高元素垂直,水平居中
    方法一: 父元素:display: table-cell + vertical-align: middle
    方法二: position：relative +top/left(50%) transfrom: translateY/X(-50%)
    方法三: display: flex + align-items: center+justify-content:center
* 在菜单栏点解切换,需要设置:class{current: num === index}通过点击事件使得num返回的数据与index相同,从而实现切换
* 根据滚动的位置激活对应的tab键（锚链接tab键),获取每组分类头部距离父元素顶部的高度h,通过判断h和当前元素曲卷出去的高度,判断当前的index,从而达到目标,vue里实现锚链接，不能直接用a链接方式，因为用的是hash路由，直接a链接会跳转路由
1、offsetLeft
假设 obj 为某个 HTML 控件
obj.offsetTop 指 obj 距离上方或上层控件的位置，整型，单位像素。
obj.offsetLeft 指 obj 距离左方或上层控件的位置，整型，单位像素。
obj.offsetWidth 指 obj 控件自身的宽度，整型，单位像素。
obj.offsetHeight 指 obj 控件自身的高度，整型，单位像素。
2.clientHeight 就是透过浏览器看内容的这个区域高度
3.scrollHeight 是内部元素的绝对宽度，包含内部元素的隐藏的部分,scrollTop 是“卷”起来的高度值
* element.scrollIntoView() 页面（或容器）发生滚动，使element的顶部与视图（容器）顶部对齐
* $el:el是Vue实例的挂载目标。在实例挂载之后，元素可以用 vm.$el 访问。
