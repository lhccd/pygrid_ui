import axios from "axios"
import cookie from "cookie";

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    const cookies =  cookie.parse(req.headers.cookie ?? '');
    const domain_name = cookies.domain ?? false;
    console.log({domain_name})
    if ( domain_name === false){
        return res.status(401).json({
            error: 'The Domain does not exist or something wrong with the domain!'
        })
    }
    if ( req.method === 'GET') {
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

            let owner = {full_name: "No Owner Yet"};
            try{
                const apiOwner = await axios({
                    method: 'GET',
                    url: `${API_URL}/domain/domain-owner`,
                    headers: {
                        "Accept": "application/json"
                    },
                    params:{
                        domain_name: domain_name
                    }
                });
                owner = apiOwner.data;
            }
            catch (e) {
                console.error(e);
            }


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
                    owner: owner.full_name,
                    description: data.description,
                    email: data.support_email,
                    tags: tags,
                    require_daa: data.require_daa
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