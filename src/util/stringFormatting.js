const formatPhoneNumber = (phoneNumberString) => {
    if (phoneNumberString.length === 10) {
        const area = phoneNumberString.slice(0, 3)
        const prefix = phoneNumberString.slice(3, 6)
        const suffix = phoneNumberString.slice(6)

        return `(${area}) ${prefix}-${suffix}`
    }
    else return phoneNumberString
}


const formatDateToString = (jsDateObject) => {
    return jsDateObject.toLocaleString('en-us', {
                                                    weekday: "short", 
                                                    day: "numeric", 
                                                    month: "short", 
                                                    hour:"numeric", 
                                                    minute:"numeric"
                                                });
}


const getEmployeeFromId = (id, employees) => {
    return employees.find(employee => employee.id === id).name;
};


const getCustomerFromId = (id, customers) => {
    const customer = customers.find(customer => customer.id === id)
    return `${customer.name} ${formatPhoneNumber(customer.phone)}`;
};


const formatErrors = (errors) => {
        
    let output = "";
    if (Array.isArray(errors)) {
        
        output = <ul className="errors errors-ul">
                    {errors.map( (error, i) => <li key={i}>{ error }</li> )}
                </ul>

    } else {
       output = <p id="errors">{errors.toString()}</p>; 
    }
    return output
}

export { formatDateToString, getEmployeeFromId, getCustomerFromId, formatErrors };