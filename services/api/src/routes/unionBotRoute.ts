import {Router} from 'express';
import {onUnionBotMessage} from '../controllers/unionBotController';
import {unionToken} from '../container';

import * as bodyParser from 'body-parser';

const router = Router();
const jsonParser = bodyParser.json();

router.post(`/bot${unionToken}`, [jsonParser], onUnionBotMessage);

export default router;
