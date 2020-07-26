// Anexar mais tipos à interface Request do Express
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
