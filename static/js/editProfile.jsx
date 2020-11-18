// Component for edit-profile form
// // TODO: get existing user data passed in from profile.jsx or just load from db again?
// TODO: make post request onSubmit to update user record
// // TODO: Button rendering for goals
// // TODO: make it accessible for only logged in users

const EditProfile = (props) => {
  
  const history = useHistory();
  const [skinTypes, setSkinTypes] = React.useState([]);
  const [goals, setGoals] = React.useState([]);
  // const [activeGoals, setActiveGoals] = React.useState([]);

  console.log('user info from props: ', props.userInfo )
  const redirectToProfile = (sess_id) => {
    history.push(`/profile?user=${sess_id}`);
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
      // const newActiveGoals = [];
      for (const goal of data) {
        newGoals.push(goal);
        // if (goal.isActive) {
        //   newActiveGoals.push(goal.id);
        // }
      }
      setGoals(newGoals);
      // setActiveGoals(newActiveGoals);
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
    fetch(`/update-user-profile.json${props.isLoggedIn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props.userInfo)
    })
    .then((response) => response.json())
    .then((data) => {

    })
  }

  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <div className="edit-profile-page">
      <div className="formBasicUserInfo">
        <h3>{props.userInfo.name}</h3>
        <div>{props.userInfo.email}</div>
      </div>

      <div className="skin-types">
        <h3>Skin Types</h3>
        <ToggleButtonGroup
          type="checkbox"
          value={props.userInfo.skinTypes.map(function (el) {return el.id})}
          onChange={handleSkinTypeBtnChange}
        >
          {skinTypes.map((skinType) =>
              <ToggleButton variant="outline-primary" value={skinType.id}>
                {skinType.name}
              </ToggleButton>
          )}
        </ToggleButtonGroup>
      </div>

      <div className="skin-goals">
        <h3>Skin Health Goals You are Working On:</h3>
        <ToggleButtonGroup
          type="checkbox"
          value={props.userInfo.goals.map(function (el) {return el.id})}
          onChange={handleGoalBtnChange}
        >
          {goals.map((goal) =>
            <ToggleButton variant="outline-primary" value={goal.id}>
              {goal.name}
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </div>

      <Button variant="primary" onClick={redirectToProfile}>
        Save
      </Button>
    </div>
  );
}