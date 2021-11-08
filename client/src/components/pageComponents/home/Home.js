import StartSession from "./StartSession.component"
import TodaysSessions from "./TodaysSession.componenets"

const Home = () => {
    return(
        <div style={{display : "flex"}} >
            <div>
               <StartSession />
           </div>
           <div style = {{}}>
               <TodaysSessions />
           </div>
        </div>
    )
}
export default Home