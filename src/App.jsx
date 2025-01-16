import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [foxUrl, setFoxUrl] = useState('');
  const numberRef = useRef(null);

  useEffect(() => {
    getRandomFox();
  }, []);

  const getRandomFox = async () => {
    try {
      const results = await axios.get('https://randomfox.ca/floof/');
      setFoxUrl(results.data.image);
    } catch (er) {
      console.error('UY, ERROR!', er);
     }
  }

  const getFoxByNumber = async (number) => {
    number = Math.floor(Number(number));
    if (!isNaN(number) && number > 0 && number < 125) {
      try {
        setFoxUrl(`https://randomfox.ca/images/${number}.jpg`);
      } catch (er) {
        console.error('UY, ERROR!', er);
      }
    }
  }

  const handleSearch = () => {
    getFoxByNumber(numberRef.current.value);
    numberRef.current.value = null;
  }

  return (
    <>
      <h1>Random Fox API</h1>
      <input type="number" min={1} max={124} step="1" ref={numberRef} />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={getRandomFox}>Random!</button>
      <img className="img" src={foxUrl} alt="" />
    </>
  )
}

export default App
