// User Profile page

const Profile = (props) => {
  // // TODO: page should only be visible/visitable when user is logged in
  // // TODO: display basic user info -- photo, name, email, birthday
  // // TODO: display secondary info -- skin type(s), skin goals
  // // TODO: both should be editable
  // // TODO: make info editable -- photo, name, password, skin type(s), skin goals

  const history = useHistory();
  // const [ensureFetch, setEnsureFetch] = React.useState(false);

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
    props.profileView(true);
  };

  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }

  // if (props.userInfo && ensureFetch) {
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
            <div className="skin-type-info subsection-vertical">
              <div className="subheader center-text-align">My Skin Types</div>
              <div className="skin-types center-text-align adjacent-buttons">
                {props.userInfo.skinTypes.map((skinType) => (
                  <Button
                    className="extra-margin-medium square-corner"
                    variant="flat-important"
                  >
                    {skinType.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="skin-goals-info subsection-vertical">
              <div className="subheader center-text-align">My Skin Goals</div>
              <div className="skin-goals center-text-align adjacent-buttons">
                {props.userInfo.goals.map((goal) => (
                  <Button
                    className="extra-margin-medium square-corner"
                    variant="flat-important"
                  >
                    {goal.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="adjacent-buttons">
            <Button
              className="extra-margin-small"
              variant="flat"
              onClick={redirectToEditProfile}
            >
              Edit Profile
            </Button>
            <Button
              className="extra-margin-small"
              variant="flat"
              onClick={redirectToRoutine}
            >
              Add Routine
            </Button>
          </div>
        </div>
      </div>
    );
}