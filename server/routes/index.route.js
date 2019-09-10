import express from 'express';
import userRoutes from './user.route';
import * as consultantCtrl from '../controllers/consultant.controller';

const router = express.Router();

// mount user routes at /users
router.use('/users', userRoutes);

router.route('/consultants').get((req, res) => {
  consultantCtrl.findAllConsultants(req, res);
});

router.route('/relatorio').post((req, res) => {
  consultantCtrl.getRelatorio(req, res);
});

router.route('/graph').post((req, res) => {
  consultantCtrl.getGraph(req, res);
});

router.route('/pizza').post((req, res) => {
  consultantCtrl.getPizza(req, res);
});

export default router;
