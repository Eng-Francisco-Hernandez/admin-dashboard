import { useMutation } from "@apollo/client";
import { Button, Card, Form } from "react-bootstrap";
import { REGISTER_M } from "../lib";
import { Role } from "../data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [register, { data, loading, error }] = useMutation(REGISTER_M, {
    onCompleted: (data) => {
      navigate("/login");
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
    if (formDataObj.password !== formDataObj.confirmPassword) return;
    register({
      variables: {
        email: formDataObj.email,
        role: formDataObj.role,
        password: formDataObj.password,
      },
    });
  };

  return (
    <div className="auth-layout">
      <Card className="auth-form">
        <h2 className="title">Register</h2>
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
          <Form.Label htmlFor="inputRole">Role</Form.Label>
          <Form.Select
            id="inputRole"
            name="role"
            aria-label="Role select"
            className="mb-3"
          >
            {Object.keys(Role).map((role, i) => {
              return (
                <option key={i} value={role}>
                  {role}
                </option>
              );
            })}
          </Form.Select>
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
          <Form.Label htmlFor="inputPasswordConfirm">
            Confirm password
          </Form.Label>
          <Form.Control
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            maxLength={20}
            name="confirmPassword"
            type="password"
            aria-describedby="passwordHelpBlock"
            id="inputPasswordConfirm"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain lower and upper
            case letters and numbers, and must not contain spaces, special
            characters, or emoji.
          </Form.Text>
          <div className="d-grid gap-2">
            <Button className="mt-3" type="submit">
              Register
            </Button>
          </div>
        </Form>
        <p className="auth-already-done">
          Already registered? <a href="/login">Sign in</a>
        </p>
      </Card>
    </div>
  );
}
