import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/health', async (req: Request, res: Response)=>{
    res.status(200).send('ok');
})

export { router as healthRouter };