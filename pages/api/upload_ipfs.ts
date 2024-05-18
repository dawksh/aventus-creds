// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ipfsClient } from '@/utils/ipfs';
import { supabase } from '@/utils/supabase/supabase';
import axios from 'axios';
import { writeSync } from 'fs';
import { urlSource } from 'kubo-rpc-client';
import type { NextApiRequest, NextApiResponse } from 'next'

type CreateCredentialResponse = {
    image: string,
    metadata: string
}

const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CreateCredentialResponse | null>
) {
    if (req.method == 'POST') {
        let payload = req.body;
        const { title, description, image, issuer } = payload;
        const imgCid = await fetch(image).then(async res => {
            const imgBlob = await res.blob()
            const { cid } = await ipfsClient.add(imgBlob)
            await ipfsClient.pin.add(cid)
            return cid
        })
        const metadata = {
            name: title,
            description: `${description}\n\nIssued By: ${issuer}`,
            image: imgCid.toV1().toString(),
        }

        var myblob = new Blob([JSON.stringify(metadata)], {
            type: 'text/plain'
        });
        const { cid } = await ipfsClient.add(myblob)
        await ipfsClient.pin.add(cid)

        return res.status(200).json({
            image: imgCid.toV1().toString(),
            metadata: cid.toV1().toString()
        })

    } else {
        return res.status(400)
    }

}
