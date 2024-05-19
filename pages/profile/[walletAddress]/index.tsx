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

    const { isConnected, address } = useAccount();

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
        if (isConnected) {
            try {
                setUpvotesLoading(false)
                const result = (await axios.post("/api/users/upvote", {
                    target: waddress,
                    sender: address
                })).data
                fetchUserDetails().then(() => {
                    setUpvotesLoading(false)
                })
            } catch (error: any) {
                console.log(error.message)
                alert("Already upvoted!")
            }
        }
        else{
            alert("Connect your wallet")
        }
    }

    return (
        <div>
            {user ?
                <div>
                    <div className="flex flex-col md:flex-row justify-around items-start p-52 py-10">
                        <div className=" flex flex-col">
                            <span className="text-[#00a8e8] text-5xl">{user.name}</span>
                            <span className="text-slate-600 text-md">{waddress}</span>
                        </div>
                        <div className="text-[#00a8e8] text-lg">
                            reputation: {upvotesLoading ?
                                'loading...' :
                                <>
                                    <span className="text-2xl font-bold">{user.upvote_count}</span>&nbsp;
                                    <button aria-label="Upvote" onClick={() => handleUpvote()} className="inline-block text-slate-500">
                                        <TbTriangleFilled />
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                    <IssuedCreds issuer_address={user.wallet_address} />
                </div> : loading ? <div>Loading...</div> : <div> No user found </div>}

        </div>
    )
}

export default Index