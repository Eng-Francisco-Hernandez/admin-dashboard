import React from "react";
import { Jumbotron, NavBar } from "../components";
import { useQuery } from "@apollo/client";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Container, Row, Col, Card, Button, Stack } from "react-bootstrap";
import useGetUserRole from "../hooks/useGetUserRole";
import { GET_GRAPHS_Q } from "../lib";
import { Role } from "../data";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const role: string = useGetUserRole();
  let navigate = useNavigate();

  const {
    data: getGraphs = {
      getGraphs: [],
    },
  } = useQuery(GET_GRAPHS_Q, {
    fetchPolicy: "network-only",
  });

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <Row>
          <Col>
            <Jumbotron
              title={`Welcome! your current role is: "${role.toLowerCase()}"`}
            />
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          {getGraphs.getGraphs.map((graph: any, index: number) => {
            return (
              <Col xs={6} key={index} className="mt-2 mb-2">
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
                    <Stack direction="horizontal" gap={3}>
                      <Card.Title
                        style={{
                          width: "100%",
                          textAlign: "center",
                        }}
                        className="me-auto"
                      >
                        {graph.name}
                      </Card.Title>
                      {role === Role.Editor && (
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => navigate(`/edit/${graph._id}`)}
                        >
                          Edit
                        </Button>
                      )}
                    </Stack>
                    <LineChart
                      width={500}
                      height={300}
                      data={graph.points}
                      margin={{
                        top: 20,
                        right: 5,
                        left: 5,
                      }}
                    >
                      <XAxis />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="data" />
                    </LineChart>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
