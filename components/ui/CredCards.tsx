import { useEffect, useState } from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface credentials {
    image_cid: String;
    title: String;
    owner: String;
    description: String;
    issuer_address: String;
}

const CredCards = () => {

    const router = useRouter()

    let id = 1

    let recipient_address = '0xdb49383a2beea52c1eefb4ce5fd52ea1432e204e'

    // Retreive user credentials data 

    const [user, setUser] = useState()
    const [credentials, setCredentials] = useState<credentials>();

    useEffect(() => {
        fetch(`/api/get_all_user_creds?recipient_address=${recipient_address}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((result) => {
            // setCredentials(JSON.parse(result))
            console.log(result);
        })
    })

    return (
        <>
            <div
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Link href={`/credentials/${id}`}>
                    <Card />
                </Link>
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
            <div onClick={() => router.push(`/credentials/${id}`)}
                className="border-2 rounded-md w-1/5 border-pink-700">
                <Card />
            </div>
        </>
    )
}

export default CredCards