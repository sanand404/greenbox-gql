import teamModel from './teamModel';

export default {
  team: (_, args, context) => {
    return teamModel.fetchTeam();
  }
};
