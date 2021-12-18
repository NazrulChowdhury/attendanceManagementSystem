import { useGlobalContext } from "../../context/context"
import { Excel } from 'antd-table-saveas-excel'
import { AiOutlineCloudDownload } from "react-icons/ai"
import axios from "axios"
import { useQuery } from "react-query"
import { useEffect, useState } from "react"
import { message } from "antd"

const DownloadTimeSheet = ({id, month}) => {

    const {timeSheetColumn, formattedSessions} = useGlobalContext() 
    const [fullName, setFullName] = useState(false)
    const getUserName = async() => {
        return await axios(`admin/getUserFullName/${id}`, {withCredentials: true})
    }
    const {refetch} = useQuery('getUserName',getUserName, {
        enabled: false,
        onSuccess: (data) => setFullName(data.data),
        onError : (error) => message.error(`ERROR!! ${error.response.data}`)
    })
    useEffect(() => refetch(),[])
    return(
        <>
            {fullName && 
                <AiOutlineCloudDownload
                    size = {'50px'}
                    onClick={() => {
                    const excel = new Excel();
                    excel
                        .addSheet('timesheet')
                        .addColumns(timeSheetColumn)
                        .addDataSource(formattedSessions, {
                        str2Percent: true,
                        })
                        .saveAs(`${fullName}-${month}.xlsx`)
                    }}
                />

            }
        </>
    )
}
export default DownloadTimeSheet