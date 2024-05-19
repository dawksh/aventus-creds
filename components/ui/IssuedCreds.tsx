"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import { Credentials } from "./CredCards";

const IssuedCreds = ({issuer_address}:{issuer_address: String}) => {
    const [credentials, setCredentials] = useState<Credentials[] | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // const issuer_address = "0x28172273CC1E0395F3473EC6eD062B6fdFb15940";
        fetch(`/api/get_all_user_creds?issuer_address=${issuer_address}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((result) => {
            result.json().then((data) => {
                console.log(data.credential)
                setCredentials(data.credential); // Assuming the data is in the correct format
                setLoading(false)
            });
        });
    }, []);

    return (
        <div className=" cursor-pointer rounded-md w-full max-w-4xl  mx-auto">
            <h2 className="text-2xl text-[#00a8e8] px-12">ISSUED CREDENTIALS:</h2>
            {credentials ?
                credentials.map((credential, index) => (
                    <div key={index}>
                        <Link href={`/credentials/${credential.id}`}>
                            <Card credentials={credential as Credentials} />
                        </Link>
                    </div>
                )) :
                loading? "Loading":
                "No Credentials Issued"}
        </div>
    );
};

export default IssuedCreds