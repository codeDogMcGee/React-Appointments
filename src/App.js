import { useState, useEffect } from "react";

import makeApiRequest from "./api";
import { ACTIVE_CUSTOMERS_ENDPOINT, ACTIVE_EMPLOYEES_ENDPOINT, APPOINTMENT_ENDPOINT, APPOINTMENTS_USER_ENDPOINT } from "./util/endpoints"
import Layout from "./components/Layout/Layout";
import { datePlusMinutes, APPOINTMENT_TIME_MINUTES } from "./util/datesAndTimes";
import "./App.css";


// const DEFAULT_NEW_APPOINTMENT = {
//   startDateTime: null,
//   endDateTime: null,
//   customer: null,
//   employee: null
// }

const App = () =>  {
  // View state
  const [view, setView] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState(null)

  // Make appointment view state
  const [appointmentDateTimePicked, setAppointmentDateTimePicked] = useState(null);
  const [employeeSelected, setEmployeeSelected] = useState(null);
  const [customerSelected, setCustomerSelected] = useState(null);
  // const [newAppointment, setNewAppointemnt] = useState(DEFAULT_NEW_APPOINTMENT);
  const [makeAppointmentError, setMakeAppointmentError] = useState("");

  // Login state
  // const [loginError, setLoginError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Users state
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  const logoutUser = () => {
    sessionStorage.clear();
    setLoggedInUser(null);
    setAppointments(null);
    setCustomers([]);
    setEmployees([]);
    setView("login");
  };

  const onGetCustomerSuccess = (customers_array) => {
    // console.log("Customers:")
    // console.log(customers_array)
    setCustomers(customers_array);
    setLoading(false);
  };

  const onGetSelfSuccess = (user_array) => {
    // console.log("Self:")
    // console.log(user_array)
    setLoggedInUser(user_array[0]);
    setLoading(false);

    if (sessionStorage.getItem('UserGroup') === "Customers") setCustomers(user_array)
    else if (sessionStorage.getItem('UserGroup') === "Employees") setEmployees(user_array)
  };

  const onGetEmployeeSuccess = (employees_array) => {
    // console.log("Employees:")
    // console.log(employees_array)
    setEmployees(employees_array);
    setLoading(false);  
  };

  const onGetAppointmentsSuccess = (appointments_array) => {
    setAppointments(appointments_array);
    setLoading(false);  
  };
  
  const setError = (errorMessage) => {
    alert(errorMessage);
    setLoading(false);
  };
  
  const onPostAppointmentSuccess = (customers_array) => {
    setView('appointments')
    setLoading(false);
  };

  const submitNewAppointment = (e) => {

    e.preventDefault()

    if (employeeSelected && customerSelected && appointmentDateTimePicked) {
      const appointmentObject = {
        start_time: appointmentDateTimePicked,
        end_time: datePlusMinutes(appointmentDateTimePicked, APPOINTMENT_TIME_MINUTES),
        customer: customerSelected.id,
        employee: employeeSelected.id
      }

      setLoading(true);
      makeApiRequest("POST", APPOINTMENT_ENDPOINT, onPostAppointmentSuccess, setError, true, appointmentObject)

      setMakeAppointmentError("");
    } 
    else {
      setMakeAppointmentError("Error");
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem('ApiToken')
    const userGroup = sessionStorage.getItem('UserGroup')
    // console.log(token)
    if (token && userGroup && loggedInUser === null) {
      // console.log('here')
      let callback = userGroup === "Customers" ? onGetSelfSuccess : onGetCustomerSuccess
      setLoading(true);
      makeApiRequest("GET", ACTIVE_CUSTOMERS_ENDPOINT, callback, true, setError);
  
      callback = userGroup === "Employees" ? onGetSelfSuccess : onGetEmployeeSuccess
      setLoading(true);
      makeApiRequest("GET", ACTIVE_EMPLOYEES_ENDPOINT, callback, true, setError);
    }

    if (loggedInUser) {
      setLoading(true);
      makeApiRequest("GET", APPOINTMENTS_USER_ENDPOINT + `${loggedInUser.id}/`, onGetAppointmentsSuccess, true, setError)
    }
    // else {
    //   setView("login");
    // }    
    // setLoading(true);
    // makeApiRequest("GET", APPOINTMENT_ENDPOINT, onGetAppointmentsSuccess, true, setError)

  }, [loggedInUser, view]);

  return (
      <Layout 
            loading={loading}
            makeAppointmentError={makeAppointmentError}

            view={view} 
            setView={setView}
            
            appointmentDateTimePicked={appointmentDateTimePicked}
            setAppointmentDateTimePicked={setAppointmentDateTimePicked}

            // loginError={loginError}
            // setLoginError={setLoginError}
            logoutUser={logoutUser}
            loggedInUser={loggedInUser}
            // setLoggedInUser={setLoggedInUser}

            customers={customers}
            customerSelected = {customerSelected}
            setCustomerSelected = {setCustomerSelected}
            
            employees={employees}
            employeeSelected={employeeSelected}
            setEmployeeSelected={setEmployeeSelected}
            
            appointments={appointments}

            submitNewAppointment={submitNewAppointment}
            // newAppointment={newAppointment}
            // setNewAppointemnt={setNewAppointemnt}
      />
  );
}

export default App;


