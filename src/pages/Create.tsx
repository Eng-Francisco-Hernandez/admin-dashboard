import React, { useEffect, useState } from "react";
import { Jumbotron, NavBar, PermissionsGate } from "../components";
import { Role, SCOPES } from "../data";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Card,
  Tooltip,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import useGetUserRole from "../hooks/useGetUserRole";
import { useNavigate } from "react-router-dom";
import { LineChart, XAxis, YAxis, Legend, Line } from "recharts";
import { useMutation } from "@apollo/client";
import { CREATE_GRAPH_M } from "../lib";

export interface Point {
  data: number;
}

export default function Create() {
  const role: string = useGetUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === Role.Viewer) {
      navigate("/login");
    }
  }, [role]);

  const [points, setPoints] = useState<Point[]>([]);
  const [graphName, setGraphName] = useState("");
  const [newPointValue, setnewPointValue] = useState("");
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);

  const addValue = () => {
    setPoints((prevVal: Point[]) => [
      ...prevVal,
      {
        data: parseInt(newPointValue),
      },
    ]);
    setnewPointValue("");
  };

  const [createGraph] = useMutation(CREATE_GRAPH_M, {
    onCompleted: () => {
      setShowCreateSuccess(true);
      setPoints([]);
      setGraphName("");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const saveGraph = () => {
    createGraph({
      variables: {
        graph: {
          name: graphName,
          points: points,
        },
      },
    });
  };

  const deletePoint = (index: number) => {
    const newPoints = points.filter((point, i) => index !== i);
    setPoints(newPoints);
  };

  const changePoint = (value: string, index: number) => {
    const newPoints = points.map((point, i) => {
      if (index === i) {
        if (isNaN(parseInt(value))) {
          return { data: 0 };
        } else {
          return { data: parseInt(value) };
        }
      } else {
        return point;
      }
    });
    setPoints(newPoints);
  };

  return (
    <PermissionsGate scopes={[SCOPES.canCreate]}>
      <NavBar />
      <Container className="mt-5 mb-5">
        <Row>
          <Col>
            <Jumbotron title="Create new graph" />
          </Col>
        </Row>
        <Row className="mb-2 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Form.Label htmlFor="inputPassword5">Graph name</Form.Label>
                <Form.Control
                  value={graphName}
                  onChange={(e) => setGraphName(e.target.value)}
                />
                <Button
                  className="mt-2"
                  size="sm"
                  disabled={graphName.trim() === "" || points.length === 0}
                  onClick={saveGraph}
                >
                  Save graph
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Value (numbers only)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {points.map((point, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>
                        <Form.Control
                          value={point.data}
                          onChange={(e) => changePoint(e.target.value, index)}
                        />
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Button
                          variant="danger"
                          onClick={() => deletePoint(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                  <td>
                    <Form.Control
                      value={newPointValue}
                      onChange={(e) => setnewPointValue(e.target.value)}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
            <Button
              disabled={isNaN(parseInt(newPointValue))}
              onClick={addValue}
            >
              Add value
            </Button>
          </Col>
          <Col>
            <Card>
              <Card.Body
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  overflow: "auto",
                }}
              >
                <LineChart
                  width={500}
                  height={300}
                  data={points}
                  margin={{
                    top: 20,
                    right: 5,
                    left: 5,
                  }}
                >
                  <XAxis />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="data" />
                </LineChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        className="p-3"
        position={"top-end"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowCreateSuccess(false)}
          show={showCreateSuccess}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Graph created</strong>
          </Toast.Header>
          <Toast.Body>Your graph was successfully created!</Toast.Body>
        </Toast>
      </ToastContainer>
    </PermissionsGate>
  );
}
