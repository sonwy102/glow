// Logout Component to handle log out functionality

const LogOutBtn = (props) => {
    
    const history = useHistory();

    const handleLogout = () => {
      localStorage.removeItem("userState");
      props.ensureLogIn(null);
      history.push("/login");
    };

    return (
      <button className="btn btn-primary" onClick={handleLogout}>
        Sign Out
      </button>
    );

}