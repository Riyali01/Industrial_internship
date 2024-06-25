import {useState} from 'react'

const AddPosts = ({handleAdd}) => {
    const [title,setTitle] = useState("")
    const [summary,setSummary]=useState("")

    const handleSubmit=()=>{
        handleAdd(title,summary)
        setTitle("")
        setSummary("")
    }
  return (
    <div className='add-posts'>
        <h3>Add Post</h3>
      <input type="text" placehoder="Enter title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <input type="text" placehoder="Enter summary" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddPosts
