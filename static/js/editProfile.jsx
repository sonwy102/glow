// Component for edit-profile form
// TODO: get existing user data passed in from profile.jsx or just load from db again?
// TODO: make post request onSubmit to update user record
// TODO: Button rendering for goals
// TODO: update profile.jsx to match the form format (skintype, goals)
// // TODO: make it accessible for only logged in users

const EditProfile = (props) => {
  
  const redirectToProfile = (sess_id) => {
    history.push(`/profile?user=${sess_id}`);
  };

  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <div className="edit-profile-page">
      <div className="formBasicUserInfo">
        <h3>Name</h3>
        <div>Email</div>
      </div>

      <div className="skin-types">
        <h3>Skin Types</h3>
        <Button>Oily</Button>
      </div>

      <div className="skin-goals">
        <h3>Skin Health Goals You are Working On:</h3>
        <Button variant="outline-primary goal_unselected">Goal 1</Button>
        <Button variant="outline-primary goal_unselected">Goal 2</Button>
      </div>

      <Button variant="primary" onClick={redirectToProfile}>
        Save
      </Button>
    </div>
  );
}