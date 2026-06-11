import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import { connect, sendSet } from './connect'
import boardStore from './boardStore.js';
import Card from './Card';
import circleSVG from "./assets/circle.svg"
import dazzleSVG from "./assets/dazzle.svg"
import checkSVG from "./assets/check.svg"

function App() {
  const boardState = useSyncExternalStore(boardStore.subscribe, boardStore.getSnapshot);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isAwaitingServer, setIsAwaitingServer] = useState(false);

  useEffect(() => {
    connect();
  }, [])

  function handleCardSelect(val) {
    console.log("selected card", val)
    if (isAwaitingServer) return;

    if (selectedCards.length === 3) {
      setSelectedCards([])
      setIsAwaitingServer(false);
    } else if (selectedCards.length === 2) {
      setSelectedCards(prev => [...prev, val])
      sendSet([...selectedCards, val])
      setIsAwaitingServer(true);
    } else {
      setSelectedCards(prev => [...prev, val])
    }
  }

  const imgMapping = {
    0: circleSVG,
    1: dazzleSVG,
    2: checkSVG,
  }

  return (
    <div id="board">
      {
        boardState.map((val) => {
          const selected = selectedCards.includes(val)
          return <Card key={val} shape={val} img={imgMapping[val]} selected={selected} handleCardSelect={() => handleCardSelect(val)} />
        })
      }
    </div>
  )
}

export default App
