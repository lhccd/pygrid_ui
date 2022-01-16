import cookie, {serialize} from "cookie"
import axios from "axios"

const API_URL = "http://localhost/api/v1";

export default async (req, res) => {
    //POST
    if ( req.method === 'POST') {
        const {frustrations, suggestions} = req.body;
        let data = {
            frustrations,
            suggestions
        }
        const apiRes = await axios.post(`${API_URL}/utils/submit-feedback`, data);
        if (apiRes.status === 200) {
            return res.status(200).json(
                {success: "Feedback Submitted!"}
            );
        }
        else {
            return res.status(200).json({
                error: 'Feedback Submission Failed!'
            });
        }
    }
    else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }
}