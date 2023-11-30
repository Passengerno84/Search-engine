import React from 'react'

function SearchResult({result})
{
    return(
        <div className='results-list'>
        <h3>{result.title}</h3>
        <p>{result.body}</p>
        <a href = {result.url}>link</a>
        </div>
    )
}

export default SearchResult;