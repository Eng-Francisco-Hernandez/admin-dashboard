import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGOUT_M, UPDATE_SELF_ROLE_M } from "../../lib";
import PermissionsGate from "../auth/PermissionsGate";
import { Role, SCOPES } from "../../data";

export default function NavBar() {
  let navigate = useNavigate();

  const [logout] = useMutation(LOGOUT_M, {
    onCompleted: (data) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [updateSelfRole] = useMutation(UPDATE_SELF_ROLE_M, {
    onCompleted: (data) => {
      window.location.reload();
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
            <Nav.Link>Home</Nav.Link>
            <PermissionsGate scopes={[SCOPES.canCreate]}>
              <Nav.Link>Edit</Nav.Link>
            </PermissionsGate>
            <Nav.Link>View data</Nav.Link>
            <NavDropdown title="Change role" id="navbarScrollingDropdown">
              <NavDropdown.Item
                onClick={() =>
                  updateSelfRole({
                    variables: {
                      newRole: Role.Viewer,
                    },
                  })
                }
              >
                Viewer
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() =>
                  updateSelfRole({
                    variables: {
                      newRole: Role.Editor,
                    },
                  })
                }
              >
                Editor
              </NavDropdown.Item>
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
