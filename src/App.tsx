import React from 'react';
import './App.css';
import useFetchGreeting from './hooks/useFetchGreeting';
import useSetGreeting from './hooks/useSetGreeting';

const App: React.FC = () => {
  const [setFetching] = useFetchGreeting()
  const [] = useSetGreeting(setFetching)

  return (
    <div className="App">

    </div>
  );
}

export default App;
