import { v4 as uuidv4 } from 'uuid';
const initialestate={
    tasks:[{id:uuidv4(), description:'First task', isDone: false},
    {id:uuidv4(), description:'Second task', isDone: false},
    {id:uuidv4(), description:'Third task', isDone: false},
    {id:uuidv4(), description:'Fourth task', isDone: false}]
}

const reducers = (state=initialestate,{type,payload}) => {
    switch (type){
        case "add": return ({tasks:[{id:uuidv4(),description:payload,isDone:false},...state.tasks]})
        case "delete": return ({tasks:[...state.tasks].filter(task => task.id!== payload)})
        case "change": return ({tasks:[...state.tasks].map(todo=>todo.id===payload.id?{...todo, description:payload.change}:todo)})
        case "taskisdone": return ({tasks:[...state.tasks].map(task=>task.id===payload?{...task,isDone:!task.isDone}:task)})
        
        
        default: return (state)
    }
    
}

export default reducers
