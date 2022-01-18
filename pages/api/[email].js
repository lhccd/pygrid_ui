import cookie from "cookie"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = "http://localhost/api/v1";

export default function getAllUsers(req, res){
    res.json({name: 'WHO?'})
}
// export default async (req, res) => {
//     if(req.method == "GET"){
//         const email = req.body
//         const cookies =  cookie.parse(req.headers.cookie ?? '');
//         const access = cookies.access ?? false;

//         if ( access === false){
//             return res.status(401).json({
//                 error: 'User is not authorized!'
//             })
//         }

//         try{
//             const apiRes = await axios.get(`${API_URL}/users/user-detail?user_email=${email}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         "Accept": "application/json",
//                         "Authorization": `Bearer ${access}`
//                     }
//                 });
//             const data = apiRes.data;

//             if (apiRes.status === 200){
//                 return res.status(200).json(data);
//             }
//             else{
//                 return res.status(apiRes.status).json({
//                     error: data.error
//                 });
//             }
//         }
//         catch (error){
//             return res.status(500).json({
//                 error: "Oops! Server Error!"
//             });
//         }
//     }
//     else{
//         res.setHeader('Allow', ['GET']);
//         return res.status(405).json({error: `Method ${req.method} not allowed`});
//     }
// };