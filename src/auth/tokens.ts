// stores momentary random values, for e.g. github's 'state' param on
//  OAuth2 request/callback URLs.

import { randomBytes } from "crypto";

const expirationSeconds = 120;

export class TokenMap {
  tokens: Map<string, number>;

  constructor() {
    this.tokens = new Map<string, number>();
  }

  create(): string {
    const newToken = randomBytes(32).toString("hex");
    const expiration = new Date().getTime() + expirationSeconds * 1000;
    this.tokens.set(newToken, expiration);
    return newToken;
  }

  isValid(token: string): boolean {
    const expiration = this.tokens.get(token);

    if (expiration && expiration > new Date().getTime()) {
      return true;
    }
    return false;
  }
}
