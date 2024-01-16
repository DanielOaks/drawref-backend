import "express";

export declare module "express" {
  interface Request {
    user?: {
      name: string;
      admin: boolean;
      exp: string;
    };
  }
}
