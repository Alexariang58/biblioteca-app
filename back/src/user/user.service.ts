import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import * as fs from 'fs';
import * as path from 'path';
import { log } from 'console';

@Injectable()
export class UserService {
  private readonly filePath = path.join(
    process.cwd(),
    'dist',
    'data',
    'users.json',
  );

  private loadUsers(): User[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      console.log('data: ', data);
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private saveUsers(users: User[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf8');
  }

  register(username: string, password: string): User {
    const users = this.loadUsers();

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) throw new Error('Usuario ya registrado');

    const newUser = new User(users.length + 1, username, password);
    users.push(newUser);
    this.saveUsers(users);

    return newUser;
  }

  login(username: string, password: string): boolean {
    const users = this.loadUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    return !!user;
  }

  getAll(): User[] {
    return this.loadUsers();
  }

  getByUsername(username: string): User | undefined {
    const users = this.loadUsers();
    return users.find((u) => u.username === username);
  }
}
