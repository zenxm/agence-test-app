import express from 'express';
import userRoutes from './user.route';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();

// mount user routes at /users
router.use('/users', userRoutes);

router.route('/').get((req, res) => {
  userCtrl.findAllConsultants(req, res);
});

router.route('/relatorio').get((req, res) => {
  userCtrl.getRelatorio(req, res);
});

router.route('/graph').get((req, res) => {
  userCtrl.getGraph(req, res);
});

router.route('/pizza').get((req, res) => {
  userCtrl.getPizza(req, res);
});

export default router;
