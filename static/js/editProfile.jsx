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
    <div className="edit-user-profile-page">
      <Form>
        <div className="profile-photo">
          {/* <img src={userDetails[0].photo}></img> */}
          Profile photo
        </div>
        <div className="user-info-1">
          <h3>Name</h3>
          {/* <h3>{userDetails[0].name}</h3> */}
          <p>Email</p>
          {/* <p>{userDetails[0].email}</p> */}
        </div>
        <div className="user-info-2">
          <h3>Skin Types</h3>
          <Select
            className="js-basic-multiple"
            name="skinTypes"
            isMulti
            options={}
            onChange={handleProductChange}
          ></Select>
          <div className="goal-btns">
            <h3>Skin Health Goals You are Working On:</h3>
            <Button variant="outline-primary goal_unselected">Goal 1</Button>
            <Button variant="outline-primary goal_unselected">Goal 2</Button>
          </div>
        </div>
        <Button variant="primary" onClick={redirectToProfile}>
          Save
        </Button>
      </Form>
    </div>
  );
};