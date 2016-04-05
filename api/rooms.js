import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

Meteor.methods({
  'rooms.insert'(obj){
    Rooms.insert({
      roomName: obj.name,
      gameType: obj.game,
      access: obj.access,
      password: obj.password,
      createdAt: new Date(),
    });
  }
})