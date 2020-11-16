const LogInBtn = (props) => {
  const history = useHistory();

  const redirectToLogIn = () => {
    history.push("/login");
  };

  return (
    <Button variant="outline-primary" onClick={redirectToLogIn}>
      Sign In
    </Button>
  );
};
