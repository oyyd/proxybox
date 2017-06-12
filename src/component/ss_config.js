import React from 'react'
import { Button, Divider, Form } from 'semantic-ui-react'
import hello from './hello'

const FormExampleSize = () => (
  <Form size="mini" key="mini">
    <Form.Group widths="equal">
      <Form.Field label="First name" control="input" placeholder="First name" />
      <Form.Field label="Last name" control="input" placeholder="Last name" />
    </Form.Group>
    <Button type="submit">{hello}</Button>
    <Divider hidden />
  </Form>
)

export default FormExampleSize
