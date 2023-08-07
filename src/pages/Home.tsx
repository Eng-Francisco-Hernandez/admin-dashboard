import React, { useEffect, useState } from "react";
import { Jumbotron, NavBar } from "../components";
import { useQuery } from "@apollo/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Container, Row, Col, Card } from "react-bootstrap";
import useGetUserRole from "../hooks/useGetUserRole";
import { GET_GRAPHS_Q } from "../lib";

export default function Home() {
  const role: string = useGetUserRole();

  const {
    data: getGraphs = {
      getGraphs: [],
    },
    loading: isLoading,
  } = useQuery(GET_GRAPHS_Q);

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <Row>
          <Col>
            <Jumbotron
              title={`Welcome you are in the "${role.toLowerCase()}" view`}
            />
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          {getGraphs.getGraphs.map((graph: any, index: number) => {
            return (
              <Col xs={6} key={index}>
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
                      <Legend />
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
