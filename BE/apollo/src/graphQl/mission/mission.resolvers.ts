
import axios, { AxiosStatic } from 'axios';

export const missionResolvers = {
  Query: {
    getAllMissions(root, {}, context) {
      return axios.get('localhost:3500');
    }
  },
  // Mutation: {
  //   addMission: (root, { message }) => {
  //     return axios.post('localhost:3500', {data: "data"});
  //   }
  // }

};

