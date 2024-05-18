import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi';
import ProfileDialog from './ProfileDialog';


const Layout = ({ children }: any) => {

    return (
        <div>
            <ProfileDialog></ProfileDialog>
            {children}
        </div>
    )
}

export default Layout