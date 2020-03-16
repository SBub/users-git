import React from "react";
import styles from "./User.module.css";

import { User as UserType } from "../../types/user";

const User: React.FC<UserType> = ({ id, login, avatar_url }) => {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={avatar_url} alt="User avatar" />
      <p className={styles.name}>{login}</p>
    </div>
  );
};

export default User;
