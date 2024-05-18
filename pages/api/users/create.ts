
import { supabase } from '@/utils/supabase/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        let payload = req.body;

        let { name, wallet_address } = payload;

        if ([name, wallet_address].includes(undefined)) {
            return res.status(400).json({ message: 'All Data not included', resp: null, })
        }

        let query = supabase.from('users').insert({
            name,
            wallet_address,
        });
        let { data, error } = await query;
        if (error) {
            return res.status(500).json({ message: `Error: ${error.message}`, resp: null });
        }
        return res.status(200).json({});
    } else {
        return res.status(400).json({ message: 'Only POST is supported', resp: null, })
    }

}
