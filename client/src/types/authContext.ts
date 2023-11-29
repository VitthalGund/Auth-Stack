export type userData = {
  username: string;
  email: string;
};

export type auth = {
  email: string;
  roles: string[];
  accessToken: string;
  username: string;
};

export type AuthContext = {
  updateUserData: (data: userData) => void;
  updateAuth: (data: auth) => void;
  setPersist: (data: string) => void;
  auth: auth;
  userData: userData;
  persist: string;
};
