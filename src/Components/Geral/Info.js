import { Navigate, useParams } from "react-router-dom";

import * as React from "react";

export function Info(props) {
  const params = useParams();
  if (!props.user) {
    return <Navigate to="/" replace={true} />;
  }
  return <div>Info Page {params.id}</div>;
}
