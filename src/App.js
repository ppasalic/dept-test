import './App.css';
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from "react"
import apiFetch from './FetchApi'

const Button = styled.button`
  color: #fff;
  font-size: 18px;
  width: fit-content;
  height: fit-content;
  background-color: #004F80;
  border: transparent;
  border-radius: 5px;
  padding: 20px;
  text-align: center;

  :hover{
    background-color: #003759;
  }
`
const List = styled.ul`
  padding-top: 50px;
  text-align: left;
`
const CACHE = {};

function App() {
  const [listOfColors, setColor] = useState([]);
  const [loading, setLoading] = useState(false)
  
  const getColor = () => {
    if (CACHE[listOfColors] !== undefined) {
     setColor(listOfColors)
    }
    apiFetch(`https://www.colr.org/json/color/random`, { cache: "no-cache" })
    .then(
    response => {

        console.log("RESPONSE ", response)
        const currrentColor =  "#" + response.colors[0].hex

        CACHE[listOfColors] =  currrentColor

        document.getElementById("button-color").style.color = currrentColor

        if(!listOfColors.includes(currrentColor))
        {
          setColor([...listOfColors, currrentColor])
        
        }


      }
    );
  }

  useEffect(() =>  {
    console.log("LIST OF COLORS, ", listOfColors)
    
  })

  return (
    <div className="App">
      <header className="App-header">
        <Button id="button-color" onClick={getColor} >
          Change color
        </Button>
        <List>
          { listOfColors && listOfColors.map(c =>
            <li key={c} style={{color: c}} >{c}</li>)
           } 
        </List>
      </header>
    </div>
  );
}

export default App;
