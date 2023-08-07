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
  const [graphName, setGraphNam] = useState("");
  const [newPointValue, setnewPointValue] = useState("");

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
    onCompleted: (data) => {},
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
                  onChange={(e) => setGraphNam(e.target.value)}
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
                </tr>
              </thead>
              <tbody>
                {points.map((point, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>
                        <Form.Control readOnly value={point.data} />
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
    </PermissionsGate>
  );
}
