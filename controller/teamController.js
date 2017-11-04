// player Controller
import mongoose from 'mongoose';
import teamModel from '../models/teamModel';
import playerModel from '../models/playerModel';

import {errorQuery} from '../Error'; 

import {ObjectID} from 'mongodb';

const errorMessage = {"error" : "An error as occured"};
 
  String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


class teamController {

 async getTeam(teamId) {
    const team = await teamModel.getTeam(teamId);
    const playersIds = team.playersID;
    const players = playersIds !== null ? await playerModel.getPLayersfromTeam(playersIds) : null;
    return {
        teamName: team.name,
        teamId: team.teamId,
        creationDate: team.creationDate,
        players,
    }; 
};


 async getFrontTeams() {
    const teams = await teamModel.getFrontTeams();
    return teams
 };

}
const TeamController = new teamController();
export default TeamController;


