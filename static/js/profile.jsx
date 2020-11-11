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
  
  const userData = userDetails[0];
  console.log(userData);

//   if (!props.isLoggedIn) {
    
//     // redirect user to login page
//     history.push('/login')
//     // return <Login />    
//   } else {
    return (
      <div className="user-profile">
        <div className="profile-photo"></div>
        <div className="user-info-1">
          {userDetails.length > 0 && <h3>{userDetails[0].name}</h3>}
          {userDetails.length > 0 && <p>{userDetails[0].email}</p>}
        </div>
        <div className="user-info-2">
          <div>Skin Type</div>
          <ul className="skin-types">
            {userDetails.length > 0 && <li>{userDetails[0].skin_types}</li>}
          </ul>
          <div>Skin Health Goals</div>
          <ul className="skin-goals">
            {userDetails.length > 0 && <li>{userDetails[0].goals}</li>}
          </ul>
        </div>
        <button>Edit profile</button>
      </div>
    );

    
}