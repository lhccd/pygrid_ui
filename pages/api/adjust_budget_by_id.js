import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    console.log("adjust budget by id top", req.body)
    if(req.method == "PUT"){
        const cookies =  cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;
        if ( access === false){
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }

        try{
            console.log("adjust budget by id inside", req.body)
            const email = req.body.email
            let data = JSON.stringify(req.body.budget)
            console.log("adjust budget by id, req body email",email, " and data", data)
            const apiRes = await axios({method: 'put', url: `${API_URL}/users/update-budget`, headers: {"Accept": "application/json", "Authorization": `Bearer ${access}`}, params: {user_email: email}, data})
            // const apiRes = await axios.put(`${API_URL}/users/update-budget`, data,{
            //     method: 'PUT',
            //     headers: {
            //         "Accept": "application/json",
            //         "Authorization": `Bearer ${access}`
            //     }, 
            //     params: {user_email: email}
            // });
            const result = apiRes.data;
            console.log("response adjustbudget by id", result)
            if (apiRes.status === 200){
                return res.status(200).json(result);
            }
            else{
                return res.status(apiRes.status).json({
                    error: result.error
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