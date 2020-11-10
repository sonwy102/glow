// User Profile page

const Profile = (props) => {
  //goal 0: page should only be visible/visitable when user is logged in
  //goal 1: display basic user info -- photo, name, email, birthday
  //goal 2: display secondary info -- skin type(s), skin goals
      // both should be editable
  //goal 3: make info editable -- photo, name, password, skin type(s), skin goals

  const history = useHistory();
    
//   if (!props.isLoggedIn) {
    
//     // redirect user to login page
//     history.push('/login')
//     // return <Login />    
//   } else {
    return (
      <div className="user-profile">
        <div className="profile-photo"></div>
        <div className="user-info-1">
          <h3>Name</h3>
          <p>Email address</p>
        </div>
        <div className="user-info-2">
          <ul className="skin-types">
            <li>skintype</li>
            <li>skintype</li>
          </ul>
          <ul className="skin-goals">
            <li>goal 1</li>
            <li>goal 2</li>
          </ul>
        </div>
        <button>Edit profile</button>
      </div>
    );

    
}