import './App.css';
import styled from 'styled-components'
import axios from 'axios'

const Button = styled.button`
  
`

function App() {

  const onChangeColor = async () => {

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
    })
    .catch(error => {
        console.log("Error =>", error);
     })

     console.log("Result ", result)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onChangeColor}>
          Change color
        </Button>
      </header>
    </div>
  );
}

export default App;
