"use client";
import { useEffect, useState } from "react";
import { Credentials } from "./CredCards";
import Link from "next/link";
import Card from "./Card";
import { useAccount } from "wagmi";

const MyCreds = () => {

    const [credentials, setCredentials] = useState<Credentials[] | null>(null);
    const [loading, setLoading] = useState(true)

    const { isConnected, address } = useAccount();

    useEffect(() => {
        const recipient_address = address;
        fetch(`/api/get_all_user_creds?recipient_address=${recipient_address}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((result) => {
            result.json().then((data) => {
                console.log(data)
                setCredentials(data.credential); // Assuming the data is in the correct format
                setLoading(false)
            });
        });
    }, []);

    return (
        <div>
            {credentials ?
                credentials.map((credential, index) => (
                    <div key={index}>
                        <Link href={`/credentials/${credential.id}`}>
                            <Card credentials={credential as Credentials} />
                        </Link>
                    </div>
                )) :
                loading ? <p>Loading...</p> : <p>No credentials found</p>
            }
        </div>
    )
}

export default MyCreds