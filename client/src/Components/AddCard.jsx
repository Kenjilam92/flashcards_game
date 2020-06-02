import React,{useState} from "react"
import axios from "axios"

const AddCard = props =>{
  const [front,setFront]=useState("")
  const [back,setBack]=useState("")
  const [errors,setErrors] = useState({})
  const addCard = e =>{
    e.preventDefault();
    const newCard = {
      "front" :  front,
      "back"  :  back
    }
    console.log (newCard)
    axios.post("http://localhost:8000/api/cards/new",newCard)
      .then(res=>{
          res.data.errors?
          setErrors(res.data.errors)
          :
          props.refresh();
          setFront("");
          setBack("");
        })
      .catch (err=>console.log(err.data))
  }
  return(
    <form onSubmit={e=>addCard(e)}>
      <label htmlFor="front">Front:</label>        
      <textarea name="front" 
                style={{width: "100%"}}
                rows="5"
                value={front}
                placeholder={errors.front? errors.front.properties.message : null}
                onChange={e=>setFront(e.target.value)}>
      </textarea>
      <label htmlFor="back">Back:</label>  
      <textarea name="back" 
                style={{width: "100%"}}
                rows="5"
                value={back}
                placeholder={errors.back? errors.back.properties.message : null}
                onChange={e=>setBack(e.target.value)}>
      </textarea>
      <button className="btn btn-info"
              type="submit"> 
        Add Card
      </button>
    </form>
  );
}

export default AddCard