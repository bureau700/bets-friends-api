declare namespace Express {
  interface User {
    username: string;
  }

  export interface Request {
    // FIXME: when using UserModel
    // use require and not import because imports
    // don't work in declaration files.
    user?: User;
  }
}
