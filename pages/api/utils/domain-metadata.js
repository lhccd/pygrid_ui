import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    if ( req.method === 'GET') {
        const domain_name = req.query.domain_name;
        try{
            const apiRes = await axios({
                method: 'GET',
                url: `${API_URL}/domain/domain-profile`,
                headers: {
                    "Accept": "application/json",
                },
                params: {
                    domain_name: domain_name
                }
            });

            const apiTag = await axios({
                method: 'GET',
                url: `${API_URL}/domain/domain-tags-open`,
                headers: {
                    "Accept": "application/json",
                },
                params: {
                    domain_name: domain_name
                }
            });

            const data = apiRes.data;
            const data_tags = apiTag.data;

            let tags = []
            for (let tag of data_tags){
                tags.push(tag.name)
            }

            if (apiRes.status === 200){
                return res.status(200).json({
                    name: data.name,
                    id: data.id,
                    datasets:2,
                    deployed: data.deployed_on,
                    owner: "TO BE FETCHED",
                    description: data.description,
                    email: data.support_email,
                    tags: tags
                });
            }
            else{
                return res.status(apiRes.status).json({
                    error: "Metadata retrieval failed!"
                });
            }
        }
        catch (error){
            console.log(error)
            return res.status(500).json({
                error: "Metadata retrieval failed!"
            });
        }
    }
    else{
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
}