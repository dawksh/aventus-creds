"use client"
import axios from "axios";
import { TbTriangleFilled } from "react-icons/tb";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi";
import IssuedCreds from "@/components/ui/IssuedCreds";

const Index = () => {

    const [waddress, setWAddress] = useState<any>()
    const [loading, setLoading] = useState<Boolean>(true)
    const [upvotesLoading, setUpvotesLoading] = useState(false)
    const [user, setUser] = useState<any>()
    const params = useParams();

    const { address } = useAccount();

    useEffect(() => {
        if (params) {
            setWAddress(params.walletAddress)
        }
    }, [params])

    useEffect(() => {
        if (waddress) {
            fetchUserDetails().then(() => {
                setLoading(false)
            })
        }
    }, [waddress])

    const fetchUserDetails = async () => {
        const result = await axios.get(`/api/users/get?wallet_address=${waddress}`)
        setUser(result.data.user)
    }

    const handleUpvote = async () => {
        if (user) {
            try {
                setUpvotesLoading(false)
                const result = (await axios.post("/api/users/upvote", {
                    target: waddress,
                    sender: address
                })).data
                fetchUserDetails().then(() => {
                    setUpvotesLoading(false)
                })
            } catch(error:any) {
                console.log(error.message)
            }
        }
    }

    return (
        <div>
            {user ?
                <>
                    <div>
                        Issuer Name:{user.name}
                    </div>
                    <div>
                        Upvotes:
                        {upvotesLoading ?
                            'loading...' :
                            <>
                                {user.upvote_count}
                                <button onClick={() => handleUpvote()} className="inline-block relative top-0.5 text-slate-500">
                                    <TbTriangleFilled />
                                </button>
                            </>
                        }
                    </div>
                    <IssuedCreds issuer_address={user.wallet_address} />
                </> : loading ? <div>Loading...</div> : <div> No user found </div>}

        </div>
    )
}

export default Index