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
                routineRatioKeys={Object.keys(props.daysHighlight.routine_ratio)}
                routineRatioValues={Object.values(props.daysHighlight.routine_ratio)}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card bg="light">
            <Card.Title className="subheader">
              {props.userInfo.goals.length} skin health goals
            </Card.Title>
            <span>
              <Card.Img
                className="goals-img"
                src="/static/img/Acne.png"
              ></Card.Img>
              <Card.Img
                className="goals-img"
                src="/static/img/texture.png"
              ></Card.Img>
            </span>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}