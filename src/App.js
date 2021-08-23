import { useState } from 'react';
import './App.css';
import {useSelector,useDispatch} from 'react-redux'
import {FcTodoList} from 'react-icons/fc'


function App() {
  const dispatch = useDispatch()
  const [newtask, setnewTask] = useState('') 
  const [editable, setEditable] = useState(false)
  const [change, setChange] = useState('')
  const [state, setstate] = useState("all")
  const addtask =()=>{
    if (newtask.trim()){
      dispatch({type:'add',payload:newtask})
  }}
 
  const tasks = useSelector(state => state.reducers.tasks)
  
  return (
    <div className="App">
      
      <div  style={{display:'flex', justifyContent:'space-around',maxWidth:'800px', marginLeft:'300px', marginBottom:'50px',marginTop:'30px'}}>
      <FcTodoList style={{fontSize:'3.5rem'}}/>
                <input type='text' style={{border: 'none',borderBottom: "2px solid red",width:'70%',padding:'12px 20px',margin: '8px 0'}}
                onChange={(e)=>{setnewTask(e.target.value)}} placeholder='add new task...'/>
                <button className="btn btn-primary m-2" onClick={addtask}>Add</button>
      </div>
      <div style={{textAlign:'center', display:'flex', justifyContent:'space-around'}}>
        <button onClick={()=>setstate('Done')}>Done</button>
        <button  onClick={()=>setstate('Not Done')}>Not Done</button>
      </div>
      
  {
  (state=='Done'?tasks.filter(task=>task.isDone==true):state=='Not Done'? tasks.filter(task=>task.isDone==false):tasks).map((task)=>{
        return (
  
  <div style={{display:'flex',justifyContent:'space-between', margin:'50px 100px',backgroundColor:'ButtonShadow', borderRadius:'5px'}}>
    <span style={task.isDone?{textDecoration:'line-through'}:{fontWeight:'bold',fontSize:'1.5rem',padding:'20px'}} 
    onClick={()=>dispatch({type:'taskisdone', payload:task.id})} 
   >{task.description}</span>
   <div className='btn' style={{display:'flex'}}> 
    <button className="btn btn-danger m-2" onClick={()=>dispatch({type:'delete',payload:task.id})}>Delete</button>
    {editable ?<input  onChange={(e)=>setChange(e.target.value)}/>: <h4>{}</h4>}
    <button className="btn btn-primary m-2" onClick={()=>
      {dispatch({type:'change',payload:{change:change,id:task.id}});
     if (editable){
      setChange(task.description)} 
      setEditable (!editable)}}>{editable ? "Update": 'Edit'}</button>
    </div>
    </div>
 ) })}
      
    </div>);
}
export default App;
