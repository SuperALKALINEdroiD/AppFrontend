// import './App.css';
import Signup from './components/Signup/Signup.jsx'
import TopBar from './components/TopBar.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/test">
            <TopBar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}