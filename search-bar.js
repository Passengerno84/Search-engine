import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Searchbar({ setResult }) {
    const [inputstr, setInputstr] = useState("")
    //const [id , setId] = useState("")

    const handleclick = (e) => {

        e.preventDefault()
        //setId(inputstr)
        // axios.get(`http://localhost:5000/api?q=${inputstr}`)
        // .then((res) =>{ console.log(res.data)
        // alert(`hello ok`)  })

        // const fetchPost = async () =>{
        //     try {

        //         const response = axios.get(`http://localhost:5000/api?q=${inputstr}`)
        //         .then((res) =>{ console.log(res.data)
        //         alert(`All set`) })

        //         if (response && response.data)
        //             setResult(response.data)

        //     } catch (err) {
        //         if(err.response){
        //             console.log(err.response.data);
        //             console.log(err.response.status);
        //             console.log(err.response.headers);
        //         }
        //         else{
        //             console.log(`Error: ${err.message}`)
        //         }

        //     }
        // }

        // fetchPost();

        axios.get(`http://localhost:5000/api?q=${inputstr}`)
            .then((res) => {
                console.log(res.data)
                alert(`All set`)
                if (res && res.data)
                    setResult(res.data)
            })





    }

    // useEffect(() =>{
    //     alert(`hello ${id}`)
    //     axios.get(`http://localhost:5000/api?q=${inputstr}`)
    //     .then((res) =>{ console.log(res.data)  })
    // },[id])

    return (
        <div className="input-Wrapper">
            <form>
                <input type="text" value={inputstr} onChange={(event => setInputstr(event.target.value))} />
                <button onClick={handleclick}>search</button>
            </form>
        </div>
    )
}

export default Searchbar