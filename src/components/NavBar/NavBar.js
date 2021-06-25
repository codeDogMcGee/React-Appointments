import "./NavBar.css";

const NavBar = (props) => {
    const viewCustomersButtonClick = (e) => {
        props.setView("customers");
    };

    const viewHomeButtonClick = (e) => {
        props.setView("");
    };

    const viewMakeAppointmentButtonClick = (e) => {
        props.setView("make-appointment");
    };

    return (
        <div className="nav">
            <button className="logo" onClick={viewHomeButtonClick}><h1 >Logo</h1></button>
            <div className="nav-buttons">
                <button onClick={viewCustomersButtonClick}>View Customers</button>
                <button onClick={viewMakeAppointmentButtonClick}>Make Appointment</button>
            </div>
        </div>
    )
    };

export default NavBar;