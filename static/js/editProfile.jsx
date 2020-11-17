// Component for edit-profile form
// // TODO: get existing user data passed in from profile.jsx or just load from db again?
// TODO: make post request onSubmit to update user record
// // TODO: Button rendering for goals
// // TODO: make it accessible for only logged in users

const EditProfile = (props) => {
  
  const history = useHistory();
  const [skinTypes, setSkinTypes] = React.useState([]);
  const [goals, setGoals] = React.useState([]);


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
        {skinTypes.map((skinType) => (
          skinType.isActive ? (
            <Button variant="primary selected">{skinType.name}</Button>) : (
            <Button variant="outline-primary unselected">{skinType.name}</Button>)
        ))}

      </div>

      <div className="skin-goals">
        <h3>Skin Health Goals You are Working On:</h3>
        {goals.map((goal) => (
          goal.isActive ? (
            <Button variant="primary selected">{goal.name}</Button>) : (
            <Button variant="outline-primary unselected">{goal.name}</Button>)
        ))}
      </div>

      <Button variant="primary" onClick={redirectToProfile}>
        Save
      </Button>
    </div>
  );
}