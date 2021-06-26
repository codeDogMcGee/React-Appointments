import DatePickerComponent from "../DatePicker/DatePicker";
import UserSelectComponent from "../UserSelectComponent/UserSelectComponent";

import "./MakeAppointment.css";

const MakeAppointment = ({
                            loading,
                            makeAppointmentError,
                            submitNewAppointment, 

                            appointmentDateTimePicked, 
                            setAppointmentDateTimePicked, 

                            customers, 
                            employees,
                            
                            customerSelected,
                            employeeSelected,
                            
                            setCustomerSelected,
                            setEmployeeSelected
                        }) => {

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="make-appointment-container">
            <h2>Make an Appointment</h2>
            <form onSubmit={submitNewAppointment}>
                <label>
                    Employee: <UserSelectComponent selectList={employees} setSelectValue={setEmployeeSelected} selectedValue={employeeSelected} />
                </label>
                <label>
                    Customer: <UserSelectComponent selectList={customers} setSelectValue={setCustomerSelected} selectedValue={customerSelected} />
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