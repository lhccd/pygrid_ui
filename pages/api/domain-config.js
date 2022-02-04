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

            const data = apiRes.data;

            if (apiRes.status === 200){
                return res.status(200).json({
                    require_daa: data.require_daa,
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
            const apiRes = await axios(
                {
                    method: 'PUT',
                    url: `${API_URL}/domain/add-pdf-id`,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params:  {
                        "domain_name": domain_name,
                        "pdf_daa_id": req.body.daa_id,
                    }
                });
            const data = apiRes.data;
            console.log(data)
            if (apiRes.status === 200) {
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
    } else {
        //res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

};