import React from "react";
import styles from "./UserDetails.module.css";
import { Link, useParams } from "react-router-dom";

import { BASE_URL } from "../../utils/api";

const UserDetails = () => {
  const { username } = useParams();

  return (
    <div className={styles.container}>
      <Link to="/">Back to users</Link>
      <h2>Profile of: {username}</h2>
      <p>
        If you are interested to know more about this user, please visit his/her
        GitHub page, by following{" "}
        <a
          href={`${BASE_URL}/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          this
        </a>{" "}
        link
      </p>
    </div>
  );
};

export default UserDetails;
