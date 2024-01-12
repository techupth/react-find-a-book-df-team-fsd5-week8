// Exercise 2

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchFromServer = async (text) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      setSearchResult(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  //Case_1. with useEffect
useEffect(() => {
    if (searchText) {
      searchFromServer(searchText);
    }
  }, [searchText]);

//Case_2. without useEffect
  // if (searchText) {
  //   searchFromServer(searchText);
  // }
  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      {searchResult.length > 0 && (
        <>
          {searchResult.map((result, index) => (
            <div key={index} className="autocompleteItems">
              <li className="search-result">{result.volumeInfo.title}</li>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;