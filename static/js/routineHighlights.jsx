const RoutineHighlights = (props) => {
  return (
    <Container fluid className="highlights section">
      <Row className="highlights">
        <Col lg={6}>
          <Card bg="light">
            <Card.Title className="subheader">
              {props.daysHighlight.routine_count} days of skincare
            </Card.Title>
            <Card.Body>
              <RoutineRatioChart
                routineRatioKeys={Object.keys(
                  props.daysHighlight.routine_ratio
                )}
                routineRatioValues={Object.values(
                  props.daysHighlight.routine_ratio
                )}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card bg="light">
            <Card.Title className="subheader">
              {props.userInfo.goals.length} skin health goals
            </Card.Title>
            <Row>
              <Col>
                <div className="goal-col">
                  <Card.Img
                    className="goals-img"
                    src="/static/img/Acne.png"
                  ></Card.Img>
                  <div className="label center-text-align">ACNE</div>
                </div>
              </Col>
              
              <Col>
                <div className="goal-col">
                  <Card.Img
                    className="goals-img"
                    src="/static/img/texture.png"
                  ></Card.Img>
                  <div className="label center-text-align">TEXTURE</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}