import "./Appointments.css";

const Appointments = ({loading,  appointments, deleteAppointmentById}) => {

    const deleteButton = (appointmentId) => {
        return <button className="appointment-btn" onClick={() => deleteAppointmentById(appointmentId)}>Cancel</button>
    }
 
    if (appointments && loading === false) {
        return (
            <div className="appointments-container">
              <h2 className="header">Appointments</h2>
              <ul className="appointments-list">
                  {appointments.map((appointment, i) => {
                      return <li key={i}>{deleteButton(appointment.id)}{appointment.startTime} with {appointment.otherPerson}</li> 
                  })}
              </ul>
            </div>
          );
    }
    else {
        return <div>Loading...</div>;
    }
    
  }

export default Appointments;