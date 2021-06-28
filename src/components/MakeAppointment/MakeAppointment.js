// import { useState } from "react";
import DatePickerComponent from "../DatePicker/DatePicker";
import UserSelectComponent from "../UserSelectComponent/UserSelectComponent";

import "./MakeAppointment.css";

const MakeAppointment = ({
                            loading,
                            makeAppointmentError,
                            submitNewAppointment, 

                            appointmentDateTimePicked, 
                            setAppointmentDateTimePicked, 

                            userGroup,
                            customersOrEmployees,
                            // customerOrEmployeeSelected,
                            setCustomerOrEmployeeSelected
                        }) => {
    
    const selectLabel = userGroup === "Employees" ? "Customer" : "Nail Artist"

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="make-appointment-container">
            <h2>Make an Appointment</h2>
            <form onSubmit={submitNewAppointment}>
                <label>
                    {selectLabel}: <UserSelectComponent 
                                        selectList={customersOrEmployees} 
                                        setSelectValue={setCustomerOrEmployeeSelected} 
                                        // selectedValue={customerOrEmployeeSelected} 
                                    />
                </label>
                <label>
                    Date:
                    <DatePickerComponent 
                        appointmentDateTimePicked={appointmentDateTimePicked}
                        setAppointmentDateTimePicked={setAppointmentDateTimePicked}
                    />
                </label>
                <input type="submit" value="Make Appointment" className="btn" />
            </form>
            
            <div className="error">{ makeAppointmentError }</div>

        </div>
            );
    }
    };

export default MakeAppointment;