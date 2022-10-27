import './App.css';
import Main from './Components/Main';
import Scramble from './Components/Scrambles';

function App() {
  return (
    <div>
      <nav>
        <h1>Rubik's Cube Timer</h1>
      </nav>
      <div className='App'>
        
        <div>
          <Main/>
        </div>
      </div>
    </div>
    
  );
}

export default App;
