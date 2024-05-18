import { supabase } from '@/utils/supabase/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    let wallet_address = req.query['wallet_address']
    let query = supabase.from('users').select().eq('wallet_address', wallet_address);
    let { data, error } = await query;
    if (error) {
        return res.status(500).json({ message: `Error: ${error}` });
    }
    if (data === null || data === undefined) {
        return res.status(500).json({ message: `Data Retrieval Error` });
    }

    if (data.length === 0) {
        return res.status(404).json({ message: `Credential Record Not Found` });
    }

    //get upvotes
    let upvoteCountQuery = supabase.from('upvote_records').select().eq('target', wallet_address)
    let { data: upvoteData, error: upvoteError } = await upvoteCountQuery;
    if (error) {
        console.log(`Error: ${upvoteError?.message}`);
    }

    let user = {
        ...data[0],
        'upvote_count': upvoteData?.length ?? 0
    };

    return res.status(200).json({ message: 'OK', 'user': user })
}