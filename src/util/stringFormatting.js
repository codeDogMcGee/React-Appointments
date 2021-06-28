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
    console.log(id)
    console.log(employees)
    return employees.find(employee => employee.id === id).name;
};


const getCustomerFromId = (id, customers) => {
    const customer = customers.find(customer => customer.id === id)
    return `${customer.name} ${formatPhoneNumber(customer.phone)}`;
};

export { formatDateToString, getEmployeeFromId, getCustomerFromId };