"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Credentials {
  image_cid: string;
  title: string;
  owner: string;
  description: string;
  issuer_address: string;
}

const CredCards = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  useEffect(() => {
    const recipient_address = "0xdb49383a2beea52c1eefb4ce5fd52ea1432e204e";
    fetch(`/api/get_all_user_creds?recipient_address=${recipient_address}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((result) => {
      result.json().then((data) => {
        setCredentials(data); // Assuming the data is in the correct format
      });
    });
  }, []);

  let id = 1;
  if (!credentials) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div
      onClick={() => router.push(`/credentials/${1}`)}
      className="cursor-pointer border-2 rounded-md w-full max-w-4xl border-pink-700 mx-auto"
    >
      <Card
      // image_cid={credentials.image_cid}
      // title={credentials.title}
      // owner={credentials.owner}
      // description={credentials.description}
      // issuer_address={credentials.issuer_address}
      />
    </div>
  );
};

export default CredCards;
