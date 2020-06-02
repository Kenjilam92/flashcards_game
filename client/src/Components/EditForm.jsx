import React,{useState,useEffect} from "react"
import axios from "axios"
const EditForm = props =>{
  const [front,setFront]=useState("")
  const [back,setBack]=useState("")
  const fetchForm = () => {
    console.log("fetch edit form")
    setFront(props.selected.front);
    setBack(props.selected.back);
  }
  useEffect(()=>{
    fetchForm();
  },[props.selected]);
  
  const editCard = e =>{
    e.preventDefault();
    const updateCard = {
      "front" :  front,
      "back"  :  back
    }
    axios.put(`http://localhost:8000/api/cards/update/${props.selected._id}`,updateCard)
      .then(res=>{
          // console.log(res.data);
          setFront("");
          setBack("");
          props.refreshForm(res.data._id);
          props.refresh();
        })
      .catch (err=>console.log(err))
  }
  return(
    <form onSubmit={e=>editCard(e)} id={props.id}>
      <div className="row">
        <div className="col-6">
          <label htmlFor="front">Front:</label>        
          <textarea name="front" 
                    style={{width: "100%"}}
                    rows="5"
                    value={front}
                    onChange={e=>setFront(e.target.value)}>
          </textarea>
        </div>
        <div className="col-6">
        <label htmlFor="back">Back:</label>  
          <textarea name="back" 
                    style={{width: "100%"}}
                    rows="5"
                    value={back}
                    onChange={e=>setBack(e.target.value)}>
          </textarea>
        </div>
      </div>
      <div className="row">
      </div>
    </form>
  );
}

export default EditForm