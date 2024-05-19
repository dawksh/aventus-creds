// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '@/utils/supabase/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'

type CreateCredentialResponse = {
  message: string
  resp: any,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateCredentialResponse | null>
) {
  if (req.method == 'POST') {
    let payload = req.body;

    let { image_cid, title, recipient_address, description, issuer_address, date } = payload;

    if ([image_cid, title, recipient_address, description, issuer_address].includes(undefined)) {
      return res.status(400).json({ message: 'All Data not included', resp: null, })
    }
    let query = supabase.from('credential_records').insert({
      image_cid,
      title,
      recipient_address,
      description,
      issuer_address,
      metadata: {
        expiryDate: date
      }
    });
    let { data, error } = await query;
    if (error) {
      return res.status(500).json({ message: `Error: ${error}`, resp: null });
    }
    return res.status(200).json({ message: 'OK', resp: data });
  } else {
    return res.status(400).json({ message: 'Only POST is supported', resp: null, })
  }

}
