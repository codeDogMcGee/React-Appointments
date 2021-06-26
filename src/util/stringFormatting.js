const formatPhoneNumber = (phoneNumberString) => {
    if (phoneNumberString.length === 10) {
        const area = phoneNumberString.slice(0, 3)
        const prefix = phoneNumberString.slice(3, 6)
        const suffix = phoneNumberString.slice(6)

        return `(${area}) ${prefix}-${suffix}`
    }
    else return phoneNumberString
}

export { formatPhoneNumber };