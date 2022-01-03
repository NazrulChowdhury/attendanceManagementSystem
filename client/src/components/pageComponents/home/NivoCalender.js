import { ResponsiveCalendar } from '@nivo/calendar'
import { message, Spin } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useGlobalContext } from '../../../context/context'

const NivoCalender = () => {
    const [heatMapData, setHeatMapData] = useState(false)
    const dateFrom = +new Date(new Date().getFullYear(), 0, 1)
    const dateTill = +new Date(new Date().getFullYear(), 11, 31)
    const { setRefetchHeatmap } = useGlobalContext()
    const yearFrom = `${new Date().getFullYear()}-01-01`
    const yearTo = `${new Date().getFullYear()}-12-31`

    const getHeatMap = async() => {
        return await axios.get(`/api/session/getSessionHeatMap/${dateFrom}/${dateTill}`,{withCredentials: true})
    }
    const {isLoading, refetch : refetchHeatMap} = useQuery('getHeatMap', getHeatMap,{
        enabled : false,
        onSuccess : (data) => setHeatMapData(data.data),
        onError : (error) => message.error(`ERROR!! ${error.message}`)
    })

    const theme = {
    "background": "#6C09E2",
    "textColor": "white",
    "fontSize": 11,
    "borderRadius": "10px"
    }

    useEffect(() => {
        setRefetchHeatmap(()=>refetchHeatMap)
        refetchHeatMap()
    },[]) 
    
    return( 
        <>
            {heatMapData &&  
                <ResponsiveCalendar
                    data={heatMapData} 
                    theme = {theme}
                     from={yearFrom}
                     to={yearTo}
                    emptyColor="#555354"
                    colors={[ '#22D1D5','#39BBBE','#49A9AB','#05E9EE']}
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
                /> 
            }
            {isLoading && 
                <div className="fullPageDiv flexRowCenter" style={{ width: '500px'}}>
                    <Spin size="large" />
                </div>
            }
        </> 
    )
}
export default NivoCalender