import {useState} from 'react'

const EditPosts = ({post, onEdit, setEditable}) => {
    const [title,setTitle] = useState(post.id)
    const [summary,setSummary]=useState(post.summary) 

    const handleEdit=()=>{
        onEdit(post._id,title,summary)
        setTitle("")
        setSummary("")
        
        setEditable(false)
    }

  

  return (
    <div>
       <h3>Edit Post</h3>
      <input type="text" placehoder="Enter title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <input type="text" placehoder="Enter summary" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
      <button onClick={handleEdit}>Submit</button>
    </div>
  )
}

export default EditPosts
