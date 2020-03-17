import React from "react";
import { Link } from "react-router-dom";
import styles from "./User.module.css";

import { User as UserType } from "../../types/user";

const User: React.FC<UserType> = ({ login, avatar_url }) => {
  return (
    <Link to={`/user/${login}`} className={styles.container}>
      <img className={styles.avatar} src={avatar_url} alt="User avatar" />
      <p className={styles.name}>{login}</p>
    </Link>
  );
};

export default User;
