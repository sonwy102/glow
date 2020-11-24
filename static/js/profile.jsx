// User Profile page

const Profile = (props) => {
  // // TODO: page should only be visible/visitable when user is logged in
  // // TODO: display basic user info -- photo, name, email, birthday
  // // TODO: display secondary info -- skin type(s), skin goals
  // // TODO: both should be editable
  // // TODO: make info editable -- photo, name, password, skin type(s), skin goals

  const history = useHistory();
  
  console.log("user data fetched: ", props.isLoggedIn, props.userInfo);
  console.log("isLoggedIn", props.isLoggedIn);

  const fetchUserData = async () => {
    fetch(`/user-info.json/${props.isLoggedIn}`)
      .then((response) => response.json())
      .then((data) => {
        const newUserDetails = {
          name: data.name,
          email: data.email,
          photo: data.photo,
          skinTypes: data.skin_types,
          goals: data.goals,
        };
        props.setUserInfo(newUserDetails);
      });
  };

  // TODO: fix profile page not fetching user data after redirect from editProfile. what second arg to use?
  React.useEffect(() => {
    fetchUserData();
  }, []);

  const redirectToRoutine = () => {
    history.push(`/routine`);
  };

  const redirectToEditProfile = () => {
    history.push(`/editprofile?user=${props.isLoggedIn}`);
  };

  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }

  return (
    <div className="user-profile-section">
      <div className="profile-photo">
        <img src={props.userInfo.photo}></img>
      </div>
      <div className="user-info-1">
        <h3>{props.userInfo.name}</h3>
        <p>{props.userInfo.email}</p>
      </div>
      <div className="user-info-2">
        <div>Skin Types</div>
        <ul className="skin-types">
          {props.userInfo.skinTypes.map((skinType) => (
            <li>{skinType.name}</li>
          ))}
        </ul>
        <div>Skin Health Goals You are Working On:</div>
        <ul className="skin-goals">
          {props.userInfo.goals.map((goal) => (
            <li>{goal.name}</li>
          ))}
        </ul>
      </div>
      <Button variant="outline-primary" onClick={redirectToEditProfile}>
        Edit Profile
      </Button>
      <Button variant="primary" onClick={redirectToRoutine}>
        Add Routine
      </Button>
    </div>
  );
}