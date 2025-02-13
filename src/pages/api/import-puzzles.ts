import type { NextApiRequest, NextApiResponse } from 'next';
import {importPuzzles} from '../../script/import-puzzles';
import withMongoRoute from '@/providers/mongoose';
import {withSessionRoute} from '@/lib/session';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await importPuzzles();
      res.status(200).json({ message: 'Puzzles imported successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to import puzzles' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
export default withMongoRoute(withSessionRoute(handler));
