import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import configureStore from './store/configureStore'
import 'bootstrap/dist/css/bootstrap.css';
import { startSetUser } from './actions/login'

const store = configureStore()

store.subscribe(() => {
    console.log(store.getState())
})

if(localStorage.getItem('authToken')) {
    store.dispatch(startSetUser())
}

const ele = (
    <Provider store = { store }>
        <App />
    </Provider>
)


ReactDOM.render(ele, document.getElementById('root'))