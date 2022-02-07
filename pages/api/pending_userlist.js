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
                error: 'The Domain does not exist or something wrong with the domain!'
            })
        }

        try{
            const apiRes = await axios(
                {
                    method: 'GET',
                    url: `${API_URL}/users/pending-users`,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params: {
                        domain_name: domain_name
                    }
                });
            const data = apiRes.data;
            let result = []
            for(let i = 0; i<data.length;i++)
            {
                const row = data[i];
                const roleRes = await axios({
                    method: 'GET',
                    url: `${API_URL}/domain/role-by-user`,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params:{
                        user_email: row.email,
                        domain_name: domain_name
                    }
                })
                const roleData = roleRes.data;
                // console.log(roleData);
                result.push({email: row.email,
                    full_name: row.full_name,
                    id: row.id,
                    budget: row.budget,
                    role: roleData.name,
                    allocated_budget: row.allocated_budget,
                    created_at: row.created_at,
                    added_by: row.added_by
                })
            }

            if (apiRes.status === 200){
                return res.status(200).json(result);
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