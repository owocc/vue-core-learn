// 对数据进行劫持

/* Note:
    data中的数据可能是一个 普通的对象的值:           {name:'owo'}
    也可能是一个对象中的对象:                       {user:{age:12}}
    或者也可能是一个普通的数组也可能是数组中嵌套      {[1,2,3]} || {[{age:12},{age:14},{age:15}]}
    当然数据也可能更复杂,就是一路嵌套进去
    这里的最外层的 {} 都是指 data 返回的那个对象(( 
*/

export function observer(data) {
    // 这里要判断数据是否不是 object
    if (typeof data != 'object' || data == null) {
        return data
    }
    // 处理对象的数据劫持
    return new Observer(data)
}

// 对数据进行劫持
// Observer 观察者
// 在 vue2 中是使用 Object.defineProperty 来对数据进行劫持的,它有一个缺点就是只能对对象中的一个属性进行劫持(所以需要使用递归来进行数据的劫持)
class Observer {
    constructor(value) {
        this.walk(value)
    }
    walk(data) {
        let keys = Object.keys(data) // 获取到对象的所有 key,方便等下用 Object.defineProperty 来设置代理
        // 通过循环设置数据劫持 
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i] // 得到对象中的一个键
            let value = data[key] // value 表示传入的 data 对象对应的值(和key对应)
            defineReactive(data,key,value)
        }
    }
}
/**
 * 对对象中的属性进行劫持
 * @param {*} data 需要进行数据劫持的对象
 * @param {*} key 需要劫持的键
 * @param {*} value 数据的值
 */
function defineReactive(data,key,value){
    Object.defineProperty(data,key,{
        get(){
            console.log('获取',key);
            return value
        },
        //set 方法接收到的就是新设置的值
        set(newValue){
            // 判断新设置的值是否和当前的值一致,如果一致直接返回
            if(newValue === value) return
            // 如果不一致,就更新
            console.log('update');
            value = newValue
        }
    })
}