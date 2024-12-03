import Dexie, { type EntityTable } from 'dexie';

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
}

interface Address {
  id?: number;
  name: string;
  city: string;
  state: string;
  zipcode: number;
}

interface Payment {
  id?: number;
  cardNumber: number;
  expiryDate: Date;
  cvv: number;
  cardholderName: string;
}

const db = new Dexie('testDatabase') as Dexie & {
  users: EntityTable<User, 'id'>;
  addresses: EntityTable<Address, 'id'>;
  payments: EntityTable<Payment, 'id'>;
};

db.version(1).stores({
  users: '++id, firstName, lastName, age',
  addresses: '++id, name, city, state, zipcode',
  payments: '++id, cardNumber, expiryDate, cvv, cardholderName'
});

export type { Address };
export type { User };
export type { Payment };
export { db };