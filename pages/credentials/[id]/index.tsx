"use client"

import CardPage from "@/components/ui/CardPage"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function index() {

    

    const [credID, setCredID] = useState<any>('')
    const [credential, setCredential] = useState<any>('')

    const params = useParams()
    useEffect(() => {
        if (params) {
            console.log({ ...params }.id)
            setCredID({ ...params }.id)
            // if (credID) {
            //     console.log(credID);
            //     axios.get(`/api/get_individual_cred?credential_id=${credID}`).then((result)=>{
            //         console.log(result.data)
            //     })
            // fetch(`/api/get_individual_cred?credential_id=${credID}`, {
            //     method: 'GET',
            //     headers: { 'Content-Type': 'application/json' },
            // }).then((result) => {
            //     // setCredentials(JSON.parse(result))
            //     console.log(result);
            // })
            // }
        }
    }, [params])

    useEffect(() => {
        if (credID) {
            console.log(credID);
            axios.get(`/api/get_individual_cred?credential_id=${credID}`).then((result) => {
                console.log(result.data)
                setCredential(result.data.credential)
            })
        }
    }, [credID])


    return (
        <div>
            <CardPage credential={credential} />
        </div>
    )
}
