import { Auth } from '../entities/Auth';

export abstract class AuthRepository {
  abstract signUp(data: Auth): Promise<string>;
  abstract signIn(data: Auth): Promise<{ token: string }>;
  abstract signSocial(): Promise<string>;
}
