import axios from "axios"
import cookie from "cookie";

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const domain_name = cookies.domain ?? false;
    console.log({domain_name})
    if (domain_name === false) {
        return res.status(401).json({
            error: 'The Domain does not exist or something wrong with the domain!'
        })
    }
    if (req.method === 'GET') {
        try {
            const apiRes = await axios({
                method: 'GET',
                url: `${API_URL}/domain/domain-pdf`,
                headers: {
                    "Accept": "application/json",
                },
                params: {
                    domain_name: domain_name
                }
            });
            if (apiRes.status === 200) {
                const data = await apiRes.data;
                return res.status(200).json({
                    data: data
                });
            }
            else
            {
                return res.status(400).json({
                    error: "Couldn't fetch the user's pdf!"
                });
            }
        } catch (error) {
            res.status(500).json({error})
        }
    }
    else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
};