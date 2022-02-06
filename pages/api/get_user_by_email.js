import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    if(req.method == "POST"){
        const cookies =  cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;
        console.log({access})
        if ( access === false){
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }

        const domain_name = cookies.domain ?? false;
        if ( domain_name === false){
            return res.status(401).json({
                error: 'The Domain does not exist or something wrong with the domain!'
            })
        }

        try{
            const email = req.body.email
            const apiRes = await axios({
                method: 'get',
                url: `${API_URL}/users/user-detail`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${access}`
                },
                params: {
                    user_email: email
                }
            })
            const roleRes = await axios({
                method: 'GET',
                url: `${API_URL}/domain/role-by-user`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${access}`
                },
                params:{
                    user_email: email,
                    domain_name: domain_name
                }
            })
            const data = apiRes.data;
            const roleData = roleRes.data;
            if (apiRes.status === 200){
                return res.status(200).json({
                    email: data.email,
                    full_name: data.full_name,
                    id: data.id,
                    institution: data.institution,
                    website: data.website,
                    status: data.status,
                    role: roleData.name,
                    budget: data.budget,
                    allocatedBudget: data.allocated_budget,
                    created_at: data.created_at,
                    added_by: data.created_at,
                    daa_pdf: data.daa_pdf
                })
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