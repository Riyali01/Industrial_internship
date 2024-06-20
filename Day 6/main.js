//GET posts from backend
//display a page inside root
let numberOfPost=0
const root = document.getElementById("root");
const postsContainer = document.createElement("div");
postsContainer.classList.add("posts-container");
//To do ADD Form

const addContainer = document.createElement("div")
addContainer.classList.add("add-container")

const addTitle = document.createElement("Input")
addTitle.setAttribute("placeholder", "Enter title")

const addSummary = document.createElement("Input")
addSummary.setAttribute("placeholder","Enter summary")

const addSubmit = document.createElement("button")
addSubmit.innerText = "Submit"
addSubmit.addEventListener("click", postData)

addContainer.appendChild(addTitle)
addContainer.appendChild(addSummary)
addContainer.appendChild(addSubmit)

root.appendChild(addContainer)

function postData(){
    const title = addTitle.value 
    const summary = addSummary.value
    const id = numberOfPost + 1
    fetch("http://localhost:4010",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body : JSON.stringify({id,title,summary})
    }).then(response=>response.json())
    .then(data=>populateData(data.posts))
}
//update a post
async function updatePost(id,title,summary){
    console.log(id,title,summary);
    try{
        const response =  await fetch(`http://localhost:4010/${id}`,{
            method: 'PUT',
            headers:{
                "Content-type": "application/json"
            },
            body : JSON.stringify({title,summary})
        })

        const data = await response.json();
        if(data.posts){
            numberOfPost =data.posts.length;
            populateData(data.posts)
        }
    }catch(error){
        console.log("error");
    }

}




//DELETE A POST
async function deletePost(id){
    try{
        const response = await fetch(`http://localhost:4010/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        if(data.posts){
            numberOfPost =data.posts.length;
            populateData(data.posts)
        }
    }
    catch(error){
        console.log(error);
    }
}


function populateData(posts){
    numberOfPost=posts.length
    postsContainer.innerHTML=""
    posts.forEach(post =>{

        const container = document.createElement("div");
        container.classList.add("post");
        const title= document.createElement("h2");
        const summary =  document.createElement("p");

        title.innerHTML = post.title;
        summary.innerHTML = post.summary;
        //update
        const updateForm = document.createElement("div");
        updateForm.classList.add("update-form");
        const editTitle = document.createElement("input");
        editTitle.setAttribute("placeholder","title");
        editTitle.value=post.title;
        const editSummary = document.createElement("input");
        editSummary.setAttribute("placeholder","summary");
        editSummary.value=post.summary;
        const editSubmitBtn = document.createElement("button")
        editSubmitBtn.innerText="Update";
        editSubmitBtn.addEventListener("click",()=> updatePost(post.id,editTitle.value,editSummary.value))


        updateForm.appendChild(editTitle)
        updateForm.appendChild(editSummary)
        updateForm.appendChild(editSubmitBtn)


        //delete
        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "delete";
        deleteBtn.addEventListener("click",()=> deletePost(post.id))
        container.appendChild(title);
        container.appendChild(summary);
        container.appendChild(updateForm)
        container.appendChild(deleteBtn);
        postsContainer.append(container);

    })
    root.appendChild(postsContainer);
}
fetch("http://localhost:4010")
.then(response=>response.json())
.then(data=>populateData(data.posts))