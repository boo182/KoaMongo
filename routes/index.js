import compose from 'koa-compose';
import playerRouter from './players';
import teamRouter from './teams';

export default function router() {
  return compose([
    playerRouter.middleware(),
    teamRouter.middleware(),
  ]);
}