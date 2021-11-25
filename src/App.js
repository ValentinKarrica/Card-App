import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import CardData from "./compontes/CardData";
import { pageActions } from "./store/page-slice";
import style from "./App.module.css"




function App() {
  const dispatch = useDispatch()

  useEffect (()=>{
    dispatch(pageActions.createList())
  })
 

  return <div className={style.container}>
    <h1 className={style.h1style}>My Colection</h1>
    <CardData/>
  </div>
}

export default App;
