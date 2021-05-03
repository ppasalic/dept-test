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
  li:last-child{
    background-color: #FFFF00;
    width: fit-content;
  }
`
const CACHE = {};

function App() {
  const [listOfColors, setListOfColors] = useState([]);
  const [dragItem, setDragItem] = useState();
  
  const getColor = () => {
    if (CACHE[listOfColors] !== undefined) {
     setListOfColors(listOfColors)
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
          setListOfColors([...listOfColors, currrentColor])
        
        }


      }
    );
  }

  const handleDragStart = (index) => {
    setDragItem(index);
  };
  
  const handleDragEnter = (e, index) => {
    const newList = [...listOfColors];
    const item = newList[dragItem];
    newList.splice(dragItem, 1);
    newList.splice(index, 0, item);
    setDragItem(index);
    setListOfColors(newList);
  };
  
  const handleDragLeave = (e) => {
    e.target.style.backgroundColor = "black";
  };
  
  const handleDrop = (e) => {
    e.target.style.backgroundColor = "black";
  };

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
          { listOfColors && listOfColors.map((c, index )=>
            <li
             draggable={true}
             key={c} 
             onDragStart={() => handleDragStart(index)}
             onDragEnter={(e) => handleDragEnter(e, index)}
             onDragLeave={(e) => handleDragLeave(e)}
             onDrop={(e) => handleDrop(e)}
             onDragOver={(e) => e.preventDefault()}
             style={{color: c}} 
             
             >{c}</li>)
           } 
        </List>
      </header>
    </div>
  );
}

export default App;
