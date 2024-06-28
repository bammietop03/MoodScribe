import { describe } from 'mocha';
import chai from 'chai';
import { expect } from 'chai';
import dbClient from '../utils/db';


// Testing dbClient
describe('dbClient', () => {
    it('should check if mongodb is connected', async () => {
      // const chai = await import('chai');
      // const { expect } = chai;

      const isValid = dbClient.isAlive();
      expect(isValid).to.be.true;
      const isValid2 = dbClient.isAlive();
      expect(isValid2).to.be.true;
      const isValid3 = dbClient.isAlive();
      expect(isValid3).to.be.true;
      const isValid4 = dbClient.isAlive();
      expect(isValid4).to.be.true;
    });
});