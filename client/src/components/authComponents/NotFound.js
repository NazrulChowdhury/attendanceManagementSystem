import { useHistory } from "react-router-dom"

const NotFound = () => {
    const history = useHistory()
    return(
        <div className="fullPageDiv" id = "notFoundPage"
            onClick = {() => history.push('/') }
        >

        </div>
    )
}
export default NotFound