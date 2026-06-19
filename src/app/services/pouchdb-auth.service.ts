import { Injectable } from '@angular/core';

declare const require: any;
const PouchDB = require('pouchdb-browser').default || require('pouchdb-browser');

@Injectable({
  providedIn: 'root'
})
export class PouchdbAuthService {
  private db: any;

  constructor() {
    this.db = new PouchDB('local_users');
    this.seedUser();
  }

  private async seedUser(): Promise<void> {
    try {
      await this.db.get('user@aemenersol.com');
    } catch (error: any) {
      if (error.status === 404) {
        await this.db.put({
          _id: 'user@aemenersol.com',
          email: 'user@aemenersol.com',
          password: 'Test@123'
        });
      }
    }
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.db.get(email);

      return (
        user.email === email &&
        user.password === password
      );
    } catch {
      return false;
    }
  }
}