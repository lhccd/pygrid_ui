import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    if ( req.method === 'GET') {
        const domain_name = req.query.domain_name;
        try {
            const apiRes = await axios({
                method: 'GET',
                url: `${API_URL}/domain/domain-metadata`,
                headers: {
                    "Accept": "application/json"
                },
                params: {
                    domain_name: domain_name
                }
            });

            const data = apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200).json(
                    {
                        id: data.id,
                        name: data.name,
                        deployed_on: data.deployed_on
                    }
                );
            } else {
                return res.status(400).json({
                    error: 'Metadata retrieval failed!'
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                error: "Metadata retrieval failed"
            })
        }
    }
    else{
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
}