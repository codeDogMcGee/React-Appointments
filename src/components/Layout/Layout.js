import Customers from '../Customers/Customers'
import NavBar from '../NavBar/NavBar';
import MakeAppointment from '../MakeAppointment/MakeAppointment'

const Layout = (props) => {

    let layoutComponent = null;

    switch(props.view) {
        case "customers":
            layoutComponent = <Customers 
                                customers={props.customers}
                                loading={props.loading}
                              />
            break;
        case "make-appointment":
            layoutComponent = <MakeAppointment
                                loading={props.loading}
                                makeAppointmentError={props.makeAppointmentError}

                                submitNewAppointment={props.submitNewAppointment}
                                
                                appointmentDateTimePicked={props.appointmentDateTimePicked}
                                setAppointmentDateTimePicked={props.setAppointmentDateTimePicked}

                                // appointmentTimePicked = {props.appointmentTimePicked}
                                // setAppointmentTimePicked = {props.setAppointmentTimePicked}
                                
                                customers={props.customers}
                                employees={props.employees}

                                customerSelected={props.customerSelected}
                                employeeSelected={props.employeeSelected}

                                setCustomerSelected={props.setCustomerSelected}
                                setEmployeeSelected={props.setEmployeeSelected}
                              />
            break;
        default:
            layoutComponent = <div />
    }

    return (
        <div>
            <NavBar setView={props.setView} />

            { layoutComponent }

        </div>
    )
    };

export default Layout;