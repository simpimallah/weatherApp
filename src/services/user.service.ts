import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async register(userData: { name: string; email: string; password: string }) {
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  }
}
