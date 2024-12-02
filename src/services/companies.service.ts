import * as fs from 'fs';
import { ErrorHandler } from '../helpers/error';
import { CompanyData } from 'src/interfaces/companies.interface';
import { promisify } from 'util';
import { join } from 'path';

const readFile = promisify(fs.readFile);

class CompanyService {
  private filePath: string = join(__dirname, '../data/companies.json');

  public async getAllCompanies(): Promise<CompanyData[]> {
    try {
      const data = await readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as CompanyData[];
    } catch (error) {
      throw new ErrorHandler(500, error);
    }
  }
}

export default CompanyService;
