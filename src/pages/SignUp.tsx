import { useMutation } from "@apollo/client";
import { Button, Card, Form } from "react-bootstrap";
import { CREATE_USER_M } from "../lib";
import { Roles } from "../data/enums";

export default function SignUp() {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER_M);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    createUser({
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
        <h2 className="title">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputEmail">Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            id="inputEmail"
            className="mb-3"
          />
          <Form.Label htmlFor="inputRole">Role</Form.Label>
          <Form.Select id="inputRole" name="role" aria-label="Role select" className="mb-3">
            {Object.keys(Roles).map((role, i) => {
              return <option value={role}>{role}</option>;
            })}
          </Form.Select>
          <Form.Label htmlFor="inputPassword">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            id="inputPassword"
            aria-describedby="passwordHelpBlock"
            className="mb-3"
          />
          <Form.Label htmlFor="inputPasswordConfirm">
            Confirm password
          </Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            id="inputPasswordConfirm"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
          <div>
            <div className="d-grid gap-2">
              <Button className="mt-3" type="submit">
                Sign up
              </Button>
            </div>
          </div>
        </Form>
        <p className="auth-already-done">
          Already registered? <a href="/login">Sign in</a>
        </p>
      </Card>
    </div>
  );
}
