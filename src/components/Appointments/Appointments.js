import { formatPhoneNumber } from "../../util/stringFormatting";
import "./Appointments.css";

const Appointments = ({loading,  appointments, employees, customers}) => {

    const getEmployee = (id) => {
        return employees.find(employee => employee.id === id).name;
    };

    const getCustomer = (id) => {
        const customer = customers.find(customer => customer.id === id)
        return `${customer.name} ${formatPhoneNumber(customer.phone)}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="customer-container">
              <h2 className="header">Appointments</h2>
              <ul>
                  {appointments.map((appointment, i) => {
                      return <li key={i}>{appointment.start_time.replace('T', ' ')}  |  {getEmployee(appointment.employee)}  |  {getCustomer(appointment.customer)}</li> 
                  })}
              </ul>
            </div>
          );
    }
    
  }

export default Appointments;