import { observer } from "./observer/index"

// 初始化状态
export function initState(vm) {
    let opts = vm.$options
    // 判断传入了哪些属性
    if (opts.props) {
        initProps()
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.watch) {
        initWatch()
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.methods) {
        initMethods()
    }
}

function initProps() { }

function initWatch() { }
function initComputed() { }
function initMethods() { }

// 对 Data 进行初始化
function initData(vm) {
    let data = vm.$options.data
    // 判断 data 是否是一个函数,如果是一个函数就将它执行,如果不是就返回 data 原有的值
    // 这里需要修改下 this 的指向
    data = vm._data = typeof data == "function" ? data.call(vm) : data
    // --- 对 data 数据进行劫持 ---
    observer(data)
}