import './App.css';
import Editor_Page from './components/editor.js';


function App() {
  return (
    <div className="App">
      <div class="container">
        <div class="div-greeting">
            <h1 id="greeting"> Hey there! </h1> 
            <h3 id="question"> What do you wanna do today? </h3>
        </div>

        <div class="options-existing">
            <ul id="options-list"> 
                <li> <a href="#" id="openNotes"> Open Notes </a> </li>
                <li> <a href="#" id="settings"> Settings </a> </li>
                <li> <a href="#" id="exit"> Exit </a> </li>

            </ul>
        </div>

      </div>
    </div>
  );
}


export default App;
