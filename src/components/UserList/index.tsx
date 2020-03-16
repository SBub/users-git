import React, { useState } from "react";
import styles from "./UserList.module.css";

import { User as UserType } from "../../types/user";
import Spinner from "../Spinner";
import User from "../User/index";
import useGetUsers from "../../hooks/useGetUsers";

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);

  const { loadMoreUsers } = useGetUsers(
    setUsers,
    setLoading,
    users,
    searchQuery
  );

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
      <button onClick={loadMoreUsers}>Load more</button>
    </div>
  );
};

export default UserList;
