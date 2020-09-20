import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import App from './App'
import { rootReducer } from './redux/rootReducer'
import * as serviceWorker from './serviceWorker'
import Saga from './redux/sagas'

const saga = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, saga)))

saga.run(Saga)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorker.unregister()
