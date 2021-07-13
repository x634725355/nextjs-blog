import { createStore } from 'redux'
import { addText } from "./action";

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD = 'ADD';

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = { num: 0, text: '' }, action) {
  switch (action.type) {
    case INCREMENT:
      state.num += 1;
      return { ...state };
    case DECREMENT:
      state.num -= 1;
      return { ...state };
    case ADD: 
      state.text = action.text;
      return { ...state }
    default:
      return state
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter)

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() => console.log(store.getState()))
store.dispatch({type: INCREMENT})
store.dispatch({type: DECREMENT})
store.dispatch(addText('redux真的太傻逼了'));

export default store;