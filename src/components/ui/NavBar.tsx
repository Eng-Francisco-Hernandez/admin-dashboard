import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGOUT_M } from "../../lib";

export default function NavBar() {
  let navigate = useNavigate();

  const [logout, { data, loading, error }] = useMutation(LOGOUT_M, {
    onCompleted: (data) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>Welcome</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Link</Nav.Link>
            <Nav.Link disabled>Link</Nav.Link>
            <NavDropdown title="Change role" id="navbarScrollingDropdown">
              <NavDropdown.Item>Viewer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Editor</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button
            variant="dark"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
