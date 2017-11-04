// playersRoutes.js
import Router from 'koa-joi-router';

import teamController from '../controller/teamController';

const {Joi} = Router;

const router = new Router();


router.route({
  method: 'get',
  path: '/team/frontTeams',
  handler: async ctx => {
    const teams = await teamController.getFrontTeams();
    ctx.body = teams;
  },
});

router.route({
  method: 'get',
  path: '/team/:id',
  handler: async ctx => {
    const teamId = ctx.request.params.id;
    const team = await teamController.getTeam(teamId);
    ctx.body = team;
  },
  validate: {
    params: {
      id: Joi.number(),
    },
  },
});



export default router;
