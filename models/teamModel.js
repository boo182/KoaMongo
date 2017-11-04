// team Model
import mongoose from 'mongoose';
import Team from '../schemas/teamSchema';
import Player from '../schemas/playerSchema';



class teamModel {
  
 async getTeam(teamId){
     const query = await Team.findOne({"teamId": teamId});
     return query;
   }

 async getFrontTeams(){
     const query = await Team.find();
     console.log(query);
     return query;
   }

  async updateTeamRate(teamId) {
    const playersRates = await Player.find({"teamId": teamId}, {"_id": false, "ratings.avgRate": true});

    const rateAvg = playersRates.map((item) => {
      return item.ratings.avgRate;
    }).reduce((a, b) => a + b) / playersRates.length;
 
     const newRate = {"teamRate": Math.floor(rateAvg * 100) / 100};
     const teamRate = await Team.update({"teamId": teamId}, newRate);
  }
};


const TeamModel = new teamModel;
export default TeamModel;


