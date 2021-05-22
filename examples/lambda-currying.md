```ts
// var config = {token,url} 
// https://en.wikipedia.org/wiki/Anonymous_function
// Labmda = anonymous function with closure;
λ = {}

λ.request = token => url => method => resource =>  id => {
    return `${method} ${url}/${resource}/${id}
    
    Authorization: ${token}
`}
// request('12344','GET','http://localhost:4000/','users','123')

// props.request(props.token,'GET',props.baseUrl,'users',props.userId)
// <UserCard userId={123}    baseUrl={api_url} token={token} />

sessionRequest = λ.request('secrettoken');
hostRequest = sessionRequest('http://localhost:4000/')
usersRequest = hostRequest('users')
userRequest = usersRequest(123)
//  userRequest =  useCallback( usersRequest(user_id),[user_id] )
userRequest() // :Promise<User>