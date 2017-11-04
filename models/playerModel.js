// player Model
import mongoose from 'mongoose';
import Player from '../schemas/playerSchema';
import teamModel from './teamModel';

class playerModel {
  

 async getPlayer(playerId){
     const query = await Player.findOne(playerId)
     return query;
   }

 async addNewPlayer(newPlayer){
     const newQuery = new Player(newPlayer);
     const query = await newQuery.save();
     console.log(query);
     return query;
   }

async getPLayersfromTeam(playersId){
    const query = await Player.find({"playerId": {"$in": playersId}});
    return query;
} 


async getPlayerRates(playerId) {
    const res = await Player.findOne(playerId, { _id: false, ratings: true });
    return res.ratings;
}

async addNewRate(newRatings, newRate, playerId) {
    const previousRates = await Player.findOne(playerId, { _id: false, rates: true, teamId: true });
    previousRates.rates[newRate] = previousRates.rates[newRate] + 1;
    const newValues = {
        rates: previousRates.rates,
        ratings: newRatings,
    };

    const ratings = await Player.update(playerId, newValues);
    await teamModel.updateTeamRate(previousRates.teamId);
    return await this.getPlayer(playerId, { _id: false, ratings: true });
}
};

const PlayerModel = new playerModel;
export default PlayerModel;


