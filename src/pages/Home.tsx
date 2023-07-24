import React, { useEffect, useState } from "react";
import { GET_DATA_Q } from "../lib/graphql/queries/data";
import { Jumbotron, NavBar } from "../components";
import { useQuery } from "@apollo/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Container, Row, Col, Card } from "react-bootstrap";
import useGetUserRole from "../hooks/useGetUserRole";

export default function Home() {
  const [graphData, setGraphData] = useState([]);
  const role: string = useGetUserRole();

  const { data: getData, loading: isLoading } = useQuery(GET_DATA_Q);

  useEffect(() => {
    if (getData) {
      setGraphData(getData.getData);
    }
  }, [getData]);

  if (isLoading) return <></>;

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
        <Row className="mt-5">
          <Col xs={6}>
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
                  data={graphData}
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
                  <Line type="monotone" dataKey="pv" />
                </LineChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
