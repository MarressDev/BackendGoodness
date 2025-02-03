import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  // const [count, setCount] = useState(0)

  const [data, setData] = useState()
  const [edit, setEdit] = useState({
    todo: ""
  })
  const [render, setRender] = useState(false)
  // test
  // test
  const [newToDo, setNewToDo] = useState(
    {
      todo: "",
      created: Date.now()
    }
  )


  useEffect(() => {
    console.log("useEFFECT TRIGGERED")
  }, [data])


  useEffect(() => {

    axios({
      method: "get",
      url: "http://localhost:3000/gettodos"
    })
      .then(res => {
        console.log("res", res)
        // console.log("sorted", sorted)
        setData(res.data)

      })
      .catch(err => console.log("err", err))

  }, [])

  const handleNewToDo = (e) => {

    console.log("handleNewToDo Hit", e)
    console.log("handleNewToDo Hit", e.target)
    console.log("handleNewToDo Hit", e.target.value)

    setNewToDo((prev) => ({
      ...prev,
      todo: e.target.value
    }))


  }
  const handleSubmit = (e) => {

    console.log("HandleSubmit HIT", newToDo)

    console.log("i am getting stuff")
    axios({
      method: "post",
      url: "http://localhost:3000/create",
      data: newToDo
    })
      .then(res => {
        console.log("res", res)
        // setNewToDo({todo: ""})
      })
      .catch(err => console.log(reportError))

  }

  const handleDelete = (e) => {
    console.log("DEL Hit", e.target.id)

    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${e.target.id}`
    })
    .then(res => {
      console.log("re", res)
      console.log(res.data._id)
      setData((prev) => prev.filter((item) => item._id != res.data._id))
    })
    .catch(err => console.log(err))
  }

  const handleEdit = () => {
    setRender(!render)
  }

  const handleEditSubmit = (e) => {
    console.log("HandleEdit HIT", e.target.id)
    axios({
      method: "put",
      url: `http://localhost:3000/update/${e.target.id}`,
      data: edit
    })
      .then(res => {
        console.log("$$$$$$$$$", res)
      })
      .catch(err => console.log(err))
  }

  const handleEditChange = (e) => {
    console.log("HandleEdit HIT", e.target.id)
    axios({
      method: "put",
      url: `http://localhost:3000/update/${e.target.id}`,
      data: edit
    })
      .then(res => {
        console.log("$$$$$$$$$", res)
      })
      .catch(err => console.log(err))
  }

  // const handleEditChange = (e) => {
  //   console.log("handleEditChange Hit", e.target.value)
  //   setImmediate({ todo: e.target.value})
  // }


return (
  <>
    {console.warn("render", render)}
    {console.log("data", data)}
    {console.log("newToDo", newToDo)}

    <input value={newToDo.todo || ""} onChange={(e) => handleNewToDo(e)} />

    <button onClick={(e) => handleSubmit(e)}>Submit</button>


    {data && data.sort((a,b) =>  b.created - a.created).map((item) => {
      return (

        <div key={item._id}  style={{ marginBottom: "20px" }}>

          <div style={{ border: '2px solid red' }}>

            {render
              ?
              (
                <div>
                  <input 
                  defaultValue={item.todo || ""}
                  onChange={(e) => handleEditChange(e)}
                >
                </input>

                <button
                id={item.id}
                onClick={(e) => handleEditSubmit(e)}
                >
                  Submit
                </button>

                </div>
              )
              :
              (
                <p> {item.todo} </p>
              )
            }


            <button id={item._id} onClick={(e) => handleDelete(e)}>Delete</button>
            <button id={item._id} onClick={(e) => handleEdit(e)}>Edit</button>

          </div>
        </div>
      )
    })}

  </>
)
}


//             <p> {item.todo}</p>
//             <button id={item._id} onClick={(e) => handleDelete(e)}>delete</button>
//             <button>edit</button>

//           </div>
//         </div>
//       )
//     })}

//   </>
// )
// }

export default App
