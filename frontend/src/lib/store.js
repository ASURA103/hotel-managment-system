import {configureStore, createSlice} from "@reduxjs/toolkit"

const hotelSlice = createSlice({
    name:'searchHotel',
    initialState: {
        value: null,
        fromDate: null,
        toDate: null,
        rooms: null,
        roomType: null
    },
    reducers: {
       updateItem: (state,action) =>{
            state.value= action.payload.value,
            state.fromDate= action.payload.fromDate,
            state.toDate= action.payload.toDate,
            state.rooms= action.payload.rooms,
            state.roomType= action.payload.roomType
       } 
    }
})
export const {updateItem} = hotelSlice.actions

export const store= configureStore({
    reducer: {
        updateItem: hotelSlice.reducer
    }
})