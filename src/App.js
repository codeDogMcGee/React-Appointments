import { useState, useEffect } from "react";

import makeApiRequest from "./api";
import { ACTIVE_CUSTOMERS_ENDPOINT, ACTIVE_EMPLOYEES_ENDPOINT, MAKE_NEW_APPOINTMENT_ENDPOINT } from "./util/endpoints"
import Layout from "./components/Layout/Layout";
import { datePlusMinutes, APPOINTMENT_TIME_MINUTES } from "./util/datesAndTimes";
import "./App.css";


const DEFAULT_NEW_APPOINTMENT = {
  startDateTime: null,
  endDateTime: null,
  customer: null,
  employee: null
}

const App = () =>  {
  // View state
  const [view, setView] = useState("");
  const [loading, setLoading] = useState(true);

  // Make appointment view state
  const [appointmentDateTimePicked, setAppointmentDateTimePicked] = useState(null);
  const [employeeSelected, setEmployeeSelected] = useState(null);
  const [customerSelected, setCustomerSelected] = useState(null);
  const [newAppointment, setNewAppointemnt] = useState(DEFAULT_NEW_APPOINTMENT);
  const [makeAppointmentError, setMakeAppointmentError] = useState("");

  // Users state
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  const onGetCustomerSuccess = (customers_array) => {
    setCustomers(customers_array);
    setLoading(false);
  };
  const onGetEmployeeSuccess = (employees_array) => {
    setEmployees(employees_array);
    setLoading(false);  
  };
  const setError = (errorMessage) => {
    alert(errorMessage);
    setLoading(false);
  };
  const onPostAppointmentSuccess = (customers_array) => {
    setCustomers(customers_array);
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
  
      console.log('Sumbmitted Appointment');
      console.log(appointmentObject)

      makeApiRequest("POST", MAKE_NEW_APPOINTMENT_ENDPOINT, onPostAppointmentSuccess, setError, appointmentObject)

      setMakeAppointmentError("");
    } 
    else {
      setMakeAppointmentError("Error");
    }
  }

  useEffect(() => {

    setLoading(true);
    makeApiRequest("GET", ACTIVE_CUSTOMERS_ENDPOINT, onGetCustomerSuccess, setError)

    setLoading(true);
    makeApiRequest("GET", ACTIVE_EMPLOYEES_ENDPOINT, onGetEmployeeSuccess, setError)

  }, [setCustomers, setLoading, setEmployees]);

  return (
    <div className="App">
      <Layout 
            loading={loading}
            makeAppointmentError={makeAppointmentError}

            view={view} 
            setView={setView}
            
            appointmentDateTimePicked={appointmentDateTimePicked}
            setAppointmentDateTimePicked={setAppointmentDateTimePicked}

            customers={customers}
            customerSelected = {customerSelected}
            setCustomerSelected = {setCustomerSelected}
            
            employees={employees}
            employeeSelected={employeeSelected}
            setEmployeeSelected={setEmployeeSelected}
            
            submitNewAppointment={submitNewAppointment}
            newAppointment={newAppointment}
            setNewAppointemnt={setNewAppointemnt}
      />
    </div>
  );
}

export default App;


