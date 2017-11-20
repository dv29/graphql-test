import React from 'react';
import { compose, withState } from 'recompose';
import {
  Row,
  Col,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

import Users from '../users/Users';

const Search = ({
  setSearchText,
  searchText
}) => (
  <div>
    <Row>
      <Col lg={4} lgOffset={2}>
        <h3>
          Search
        </h3>
      </Col>
    </Row>

    <Row>
      <Col lg={6} lgOffset={2}>
        <form>
          <FormGroup controlId="search">
            <FormControl
              id="search"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </FormGroup>
        </form>
      </Col>
    </Row>

    <Row>
      <Col lg={8} lgOffset={2}>
        <Users
          searchText={searchText}
        />
      </Col>
    </Row>

  </div>
)

export default compose(
  withState('searchText', 'setSearchText', '')
)(Search);
