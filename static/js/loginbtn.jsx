const LogInBtn = (props) => {
  const history = useHistory();

  const redirectToLogIn = () => {
    history.push("/login");
  };

  return (
    <Button variant="flat-dark important" onClick={redirectToLogIn}>
      Sign In
    </Button>
  );
};
