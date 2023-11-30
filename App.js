import React, { useState , useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import Searchbar from './components/search-bar'
import SearchResultslist from './components/searchResultslist'
function App() {

  const [result , setResult] = useState([]);

  // useEffect(() => {
  //       console.log("nownow")
  // },[result])

  console.log(result);
  return (
    <div className="App">
      <div className ="search-bar-space">
        <Searchbar setResult ={setResult}/>
        <SearchResultslist result = {result}/>
      </div>
    </div>
  );
}


export default App;


