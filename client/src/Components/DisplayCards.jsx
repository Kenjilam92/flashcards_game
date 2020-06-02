import React from "react"
import axios from "axios"
const DisplayCards = props =>{
  const list = props.list
  const deleteCard = e=>{
    console.log(e)
    axios.delete(`http://localhost:8000/api/cards/delete/${e}`)
    .then(res=>{
      console.log(res.data)
      props.refresh()
    })
  }
  const flip = e => {
    console.log(e.target.parentNode)
    if (e.target.parentNode.classList.contains("flipped")){
      e.target.parentNode.classList.remove("flipped")
    }else{
      e.target.parentNode.classList.add("flipped")
    }
  }
  if (props.displayType==="table"){
    return(
      <table className="col table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Front</th>
            <th scope="col">Back</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map( (card,i)=>
            <tr key={i}>
              <td>{i+1}</td>
              <td>{card.front}</td>
              <td>{card.back}</td>
              <td>
                <div className="btn-group">
                  <button className="btn-sm btn-success"
                          data-toggle="modal" 
                          data-target="#editFormPopUp"
                          onClick={e=>props.edit(card._id)}
                          >Edit
                  </button>
                  <button className="btn-sm btn-danger"
                          onClick={e=>deleteCard(card._id)}
                          >Delete
                  </button>
                </div>
                
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  else {
    return(
      <div className={`d-grid grid-${props.columns}`}>
        {list.map((card,i)=>
          <div className="flip-card" key={i} onClick={flip}>
            <div className={`flip-card-inner font-${props.fontsize}`}>
              <div className="flip-card-front">
                {props.reverse? card.back : card.front}
              </div>
              <div className="flip-card-back">
                {props.reverse? card.front : card.back}
              </div>
            </div>
          </div>
        )}
    </div>    
        
    );
  }
}

export default DisplayCards