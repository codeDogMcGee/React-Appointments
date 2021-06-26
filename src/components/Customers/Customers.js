import { formatPhoneNumber } from "../../util/stringFormatting";
import "./Customers.css";

const Customers = ({loading, customers}) => {

    

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="customer-container">
              <h2 className="header">Customers</h2>
              <ul>
                  {customers.map((customer, i) => {
                      return <li key={i}>{customer.name} {formatPhoneNumber(customer.phone)}</li> 
                  })}
              </ul>
            </div>
          );
    }
    
  }

export default Customers;