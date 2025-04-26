import { useState ,useEffect} from 'react'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todosarr, setTodosarr] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring=localStorage.getItem("todosarr");
    if(todostring){
      let todosarr=JSON.parse(localStorage.getItem("todosarr"))
      setTodosarr(todosarr);
    }    
  }, [])

  const saveToLS=() => {
    localStorage.setItem("todosarr",JSON.stringify(todosarr))
  }
  
  const toggleFinished=(e) => {
    setshowFinished(!showFinished);
  }
  

  const handleEdit=(e,id)=>{
    let t=todosarr.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodosarr=todosarr.filter(item=>{      //we have deleted the todo
      return item.id !== id
    });
    setTodosarr(newTodosarr);
    saveToLS();
  }
  const handleDelete=(e,id)=>{
    let newTodosarr=todosarr.filter(item=>{     //to chosse array eleemnts with other ids than the selected one
      return item.id !== id
    });
    setTodosarr(newTodosarr);
    saveToLS();
  }
  const handleAdd=()=>{
    setTodosarr([...(todosarr|| []),{id: uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLS();
  }
  const handleChange  =(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox =(e)=> {
    let id=e.target.name;
    let index=todosarr.findIndex(item=>{
      return item.id === id;
    })
    let newTodosarr=[...todosarr];//new array banane ke liye
    newTodosarr[index].isCompleted=!newTodosarr[index].isCompleted;
    setTodosarr(newTodosarr);
    saveToLS();
  }
  


  return (
    <>
    {/* <Navbar></Navbar> */}
      <div className="container bg-teal-100 xl:w-1/2 md:w-3/4 w-full mx-auto my-5 rounded-xl p-5 min-h-[92vh]">
          <h1 className='font-bold text-center text-3xl'>iTask-Manage your todos at one place</h1>
          <div className="addTodo my-3 flex flex-col gap-4">
                <h2 className="text-lg font-bold">Add a Todo</h2>
                <input onChange={handleChange} value={todo} type="text" className='textinput bg-white w-full rounded-xl px-5 py-2' />
                <button onClick={handleAdd} disabled={todo.length<=3} className='bg-teal-800 hover:bg-teal-950 disabled:bg-teal-600 p-4 py-1 px-2 text-sm font-bold text-white rounded-full'>Save</button>
          </div>
          <input className='my-3 mx-2'type="checkbox" onChange={toggleFinished} checked={showFinished}/>Show Finished
          <h2 className='text-lg font-bold my-4'>Your Todos</h2>
          <div className="todosarr">
            {todosarr?.length===0 && <div className='m-5'>No Todos to Display</div>}
            {todosarr?.map(item=>{
              return((showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex justify-between my-3">
                <div className='flex gap-5 '>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}/>
                <div className={`w-full break-all whitespace-normal ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-teal-800 hover:bg-teal-950 p-3 py-1 px-2 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                  <button onClick={(e)=>{if(window.confirm('Delete the item?')){handleDelete(e,item.id);}}} className='bg-teal-800 hover:bg-teal-950 p-3 py-1 px-2 text-sm font-bold text-white rounded-md mx-1'><MdDeleteForever /></button>
              </div>
            </div>
              )
            })}
            
          </div>
      </div>
    </>
  )
}

export default App
