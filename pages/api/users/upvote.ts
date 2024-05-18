
import { supabase } from '@/utils/supabase/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        let payload = req.body;

        let { target, sender } = payload;

        if ([target, sender].includes(undefined)) {
            return res.status(400).json({ message: 'All Data not included', resp: null, })
        }

        let getquery = supabase.from('upvote_records').select().match({ 'sender': sender, 'target': target })
        let { data, error } = await getquery;
        if (error) {
            return res.status(500).json({ message: `Error: ${error.message}`, resp: null });
        }

        if (data?.length !== 0) {
            return res.status(400).json({ message: 'Upvote already exists!' });
        }

        //Create Association
        let insertQuery = supabase.from('upvote_records').insert({
            target,
            sender,
        });
        let { data: insertData, error: insertError } = await insertQuery;
        if (insertError) {
            return res.status(500).json({ message: `Error: ${insertError.message}`, resp: null });
        }

        //calculate upvote count for target
        let upvoteCountQuery = supabase.from('upvote_records').select().eq('target', target)
        let { data: upvoteData, error: upvoteError } = await upvoteCountQuery;

        if (upvoteError) {
            return res.status(500).json({ message: `Error: ${upvoteError.message}`, resp: null });
        }

        return res.status(200).json({
            'upvote_count': upvoteData?.length ?? 0,
        });
    } else {
        return res.status(400).json({ message: 'Only POST is supported', resp: null, })
    }

}
