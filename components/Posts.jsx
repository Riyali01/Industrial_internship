import {useState,useEffect} from 'react'
import AddPosts from './AddPosts'
import Post from './Post'

const Posts = () => {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        fetch("http://localhost:8000")
        .then((response)=>response.json())
        .then((data)=>setPosts(data.posts))
    } ,[])

    const addPost=(title,summary)=>{
        const id = posts.reduce((acc , item)=>acc <= item.id ? item.id :acc ,0)+ 1
        fetch("http://localhost:8000",{
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body:JSON.stringify({id,title,summary})
        }).then((response)=>response.json())
        .then((data)=>setPosts(data.posts))
    }

    const editPost=(id,title,summary)=>{
        fetch(`http://localhost:8000/${id}`,{
            method: 'PUT',
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({title,summary})
        }).then((response)=>response.json())
        .then((data)=>setPosts(data.posts))
    }
    const deletePost=(id)=>{
        fetch(`http://localhost:8000/${id}`,{
            method: "DELETE"
        }).then((response)=>response.json())
        .then((data)=>setPosts(data.posts))
    }
  return (
    <div className='posts-container'>
      <AddPosts handleAdd={addPost}/>
      <div className='posts'>
      {posts.map((post,i) => <Post key={i} post={post} onEdit={editPost} onDelete={deletePost}/>)}
      </div>
     
    </div>
  )
}

export default Posts
