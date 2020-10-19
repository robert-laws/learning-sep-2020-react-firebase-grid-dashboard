import React, { useContext, useEffect } from 'react';
import UserContext from '../context/user/userContext';
import UsersContext from '../context/users/usersContext';
import { Row, Col, Table } from 'react-bootstrap';

export const Users = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const userId = user;

  const usersContext = useContext(UsersContext);
  const { users, getAllUsers } = usersContext;

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const checkForEmptyData = (data) => {
    if (data === '') {
      return 'No Data';
    } else {
      return data;
    }
  };

  return (
    <Row>
      <Col>
        <h3>All Users</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Phone</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                if (user.id !== userId) {
                  return (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td>{checkForEmptyData(user.specialty)}</td>
                      <td>{checkForEmptyData(user.phone)}</td>
                      <td>{checkForEmptyData(user.ip)}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
