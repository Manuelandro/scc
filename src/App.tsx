import React from 'react';
import './App.css';
import useFetchGreeting from './hooks/useFetchGreeting';
import useSetGreeting from './hooks/useSetGreeting';

const App: React.FC = () => {
  const [setFetching] = useFetchGreeting()
  const [setSetting, setGreeting] = useSetGreeting(setFetching)

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setFetching(true)}>Fetch Greeting</button>
        <button onClick={() => setSetting(true)}>Set Greeting</button>
        <input onChange={e => setGreeting(e.target.value)} placeholder="Set greeting" />
      </header>
    </div>
  );
}

export default App;
