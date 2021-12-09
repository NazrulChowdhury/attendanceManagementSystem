import { ResponsiveCalendar } from '@nivo/calendar'
import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
const NivoCalender = () => {
    const [heatMapData, setHeatMapData] = useState(false)
    const dateFrom = +new Date(new Date().getFullYear(), 0, 1)
    const dateTill = +new Date(new Date().getFullYear(), 11, 31)
    const getHeatMap = async() => {
        return await axios.get(`session/getSessionHeatMap/${dateFrom}/${dateTill}`,{withCredentials: true})
    }
    const {isLoading} = useQuery('getHeatMap', getHeatMap,{
        onSuccess : (data) => { setHeatMapData(data.data)}
    })
    const theme = {
    "background": "#6C09E2",
    "textColor": "white",
    "fontSize": 11,
    "borderRadius": "10px"
    }
    return( 
        <>
          {heatMapData &&  
           <ResponsiveCalendar
                data={heatMapData} 
                theme = {theme}
                from="2021-01-01"
                to="2021-12-31"
                emptyColor="#555354"
                colors={[ '#05E9EE', '#22D1D5', '#39BBBE', '#49A9AB' ]}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#6C09E2"
                dayBorderWidth={2}
                dayBorderColor="#6C09E2"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            /> }
        </> 
    )
}
export default NivoCalender