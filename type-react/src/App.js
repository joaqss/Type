import './App.css';
import Editor_Page from './components/editor/editor.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <div class="container">
        <div class="div-greeting">
            <h1 id="greeting"> Hey there! </h1> 
            <h3 id="question"> What do you wanna do today? </h3>
        </div>

        <div class="options-existing">
            <ul id="options-list"> 
                <li> <Link to="/editor" id="openNotes">Open Notes</Link> </li>
                <li> <a href="#" id="settings"> Settings </a> </li>
                <li> <a href="#" id="exit"> Exit </a> </li>

            </ul>
        </div>

      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor_Page />} />
      </Routes>
    </Router>
  );
}

export default App;
