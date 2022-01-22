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

        try{
            const email = req.body.email
            console.log("get user by id, req body", email)
            const apiRes = await axios({method: 'get', url: `${API_URL}/users/user-detail`, headers: {"Accept": "application/json", "Authorization": `Bearer ${access}`}, params: {user_email: email}})
                // {
                //     method: 'GET',
                //     headers: {
                //         "Accept": "application/json",
                //         "Authorization": `Bearer ${access}`
                //     }, 
                // });
            const data = apiRes.data;
            console.log("get user by id", data)
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