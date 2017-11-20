import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import {
  Row,
  Col,
  Well,
} from 'react-bootstrap';
import { gql, graphql } from 'react-apollo'
import { withLoadingComponent } from '../shared/Loading';
import './Users.css';

const queryUser = gql`
query QueryUser($searchText: String) {
  users (searchText: $searchText) {
    id,
    name,
    surname,
    location
  }
}`;

const Users = ({
  users,
  searchText
}) => (
  <div>
    <Row>
      <Col lg={4}>
        {
          users &&
          `${users.length} result${users.length > 1 ? 's': ''} found`
        }
      </Col>
    </Row>
    <br />
    <Row>
      {
        users &&
        users.map((user) => (
          <Col lg={4} key={user.id}>
            <Well>
              <h4>
                { `${user.name} ${user.surname}` }
              </h4>
              <div>
                <i className="fa fa-fw fa-map-marker Marker" />
                { user.location }
              </div>
            </Well>
          </Col>
        ))
      }
    </Row>
  </div>
)

Users.propTypes = {
  users: PropTypes.array,
  searchText: PropTypes.string,
}

export default compose(
  graphql(queryUser, {
    options: ({ searchText }) => {
      return ({
        variables:{
          searchText,
        },
      });
    }
  }),
  withLoadingComponent,
  withProps(({ data, searchText, users }) => data.loading ? { users: [] } : { users: data.users || [] }),
)(Users);
