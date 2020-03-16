import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log({ id });
  }, [id]);

  return (
    <>
      <Link to="/">Back to users</Link>
      <h1>User Details</h1>
    </>
  );
};

export default UserDetails;
