import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <div className="flex flex-row justify-end h-20 p-4 mt-8">
            <ConnectButton />
            <button className="border-2 mx-4 rounded-lg border-white px-2 py-1">
                <Link href="/uploadform">Create</Link>
            </button>
        </div>
    )
}

export default Header