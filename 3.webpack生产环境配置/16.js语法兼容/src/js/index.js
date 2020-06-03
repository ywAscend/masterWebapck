import '../css/index.css';
import '../css/index.less';

//import '@babel/polyfill'

const add = (x, y) => x + y;

console.log(add(10, 20));

const app = () => {
    return new Promise((reslove, reject) => {
        setTimeout(function () {

            reslove('6666')

        }, 1000)
    })
}
console.log(app)