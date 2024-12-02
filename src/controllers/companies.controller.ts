import { NextFunction, Request, Response } from 'express';
import CompanyService from '../services/companies.service';
import logger from '../logger/logger';

class CompaniesController {
  public companyService = new CompanyService();

  /**
   * get all companies
   * @module CompaniesModule
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
   public getCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug(`try to get companies data ${JSON.stringify(req.body)} getCompanies CompaniesController`);

      const companiesData  = await this.companyService.getAllCompanies();

      logger.debug(`successfully to get companies data getCompanies CompaniesController`);

      res.status(200).json(companiesData);
    } catch (error) {
      logger.debug(`error happend while get companies data ${error} getCompanies CompaniesController`);

      next(error);
    }
  };

}

export default CompaniesController;
