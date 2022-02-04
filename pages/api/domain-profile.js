import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (access === false) {
        return res.status(401).json({
            error: 'User is not authorized!'
        })
    }
    const domain_name = cookies.domain ?? false;
    if (domain_name === false) {
        return res.status(401).json({
            error: 'The Domain does not exist or something wrong with the domain!'
        })
    }
    //GET
    if(req.method === "GET"){
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
                url: `${API_URL}/domain/domain-tags`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${access}`
                },
                params: {
                    domain_name: domain_name
                }
            });

            const apiOwner = await axios({
                method: 'GET',
                url: `${API_URL}/domain/domain-owner`,
                headers: {
                    "Accept": "application/json"
                },
                params:{
                    domain_name: domain_name
                }
            })

            const data = apiRes.data;
            const data_tags = apiTag.data;
            const owner = apiOwner.data;

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
                    domain_url: data.domain_url,
                    require_daa: data.require_daa,
                    tags: tags
                });
            }
            else{
                return res.status(apiRes.status).json({
                    error: data.error
                });
            }
        }
        catch (error){
            return res.status(500).json({
                error: "Oops! Server Error!"
            });
        }
    } else if(req.method === "PUT") {
        try {
            const body = {
                "description": req.body.description,
                "support_email": req.body.email,
            }
            console.log("body: ", body)

            const apiRes = await axios.put(`${API_URL}/domain/domain-profile`,
                body,
                {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params: {
                        domain_name: domain_name
                    }
                });
            const data = apiRes.data;

            const tagBody = JSON.stringify({
                    domain_name: domain_name,
                    tags: req.body.tags
                }
            )

            const apiResTags = await axios.put(`${API_URL}/domain/add-tags`,
                tagBody,
                {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    }
                });
            const dataTags = apiResTags.data;


            console.log("datatags: ", dataTags)

            if (apiRes.status === 200 && apiResTags.status === 200) {
                return res.status(200).json({
                    success: "Changes are successful."
                });
            } else {
                return res.status(apiRes.status).json({
                    error: data.error
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: "Oops! Server Error!"
            });
        }
    } else if(req.method == "DELETE") {
        try {
            const apiRes = await axios.delete(`${API_URL}/domain/CHANGE_HERE`,
                {
                    method: 'DELETE',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                });
            const data = apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200)
            } else {
                return res.status(apiRes.status).json({
                    error: data.error
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: "Oops! Server Error!"
            });
        }
    } else {
        //res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

};