import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import { connect, isAwaitingServerStore, sendSet } from './connect'
import boardStore from './boardStore.js';
import Card from './Card';
import cardImages from "./images.js"

function App() {
  const boardState = useSyncExternalStore(boardStore.subscribe, boardStore.getSnapshot);
  const [selectedCards, setSelectedCards] = useState([]);
  const isAwaitingServerState = useSyncExternalStore(isAwaitingServerStore.subscribe, isAwaitingServerStore.getSnapshot);

  useEffect(() => {
    connect();
  }, [])

  if (!isAwaitingServerState && selectedCards.length === 3) {
    setSelectedCards([])
  }

  function handleCardSelect(val) {
    console.log("selected card", val)
    if (isAwaitingServerState || selectedCards.includes(val)) return;

    if (selectedCards.length === 3) {
      setSelectedCards([])
    } else if (selectedCards.length === 2) {
      setSelectedCards(prev => [...prev, val])
      sendSet([...selectedCards, val])
    } else {
      setSelectedCards(prev => [...prev, val])
    }
  }

  return (
    <div id="board">
      {
        boardState.map((val) => {
          const selected = selectedCards.includes(val)
          return <Card key={val} id={val} img={cardImages[val]} selected={selected} handleCardSelect={() => handleCardSelect(val)} />
        })
      }
    </div>
  )
}

export default App
