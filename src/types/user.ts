export type User = {
  id: number;
  login: string;
  avatar_url: string;
};

export type SetUsersType = React.Dispatch<React.SetStateAction<User[]>>;

export type ReducerState = {
  users: User[];
  selected: {} | User;
  searchQuery: string;
};

export type SetUser = { type: "SET_USERS"; payload: User[] };
export type ResetUser = { type: "RESET_USERS" };
export type SelectUser = { type: "SELECT_USER"; payload: User };
export type Actions = SetUser | ResetUser | SelectUser;
