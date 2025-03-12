export class User {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  createdDate!: Date;
  roles!: string[];
  principal: any;
}