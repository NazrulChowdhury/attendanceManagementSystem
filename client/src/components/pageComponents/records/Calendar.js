import { useEffect, useState } from "react"
import RevoCalendar from "mod-session-calendar"
import AddSession from "./AddSession"
import moment from "moment"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"
import { formatSession } from "../../../helper/time"
import { message , Spin} from "antd"

const Calendar = ()=> {
  const [events, setEvents] = useState([])
  const [sessions,  setSessions] = useState([])
  const [sessionDate, setSessionDate] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showCalendar, setShowCalendar] = useState(true)
  const queryClient = useQueryClient()

  const addEvent = (date) =>{
    setSessionDate(date)
    setShowModal(true) 
    setShowCalendar(false)
  }
  const deleteEvent = (index) => {
    mutateAsync(events[index].id)
  }
  const dateSelected = (date) => {
    if(date.month !== selectedDate.month) { 
      setSelectedDate(date)
    }
  }
  const updateDateRange = (date) => {
    const selectedMoment = moment(date)
    const startOfMonth = +new Date(selectedMoment.startOf('month').toDate())
    const endOfMonth   = +new Date(selectedMoment.endOf('month').toDate())
    setDateRange({dateFrom: startOfMonth, dateTill: endOfMonth})
  }

  const fetchSessions = async() => {
    const {dateFrom, dateTill} = dateRange
    return axios(`/session/getSessions/${dateFrom}/${dateTill}`,{withCredentials: true}) 
  }
  const {isLoading} = useQuery(['fetchSessions', dateRange], fetchSessions,{
    enabled : !!dateRange,
    onSuccess : (data) => {
      setEvents(formatSession(data.data))
      setSessions(data.data)
    }
  })
  const deleteSession = async(id) => {
    return await axios({
      method : 'delete',
      url : '/session/deleteSession',
      data : {id}
    })
  }
  const {isLoading: loading, mutateAsync} = useMutation(deleteSession, {
    mutationKey : 'deleteSession',
    onSuccess : () => {
      message.success('SUCCESS!')
      queryClient.invalidateQueries('fetchSessions')
    },
    onError : (error) => message.error(`Error! ${error}`)
  })
  useEffect(() => {
    if(selectedDate) {     
      updateDateRange(selectedDate)
    }
  },[selectedDate])

  return (
    <div style = {{ height: '100%' , width: '100%'}}>
      { showCalendar && 
        <div style = {{ height: '100%' , width: '100%'}}>  
          <RevoCalendar events = {events} primaryColor ='#6C09E2'
            allowDeleteEvent = {true}
            deleteEvent = {deleteEvent}
            allowAddEvent ={true}
            addEvent={addEvent}
            dateSelected = {dateSelected}
            showAddEventModal = {true}
          
          />
        </div> 
      }
      {showModal && 
        <div className="flexRowCenter">
          <AddSession 
            setShowModal={setShowModal}
            setShowCalendar = {setShowCalendar}
            sessionDate = {sessionDate}
          />
        </div>
      }
    </div>
  )
}

export default Calendar



