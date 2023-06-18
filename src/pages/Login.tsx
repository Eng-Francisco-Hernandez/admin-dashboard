import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LOGIN_M } from "../lib";
import { useMutation } from "@apollo/client";

export default function Login() {
  let navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [login, { data, loading, error }] = useMutation(LOGIN_M, {
    onCompleted: (data) => {
      localStorage.setItem('accessToken', data.login.accessToken);
      localStorage.setItem('refreshToken', data.login.refreshToken);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    login({
      variables: formDataObj,
    });
  };

  return (
    <div className="auth-layout">
      <Card className="auth-form">
        <h2 className="title">Sign in</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputEmail">Email</Form.Label>
          <Form.Control
            required
            maxLength={60}
            name="email"
            type="email"
            id="inputEmail"
            className="mb-3"
          />
          <Form.Label htmlFor="inputPassword">Password</Form.Label>
          <Form.Control
            required
            maxLength={20}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            name="password"
            type="password"
            id="inputPassword"
            className="mb-3"
          />
          <div className="d-grid gap-2">
            <Button type="submit">Login</Button>
          </div>
        </Form>
        <p className="auth-already-done">
          Not registered yet ? <a href="/register">Register</a>
        </p>
      </Card>
    </div>
  );
}
