import StartSession from "./StartSession.component"
import TodaysSessions from "./TodaysSession.componenets"
import './home.css'
import NivoCalender from "./NivoCalender"
import { useState } from "react"

const Home = () => {
    const [thisYar, setYear] = useState(true)
    return(
        <>
            <div className = "firstColumn" >
                <div className = "flexRowCenter">
                    <div className= "flexColumnCenter">
                    <StartSession />
                    </div>
                </div>
                <div className = "flexRowCenter"></div>
                <div id = "heatMapContainer"> 
                   <NivoCalender /> 
                </div>
            </div>
            <div className = "secondColumn flexRowCenter">
                <div className = "todaysSessionsContainer stopOverFlow">
                   <TodaysSessions />
                </div>
            </div>
        </>
    )
}
export default Home
