interface LoginForm {
  username: string;
  password: string;
}

interface UserData {
  id: string;
  username: string;
  password: string;
  role: string;
}

export type { LoginForm, UserData };
