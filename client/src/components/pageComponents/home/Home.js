import StartSession from "./StartSession.component"
import TodaysSessions from "./TodaysSession.componenets"
import './home.css'
import NivoCalender from "./NivoCalender"

const Home = () => {
    return(
        <div>
            <div className = "firstRow" >
                <div className = "startSessionContainer">
                   <StartSession />
                </div>
                <div className = "todaysSessionsContainer">
                   <TodaysSessions />
                </div>
            </div>
            <div style = {{height: '200px'}}>
                <NivoCalender />
            </div>
        </div>
    )
}
export default Home