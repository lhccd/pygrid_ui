
import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    if(req.method == "PUT"){
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

        var url = ``
        if(req.body.update == "accept"){
            url=`${API_URL}/data-requests/accept`
        } else if (req.body.update == "reject"){
            url=`${API_URL}/data-requests/reject`
        }

        try{
            const apiRes = await axios(
                {
                    method: 'PUT',
                    url: url,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params: {
                        request_id : req.body.id,
                        reviewer_comments : req.body.comments
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
        res.setHeader('Allow', ['PUT']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
};