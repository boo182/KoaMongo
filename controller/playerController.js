// player Controller
import mongoose from 'mongoose';
import playerModel from '../models/playerModel';
import {errorQuery} from '../Error'; 

import {ObjectID} from 'mongodb';

const errorMessage = {"error" : "An error as occured"};
 
  String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


class playerController {

 async getPlayer(id) {
    const playerId = { '_id': new ObjectID(id) };
    const player = await playerModel.getPlayer(playerId);
    return player; 
};

 async addNewPlayer(body) {
    const newPlayer = {
        firstName: body.firstName.cap(),
        lastName: body.lastName.cap(),
        actualTeam: body.actualTeam,
        position: body.position,
    };
    const query = await playerModel.addNewPlayer(newPlayer);
    return query; 
};

async addNewRate(newRate, id) {
    const playerId = { '_id': new ObjectID(id) };
    const actualRates = await playerModel.getPlayerRates(playerId);
    const calcAvg = Math.round(((actualRates.avgRate * actualRates.numberOfVotes) + newRate) / (actualRates.numberOfVotes + 1) * 100) /100;
    const newAvg = actualRates.avgRate === 0 ? newRate : calcAvg;
    const oldAvg = [...actualRates.oldAvg, newAvg];
    const newRatings = {
        numberOfVotes: actualRates.numberOfVotes + 1,
        avgRate: newAvg,
        oldAvg,
        bestRate: Math.max(...oldAvg),
        worstRate: Math.min(...oldAvg),
    }
    return await playerModel.addNewRate(newRatings, newRate, playerId);
}

}
const PlayerController = new playerController();
export default PlayerController;


