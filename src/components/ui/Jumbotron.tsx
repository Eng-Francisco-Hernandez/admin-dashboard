import React from "react";

export interface JumbotronProps {
  title: string;
}

export default function Jumbotron(props: JumbotronProps) {
  const { title } = props;
  return (
    <div className="container-fluid bg-light text-dark p-2 text-center">
      <div className="container bg-light">
        <h1 className="display-5">{title}</h1>
      </div>
    </div>
  );
}
