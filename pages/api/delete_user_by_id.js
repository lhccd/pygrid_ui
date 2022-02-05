import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    console.log("delete user by id top", req.body)
    if(req.method == "DELETE"){
        const cookies =  cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;
        if ( access === false){
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }

        try{
            console.log("delete user by id inside", req.body)
            const id = req.body.id
            console.log("delete user by id, req body email",id)
            const apiRes = await axios({method: 'DELETE', url: `${API_URL}/users/delete-by-id`, headers: {"Accept": "application/json", "Authorization": `Bearer ${access}`}, params: {user_id: id}})
            const result = apiRes.status;
            console.log("response delete by id", result)
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
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
};