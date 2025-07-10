export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public createdAt: Date,
  ) {}

  static create(email: string, name: string) {
    const user = new User(crypto.randomUUID(), email, name, new Date());

    return user;
  }
}
