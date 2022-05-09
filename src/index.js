import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import './Main.css'

const globalState = {
  id_user: window.sessionStorage.getItem("id_user"),
  username: window.sessionStorage.getItem("username"),
  role: window.sessionStorage.getItem("role"),
  currentItem : null,
  buyFromWishlist : [],
  quantity : null,
  order_from : null,
  size : 'M',
  url: "https://api-pakalolo.herokuapp.com/"
}

console.log(window.sessionStorage.getItem("role"))

const reducer = (state = globalState, action) => {
  switch(action.type){
    case "CHOOSE_ITEM":
      let setItem = { ...state, currentItem: action.id_item }
      return setItem 
    case "ITEM_FROM_WISHLIST":
      let wishlistItem = { ...state, buyFromWishlist: action.data, order_from : action.order_from}
      return wishlistItem 
    case "SET_QUANTITY":
      let set_quantity = { ...state, quantity: action.quantity, order_from : action.order_from, size : action.size }
      return set_quantity
    default : 
      return state
  }
}

const stateStore = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={stateStore}>
      <Routes />  
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
