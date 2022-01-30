import axios from "axios"
import {serialize} from "cookie";

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    if ( req.method === 'GET') {
        const domain_name = req.query.domain_name
        res.setHeader('Set-Cookie', [
            serialize(
                'domain', domain_name,
                {
                    httpOnly: true,
                    secure: false, // HTTPS request is not a concern right now
                    maxAge: 60 * 120, // 2 hours
                    sameSite: 'strict',
                    path: '/'
                }
            )
        ])

        res.status(200).json(
            {success: "Domain is determined!"}
        );
    }
    else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

};