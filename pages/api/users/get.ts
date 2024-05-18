import { supabase } from '@/utils/supabase/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    let user_id = req.query['wallet_address']
    let query = supabase.from('users').select().eq('wallet_address', user_id);
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
    return res.status(200).json({ message: 'OK', 'user': data[0] })
}