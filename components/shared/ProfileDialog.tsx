import React, { Ref, useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { useAccount } from 'wagmi'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const fetchOrCreateUsers = async (address: string, ref: any) => {
    if (address) {
        try {
            await axios.get(`/api/user/get?wallet_address=${address}`)
        } catch (e) {
            ref.current.click()
        }
    }
}

const ProfileDialog = () => {
    const ref = useRef<any>(null);
    const closeRef = useRef<any>();
    const { isConnected, address } = useAccount();
    const [name, setName] = useState("");

    useEffect(() => {
        if (address) {
            fetchOrCreateUsers(address, ref)
        }
    }, [isConnected, address])

    const submitUser = async () => {
        await axios.post("api/users/create", {
            name,
            wallet_address: address
        })
        closeRef.current.click()
    }

    return (
        <Dialog>
            <DialogTrigger ref={ref}></DialogTrigger>
            <DialogClose ref={closeRef}></DialogClose>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Profile</DialogTitle>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={submitUser}>Submit</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileDialog