import "./NavBar.css";

const NavBar = (props) => {
    const setViewOnClick = (view) => {
        props.setView(view)
    }

    return (
        <div id="nav">
            <button className="logo" onClick={() => setViewOnClick("")}><h1 >Logo</h1></button>
            <div className="nav-buttons">
                <button className="btn" onClick={() => setViewOnClick("make-appointment")}>Make Appointment</button>
                <button className="btn" onClick={() => setViewOnClick("appointments")}>View Appointments</button>
                <button className="btn" onClick={() => setViewOnClick("login")}>Login</button>
            </div>
        </div>
    )
    };

export default NavBar;