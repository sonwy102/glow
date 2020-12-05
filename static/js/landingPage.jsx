const LandingPage = () => {
  
  return (
    <Container fluid>
      <Row className="landing-page">
        <Col className="background">
          <img
            className="background"
            width="100%"
            srcset="https://res.cloudinary.com/sonwy102/image/upload/f_auto/v1606939001/glowImg/skin-small_p5mx9r.png 256w, 
                    https://res.cloudinary.com/sonwy102/image/upload/f_auto/v1606939001/glowImg/skin-medium_elynjh.png 512w, 
                    https://res.cloudinary.com/sonwy102/image/upload/f_auto/v1606939007/glowImg/skin-large_z146gw.png 1081w"
            src="https://res.cloudinary.com/sonwy102/image/upload/v1606939007/glowImg/skin-medium_elynjh.png"
          ></img>
          <p>
            <span>
              <div className="header">
                Start Your Journey towards Healthier Skin Today.
              </div>
              <p>
                Say hello to Glow, a personalized goal and routine tracker to
                truly understand your skin from within.
              </p>
              <Button href="/register" variant="flat-important" size="lg">
                Sign Up
              </Button>
              <Button href="/login" variant="flat-important" size="lg">
                Log In
              </Button>
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}