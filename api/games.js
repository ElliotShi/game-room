import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');

// Meteor.methods({
//   'games.update'(obj){
//     Games.update({
//       roomName: obj.name,
//       gameType: obj.game,
//       access: obj.access,
//       password: obj.password,
//       createdAt: new Date(),
//     });
//   }
// })