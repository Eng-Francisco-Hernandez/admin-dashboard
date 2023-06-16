import React from "react";
import { Button, Card, Form } from "react-bootstrap";

export default function Login() {
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    console.log(form);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="auth-layout">
      <Card className="auth-form">
        <h2 className="title">Sign in</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputEmail">Email</Form.Label>
          <Form.Control type="email" id="inputEmail" className="mb-3" />
          <Form.Label htmlFor="inputPassword">Password</Form.Label>
          <Form.Control type="password" id="inputPassword" className="mb-3" />
          <div className="d-grid gap-2">
            <Button type="submit">Login</Button>
          </div>
        </Form>
        <p className="auth-already-done">
          Not registered yet ? <a href="/signup">Sign up</a>
        </p>
      </Card>
    </div>
  );
}
