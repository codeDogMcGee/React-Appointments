import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";

import { getMinAppointmentDateTime, 
         getMaxAppointmentDate, 
         getMinAppointmentTime, 
         getMinAppointmentTimeToday,
         getMaxAppointmentTime,
         APPOINTMENT_TIME_MINUTES } from "../../util/datesAndTimes"
import "react-datepicker/dist/react-datepicker.css";



const DatePickerComponent = ({ appointmentDateTimePicked, setAppointmentDateTimePicked}) => {   
    const [minTime, setMinTime] = useState(getMinAppointmentTimeToday());
    
    const onChange = (_date) => {
        if (_date.valueOf() < getMinAppointmentDateTime().valueOf()) {
            _date = getMinAppointmentDateTime();
        }
        _date.setSeconds(0, 0);
        setAppointmentDateTimePicked(_date);
        
    };

    useEffect(() => {
        // Change the minimum time based on the date that's being viewed.
        // Today will have a later minTime than any other day.
        if (appointmentDateTimePicked) {

            const today = new Date();
            const todayInt = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 +  today.getDate();

            const appointmentInt = appointmentDateTimePicked.getFullYear() * 10000 + (appointmentDateTimePicked.getMonth() + 1) * 100 +  appointmentDateTimePicked.getDate();
            
            appointmentInt > todayInt ? setMinTime(getMinAppointmentTime()) : setMinTime(getMinAppointmentTimeToday());
        }
        
    }, [appointmentDateTimePicked]);

    return (
        <DatePicker 
            selected={appointmentDateTimePicked}
            onChange={(date) => onChange(date)}
            
            showTimeSelect
            
            timeFormtat="HH:mm"
            timeIntervals={APPOINTMENT_TIME_MINUTES}
            
            minDate={getMinAppointmentDateTime()}
            maxDate={getMaxAppointmentDate()}

            minTime={minTime}
            maxTime={getMaxAppointmentTime()}

            timeCaption="Time"
            dateFormat="MMMM d, h:mm aa"

            placeholderText="Click to select a time"
        />
    )};

export default DatePickerComponent;