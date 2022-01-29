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
    //GET
    if(req.method === "GET"){
        const domain_name=req.query.domain_name
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
            const domain_name = "d1"
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

            console.log("data: ", data)


            console.log("tags: ", req.body.tags)
            const apiResTags = await axios.put(`${API_URL}/domain/add-tags`,
                req.body.tags,
                {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    /*
                    params: {
                        domain_name: domain_name
                    }
                     */
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
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if (access === false) {
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }

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