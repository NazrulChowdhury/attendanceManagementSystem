import { useGlobalContext } from "../../context/context"
import { Excel } from 'antd-table-saveas-excel'
import { AiOutlineCloudDownload } from "react-icons/ai"

const DownloadTimeSheet = ({id,sessions}) => {
    const {timeSheetColumn} = useGlobalContext() 
    return(
        <>
        <AiOutlineCloudDownload
            size = {'50px'}
            onClick={() => {
            const excel = new Excel();
            excel
                .addSheet('test')
                .addColumns(timeSheetColumn)
                .addDataSource(sessions, {
                str2Percent: true,
                })
                .saveAs('timesheet.xlsx')
            }}
            >
                download
        </AiOutlineCloudDownload>
        </>
    )
}
export default DownloadTimeSheet