import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthForm from './containers/Auth/index';
import Header from './components/Header/index';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'><Header /></Route>
        <Route path="/home"><div>Home</div></Route>
        <Route path="/auth" component={AuthForm}/>
      </Switch>
    </div>
  );
}

export default App;