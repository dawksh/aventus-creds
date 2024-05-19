import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <div className="flex flex-row justify-between h-20 p-4 mb-4 items-center">
            <h1 className='text-white text-5xl ml-4'>Credentus</h1>
            <div className='flex'>
                <ConnectButton />
                <button className="border-2 mx-4 rounded-lg border-white px-2 py-1">
                    <Link href="/uploadform">Create</Link>
                </button>
                <button className="border-2 mx-2 rounded-lg border-white px-3 py-1">
                    <Link href="/me">Me</Link>
                </button>
            </div>
        </div>
    )
}

export default Header