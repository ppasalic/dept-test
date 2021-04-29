import './App.css';
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from "react"

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

function App() {
  let [listOfColors, setColor] = useState([]);
  
  const onChangeColor = (e) => {
    
    axios.get("https://www.colr.org/json/color/random",
    { crossdomain: true })
    .then(response => {
        console.log("Success =>", response.data);
        
        console.log(response.data.colors[0].hex)

        e.target.style.color = "#"+response.data.colors[0].hex

        if(!listOfColors.includes("#"+response.data.colors[0].hex))
        {
          setColor([...listOfColors, "#" + response.data.colors[0].hex])
        }
    })
    .catch(error => {
        console.log("Error =>", error);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button id="button-color" onClick={onChangeColor} >
          Change color
        </Button>
        <List>
          { listOfColors !== undefined ? listOfColors.map(c =>
            <li style={{color: c}} >{c}</li>)
           : <></> } 
        </List>
      </header>
    </div>
  );
}

export default App;
