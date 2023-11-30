import React , {useState , useEffect} from 'react'
import "../SearchResultsList.css";
import SearchResult from "./searchResult"

function SearchResultslist({result}) {

    console.log("kokokoko" , result);
    return (
        <div>
          {result.map((result, index) => 
             <SearchResult result={result} key={result.index} />
          )}
        </div>
      );

}

export default SearchResultslist