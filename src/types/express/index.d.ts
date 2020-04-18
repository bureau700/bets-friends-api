declare namespace Express {
  export interface Request {
    user?: import('../../services/user-service').User;
    appInstance: import('express-serve-static-core').Express;
  }
}
