/**
 * 打包入口文件
 */

 //引入css
 import '../css/iconfont.css'
 //引入less
 import '../css/index.less'

 import print from './print'

 console.log('index文件加载了')

 print()

const add = (x,y)=> x+y

console.log(add(1,5))

if(module.hot){
  //一旦module.hot 为true,说明开启了HMR功能 --> 让 HMR功能代码生效
  module.hot.accept('./print.js',function(){
    //方法会监听 print.js文件的变化，一旦发生变化，其他默认不会重新打包构建。
    //会执行后面的回调函数
    print()
  })
}
