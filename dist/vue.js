(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  // 对数据进行劫持

  /* Note:
      data中的数据可能是一个 普通的对象的值:           {name:'owo'}
      也可能是一个对象中的对象:                       {user:{age:12}}
      或者也可能是一个普通的数组也可能是数组中嵌套      {[1,2,3]} || {[{age:12},{age:14},{age:15}]}
      当然数据也可能更复杂,就是一路嵌套进去
      这里的最外层的 {} 都是指 data 返回的那个对象(( 
  */

  function observer(data) {
    // 这里要判断数据是否不是 object
    if (_typeof(data) != 'object' || data == null) {
      return data;
    }
    // 处理对象的数据劫持
    return new Observer(data);
  }

  // 对数据进行劫持
  // Observer 观察者
  // 在 vue2 中是使用 Object.defineProperty 来对数据进行劫持的,它有一个缺点就是只能对对象中的一个属性进行劫持(所以需要使用递归来进行数据的劫持)
  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);
      this.walk(value);
    }
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); // 获取到对象的所有 key,方便等下用 Object.defineProperty 来设置代理
        // 通过循环设置数据劫持 
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i]; // 得到对象中的一个键
          var value = data[key]; // value 表示传入的 data 对象对应的值(和key对应)
          defineReactive(data, key, value);
        }
      }
    }]);
    return Observer;
  }();
  /**
   * 对对象中的属性进行劫持
   * @param {*} data 需要进行数据劫持的对象
   * @param {*} key 需要劫持的键
   * @param {*} value 数据的值
   */
  function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
      get: function get() {
        console.log('获取', key);
        return value;
      },
      //set 方法接收到的就是新设置的值
      set: function set(newValue) {
        // 判断新设置的值是否和当前的值一致,如果一致直接返回
        if (newValue === value) return;
        // 如果不一致,就更新
        console.log('update');
        value = newValue;
      }
    });
  }

  // 初始化状态
  function initState(vm) {
    var opts = vm.$options;
    // 判断传入了哪些属性
    if (opts.props) ;
    if (opts.data) {
      initData(vm);
    }
    if (opts.watch) ;
    if (opts.computed) ;
    if (opts.methods) ;
  }

  // 对 Data 进行初始化
  function initData(vm) {
    var data = vm.$options.data;
    // 判断 data 是否是一个函数,如果是一个函数就将它执行,如果不是就返回 data 原有的值
    // 这里需要修改下 this 的指向
    data = vm._data = typeof data == "function" ? data.call(vm) : data;
    // --- 对 data 数据进行劫持 ---
    observer(data);
  }

  // 初始化 Vue
  function initMixin(Vue) {
    // 为 Vue 的原型链添加 _init 方法
    Vue.prototype._init = function (options) {
      console.log(options);
      var vm = this; // 创建一个快捷的变量指向当前 Vue 实例
      vm.$options = options; // 绑定快捷变量,方便后面访问
      initState(vm); // 将当前的 Vue 实例传递给初始化状态
    };
  }

  /**
   * 
   * @param {*} options Vue的选项 比如 props | data | watch ...等等
   */
  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue); // 初始化 Vue

  return Vue;

})));
//# sourceMappingURL=vue.js.map
