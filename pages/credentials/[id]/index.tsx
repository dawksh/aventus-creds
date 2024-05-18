"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function index() {

    const [credID, setCredID] = useState<any>('')
    const params = useParams()
    console.log({...params}.id)
    useEffect(() => {
        setCredID({...params}.id)
    }, [params])

    return (
        <div>
            Hello {credID}
        </div>
    )
}
