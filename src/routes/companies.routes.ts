import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import CompaniesController from '../controllers/companies.controller';

class CompaniesRoute implements Route {
  public path = '/companies';
  public router = Router();
  public companiesController = new CompaniesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.companiesController.getCompanies);
  }
}

export default CompaniesRoute;
