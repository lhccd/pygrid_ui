import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    //GET
    if(req.method == "GET"){
        try{
            const apiRes = await axios.get(`${API_URL}/domain/CHANGE THIS`,
                {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json",
                    }
                });
            const data = apiRes.data;

            if (apiRes.status === 200){
                return res.status(200).json({
                    lastUpdated: data.lastUpdated,
                    version: data.version
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
                "repository": req.body.repository,
                "branch": req.body.branch,
                "hash": req.body.hash
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
                    lastUpdated: data.lastUpdated,
                    version: data.version
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
    } else {
        //res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

};