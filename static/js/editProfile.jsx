// Component for edit-profile form
// // TODO: get existing user data passed in from profile.jsx or just load from db again?
// // TODO: make post request onSubmit to update user record
// // TODO: Button rendering for goals
// // TODO: make it accessible for only logged in users

const EditProfile = (props) => {
  
  const history = useHistory();
  const [skinTypes, setSkinTypes] = React.useState([]);
  const [goals, setGoals] = React.useState([]);

  console.log('user info from props: ', props.userInfo )

  const redirectToDashboard = (sess_id) => {
    history.push(`/dashboard?user=${sess_id}`);
  };

  const fetchAllSkinTypes = async () => {
    fetch(`/user-skin-types.json/${props.isLoggedIn}`)
    .then((response) => response.json())
    .then((data) => {
      const newSkinTypes = [];
      for (const skinType of data) {
        newSkinTypes.push(skinType);
      }
      setSkinTypes(newSkinTypes);    
    });
  }


  const fetchAllGoals = async () => {
    fetch(`/user-goals.json/${props.isLoggedIn}`)
    .then((response) => response.json())
    .then((data) => {
      const newGoals = [];
      for (const goal of data) {
        newGoals.push(goal);
      }
      setGoals(newGoals);
    });
  }

  React.useEffect(() => {
    fetchAllSkinTypes();
    fetchAllGoals();
  }, []);

  console.log('skin types in user info: ', props.userInfo.skinTypes)
  // console.log('active goals: ', activeGoals)
  console.log('goals in user info: ', props.userInfo.goals)

  const handleSkinTypeBtnChange = (val) => {
    const skinTypesId = props.userInfo.skinTypes.map((function(el) {return el.id}));
    if (val in skinTypesId) {
      skinTypesId.pop(val);
      const newActiveSkinTypes = skinTypes.filter((st) => skinTypesId.includes(st.id));
      props.setUserInfo((prevState) => ({...prevState, skinTypes: newActiveSkinTypes}));
    } else {
      const newActiveSkinTypes = skinTypes.filter((st) => val.includes(st.id));
      props.setUserInfo((prevState) => ({...prevState, skinTypes: newActiveSkinTypes}));
    }
  };

  const handleGoalBtnChange = (val) => {
    const goalsId = props.userInfo.goals.map((function(el) {return el.id}));
    if (val in goalsId) {
      goalsId.pop(val);
      const newActiveGoals = goals.filter((goal) => goalsId.includes(goal.id));
      props.setUserInfo((prevState) => ({...prevState, goals: newActiveGoals}));
    } else {
      const newActiveGoals = goals.filter((goal) => val.includes(goal.id));
      props.setUserInfo((prevState) => ({...prevState, goals: newActiveGoals}));
    }
  };

  const postNewProfile = async () => {
    fetch(`/update-user-profile.json/${props.isLoggedIn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props.userInfo)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.msg);
    })
    props.profileView(false);
    redirectToDashboard(props.isLoggedIn);
  }

  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <div className="edit-profile-column">
      <div className="formBasicUserInfo">
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
        </div>
      </div>

      <div className="user-info-2">
        <div className="skin-types subsection">
          <div className="subheader">My Skin Types:</div>
          <ToggleButtonGroup
            className="toggle-group"
            type="checkbox"
            value={props.userInfo.skinTypes.map(function (el) {
              return el.id;
            })}
            onChange={handleSkinTypeBtnChange}
          >
            {skinTypes.map((skinType) => (
              <ToggleButton
                className="extra-margin-small square-corner"
                variant="flat"
                value={skinType.id}
              >
                {skinType.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <div className="skin-goals subsection">
          <div className="subheader">My Skin Goals:</div>
          <ToggleButtonGroup
            className="toggle-group"
            type="checkbox"
            value={props.userInfo.goals.map(function (el) {
              return el.id;
            })}
            onChange={handleGoalBtnChange}
          >
            {goals.map((goal) => (
              <ToggleButton
                className="extra-margin-small square-corner"
                variant="flat"
                value={goal.id}
              >
                {goal.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </div>

      <div className="subsection">
        <Button variant="flat-important" onClick={postNewProfile}>
          Save
        </Button>
      </div>
    </div>
  );
}