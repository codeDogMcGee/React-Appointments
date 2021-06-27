import "./NavBar.css";

const NavBar = ({ loggedInUser, setView, logoutUser}) => {

    const userIsAuthenticated = loggedInUser && sessionStorage.getItem("ApiToken") ? true : false;

    const setViewOnClick = (view) => {
        setView(view)
    }

    const buttonClick = (e) => {
        console.log()
        const buttonName = e.target.name;
        if (buttonName === "logout") logoutUser();
        else setViewOnClick(buttonName);
    }

    const authenticatedUserButtons = [
        {name: 'make-appointment', text: "Make Appointment"},
        {name: 'appointments', text: "View Appointments"},
        {name: 'logout', text: "Logout"}
    ];

    const unauthenticatedUserButtons = [
        {name: "login", text: "Login"}
    ];

    const userButtons = userIsAuthenticated ? authenticatedUserButtons : unauthenticatedUserButtons;
    
    const userName = userIsAuthenticated ? <span>{loggedInUser}</span> : <span />;
    
    return (
        <div id="nav">
            <button className="logo" onClick={() => setViewOnClick("")}><h1 >Logo</h1></button>
            <div className="nav-buttons">
                { userName }
                
                {userButtons.map( (button, i) => <button key={i} name={button.name} className="btn" onClick={buttonClick}>{button.text}</button>)}

            </div>
        </div>
    )
};

export default NavBar;