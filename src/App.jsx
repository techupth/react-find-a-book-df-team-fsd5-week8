// Exercise 2

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState([]);

  const fetchingData = async (text) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      setResult(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  // Case_1. without useEffect
    // if (inputText) {
    //   fetchingData(inputText);
    // }


  //Case_2. with useEffect
useEffect(() => {
    if (inputText) {
      fetchingData(inputText);
    }
  },[inputText]);


  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" onChange={(e) => setInputText(e.target.value)} />
      {result.length > 0 && (
        <>
          {result.map((list, index) => (
            <div key={index} className="autocompleteItems">
              <li className="search-result">{list.volumeInfo.title}</li>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;