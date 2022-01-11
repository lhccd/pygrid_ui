import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    //GET
    if(req.method == "GET"){
        const cookies =  cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if ( access === false){
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }

        try{
            const apiRes = await axios.get(`${API_URL}/users/user-profile`,
                {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    }
                });
            const data = apiRes.data;

            if (apiRes.status === 200){
                return res.status(200).json({
                    full_name: data.full_name,
                    email: data.email,
                    institution: data.institution,
                    website: data.website
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
    }
    else{
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

    //PUT
    if(req.method == "PUT"){
        const cookies =  cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if ( access === false){
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }

        try{
            const body = {
                "full_name": req.body.full_name,
                "email": req.body.email,
                "institution": req.body.institution,
                "website": req.body.website
            }

            console.log(req.body);

            const apiRes = await axios.put(`${API_URL}/users/`,
                body,
                {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    }
                });
            const data = apiRes.data;

            if (apiRes.status === 200){
                return res.status(200).json({
                    full_name: data.full_name,
                    email: data.email,
                    institution: data.institution,
                    website: data.website
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
    } else{
        res.setHeader('Allow', ['PUT']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

};