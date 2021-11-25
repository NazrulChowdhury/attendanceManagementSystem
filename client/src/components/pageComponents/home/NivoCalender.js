import { ResponsiveCalendar } from '@nivo/calendar'
import axios from 'axios'
import { useQuery } from 'react-query'
import { data } from './data'
const NivoCalender = () => {
    const dateFrom = +new Date(new Date().getFullYear(), 0, 1)
    const dateTill = +new Date(new Date().getFullYear(), 11, 31)
    const getHeatMap = async() => {
        return axios.get(`session/getSessionHeatMap/${dateFrom}/${dateTill}`,{withCredentials: true})
    }
    const {data:heatmapData} = useQuery('getHeatMap', getHeatMap, {
        onSuccess : (data) => { 
            const sessions = data.data
            sessions.map(session => {
                const obDate = new Date(session.date)
                //console.log('date is', obDate)
            })
        }
    })
     console.log(dateTill)
    return( 
        <>
           <ResponsiveCalendar
                data={data} 
                from="2015-03-01"
                to="2015-11-12"
                emptyColor="#eeeeee"
                colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
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
        </>
    )
}
export default NivoCalender