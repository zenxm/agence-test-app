import express from 'express';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/').get((req, res) => {
  userCtrl.findAllConsultants(req, res);
});

export default router;
