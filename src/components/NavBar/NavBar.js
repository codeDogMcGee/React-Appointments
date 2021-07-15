import "./NavBar.css";

const NavBar = ({ loggedInUser, setView, logoutUser}) => {

    const userIsAuthenticated = loggedInUser && sessionStorage.getItem("ApiToken") ? true : false;

    const setViewOnClick = (view) => {
        setView(view)
    }

    const buttonClick = (e) => {
        const buttonName = e.target.name;
        if (buttonName === "logout") logoutUser();
        else setViewOnClick(buttonName);
    }

    const authenticatedUserButtons = () => {
        if (loggedInUser && loggedInUser.group === "Employees") {
            return [
                    {name: 'appointments', text: "View Appointments"},
                    {name: 'logout', text: "Logout"}
                ]
        }  else {
            return [
                {name: 'make-appointment', text: "Make Appointment"},
                {name: 'appointments', text: "View Appointments"},
                {name: 'logout', text: "Logout"}
            ]
        }
    }

    const userButtons = userIsAuthenticated ? authenticatedUserButtons() : [];
    
    const userName = userIsAuthenticated ? <div id="user-greeting"> Hi, {loggedInUser.name} :)</div> : <span />;
    
    return (
        <div id="nav">
            <button className="logo" onClick={() => setViewOnClick("")}><h1 >Logo</h1></button>
            <div className="nav-buttons">
                { userName }
                
                {userButtons.map( (button, i) => <button key={i} name={button.name} onClick={buttonClick}>{button.text}</button>)}

            </div>
        </div>
    )
};

export default NavBar;