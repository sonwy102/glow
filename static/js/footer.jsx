const Footer = () => {
  return (
    <Jumbotron className="footer-page">
      <Container>
        <Row>
          <Col lg={8} className="footer-left">
            <Image
              cloudName="sonwy102"
              publicId="logo/Glow_ijb8hu.svg"
              width="100em"
            ></Image>
          </Col>
          <Col>
            <Row className="footer-right">
              <Col className="center-text-align">
                <a href="https://facebook.com" class="fa fa-facebook"></a>
              </Col>
              <Col className="center-text-align">
                <a href="https://twitter.com" class="fa fa-twitter"></a>
              </Col>
              <Col className="center-text-align">
                <a href="https://instagram.com" class="fa fa-instagram"></a>
              </Col>
              <Col className="center-text-align">
                <a href="https://github.com/sonwy102" class="fa fa-github"></a>
              </Col>
              <Col className="center-text-align">
                <a
                  href="https://www.linkedin.com/in/wooyang-son/"
                  class="fa fa-linkedin"
                ></a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}