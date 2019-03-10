import teamModel from './teamModel';

export default {
  createTeam: (_, args, context) => {
    return teamModel.createTeam(args);
  }
};
