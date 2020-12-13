import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import Registration from './controllers/Registration'
import Reports from './controllers/Reports'
// import Models from './models/Model';

const router = Express.Router();


router.post('/register', Registration.postRegistration);
router.get('/reports/workload', Reports.getWorkloadReport);
router.use('/', HealthcheckController);


export default router;
