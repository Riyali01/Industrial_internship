

const students = [
    {
        name : "Ram",
        age : "19",
    },
    {
        name : "Sham",
        age : "20",
    },
    {
        name : "Gyan",
        age : "21",
    },
    ]
     function namesage(acc,curr){
        acc[curr.name]=curr.age
        return acc
     }
    
     const names = students.reduce(namesage,{})
     console.log(names)
