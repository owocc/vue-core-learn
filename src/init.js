import { initState } from "./initState"

// 初始化 Vue
export function initMixin(Vue) {

    // 为 Vue 的原型链添加 _init 方法
    Vue.prototype._init = function (options) {
        console.log(options)
        let vm = this // 创建一个快捷的变量指向当前 Vue 实例
        vm.$options = options // 绑定快捷变量,方便后面访问
        initState(vm) // 将当前的 Vue 实例传递给初始化状态
    }
}

