import './App.css';
import styled from 'styled-components'
import axios from 'axios'

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

function App() {

  const onChangeColor = async (e) => {

    const result = await axios.get("/api",
    {
      header: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Accept-Language, X-Authorization"
      }
    })

    .then(response => {
        console.log("Success =>", response.data);
        
        console.log(response.data.colors[0].hex)
   
        e.target.style.color = response.data.colors[0].hex
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
      </header>
    </div>
  );
}

export default App;
