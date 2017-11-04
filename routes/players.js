// playersRoutes.js
import Router from 'koa-joi-router';

import PlayerController from '../controller/playerController';

const {Joi} = Router;

const router = new Router();


router.route({
  method: 'get',
  path: '/player/:id',
  handler: async ctx => {
    const playerId = ctx.request.params.id;
    const player = await PlayerController.getPlayer(playerId);
    ctx.body = player;
  },
  validate: {
    params: {
      id: Joi.string(),
    }
  },
});


router.route({
  method: 'post',
  path: '/player',
  handler:
    async (ctx) => {
      const player = await PlayerController.addNewPlayer(ctx.request.body);
      ctx.body = player;
    },
});

router.route({
  method: 'post',
  path: '/player/rating/:playerId',
  handler: 
    async (ctx) => { 
      const {params: {playerId}, body: {newRate}} = ctx.request;
      const ratings = await PlayerController.addNewRate(newRate, playerId);
      ctx.body = ratings;
    },

})

export default router;
