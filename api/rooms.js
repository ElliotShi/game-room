import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

Meteor.methods({
  'rooms.insert'(obj){
    //Make sure the user is logged in before inserting a task
    if(! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.insert({
      roomName: obj.name,
      gameType: obj.game,
      access: obj.access,
      password: obj.password,
      createdAt: new Date(),
    });
  }
})