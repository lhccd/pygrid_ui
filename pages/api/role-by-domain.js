import cookie from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
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

    if(req.method === "GET"){
        /**
         * Get function works like that:

         await axios(
         {
                    method: 'GET',
                    url: `${API_URL}/domain/role-by-domain`,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params: {
                        role_name: role_name
                    }
                });

         Role names  should  be exact so the role names are:
          "Administrator"
          "Domain Owner"
          "Compliance Officer"
          "Data Scientist"
         */

        try{
            let role_name = req.query.role_name;
            const apiRes = await axios(
                {
                    method: 'GET',
                    url: `${API_URL}/domain/role-by-domain`,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params: {
                        domain_name: domain_name,
                        role_name: role_name
                    }
                });
            const data = apiRes.data;
            console.log("MIDDLEWARE API GET", apiRes.data)

            if (apiRes.status === 200){
                return res.status(200).json({
                    MakeDataRequests: data.can_make_data_requests,
                    EditRoles: data.can_edit_roles,
                    TriageDataRequests: data.can_triage_data_requests,
                    UploadData: data.can_upload_data,
                    ManagePrivacyBudgets: data.can_manage_privacy_budget,
                    UploadLegalDocuments: data.can_upload_legal_document,
                    ManageUsers: data.can_manage_users,
                    EditDomainSettings: data.can_edit_domain_settings,
                    CreateUsers: data.can_create_users,
                    ManageInfrastructure: data.can_manage_infrastructure
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
    }
    else if(req.method === "PUT"){
        console.log("MIDDLEWARE API", req.body)
        /**
         * This function is the put function and it needs in the body:
         * role_name: str
         * MakeDataRequests: bool
         * EditRoles: bool
         * TriageDataRequests: bool
         * UploadData: bool
         * ManagePrivacyBudgets: bool
         * UploadLegalDocuments: bool
         * ManageUsers: bool
         * EditDomainSettings: bool
         * CreateUsers: bool
         * ManageInfrastructure: bool
         *
         */
        try{
            const apiRes = await axios(
                {
                    method: 'PUT',
                    url: `${API_URL}/domain/update-role-in-domain`,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${access}`
                    },
                    params: {
                        domain_name : domain_name,
                        role_name : req.body.role_name
                    },
                    data:{
                        can_make_data_requests: req.body.MakeDataRequests,
                        can_edit_roles: req.body.EditRoles,
                        can_triage_data_requests: req.body.TriageDataRequests,
                        can_upload_data: req.body.UploadData,
                        can_manage_privacy_budget: req.body.ManagePrivacyBudgets,
                        can_upload_legal_document: req.body.UploadLegalDocuments,
                        can_manage_users: req.body.ManageUsers,
                        can_edit_domain_settings: req.body.EditDomainSettings,
                        can_create_users: req.body.CreateUsers,
                        can_manage_infrastructure: req.body.ManageInfrastructure
                    }
                });
            const data = apiRes.data;
            console.log("RESPONSE from BACKEND", apiRes.status, apiRes.data)
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
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

};