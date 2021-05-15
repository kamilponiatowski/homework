import { createStore, Reducer } from "redux";



const counter = (state = 0, action: any) => {
    switch (action.type) {
        case 'INC': return state + action.payload
        case 'DEC': return state - action.payload
        default: return state;
    }
}

const initialState = {
    counter: 0
}

const reducer: Reducer<typeof initialState, any> = (state = initialState, action) => {
    switch (action.type) {
        default: return {
            ...state,
            counter: counter(state.counter, action)
        }
    }
}


export const store = createStore(reducer);
