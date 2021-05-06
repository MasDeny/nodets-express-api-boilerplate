import { UserResponses } from '../models/responses/userResponses';

export type UserCreationParams = Pick<UserResponses, "email" | "name" | "phoneNumbers">;

export class UsersService {
  public get(id: number, name?: string): UserResponses {
    return {
      id,
      email: "jane@doe.com",
      name: name ?? "Jane Doe",
      status: "Happy",
      phoneNumbers: [],
    };
  }

  public create(userCreationParams: UserCreationParams): UserResponses {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: "Happy",
      ...userCreationParams,
    };
  }
}