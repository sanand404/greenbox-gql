import teamModel from './teamModel';

export default {
  upsertTeam: (_, args, context) => {
    return teamModel.upsertTeam(args);
  }
};
