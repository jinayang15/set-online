import { useEffect, useState, useRef } from 'react'
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
      <Card shape="circle" imgUrl={circleSVG} />
      <Card shape="circle" imgUrl={circleSVG} />
      <Card shape="circle" imgUrl={circleSVG} />
    </div>
  )
}

export default App
