import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

if (Meteor.isServer) {
  Meteor.publish('rooms', function() {
    return Rooms.find();
  });
}

var insertRoom = function(obj){
  let idRoom = Rooms.insert({
    roomName: obj.name,
    gameType: obj.game,
    access: obj.access,
    password: obj.password,
    createdAt: new Date(),
    playerA: obj.playerA,
    statusA: false,
    playerB: '',
    statusB: false,
    playerNo: obj.playerNo,
    roomStatus: false,
    countP: 1,
  });
  return idRoom;
}

Meteor.methods({
  'rooms.insert'(obj){
    let idRoom = Rooms.insert({
                  roomName: obj.name,
                  gameType: obj.game,
                  access: obj.access,
                  password: obj.password,
                  createdAt: new Date(),
                  playerA: obj.playerA,
                  statusA: false,
                  playerB: '',
                  statusB: false,
                  playerNo: obj.playerNo,
                  roomStatus: false,
                  countP: 1,
                });
    return idRoom;
  },
  'rooms.updateA'(roomId, flag){
    Rooms.update({_id: roomId},{$set:{statusA: flag}});
  },
  'rooms.updateB'(roomId, flag){
    Rooms.update({_id: roomId},{$set:{statusB: flag}});
  },
  'rooms.updateS'(roomId){
    Rooms.update({_id: roomId},{$set:{roomStatus: true}});
  },
  'rooms.exitA'(roomId, playerId){
    Rooms.update({_id: roomId},{$set:{playerA: '', statusA: false, roomStatus: false},$inc:{countP: -1}})
  },
  'rooms.exitB'(roomId, playerId){
    Rooms.update({_id: roomId},{$set:{playerB: '', statusB: false, roomStatus: false},$inc:{countP: -1}})
  },
  'rooms.remove'(roomId){
    Rooms.remove({_id: roomId});
  },
  'rooms.auth'(roomId, pwd){
    let room = Rooms.findOne({_id: roomId});
    if(room.password == pwd){
      return room._id;
    }else{
      return false;
    }
  }
})