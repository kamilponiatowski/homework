```ts
// Sum
[1,2,3,4,5].reduce((sum,x) => {

    console.log(sum,x)
    return sum += x
}, 0 )

// Map with reduce
[1,2,3,4,5].reduce((arr,x) => {
    
    return [...arr, x*2]
}, [] )

// Filter with reduce
[1,2,3,4,5].reduce((arr,x) => {
    
    return arr.concat( x % 2 == false? x : [] )
}, [] )
```


```ts
inc = (payload=1) => ({type:'INC', payload});
dec = (payload=1) => ({type:'DEC', payload});
addTodo = (payload) => ({type:'ADDTODO', payload});

counter = (state = 0, action) => {
    switch(action.type){
        case 'INC': return  state + action.payload
        case 'DEC': return  state - action.payload
        default: return state;
    }
}

reducer = (state,action) => {
    switch(action.type){
//         case 'INC': return {...state, counter: state.counter + action.payload};
//         case 'DEC': return {...state, counter: state.counter - action.payload};
        case 'ADDTODO': return {...state, todos: [...state.todos, action.payload] };
        default: return {
            ...state,
            counter: counter(state.counter, action)
        };
    }
}

state = {
    counter:0,
    todos:[]    
}
state = reducer(state, inc());
state = reducer(state, inc(2));
state = reducer(state, addTodo('buy milk!'));
state = reducer(state, dec(1));

// [inc(),inc(2), addTodo('buy milk!'), dec()].reduce(reducer,{
//     counter:0,
//     todos:[]    
// })
```