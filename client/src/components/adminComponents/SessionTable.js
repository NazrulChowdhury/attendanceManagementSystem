import { Table} from "antd"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../../context/context"
import { msToTime } from "../../helper/time"

const SessionTable = ({sessions}) => {
  const [page, setPage] = useState(1) 
  const {setTimeSheetColumn} = useGlobalContext()

  const formattedSessions = 
    sessions.reduce((acc, obj)=> {
      acc.push({
        value : msToTime(obj.value),
        day : obj.day,
        key : obj.day
      })
      return acc
     },[])

  const columns = [
    {
      title: 'Date',
      dataIndex: 'day',
    },
    {
      title: 'Session Duration',
      dataIndex: 'value',
    }
  ]
  useEffect(() => setTimeSheetColumn(columns),[])
  
  return(
    <>
      <Table 
        dataSource={formattedSessions} 
        columns={columns} 
        pagination = {{
            current: page,
            pageSize : 9,
            onChange: (page)=> setPage(page)
        }}
      /> 
    </>
  ) 

}
export default SessionTable


