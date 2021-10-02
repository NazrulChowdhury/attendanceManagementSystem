const userReducer= (state,action) => {
  switch (action.type) {
      case 'SUCCESS':
          return {
            isLoggedIn : true,
            user : action.payload
          }
          break;
        case 'FAILED':
            return {
                isLoggedIn : false,
                user : {}
            }
            break;  
      default:
          return state
          break;
  }
}
export default userReducer