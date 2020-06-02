import React,{useState,useEffect} from "react";
import {navigate} from "@reach/router"

const RandomGame = props => {
  const [card,setCard] = useState ({})
  const [streak,setStreak] = useState(0)
  const [score,setScore] = useState(0)
  const [turn,setTurn] = useState(0)
  const [result,setResult] = useState ({})
  const [report,setReport] = useState (true)

  var unsuccessRate = Math.floor((1-score/turn)*100)

  const drawCard = () => {
    if (props.list !== []){
      const random = Math.floor(Math.random() * props.list.length);
      setCard(props.list[random]);
      setTurn(turn+1);
    } 
    else{
      navigate("/");
    }
  }
  const flip = e => {
    console.log(e.target.parentNode)
    if (e.target.parentNode.classList.contains("flipped")){
      e.target.parentNode.classList.remove("flipped")
    }else{
      e.target.parentNode.classList.add("flipped")
    }
  }
  useEffect(()=>{
    props.list ?
    drawCard()
    :
    navigate("/");
    setTurn(0)
    setStreak(0)
    setScore(0)
    setResult({})
  },[props.list])
  
  const remembered = () =>{
    let temp = {...card}
    if (result[temp._id]){
      temp.played= result[temp._id].played+1
      temp.unsuccess = result[temp._id].unsuccess
    }else{
      temp.played = 1
      temp.unsuccess = 0
    }
    result[temp._id]=temp
    drawCard();
    setScore(score+1);
    setStreak(streak+1);
  }
  const forgot = () =>{
    let temp = {...card}
    if (result[temp._id]){
      console.log(result[temp._id]);
      temp.played= result[temp._id].played+1
      temp.unsuccess= result[temp._id].unsuccess + 1
    }else{
      temp.played = 1
      temp.unsuccess = 1
    }
    result[temp._id]=temp
    console.log(result[temp._id]);
    drawCard();
    setStreak(0)
  }
  
  const showReport = () =>{
    report ?
    setReport(false)
    :
    setReport(true)
  }



  return(
    <div>
      <h2>Random Game</h2>      
      <div  className="row" >
        {card !== undefined ?
        <div  className="flip-card col-md-6 " 
              style={{height:300+"px"}} onClick={flip}>
          <div className={`flip-card-inner font-${props.fontsize}`}>
            <div className="flip-card-front">
              {props.reverse? card.back : card.front}
            </div>
            <div className="flip-card-back">
              {props.reverse? card.front : card.back}            
            </div>
          </div>
        </div>
         :
         "fail"}
        <div className="col-md-5">
          <p>Do you remember?</p>
          <button className="btn btn-success col-6"
                  onClick={remembered}
                  >Yes
          </button>
          <button className="btn btn-danger col-6"
                  onClick={forgot}
                  >No
          </button>
          <table className="mt-2 mb-2 table-sm">
            <tbody>
              <tr> 
                <th>You played:</th>
                <td><b>{turn} {turn>1 ? "cards" : "card" }</b></td>
              </tr>
              <tr> 
                <th>Answer Streak:</th>
                <td><b className="text-primary">{streak}</b></td>
              </tr>
              <tr>
                <th>Correct: </th>
                <td><b className="text-success">{score} </b></td>
              </tr>
              <tr>
                <th>Unsuccessful rate: </th>
                <td><b className="text-danger">{turn ? unsuccessRate+"%" : 0}</b></td>
              </tr>
            </tbody>
          </table>
        
        <button className="btn btn-secondary"
                onClick={showReport}
                >{report? "Show Report" : "Hide Report"}
        </button>
        </div>
      </div>
      <div className="row" hidden={report}>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Front</th>
                <th>Back</th>
                <th>Played</th>
                <th>Unsuccessful Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(result).map((playedCard,i)=>
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{playedCard.front}</td>
                  <td>{playedCard.back}</td>
                  <td>{playedCard.played}</td>
                  <td>{Math.floor (playedCard.unsuccess/playedCard.played *100) + "%"}</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </div>
  )
}
export default RandomGame