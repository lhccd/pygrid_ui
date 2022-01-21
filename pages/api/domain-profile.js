import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    //GET
    if(req.method == "GET"){
        try{
            const apiRes = await axios.get(`${API_URL}/domain/domain-detail`,
                {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json",
                    }
                });
            const data = apiRes.data;

            if (apiRes.status === 200){
                return res.status(200).json({
                    name: data.name,
                    id: data.id,
                    datasets: data.datasets,
                    deployed: data.deployed,
                    owner: data.owner,
                    description: data.description,
                    email: data.email,
                    tags: data.tags
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
    } else if(req.method == "PUT") {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if (access === false) {
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }

        try {
            const body = {
                "description": req.body.description,
                "email": req.body.email,
                "tags": req.body.tags
            }

            const apiRes = await axios.put(`${API_URL}/domain/CHANGE_HERE`,
                body,
                {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    }
                });
            const data = apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200).json({
                    description: data.description,
                    email: data.email,
                    tags: data.tags
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