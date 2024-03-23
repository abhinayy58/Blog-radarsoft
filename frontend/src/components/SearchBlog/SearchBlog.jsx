/* eslint-disable react/prop-types */
import { Col, Form, InputGroup, Row } from "react-bootstrap";

const SearchBlog = (props) => {
  return (
    <div className="searchBox">
      <Row spacing={2}>
        <Col sm={10}>
          <InputGroup className="mb-3">
            <Form.Control
              className="p-2"
              type="text"
              placeholder="Search Blog..."
              aria-label="Amount (to the nearest dollar)"
              value={props?.searchInput}
              onChange={props.onSearchSave}
            />
          </InputGroup>
        </Col>
        <Col sm={2}>
          <Form.Select
            className="buttonBlog"
            aria-label="Default select example"
            value={props?.sortInputs}
            onChange={props.onSortInput}
          >
            <option>Sort Blog</option>
            <option value="latest">Sort by date(latest)</option>
            <option value="oldest">Sort by date(oldest)</option>
            <option value="title">Sort by title</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBlog;
