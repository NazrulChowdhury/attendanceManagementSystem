import { formatTotalTime } from "../../helper/time"

const UserDetails = ({users, id, month, sessions}) => {
    const user = users.find(user => id == user._id)
    const {firstName, lastName, email} = user
    const formattedTotal = formatTotalTime(sessions)

    return(
        <>
          <b>Name :</b> {`${firstName} ${lastName}`} <br /> <br />
          <b>Email :</b> {email} <br /> <br />
          <b>{month} Total : {formattedTotal}</b> 
        </>
    )
}
export default UserDetails