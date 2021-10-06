const userReducer= (state,action) => {
  switch (action.type) {
      case 'SUCCESS':
          return { isLoggedIn : action.payload}
          break;
        case 'FAILED':
            return {isLoggedIn : action.payload}
            break;  
      default:
          return state
          break;
  }
}
export default userReducer