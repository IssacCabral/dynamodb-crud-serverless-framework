export interface CreateUserParams {
  nameUser: string;
}

export interface InsertUser {
  TableName: string;
  Item: User;
}

export interface User {
  id: string;
  nameUser: string;
  createdAt: string;
}
