console.log('index.js文件被加载了~')

//import {mul} from './test'

//懒加载就是利用之前代码分割的时候，将代码分割的语法放到 import 一个异步回调函数中
// 当满足异步触发条件再去加载，就叫做懒加载

//预加载：prefetch
// 会在使用之前，提前加载js文件

//正常加载可以认为是并行加载（同一时间加载多个文件）
//预加载prefetch: 等其他资源加载完毕，浏览器空闲了，再偷偷加载资源，兼容性比较差

document.getElementById('btn').onclick = function(){
  //懒加载： 当文件需要使用时才会加载
  import(/* webpackChunkName:'test', webpackPrefetch: true  */'./test')
  .then(({mul})=>{
    //eslint-diable-next-line
    console.log(mul(4,5))
  })
  .catch(()=>{
    //eslint-diable-next-line
    console.log('文件加载失败~')
  })
}