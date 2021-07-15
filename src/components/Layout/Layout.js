import NavBar from "../NavBar/NavBar";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import Appointments from "../Appointments/Appointments";
import Login from "../Login/Login";
import { getCustomerFromId, getEmployeeFromId } from "../../util/stringFormatting";
import { formatDateToString } from "../../util/stringFormatting";
import RequestEmailKey from "../RequestEmailKey/RequestEmailKey";

const Layout = (props) => {

    let layoutComponent = null;

    const makeAppointmentsList = () => {
        return props.appointments.map((appointment, i) => {

            const personString = props.loggedInUser.group === "Employees" ? getCustomerFromId(appointment.customer, props.customers) : getEmployeeFromId(appointment.employee, props.employees); 

            const newAppointmentObject = {
                id: appointment.id,
                startTime: formatDateToString(appointment.start_time),
                endTime: formatDateToString(appointment.end_time),
                otherPerson: personString
            };

            return newAppointmentObject;
        });
    };

    switch(props.view) {
        case "make-appointment":

            if (props.loggedInUser) {

                layoutComponent = <MakeAppointment
                                        loading={props.loading}
                                        makeAppointmentError={props.makeAppointmentError}

                                        submitNewAppointment={props.submitNewAppointment}
                                        
                                        appointmentDateTimePicked={props.appointmentDateTimePicked}
                                        setAppointmentDateTimePicked={props.setAppointmentDateTimePicked}

                                        customersOrEmployees={props.loggedInUser.group === "Employees" ? props.customers : props.employees}
                                        setCustomerOrEmployeeSelected={props.loggedInUser.group === "Employees" ? props.setCustomerSelected : props.setEmployeeSelected}

                                        userGroup={props.loggedInUser.group}
                                    />
            }
            else {
                layoutComponent = <div>Loading...</div>;
            }
            
            break;
        case "appointments":
                if (props.loggedInUser && props.appointments && props.employees && props.customers){
                    layoutComponent = <Appointments 
                                            appointments={makeAppointmentsList(props.loggedInUser.group)}
                                            loading={props.loading}
                                            deleteAppointmentById={props.deleteAppointmentById}
                                        />
                }
                else {
                    layoutComponent = <div>Loading...</div>;
                }
                
                break;
        case "login":
            layoutComponent = <Login 
                                setLoading={props.setLoading}
                                setView={props.setView}
                                />
            break;
        case "request-email-verification":
            layoutComponent = <RequestEmailKey
                                setLoading={props.setLoading}
                                setView={props.setView}
                                />
            break;
        default:
            layoutComponent = <div />
    }

    return (
        <div className="main-container">
            <NavBar setView={props.setView} loggedInUser={props.loggedInUser} logoutUser={props.logoutUser} />

            { layoutComponent }

        </div>
    )
    };

export default Layout;