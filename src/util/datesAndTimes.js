import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import addDays from "date-fns/addDays";

const APPOINTMENT_TIME_MINUTES = 30;

const minHoursMinutes = [9, 0];
const maxHoursMinutes = [18, 30];
const maxDaysAhead = 30;

// now plus 30 minutes => Date().getTime() + minutes * 60000 (to get milliseconds from minutes)
const datePlusMinutes = (originalDateTime, minutesToAdd) => new Date(originalDateTime.getTime() + minutesToAdd * 60000); 

const getMinAppointmentTimeToday = () => setHours(setMinutes(setSeconds(new Date(), 0), 0), new Date().getHours() + 2); // 2 hours from now

// const getMinAppointmentDateTime = () => minimumAppointmentDateTime();

const getMaxAppointmentDate = () => addDays(getMinAppointmentDateTime(), maxDaysAhead); // now plus 30 days

const getMinAppointmentTime = () => setHours(setMinutes(setSeconds(new Date(), 0), minHoursMinutes[1]), minHoursMinutes[0]); // 9:00 am

const getMaxAppointmentTime = () => setHours(setMinutes(setSeconds(new Date(), 0), maxHoursMinutes[1]), maxHoursMinutes[0]); // 6:30 pm

const getMinAppointmentDateTime = () => {
    let twoHoursFromNow = datePlusMinutes(new Date(), 120);
    twoHoursFromNow.setMinutes(0);
    twoHoursFromNow.setSeconds(0);

    // if it's too late today, then set the default appointment time to the min time for tomorrow
    if (twoHoursFromNow > getMaxAppointmentTime()) {        

        twoHoursFromNow = addDays(twoHoursFromNow, 1);
        twoHoursFromNow.setHours(minHoursMinutes[0])
        twoHoursFromNow.setMinutes(minHoursMinutes[1])
    }
    return twoHoursFromNow;
}

export {
        datePlusMinutes, 
        getMinAppointmentDateTime, 
        getMaxAppointmentDate, 
        getMinAppointmentTime, 
        getMinAppointmentTimeToday,
        getMaxAppointmentTime,
        APPOINTMENT_TIME_MINUTES
        };