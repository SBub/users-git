import React, { useState } from "react";
import styles from "./UserList.module.css";

import Spinner from "../Spinner";
import User from "../User/index";

const UserList = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      login: "sbub",
      avatar_url:
        "https://i.pinimg.com/564x/75/03/13/750313a83baa263d6c4c91cc1422d2c0.jpg"
    },
    {
      id: 2,
      login: "else",
      avatar_url:
        "https://i.pinimg.com/564x/b5/52/bb/b552bb1061ca85ab4d1eaaf5c9ece29e.jpg"
    },
    {
      id: 3,
      login: "else3",
      avatar_url:
        "https://i.pinimg.com/564x/b5/52/bb/b552bb1061ca85ab4d1eaaf5c9ece29e.jpg"
    },
    {
      id: 4,
      login: "els4",
      avatar_url:
        "https://i.pinimg.com/564x/b5/52/bb/b552bb1061ca85ab4d1eaaf5c9ece29e.jpg"
    },
    {
      id: 5,
      login: "else",
      avatar_url:
        "https://i.pinimg.com/564x/b5/52/bb/b552bb1061ca85ab4d1eaaf5c9ece29e.jpg"
    }
  ]);

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <input className={styles.input} placeholder="Search by user name" />
      <Spinner />
      <div className={styles.usersContainer}>
        {users.map(user => (
          <User key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
