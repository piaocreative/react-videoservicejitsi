import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import reducers from './reducer';
import saga from './saga';
import createSagaMiddleware from 'redux-saga';

export default function configureStore()
{
    const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const store = createStore(combineReducers({...reducers}),composeEnhancers(applyMiddleware(...middlewares)));
    
    return {
        ...store,runSaga:[
            sagaMiddleware.run(saga)
        ]
    }
}