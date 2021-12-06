import { useState } from 'react'

function CommentsPage(){
    const [comments, setComments] = useState([])
    const [state, setState] = useState(initialState)

    const submitComment = async () => {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({comment}), 
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        setComments(data)
    }
    return(
        <>
            <input 
                type='text'
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
            />
            <button onClick={submitComment}>Submit comment</button>
        </>
    )
}