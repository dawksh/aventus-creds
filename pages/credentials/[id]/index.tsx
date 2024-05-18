"use client"

import CardPage from "@/components/ui/CardPage"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function index() {

    const [credID, setCredID] = useState<any>('')
    const [credential, setCredential] = useState<any>('')
    const params = useParams()
    // console.log({...params}.id)
    useEffect(() => {
        if (params) {
            setCredID({ ...params }.id)
            if (credID) {
                console.log(credID);
                axios.get(`/api/get_individual_cred?credential_id=${credID}`).then((result)=>{
                    console.log(result.data)
                })
                // fetch(`/api/get_individual_cred?credential_id=${credID}`, {
                //     method: 'GET',
                //     headers: { 'Content-Type': 'application/json' },
                // }).then((result) => {
                //     // setCredentials(JSON.parse(result))
                //     console.log(result);
                // })
            }
        }
    }, [params])

    return (
        <div>
           <CardPage />
        </div>
    )
}
