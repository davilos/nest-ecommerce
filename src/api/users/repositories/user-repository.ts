export type CreateUserParams = Omit<User, 'id' | 'registeredAt'>;

export type UpdateUserParams = {
  userId: string;
  data: Omit<Partial<User>, 'id'>;
};

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create({ email, name }: CreateUserParams): Promise<User>;
  update({ userId, data }: UpdateUserParams): Promise<User>;
  delete(userId: string): Promise<void>;
}
