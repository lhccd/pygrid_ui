import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    if(req.method == "PUT") {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if (access === false) {
            return res.status(401).json({
                error: 'User is not authorized!'
            })
        }

        const {current_password, password} = req.body;
        let data ={
            current_password,
            password
        };
        try{
            const apiRes = await axios.put(`${API_URL}/users/update-password`, data,{
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${access}`
                },
            });

            if(apiRes.status === 200){
                return res.status(200).json({
                    success: "Password change is successful"
                });
            }
            else{
                return res.status(apiRes.status).json({
                    error: "Error " + apiRes.status + " , please try again!"
                });
            }

        } catch (error){
            return res.status(500).json({
                error: "Oops! Server Error!"
            });
        }
    }
    else {
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}
