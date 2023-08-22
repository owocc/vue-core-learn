import { initMixin } from "./init"

/**
 * 
 * @param {*} options Vue的选项 比如 props | data | watch ...等等
 */
function Vue(options){
    this._init(options)
}
initMixin(Vue) // 初始化 Vue
export default Vue