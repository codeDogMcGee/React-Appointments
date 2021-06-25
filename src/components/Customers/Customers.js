import "./Customers.css";

const Customers = ({loading, customers}) => {

    const formatPhoneNumber = (phoneNumberString) => {
        if (phoneNumberString.length === 10) {
            const area = phoneNumberString.slice(0, 3)
            const prefix = phoneNumberString.slice(3, 6)
            const suffix = phoneNumberString.slice(6)

            return `(${area}) ${prefix}-${suffix}`
        }
        else return phoneNumberString
    }

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