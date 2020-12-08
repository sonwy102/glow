const LandingPage = () => {
  
  return (
    <Jumbotron className="landing-page">
      <div className="header text-light subsection no-bottom-padding">
        Start Your Journey towards Healthier Skin Today.
      </div>
      <div className="subheader text-light subsection no-top-padding">
        Say hello to Glow, a personalized goal and routine tracker for
        understanding your skin from within.
      </div>

      <div className="subsection">
        <Button href="/register" variant="flat-light" size="lg">
          Find My Glow
        </Button>
      </div>
    </Jumbotron>
  );
}