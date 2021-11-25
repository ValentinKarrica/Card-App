import MyCard from "../UI/MyCard";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinnerp from "../UI/LoadingSpinnerp";
import style from "./CardData.module.css"
import { pageActions } from "../store/page-slice";




const CardData = ()=>{
    
    const getSuccess = useSelector(state=>state.myPage.getSuccess)
    const cardsperRow = useSelector(state=>state.myPage.pageList)
    const pageNum = useSelector(state=>state.myPage.pageNum)
    const lastPage = useSelector(state=>state.myPage.lastPageNum)
    const lastPagedek = useSelector(state=>state.myPage.lastPage)
    let rowNum = useSelector(state=>state.myPage.rowNum)
    let cardNum = useSelector(state=>state.myPage.cardNum)
    

    const dispatch =  useDispatch()

    
    const rowHadler=(n)=>{ 

        return [...Array(n)].map((e, i) => <div className={style.rowStyle}>
        {cardsperRow[(pageNum.pageNumHadler+i)].map((item)=>
         <MyCard 
            
            id = {item.id}
            image = {item.image}
            owner ={item.owner}
            rarity_rank = {item.rarity_rank}
            name = {item.name}
            name_id = {item.name_id}
            highest_offer = {item.highest_offer}

            accessories = {item.accessories.tType}
            background = {item.background.tType}
            body = {item.body.tType}
            clothes = {item.clothes.tType}
            hair =  {item.hair.tType}
            weapons = {item.weapons.tType}
         />)
         }
         </div> )
    
    }

    const flipCardhanler=()=>{
        dispatch(pageActions.flipCardHandler())
    }
    const onHandlerCardNum=(event)=>{
        dispatch(pageActions.onHoandlerCardNum(event.target.value))
        dispatch(pageActions.onHadlerPageNum("FIRST"))
    }

    const onHandlerRowNum=(event)=>{
        dispatch(pageActions.onHandlerRowNum(event.target.value))
        dispatch(pageActions.onHadlerPageNum("FIRST"))
    }

    const onHandlerPageNumUp=()=>{
        dispatch(pageActions.onHadlerPageNum('NEXT'))

        
    }
    const onHandlerPageNumDown=()=>{
        dispatch(pageActions.onHadlerPageNum("PREVIOUS"))
    }
    const onHandlerPageLastNum = ()=>{
        dispatch(pageActions.onHadlerPageNum("LAST"))

    }
    const onHandlerPageFirstNum = () =>{
        dispatch(pageActions.onHadlerPageNum("FIRST"))
    }


    return <div >
        <div className={style.upButtons}>
            <button onClick= {flipCardhanler}>Flip Card</button>
            <button>Sort Card</button>
        </div>
        <div className={style.mainpage}>
            {getSuccess ? rowHadler(rowNum) : <LoadingSpinnerp/>}
        </div>
        <div className={style.downButtons}>
            <div className={style.downLeftButtons}>
                <button>Cards Per Row
                    <select value = {cardNum} onChange={onHandlerCardNum} className={style.selectStyle}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>

                    </select>
                </button>
                <button>Rowrs Per Page
                    <select value = {rowNum} onChange={onHandlerRowNum} className={style.selectStyle}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                </button>
                <div>tottal Cards per page: {rowNum*cardNum}</div>
            </div>
            <div className={style.downRightButtons}>
                <button onClick={onHandlerPageFirstNum}> ❮❮ </button>
                <button onClick={onHandlerPageNumDown}>❮</button>
                {pageNum.pageNumBeforeTwo>0 &&<button>{pageNum.pageNumBeforeTwo}</button>}
                {pageNum.pageNumBeforeOne>0 &&<button>{pageNum.pageNumBeforeOne}</button>}
                <span>Page Number: {pageNum.pageNumCounter}</span>
                {lastPage>=pageNum.pageNumAfterOne && <button>{pageNum.pageNumAfterOne}</button>}
                {lastPage>=pageNum.pageNumAfterTwo && <button>{pageNum.pageNumAfterTwo}</button>}
                <button onClick={onHandlerPageNumUp}> ❯ </button>
                <button onClick={onHandlerPageLastNum}> ❯❯ </button>
            </div>
        </div>
    </div>

}

export default CardData;