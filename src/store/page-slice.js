import { createSlice } from "@reduxjs/toolkit"
import assets_data from "../data/assets.json";
import traits_data from "../data/traits.json";

const traits = traits_data.traits
const assets = assets_data.assets

const pageSlice = createSlice({
    name: 'Pages',
    initialState: {
        charackerList: [],
        pageList: [],
        getSuccess: false,
        flipCard: true,
        rowNum: 4,
        cardNum: 5,
        lastPage: 1,
        lastPageNum: 1,
        pageNum : {
            pageNumHadler: 0,
            pageNumCounter: 1,
            pageNumBeforeOne: 0,
            pageNumBeforeTwo: -1,
            pageNumAfterOne: 2,
            pageNumAfterTwo: 3,
        },
    },
    reducers: {
        onHadlerPageNum(state, action){

            if (action.payload==='NEXT'){
                if(state.pageNum.pageNumCounter < state.lastPageNum){
                    const varIf = state.pageNum.pageNumCounter+1 > state.lastPage&&state.lastPage>(state.pageNum.pageNumCounter + Number(0.5));
                    console.log(varIf)
                    if (varIf){
                        state.pageNum.pageNumHadler = state.pageList.length - state.rowNum;
                        state.pageNum.pageNumCounter = state.lastPageNum;
                        state.pageNum.pageNumAfterOne =Number(state.pageNum.pageNumCounter)+1;
                        state.pageNum.pageNumAfterTwo =Number(state.pageNum.pageNumCounter)+2;
                        state.pageNum.pageNumBeforeOne = Number(state.pageNum.pageNumCounter)-1;
                        state.pageNum.pageNumBeforeTwo =Number(state.pageNum.pageNumCounter)-2;
                    }else {
                        state.pageNum.pageNumBeforeOne += 1;
                        state.pageNum.pageNumCounter += 1;
                        state.pageNum.pageNumBeforeTwo += 1;
                        state.pageNum.pageNumAfterOne += 1;
                        state.pageNum.pageNumAfterTwo += 1;
                        state.pageNum.pageNumHadler += state.rowNum;
                    }
                    
                }
            }
            else if (action.payload==="PREVIOUS"){
                if(state.pageNum.pageNumCounter>1){
                    const varIf = (state.pageNumHadler-state.rowNum)<0;
                    console.log(varIf)
                    if(varIf){
                        state.pageNum.pageNumBeforeOne = 0;
                        state.pageNum.pageNumAfterOne = 2;
                        state.pageNum.pageNumBeforeTwo =- 1;
                        state.pageNum.pageNumHadler = 0;
                        state.pageNum.pageNumAfterTwo = 3;
                    }else{
                        state.pageNum.pageNumCounter -= 1;
                        state.pageNum.pageNumBeforeOne -= 1;
                        state.pageNum.pageNumBeforeTwo -= 1;
                        state.pageNum.pageNumAfterOne -= 1;
                        state.pageNum.pageNumAfterTwo -= 1;
                        state.pageNum.pageNumHadler -= state.rowNum;
                    }
                }
            }
            else if (action.payload==="LAST"){
                state.pageNum.pageNumHadler = state.pageList.length - state.rowNum;
                state.pageNum.pageNumCounter = state.lastPageNum;
                state.pageNum.pageNumBeforeOne = Number(state.pageNum.pageNumCounter)-1;
                state.pageNum.pageNumBeforeTwo =Number(state.pageNum.pageNumCounter)-2;
                state.pageNum.pageNumAfterOne =Number(state.pageNum.pageNumCounter)+1;
                state.pageNum.pageNumAfterTwo =Number(state.pageNum.pageNumCounter)+2;
            }
            else if (action.payload==="FIRST"){
                state.pageNum.pageNumCounter = 1;
                    state.pageNum.pageNumBeforeOne = 0;
                    state.pageNum.pageNumBeforeTwo =- 1;
                    state.pageNum.pageNumAfterOne = 2;
                    state.pageNum.pageNumAfterTwo = 3;
                    state.pageNum.pageNumHadler = 0;
            }
            if (action.payload===""){}
            if (action.payload===""){}
        },
        
        createList(state, action){

            assets.forEach(item=> {
                let element ={accessories: {tType: "Accessories"}}
                let newElement = Object.assign(item,element)
                item = newElement;

                let element1 ={background: {tType: "Background"}}
                let newElement1 = Object.assign(item,element1)
                item = newElement1;

                let element2 ={body: { tType: "Body"}}
                let newElement2 = Object.assign(item,element2)
                item = newElement2;

                let element3={clothes: {tType: "Clothes"}}
                let newElement3 = Object.assign(item,element3)
                item = newElement3;

                let element4 ={hair: {tType: "Hair"}}
                let newElement4 = Object.assign(item,element4)
                item = newElement4;

                let element5 ={weapons: {tType: "Weapons"}}
                let newElement5 = Object.assign(item,element5)
                item = newElement5;
            })


            const lim = traits.length
            for (let i=0; i<lim; i+=1){
                assets.forEach(item=> {
                    if (item.id=== traits[i].id){
                        Object.values(item).forEach(val => {
                            if(val.tType===traits[i].trait_type){
                                val.tType = traits[i]
                            }
                        });
                    }
                  })
            }
            state.charackerList = assets;
            let size = state.cardNum; 
            const limit2 = state.charackerList.length
            for (var i=0; i<limit2; i+=size) {
                state.pageList.push(state.charackerList.slice(i,i+size));
            }
            
            state.getSuccess = true;
            state.lastPage = ((state.pageList.length - state.rowNum)/state.rowNum)+1;
            state.lastPageNum = state.lastPage.toFixed();
        },

        onHoandlerCardNum(state, action){
            console.log(action.payload)
            state.cardNum = Number(action.payload);
            

            let size = Number(action.payload); 
            const limit3 = state.charackerList.length
            state.pageList = [];
            for (var i=0; i<limit3; i+=size) {
                state.pageList.push(state.charackerList.slice(i,i+size));
            }
            state.lastPage = ((state.pageList.length - state.rowNum)/state.rowNum)+1;
            state.lastPageNum = state.lastPage.toFixed();

        },


        flipCardHandler(state,action){
            state.flipCard=!state.flipCard
        },
        onHandlerRowNum (state, action){
            state.rowNum = Number(action.payload);
            state.lastPage = ((state.pageList.length - state.rowNum)/state.rowNum)+1;
            state.lastPageNum = state.lastPage.toFixed();
        }
    }
})

export const pageActions = pageSlice.actions;
export default pageSlice;