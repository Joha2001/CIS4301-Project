import logo from './logo.png';
import './App.css';

function App() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}><img src={logo} className="App-logo" alt="logo" /></button>
        Click on the Steam Icon!
        <p>
          CIS4301 Steam Project
          <p></p>
          Alex Good | John Hoang | Michael Klein | Jerry Mbamo
        </p>
      </header>
    </div>
  );
}

export default App;
