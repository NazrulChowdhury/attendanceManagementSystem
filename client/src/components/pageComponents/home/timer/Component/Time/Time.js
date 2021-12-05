import React, {useEffect, useState} from 'react';

const Time = (props) => {

    const getValidDisplayTime = (hours, minutes, seconds) => {
        let tmp = '';
        if(props.displayHours){
            tmp = tmp + (hours/100).toFixed(2).slice(2);
            if(props.displayMinutes){
                tmp = tmp + ":"
            }
        }
        if(props.displayMinutes){
            tmp = tmp + (minutes/100).toFixed(2).slice(2);
            if(props.displaySeconds){
                tmp = tmp + ":"
            }
        }
        if(props.displaySeconds){
            tmp = tmp + (seconds/100).toFixed(2).slice(2);
        }
        return tmp
    }
    const timeDiffCalc = (startTime, endTime) => {
        let diffInMilliSeconds = Math.abs(endTime - startTime)/1000    
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24
        diffInMilliSeconds -= hours * 3600;
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60
        diffInMilliSeconds -= minutes * 60;
        // calculate seconds
        const seconds = Math.floor(diffInMilliSeconds)
        return {
        hours, 
        minutes,
        seconds 
        }
    }

   // const defaultTime = new Date(0, 0, 0, 0, 0, 0, 0)
    const [startTime, setStartTime] = useState(false)
    const [defaultTime, setDefaultTime] = useState(new Date(0, 0, 0, 0, 0, 0, 0))
    const [text, setText] = useState(getValidDisplayTime(defaultTime.getHours(),defaultTime.getMinutes(), defaultTime.getSeconds()));
    const [idInterval, setIdInterval] = useState('');
    const [isCount, setIsCount] = useState(false); 
    const [startWatch, setStartWatch] = useState(false)

    const startStopwatch = () => setStartWatch(true)

    useEffect(() => {
        if(startWatch){ 
            if(props.timeFrom && !startTime) {
                const {hours, minutes, seconds } = timeDiffCalc(Date.now(), props.timeFrom)
                const defaultCopy = new Date(+defaultTime)
                defaultCopy.setHours(hours)
                defaultCopy.setMinutes(minutes)
                defaultCopy.setSeconds(seconds)
                setDefaultTime(defaultCopy)
                setStartTime(props.timeFrom)
            }
            const time = new Date(2000,0,0,0,0,0,0);
            const start = Date.now();
            const targetIntervalId = setInterval(function () {
                const delta = Date.now() - start
                time.setMinutes(defaultTime.getMinutes())
                time.setHours(defaultTime.getHours())
                time.setSeconds(Math.floor(delta / 1000) + defaultTime.getSeconds())
                props.hint(time.getSeconds())
                setText(getValidDisplayTime(time.getHours(), time.getMinutes(), time.getSeconds()))
            }, 1000)
            setIdInterval(targetIntervalId) 
        }
        // clean up...
        //return clearInterval(idInterval)
    return clearInterval(idInterval)},[startWatch,startTime])
    
    if(props.isOn && !isCount){
            startStopwatch()
            setIsCount(true);
    }  
    if (!props.isOn && isCount && startWatch ) {
        clearInterval(idInterval)
        setStartWatch(false)
        setIsCount(false)
        setText('00:00:00')
    }

    return(
        <React.Fragment>
            <div className = "clockTime">
                {text}
            </div>
        </React.Fragment>
    )
};

export default Time;


