/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

function ContextualExample(props) {
  return (
    <>
      <Row className="toastMessage">
        <Col>
          <Toast
            className="d-inline-block m-1"
            onClose={() =>
              props.setToast({ show: false, variant: "", message: "" })
            }
            show={props.toast.show}
            delay={3000}
            bg={props.toast.variant}
            autohide
          >
            <Toast.Body
              className={props.toast.variant === "Dark" && "text-white"}
            >
              {props.toast.message}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </>
  );
}

export default ContextualExample;
