export type User = {
  id: number;
  login: string;
  avatar_url: string;
};

export type SetUsersType = React.Dispatch<React.SetStateAction<User[]>>;
