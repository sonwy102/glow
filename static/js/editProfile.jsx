// Component for edit-profile form
const EditProfile = (props) => {
  
  const userSessionId = props.isLoggedIn;
  const redirectToProfile = (sess_id) => {
    history.push(`/profile?user=${sess_id}`);
  };

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