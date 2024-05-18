"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";

export interface Credentials {
    image_cid: string;
    title: string;
    recipient_address: string;
    description: string;
    issuer_address: string;
    id: number
}

const CredCards = () => {
    const [credentials, setCredentials] = useState<Credentials[] | null>(null);

    useEffect(() => {
        const recipient_address = "0x28172273CC1E0395F3473EC6eD062B6fdFb15940";
        fetch(`/api/get_all_user_creds?recipient_address=${recipient_address}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((result) => {
            result.json().then((data) => {
                console.log(data)
                setCredentials(data.credential); // Assuming the data is in the correct format
            });
        });
    }, []);

    let id = 1

    return (
        <div className=" cursor-pointer rounded-md w-full max-w-4xl  mx-auto">
            {credentials ?
                credentials.map((credential, index) => (
                    <div key={index}>
                        <Link href={`/credentials/${credential.id}`}>
                            <Card credentials={credential as Credentials} />
                        </Link>
                    </div>
                )) :
                "Loading..."}
        </div>
    );
};

export default CredCards
