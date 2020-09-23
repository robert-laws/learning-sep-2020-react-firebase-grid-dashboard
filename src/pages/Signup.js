import React from 'react';
import { Button, Divider, Card, Form } from 'semantic-ui-react';

export const Signup = () => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Signup</Card.Header>
        <Divider />
        <Card.Description>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input label='First Name' type='text' />
              <Form.Input label='Last Name' type='text' />
            </Form.Group>
            <Form.Input label='Email' type='email' />
            <Form.Input label='Password' type='password' />
            <Button content='Signup' primary />
          </Form>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
