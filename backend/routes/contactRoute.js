import {Router} from 'express';
import { contactUs } from '../controllers/contactController.js';

const router = Router();

router.post("/contactForm",contactUs);

export default router;