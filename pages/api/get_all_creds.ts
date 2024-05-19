
import { Credentials } from '@/components/ui/CredCards';
import { supabase } from '@/utils/supabase/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    let query = supabase.from('credential_records').select();
    let { data, error } = await query;
    if (error) {
        return res.status(500).json({ message: `Error: ${error}` });
    }

    let creds: Credentials[] = [];
    for (let cred of data as Credentials[]) {
        //fetch the names
        let recNameQuery = supabase.from('users').select().eq('wallet_address', cred.recipient_address).single();
        let { data: recName, error: recError } = await recNameQuery;
        let issuerNameQuery = supabase.from('users').select().eq('wallet_address', cred.issuer_address).single();
        let { data: issuerName, error: issuerError } = await issuerNameQuery;

        let credential = {
            ...cred,
            'recipient_name': recName?.name,
            'issuer_name': issuerName?.name,
        };
        creds.push(credential);
    }
    return res.status(200).json({ message: 'OK', 'credentials': creds })
}