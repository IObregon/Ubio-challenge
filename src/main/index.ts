import * as express from 'express';
import * as bodyParser from 'body-parser'

import InstanceApi from './api/InstancesApi'
import Group from './types/Group';

const app = express();
const groups:Group[] = [];
const instanceApi = new InstanceApi(groups);

app.use(bodyParser.json());

app.post('/:group/:id', (req: express.Request,res: express.Response) => {
  res.json(instanceApi.create({group: req.params['group'], id: req.params['id'], meta: req.body}));
});

app.delete('/:group/:id', (req: express.Request,res: express.Response) => {
  res.status(204);
  res.json(instanceApi.delete({group: req.params['group'], id: req.params['id']}));
});


app.listen(5000, () => {
  console.log('server started on port 5000');
})