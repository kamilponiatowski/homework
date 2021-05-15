

const counter = (state = 0, action: any):number => {
    switch (action.type) {
        case 'INC': return state + action.payload
        case 'DEC': return state - action.payload
        default: return state;
    }
}

export default counter;