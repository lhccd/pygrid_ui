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
    //GET
    if(req.method == "GET"){
        const domain_name=req.query.domain_name
        try{
            const apiRes = await axios({
                method: 'GET',
                url: `${API_URL}/domain/domain-version`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${access}`
                },
                params: {
                    domain_name: domain_name
                }
            });
            const data = apiRes.data;
            if (apiRes.status === 200){
                return res.status(200).json({
                    lastUpdated: data.last_updated,
                    version: data.version_name,
                    repo: data.repository,
                    branch: data.branch,
                    hash: data.commit_hash
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
    } else if(req.method == "PUT") {
        const domain_name="d1"
        try {
            const body = {
                "repository": req.body.repo,
                "branch": req.body.branch,
                "commit_hash": req.body.hash
            }

            const apiRes = await axios.put(`${API_URL}/domain/update-domain-version`,
                body,
                {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params: {
                        domain_name: domain_name
                    }
                });
            const data = apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200).json({
                    success: "Version update successful"
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