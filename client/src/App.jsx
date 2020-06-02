import React,{useState,useEffect} from 'react';
import  {Router, navigate} from "@reach/router"
import axios from "axios";
// CSS //////////////////////////////
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/dist/modal.js"
import './App.css';
// Components //////////////////////
import EditForm from "./Components/EditForm"
import AddCard from "./Components/AddCard"
import DisplayCards from './Components/DisplayCards';
import PopUp from './Components/PopUp';
import RandomGame from './Components/RandomGame'
function App() {
  // Hooks /////////////////////////////////////
  const [display,setDisplay]=useState("table")
  const [list,setList] = useState([])
  const [fontsize,setFontSize] = useState("")
  const [columns,setColumns] = useState(3)
  const [selectedCard,setSelectedCard]=useState({})
  const [reverse,setReverse] = useState(false)
  const [game,setGame] = useState("random")
  
  // Functions ///////////////////////////////////
  const fetchCard = () =>{
    axios.get("http://localhost:8000/api/cards/")
      .then(res=>setList(res.data))
      .catch(err=>console.log(err.data))
  }
  const toggle = e =>{
    console.log('reverse:',reverse)
    setReverse(e);
  }
  const turnOnEditForm = e => {
    console.log(e)
    axios.get(`http://localhost:8000/api/cards/${e}`)
      .then(res=>{
        // console.log(res.data)
        setSelectedCard(res.data);
        // console.log(selectedCard)
      })
      .catch(err=>console.log(err))
  }

  useEffect(()=>{
    fetchCard();
  },[])

  // HTML return /////////////////////////////////////////
  return (
    <div className="container">
      <div className="jumbotron ">
        <h1>Welcome to the flashcards game</h1>
        <i> 20 cards per day, never fade away</i>
        <PopUp id="editFormPopUp" form_id="editFrom" title="Editing a card">
          <EditForm id="editFrom" 
                    selected={selectedCard}
                    refresh={fetchCard}
                    refreshForm={turnOnEditForm}
                    />
        </PopUp>
      </div>
      <div className="row">
          {/* Column 1 /////////////////////////////////////////////////////////////////*/}
          <div className="col-lg-2 col-md- border border-secondary ">
            <b className="row p-2 mb-2 bg-info text-white">Setting</b>
            <div className="d-flex justify-content-between align-items-baseline">
              <p>Font:</p>
              <select name="font-size"
                      onChange={e=>setFontSize(e.target.value)}
                      value={fontsize}
                      >
                <option value="">Small</option>
                <option value="med">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-baseline">
              <p>Columns:</p>
              <select name="columns"
                      onChange={e=>setColumns(e.target.value)}
                      value={columns}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>  
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p>Reverse:</p>
              <label className="switch">
                <input  type="checkbox" 
                        checked={reverse}
                        onChange={e=>toggle(e.target.checked)}
                        />
                <span className="slider round"></span>
              </label>
            </div>  
            <div className="d-flex flex-column">
              <label htmlFor="games">Select game:</label>
              <select name="games" 
                      id="games"
                      className="mb-3 form-control" 
                      value={game} 
                      onChange={e=>setGame(e.target.value)}>
                <option value="random">Random</option>
                <option value="random20">Random20</option>
                <option value="random50">Random50</option>
              </select>
            </div>
          </div>          
          {/* Column 2 /////////////////////////////////////////////////////////////////*/}
          <div className="col-lg-7 col-md- mb-3">
            <nav style={{margin: 10+"px"}}>
              <button className="btn btn-info"
                      onClick={e=>setDisplay("table")}
                      >Table
              </button>
              <button className="btn btn-info"
                      onClick={e=>setDisplay("cards")}
                      >Cards
              </button>
              <button className="btn btn-success"
                      onClick={e=>navigate(`/game/${game}`)}
                      >Play
              </button>
              <button className="btn btn-danger"
                      onClick={e=>navigate("/")}
                      >Quit                      
              </button>
            </nav>
            <Router >
              <DisplayCards path="/" 
                            displayType={display} 
                            list={list}
                            fontsize={fontsize}
                            reverse={reverse}
                            columns={columns}
                            refresh={fetchCard}
                            edit={turnOnEditForm}
                            />
              <RandomGame   path="/game/random"
                            list={list}
                            fontsize={fontsize}
                            reverse={reverse}
                            />
            </Router>
          </div>
          {/* Column 3 /////////////////////////////////////////////////////////////////*/}
          <div className="col-lg-3 col-md- border border-secondary">
            <b className="row p-2 mb-2 bg-info text-white">Add a card</b>
            <AddCard refresh={fetchCard}/>
            <b className="row p-2 mb-2 mt-2 bg-info text-white">Comments</b>
          </div>
      </div>
    </div>
  );
}

export default App;
