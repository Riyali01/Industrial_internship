function Posts(){
    const [posts,setPosts] = React.useState([])
    React.useEffect(()=>{
        fetch(`http://localhost:4010`)
        .then(res=>res.json())
        .then(data=>setPosts(data.posts))
    },[]);
    //POST
    const addPost = (title,summary)=>{
        //Make post request to backend
        //generate id for post
        const id = posts.length +1;
        fetch(`http://localhost:4010`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({id,title,summary})
        }).then((response)=>response.json())
        .then((data)=>setPosts(data.posts))
    };


    //DELETE
    const deletePost=(id)=>{
        fetch(`http://localhost:4010/${id}`,{
            method: "DELETE",
        }).then((response)=>response.json())
        .then((data)=>setPosts(data.posts))
    }

    //EDIT
   const editPost=(id,title,summary) =>{
    //console.log(id,title,summary)
    fetch(`http://localhost:4010/${id}`,{
        method: "PUT",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({title,summary})
    }).then((response)=>response.json())
     .then((data)=>setPosts(data.posts))
   }

    return <div className="container">
        <AddPost onAdd={addPost}/>
        {posts.map((post,i)=><Post key={i} post={post} onDelete={deletePost} onEdit={editPost}/>
            )}
    </div>

}

function Post(props){
    const [editable, setEditable] = React.useState(false)

    return(<div className="post">
        <h4>{props.post.title}</h4>
        <p>{props.post.summary}</p>
        {editable? <EditPost post={props.post} setEditable={setEditable} editPost={props.onEdit}/>   :
        <button onClick={() => setEditable(true)}>Edit</button>
        }
        
        <button onClick={()=>props.onDelete(props.post.id)}>Delete</button>
     </div>) 
 }


function AddPost(props){
    const [title, setTitle] = React.useState("")
    const [summary, setSummary] = React.useState("")
  
    const handleSubmit = () => {
        props.onAdd(title,summary)
        setTitle("")
        setSummary("")
    }
    
    return(<div className="add-post">
        <ul>
        <h1>Add New post</h1>
        <input placeholder="Enter title" value={title} onChange={e =>setTitle(e.target.value)}/>
        <input placeholder="Enter summary"value={summary} onChange={e=>setSummary(e.target.value)}/>
        
        <button onClick={handleSubmit}>Submit</button>
        </ul>
        
    </div>)
}
function EditPost(props){
    const [title, setTitle] = React.useState(props.post.title)
    const [summary, setSummary] = React.useState(props.post.summary)
  
    const handleSubmit = () => {
        props.editPost(props.post.id,title,summary)
        props.setEditable(false)
        setTitle("")
        setSummary("")
    }
    
    return(<div className="add-post">
        
        <h1>Edit post</h1>
        <input value={title} onChange={e =>setTitle(e.target.value)}/>
        <input value={summary} onChange={e=>setSummary(e.target.value)}/>
        
        <button onClick={handleSubmit}>Submit</button>
        
        
    </div>)
}