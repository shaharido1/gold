import gql from 'graphql-tag';
import { ITypeDefinitions } from 'graphql-tools';
import { GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import axios from 'axios';


const mission  = new GraphQLObjectType({
  name: 'Mission',
  description: "mission type",
  fields: {
    content: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    }
  }
});

const missions = new GraphQLList(mission);


const  missionInput = new GraphQLInputObjectType({
  name: 'missionInput',
  fields: {
    content: {
      type: GraphQLString
    }
  }
});


export const missionMutations = new GraphQLObjectType({
  name: 'MissionMutations',
  description: 'missions mutations',
  fields: () => ({
    addMission: {
      type: mission,
      description: 'Create a new mission.',
      args: {
        mission: { type: missionInput }
      },
      resolve: (root, {mission}) => {
        return axios.post('http://localhost:3500/mission/add', { mission}).then(res =>{
          console.log(res.data)
        })
      }
    },

  })
})


export const missionQueries = new GraphQLObjectType({
  name: 'missionsQueries',
  description: 'Root of the Profile',
  fields: () => ({
    helloQuery: {
      type: GraphQLString,
      description: 'test',
      resolve: () => {
        return axios.get('http://localhost:3500/mission/test').then(res => res.data)
      }
    },
    getAllMissions: {
      type: missions,
      description: 'missions',
      resolve: () => axios.get('http://localhost:3500/mission/getAll').then(res => res.data)
    },
    mission: {
      type: mission,
      description: 'get one mission',
      resolve: () => axios.get('http://localhost:3500/mission/get').then(res => res.data)
    }
  })
});
