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

   // const defaultTime = new Date(0, 0, 0, 0, 0, 0, 0)
    const [defaultTime, setDefaultTime] = useState(new Date(0, 0, 0, 0, 0, 0, 0))
    const [text, setText] = useState(getValidDisplayTime(defaultTime.getHours(),defaultTime.getMinutes(), defaultTime.getSeconds()));
    const [idInterval, setIdInterval] = useState('');
    const [isCount, setIsCount] = useState(false); 
    const [startWatch, setStartWatch] = useState(false)

    const startStopwatch = () => setStartWatch(true)

    useEffect(() => {
        if(startWatch){
            const time = new Date(2000,0,0,0,0,0,0);
            const start = Date.now();
            const targetIntervalId = setInterval(function () {
                const delta = Date.now() - start;
                time.setMinutes(defaultTime.getMinutes());
                time.setHours(defaultTime.getHours());
                time.setSeconds(Math.floor(delta / 1000) + defaultTime.getMinutes());
                props.hint(time.getSeconds());
                setText(getValidDisplayTime(time.getHours(), time.getMinutes(), time.getSeconds()));
            }, 1000);
            setIdInterval(targetIntervalId)
        }
    },[startWatch])

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
    if (props.activeSession){
        const startTime = new Date(props.activeSession.startTime)
        console.log('activeSession in date', startTime.toString())
    }
    //console.log(props.activeSession)
    return(
        <React.Fragment>
            <div>{text}</div>
        </React.Fragment>
    )
};

export default Time;


// import React, {useEffect, useState} from 'react';

// const Time = (props) => {

//     const getValidDisplayTime = (hours, minutes, seconds) => {
//         let tmp = '';
//         if(props.displayHours){
//             tmp = tmp + (hours/100).toFixed(2).slice(2);
//             if(props.displayMinutes){
//                 tmp = tmp + ":"
//             }
//         }
//         if(props.displayMinutes){
//             tmp = tmp + (minutes/100).toFixed(2).slice(2);
//             if(props.displaySeconds){
//                 tmp = tmp + ":"
//             }
//         }
//         if(props.displaySeconds){
//             tmp = tmp + (seconds/100).toFixed(2).slice(2);
//         }
//         return tmp
//     }

//    // const defaultTime = new Date(0, 0, 0, 0, 0, 0, 0)
//     const [defaultTime, setDefaultTime] = useState(new Date(0, 0, 0, 0, 0, 0, 0))
//     const [text, setText] = useState(getValidDisplayTime(defaultTime.getHours(),defaultTime.getMinutes(), defaultTime.getSeconds()));
//     const [idInterval, setIdInterval] = useState('');
//     const [isCount, setIsCount] = useState(false); 
//     const [startWatch, setStartWatch] = useState(false)

//     const startStopwatch = () => setStartWatch(true)

//     useEffect(() => {
//         if(startWatch){
//             const time = new Date(2000,0,0,0,0,0,0);
//             const start = Date.now();
//             const targetIntervalId = setInterval(function () {
//                 const delta = Date.now() - start;
//                 time.setMinutes(defaultTime.getMinutes());
//                 time.setHours(defaultTime.getHours());
//                 time.setSeconds(Math.floor(delta / 1000) + defaultTime.getMinutes());
//                 props.hint(time.getSeconds());
//                 setText(getValidDisplayTime(time.getHours(), time.getMinutes(), time.getSeconds()));
//             }, 1000);
//             setIdInterval(targetIntervalId)
//         }
//     },[startWatch])

//     if(props.isOn && !isCount){
//             startStopwatch()
//             setIsCount(true);
//     }  
//     if (!props.isOn && isCount && startWatch ) {
//         clearInterval(idInterval)
//         setStartWatch(false)
//         setIsCount(false)
//         setText('00:00:00')
//     }
//     return(
//         <React.Fragment>
//             <div>{text}</div>
//         </React.Fragment>
//     )
// };

// export default Time;

