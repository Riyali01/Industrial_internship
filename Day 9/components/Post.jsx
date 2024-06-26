import {useState} from "react"
import EditPosts from "./EditPosts"

const Post = ({post, onEdit, onDelete}) => {
    const[editable,setEditable]=useState(false)
  return (
    <div className="single-post">
        <span className='delete-post' onClick={()=>onDelete(post._id)}>x</span>
      <h4>{post.title}</h4>
      <p>{post.summary}</p>
      {editable?
        <EditPosts onEdit={onEdit} post={post} setEditable={setEditable}/>
    :<button onClick={()=>setEditable(true)}>Edit</button>}
    </div>
  )
}

export default Post
