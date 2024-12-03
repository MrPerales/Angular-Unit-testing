import { faker } from '@faker-js/faker/.';
import { User } from './user.model';

export function generateOneUser(): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'customer',
  };
}

export function generateManyUsers(size: number = 10): User[] {
  const users: User[] = [];
  for (let i = 0; i < size; i++) {
    users.push(generateOneUser());
  }
  return [...users];
}
