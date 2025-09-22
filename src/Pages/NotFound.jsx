import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
    >
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card className="shadow text-center p-4">
            <Card.Body>
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="mb-3">Oops! Page Not Found</h2>
              <p className="text-muted mb-4">
                The page you’re looking for doesn’t exist or may have been
                moved.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to={"/"}>Go Home</Link>

                {/* <Button
                  variant="outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button> */}
              </div>
              <small className="text-muted d-block mt-4">
                Tip: Check the URL or return to the homepage.
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
