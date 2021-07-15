import { useState, useEffect } from "react";

import { makeApiGetRequest, makeApiPostRequest, makeApiDeleteRequest } from "./api";
import { 
  GROUPS_ENDPOINT, 
  ACTIVE_CUSTOMERS_ENDPOINT, 
  ACTIVE_EMPLOYEES_ENDPOINT, 
  GET_SELF_USER_ENDPONT,
  APPOINTMENT_ENDPOINT, 
  APPOINTMENTS_USER_ENDPOINT 
} from "./util/endpoints"
import Layout from "./components/Layout/Layout";
import { datePlusMinutes, APPOINTMENT_TIME_MINUTES } from "./util/datesAndTimes";
import "./App.css";


const DEFAULT_VIEW = "";

const App = () =>  {
  // View state
  const [view, setView] = useState(DEFAULT_VIEW);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState(null)

  // Make appointment view state
  const [appointmentDateTimePicked, setAppointmentDateTimePicked] = useState(null);
  const [employeeSelected, setEmployeeSelected] = useState(null);
  const [customerSelected, setCustomerSelected] = useState(null);
  const [makeAppointmentError, setMakeAppointmentError] = useState("");

  // Login state
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Users state
  const [customers, setCustomers] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [groups, setGroups] = useState(null);

  
  const logoutUser = () => {
    sessionStorage.clear();
    setAppointmentDateTimePicked(null);
    setLoggedInUser(null);
    setAppointments(null);
    setCustomers(null);
    setEmployees(null);
    setGroups(null);
    setCustomerSelected(null);
    setEmployeeSelected(null);
    setMakeAppointmentError("");
    setView("");
  };

  const onGetCustomerSuccess = (customers_array) => {
    setCustomers(customers_array);
    setLoading(false);
  };

  const onGetEmployeeSuccess = (employees_array) => {
    setEmployees(employees_array);
    setLoading(false);  
  };

  const onGetGroupsSuccess = (groups_array) => {
    setLoading(false);  
    setGroups( groups_array.map(group => {
      return {
        groupName: group.group_name,
        groupId: group.group_id
      }
    }) )
  };

  const onGetAppointmentsSuccess = (appointments_array) => {
    const newArray = appointments_array.map((appointment, i) => {
      appointment.start_time = new Date(appointment.start_time)
      appointment.end_time = new Date(appointment.end_time)
      return appointment;
    });

    setAppointments(newArray);
    setLoading(false);  
  };
  
  const deleteAppointmentById = (appointmentId) => {
    const onSuccess = () => {
      makeApiGetRequest(APPOINTMENTS_USER_ENDPOINT + `${loggedInUser.id}/`, setLoading, onGetAppointmentsSuccess, setError);
      setLoading(false);
    }
    makeApiDeleteRequest(APPOINTMENT_ENDPOINT + `${appointmentId}/`, setLoading, onSuccess, setError);
  };

  const setError = (errors) => {
    
    if (Array.isArray(errors)) {
    
      errors.forEach( error => {
        console.log("API ERROR:", error)
      });
    
    } else console.log("API ERROR:", errors.toSting())

    setLoading(false);
  };
  
  const onPostAppointmentSuccess = (appointment) => {
    makeApiGetRequest(APPOINTMENTS_USER_ENDPOINT + `${loggedInUser.id}/`, setLoading, onGetAppointmentsSuccess, setError);
    setView('appointments')
    setLoading(false);
  };

  const submitNewAppointment = (e) => {

    e.preventDefault()

    let appointmentObject = null;

    if (appointmentDateTimePicked && employeeSelected && loggedInUser.group === "Customers") {
      appointmentObject = {
        start_time: appointmentDateTimePicked,
        end_time: datePlusMinutes(appointmentDateTimePicked, APPOINTMENT_TIME_MINUTES),
        customer: loggedInUser.id,
        employee: employeeSelected.id
      }
    }
    else if (appointmentDateTimePicked && customerSelected && loggedInUser.group === "Customers") {
      appointmentObject = {
        start_time: appointmentDateTimePicked,
        end_time: datePlusMinutes(appointmentDateTimePicked, APPOINTMENT_TIME_MINUTES),
        customer: customerSelected.id,
        employee: loggedInUser.id
      }
    }

    if (appointmentObject) {

      makeApiPostRequest(APPOINTMENT_ENDPOINT, setLoading, onPostAppointmentSuccess, setError, appointmentObject)

      setMakeAppointmentError("");
    } 
    else {
      setMakeAppointmentError("Error");
    }
  }

  useEffect(() => {
    const onGetSelfSuccess = (self_object) => {

      const self_group_id = self_object.groups[0];
      if (groups) {
        const group = groups.find(group => group.groupId === self_group_id);
  
        setLoggedInUser({...self_object, ...{group: group.groupName}});
        setLoading(false);
      }
    };

    if (sessionStorage.getItem('ApiToken')) {
      if (groups === null){
        makeApiGetRequest(GROUPS_ENDPOINT, setLoading, onGetGroupsSuccess, setError);
      }
      
      if (loggedInUser){

        if (appointments === null) {
          makeApiGetRequest(APPOINTMENTS_USER_ENDPOINT + `${loggedInUser.id}/`, setLoading, onGetAppointmentsSuccess, setError)
        }
        if (employees === null) {
          makeApiGetRequest(ACTIVE_EMPLOYEES_ENDPOINT, setLoading, onGetEmployeeSuccess, setError);
        }
        if (customers === null) {
          makeApiGetRequest(ACTIVE_CUSTOMERS_ENDPOINT, setLoading, onGetCustomerSuccess, setError);
        }

        if (view === "" || view === "login") {
          if (loggedInUser.group === "Customers") setView("make-appointment");
          else setView("appointments");
        }

      }
      else {
        makeApiGetRequest(GET_SELF_USER_ENDPONT, setLoading, onGetSelfSuccess, setError);
      }
    }
    else if (view === "") {
      setView("login");
    }

  }, [appointments, customers, employees, groups, loggedInUser, view]);

  return (
      <Layout 
            loading={loading}
            setLoading={setLoading}
            makeAppointmentError={makeAppointmentError}

            view={view} 
            setView={setView}
            
            appointmentDateTimePicked={appointmentDateTimePicked}
            setAppointmentDateTimePicked={setAppointmentDateTimePicked}
            deleteAppointmentById={deleteAppointmentById}

            logoutUser={logoutUser}
            loggedInUser={loggedInUser}

            customers={customers}
            setCustomerSelected = {setCustomerSelected}
            
            employees={employees}
            setEmployeeSelected={setEmployeeSelected}
            
            appointments={appointments}

            submitNewAppointment={submitNewAppointment}
      />
  );
}

export default App;


