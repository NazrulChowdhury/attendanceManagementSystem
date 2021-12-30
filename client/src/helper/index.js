export const isInvited = ()=>{
    const search = window.location.search
    const params = new URLSearchParams(search)
    return params.get('invited')
}
export const isEmpty = (obj) => {
    if (Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
      return true
    } else {
      return false
    }
}