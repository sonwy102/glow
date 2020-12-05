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
    <div className="user-profile-column">
      <div className="profile-photo">
        {/* <img src={props.userInfo.photo}></img> */}
        {/* <img src='/static/img/user/profile_photo.jpg'></img> */}
        <Image
          cloudName="sonwy102"
          publicId="glowImg/pexels-daria-shevtsova-3673757_etinuw.jpg"
        >
          <Transformation height="300" radius="max" width="300" crop="fill" />
        </Image>
      </div>
      <div className="user-info">
        <div className="user-info-1 center-text-align">
          <div className="subheader-lg">{props.userInfo.name}</div>
          <p>{props.userInfo.email}</p>
        </div>
        <div className="user-info-2">
          <div className="subheader">My Skin Types:</div>
          <ul className="skin-types">
            {props.userInfo.skinTypes.map((skinType) => (
              <li>{skinType.name}</li>
            ))}
          </ul>
          <div className="subheader">My Skin Goals:</div>
          <ul className="skin-goals">
            {props.userInfo.goals.map((goal) => (
              <li>{goal.name}</li>
            ))}
          </ul>
        </div>
        <div className="adjacent-buttons">
          <Button variant="flat" onClick={redirectToEditProfile}>
            Edit Profile
          </Button>
          <Button variant="flat" onClick={redirectToRoutine}>
            Add Routine
          </Button>
        </div>
      </div>
    </div>
  );
}