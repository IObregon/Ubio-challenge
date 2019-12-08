import * as express from 'express';
import * as bodyParser from 'body-parser'

import InstanceApi from './api/InstancesApi'
import Group from './types/Group';
import GroupsApi from './api/GroupsApi';

const MAXAGE: number = parseEnvParam(process.env.MAX_AGE_IN_MINUTES);
const INTERVAL: number = parseEnvParam(process.env.INTERVAL_TIME_IN_MINUTES);
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const app = express();
const groups: Group[] = [];
const instanceApi = new InstanceApi(groups);
const groupApi = new GroupsApi(groups);

app.use(bodyParser.json());

app.post('/:group/:id', (req: express.Request, res: express.Response) => {
  res.json(instanceApi.create({ group: req.params['group'], id: req.params['id'], meta: req.body }));
});

app.delete('/:group/:id', (req: express.Request, res: express.Response) => {
  res.status(204);
  res.json(instanceApi.delete({ group: req.params['group'], id: req.params['id'] }));
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.json(groupApi.findAll());
});

app.get('/:group', (req: express.Request, res: express.Response) => {
  res.json(groupApi.findOne(req.params['group']));
});

app.listen(5000, () => {
  console.log('INTERVAL value is: ', INTERVAL, 'MAXAGE value is: ', MAXAGE);
  console.log('server started on port 5000');
  setInterval(() => { instanceApi.deleteExpiredInstances(MAXAGE) }, INTERVAL * MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE)
});

function parseEnvParam(envParam: String | undefined) {
  return Number(envParam) !== NaN ? Number(envParam || 60) : 60;
}