import './App.css';

import Home from "./components/Home.js"
import Dashboard from './components/Dashboard.js';

import { selectLoggedIn } from "./slices/user.slice.js";
import { useSelector } from "react-redux";


function App() {

  const isLoggedin = useSelector(selectLoggedIn);

  return (
    <div className="app">
      {isLoggedin? <Dashboard /> :<Home />}
    </div>
  );
}

export default App;
