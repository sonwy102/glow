// User Profile page

const Profile = (props) => {
  // // TODO: page should only be visible/visitable when user is logged in
  // // TODO: display basic user info -- photo, name, email, birthday
  // // TODO: display secondary info -- skin type(s), skin goals
  // // TODO: both should be editable
  //TODO: make info editable -- photo, name, password, skin type(s), skin goals

  const history = useHistory();
  const [userDetails, setUserDetails] = React.useState(
    {
      name: '',
      email: '',
      photo: '',
      skinTypes: [],
      goals: []
    }
  );
  
  console.log("user data fetched: ", props.isLoggedIn, userDetails);

  console.log("isLoggedIn", props.isLoggedIn);

  const fetchUserData = async () => {
    console.log("fetching user data INSIDE...", props.isLoggedIn);
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
        setUserDetails(newUserDetails);
      });
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  

  // React.useEffect(() => {
  //   console.log('running useEffect')

  //   console.log('fetching user data...')
  //   // $.get('/user-info.json', { uid: props.isLoggedIn }, (res) => {
  //   //   setUserDetails(res)
  //   // });
  // });

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
  console.log(userDetails);
  return (
    <div className="user-profile-page">
      <div className="profile-photo">
        <img src={userDetails.photo}></img>
      </div>
      <div className="user-info-1">
        <h3>{userDetails.name}</h3>
        <p>{userDetails.email}</p>
      </div>
      <div className="user-info-2">
        <div>Skin Types</div>
        <ul className="skin-types">
          {userDetails.skinTypes.map((skinType) => (
            <li>{skinType}</li>
          ))}
        </ul>
        <div>Skin Health Goals You are Working On:</div>
        <ul className="skin-goals">
          {userDetails.goals.map((goal) => (
            <li>{goal}</li>
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