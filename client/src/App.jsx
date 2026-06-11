import { useEffect } from 'react'
import './App.css'
import { connect } from './connect'
import Card from './Card';
import circleSVG from "./assets/circle.svg"

function App() {
  useEffect(() => {
    connect();
  }, [])

  return (
    <div>
      <Card shape="circle" img={circleSVG} />
      <Card shape="circle" img={circleSVG} />
      <Card shape="circle" img={circleSVG} />
    </div>
  )
}

export default App
