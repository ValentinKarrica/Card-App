import style from "./MyCard.module.css"
import { useSelector } from "react-redux"


const MyCard =(props)=>{
    let front =style[""]
    let back = style[""]
    const flipCard = useSelector(state=>state.myPage.flipCard)

    if (flipCard){
        front =style["flip-card-front"]
        back = style["flip-card-back"]
    }else{
        back =style["flip-card-front"]
        front = style["flip-card-back"]
    }

    
    return <div className={style.card}>
        <div className={style['flip-card-inner']}>
            <div className={front}>
                <div className={style["front-card"]}>
                    <img className={style.myImage} src={props.image} alt=""></img>
                    <div className={style.title}>
                        {props.name}
                    </div>
                    <div className={style.text}>
                        {"Owner: " + (props.owner ? props.owner : "-")}
                    </div>
                </div>
            </div>

            <div className={back}>
                <div className={style["back-card"]}>
                    <div className={style.banner}>
                        <img className={style.smallimagein} src={props.image} alt=""></img>
                        <span>
                            <div> none</div>
                            <div>{props.name}</div>
                        </span>
                    </div>
                    <div className={style.cardbody}>
                        <div style={{display: "flex", flexDirection: "row",justifyContent:'space-between', fontSize: "9px"}}>
                            <span style= {{color: 'black'}}>CARD TRAITS</span>
                            <span>
                                <div style= {{color: 'black'}} >OWNER: <span style= {{color: 'red'}}>{props.owner}</span></div>
                                <div style= {{color: 'black'}}>HIGHEST OFFER: <span style= {{color: 'red'}}>{props.highest_offer}</span></div>
                            </span>
                        </div>
                        <ul style ={{fontSize:'12px', paddingLeft: '5px', textAlign:'start', margin:'0px'}}>
                            <li>{props.accessories.trait_type}: {props.accessories.trait_value}<br/>{props.accessories.freq_pc} {props.accessories.rank}</li>
                            <li>{props.background.trait_type}: {props.background.trait_value}<br/>{props.background.freq_pc} {props.background.rank}</li>
                            <li>{props.body.trait_type}: {props.body.trait_value}<br/>{props.body.freq_pc} {props.body.rank}</li>
                            <li>{props.clothes.trait_type}: {props.clothes.trait_value}<br/>{props.clothes.freq_pc} {props.clothes.rank}</li>
                            <li>{props.hair.trait_type}: {props.hair.trait_value}<br/>{props.hair.freq_pc} {props.hair.rank}</li>
                            <li>{props.weapons.trait_type}: {props.weapons.trait_value}<br/>{props.weapons.freq_pc} {props.weapons.rank}</li>
                            
                        </ul>
                    </div>
                    <br/>
                    {props.my_number}
                </div>
           </div>
        </div>
    </div>

}

export default MyCard