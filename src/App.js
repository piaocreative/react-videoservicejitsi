import React from 'react';
import Header from './components/Header';
import {createBrowserHistory} from 'history';
import {Route,Router,Switch,BrowserRouter,withRouter} from 'react-router-dom';
import RouteComp from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.css';
import './App.css';
import configureStore from './redux/store';
import {Provider} from 'react-redux';

const store = configureStore()
const history = createBrowserHistory();
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter history={history}>
          <Header/>
          <RouteComp/>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
