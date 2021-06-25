import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}
class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Email incorrect");
    }

    const usersAlreadyExists = await usersRepository.findOne({ email });

    if (usersAlreadyExists) {
      throw new Error("User already exists");
    }

    const SALT = 8;
    const passwordHash = await hash(password, SALT);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
