import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    if(req.method == "GET"){
        const cookies =  cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if ( access === false){
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }
        const domain_name = cookies.domain ?? false;
        if ( domain_name === false){
            return res.status(401).json({
                error: 'The domain does not exist or something wrong with the domain!'
            })
        }

        try{
            const apiRes = await axios(
                {
                    method: 'GET',
                    url: `${API_URL}/upgrade-requests/history`,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params: {
                        domain_name: domain_name
                    }
                });
            const data = apiRes.data;

            if (apiRes.status === 200){
                return res.status(200).json(data);
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

};