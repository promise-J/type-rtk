import { Request } from 'express';
import 'express-serve-static-core';

// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: { id: string }; // optional property
//   }
// }


interface AuthRequest extends Request {
  user?: {id: string};
}

export { AuthRequest };