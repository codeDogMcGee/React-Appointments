import NavBar from "../NavBar/NavBar";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import Appointments from "../Appointments/Appointments";
import Login from "../Login/Login";


const Layout = (props) => {

    let layoutComponent = null;

    switch(props.view) {
        case "make-appointment":
            layoutComponent = <MakeAppointment
                                loading={props.loading}
                                makeAppointmentError={props.makeAppointmentError}

                                submitNewAppointment={props.submitNewAppointment}
                                
                                appointmentDateTimePicked={props.appointmentDateTimePicked}
                                setAppointmentDateTimePicked={props.setAppointmentDateTimePicked}
                                
                                customers={props.customers}
                                employees={props.employees}

                                customerSelected={props.customerSelected}
                                employeeSelected={props.employeeSelected}

                                setCustomerSelected={props.setCustomerSelected}
                                setEmployeeSelected={props.setEmployeeSelected}
                              />
            break;
        case "appointments":
                layoutComponent = <Appointments 
                                    appointments={props.appointments}
                                    loading={props.loading}
                                    employees={props.employees}
                                    customers={props.customers}
                                  />
                break;
        case "login":
            layoutComponent = <Login 
                                // loginError={props.loginError}
                                // loggedInUser={props.loggedInUser}
                                // setLoggedInUser={props.setLoggedInUser}
                                setView={props.setView}
                                />
            break;
        default:
            layoutComponent = <div />
    }

    // console.log(sessionStorage.getItem("User"))

    const userNameString = props.loggedInUser ? props.loggedInUser.name : ""

    return (
        <div className="main-container">
            <NavBar setView={props.setView} loggedInUser={userNameString} logoutUser={props.logoutUser} />

            { layoutComponent }

        </div>
    )
    };

export default Layout;