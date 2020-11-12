// User Profile page

const Profile = (props) => {
  //goal 0: page should only be visible/visitable when user is logged in
  //goal 1: display basic user info -- photo, name, email, birthday
  //goal 2: display secondary info -- skin type(s), skin goals
      // both should be editable
  //goal 3: make info editable -- photo, name, password, skin type(s), skin goals

  const history = useHistory();
  const [userDetails, setUserDetails] = React.useState([]);
  const userId = localStorage.getItem("userState");

  React.useEffect(() => {
    $.get('/user-info.json', { uid: userId }, (res) => {
      setUserDetails(res)
    });
  }, [])
  

  if (!props.isLoggedIn) {
    
    // redirect user to login page
    history.push('/login') 
  }
  console.log(userDetails)
  return (
    userDetails.length > 0 && (
      <div className="user-profile">
        <div className="profile-photo">
          <img src={userDetails[0].photo}></img>
        </div>
        <div className="user-info-1">
          <h3>{userDetails[0].name}</h3>
          <p>{userDetails[0].email}</p>
        </div>
        <div className="user-info-2">
          <div>Skin Types</div>
          <ul className="skin-types">
            {userDetails[0].skin_types.map((skin_type) => (
              <li>{skin_type}</li>
            ))}
          </ul>
          <div>Skin Health Goals You are Working On:</div>
          <ul className="skin-goals">
            {userDetails[0].goals.map((goal) => (
              <li>{goal}</li>
            ))}
          </ul>
        </div>
        <a className="btn btn-primary" href="/editProfile" role="button">
          Edit Profile
        </a>
      </div>
    )
  );
}