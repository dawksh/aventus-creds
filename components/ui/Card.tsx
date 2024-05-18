import { useEffect, useState } from "react";

interface credentials {
    imgsrc: String;
    title: String;
    owner: String
}

const Card = () => {

    // Retreive user credentials data

    // const [user, setUser] = useState()
    // const [credentials, setCredentials] = useState<credentials>();

    // useEffect(()=>{
    //     fetch("/api/credentials",{
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: user
    //     }).then((result)=>{
    //         // setCredentials(result)
    //         console.log(result);
    //     })
    // })

    return (
        <div className="flex flex-col justify-center items-center">
            <img src="https://imgs.search.brave.com/6yz2O2VMpgQz_QxPjezntKKQCz7JzLGM10nxx8rjT9s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2hvbWUvYmx1cmJz/L3Zpc3VhbHMud2Vi/cA" alt="CRED" />
            <h2 className="text-xl">Title</h2>
            <p>Owner</p>
        </div>
    )
}

export default Card