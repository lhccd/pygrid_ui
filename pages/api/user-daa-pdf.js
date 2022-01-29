import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    console.log("REACHING USER_DAA_PDF API SITE", req.query, req.body)
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (access === false) {
        return res.status(401).json({
            error: 'User is not authorized!'
        })
    }
    // GET
    if(req.method === "GET"){
        const user_email = req.query.user_email;
        try {
            const apiRes = await axios({
                method: 'GET',
                url: `${API_URL}/users/user-pdf`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${access}`
                },
                params: {
                    user_email: user_email
                }
            });
            if (apiRes.status === 200) {
                const data = await apiRes.data;
                return res.status(200).json({
                    data: data
                });
            }
            else
            {
                return res.status(apiRes.status).json({
                    error: "Couldn't fetch the user's pdf!"
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                error: error
            });
        }
    }
    else{
        res.setHeader('Allow', [req.method]);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
}