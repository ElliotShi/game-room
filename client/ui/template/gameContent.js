import { Rooms } from '../../../api/rooms.js';

Template.gameContent.onCreated(function(){

})

Template.gameContent.helpers({
  equals: function(v1, v2) {
      return (v1 === v2);
  },
  isPlayerA: function(){
    if(this.playerA._id == Meteor.userId()){
      return true;
    }else{
      return false;
    }
  },
  isPlayerB: function(){
    if(this.playerB._id == Meteor.userId()){
      return true;
    }else{
      return false;
    }
  }
})

Template.gameContent.events({
  'click .statusA'(){
    let flag = false;
    let roomId = this._id;
    if(this.statusA){
      flag = false;
      Meteor.call('rooms.updateA', roomId, flag);
    }else{
      flag = true;
      Meteor.call('rooms.updateA', roomId, flag);
      if(this.statusB){
        Meteor.call('rooms.updateS', roomId);
      }
    }
  },
  'click .statusB'(){
    let flag = false;
    let roomId = this._id;
    if(this.statusB){
      flag = false;
      Meteor.call('rooms.updateB', roomId, flag);
    }else{
      flag = true;
      Meteor.call('rooms.updateB', roomId, flag);
      if(this.statusA){
        Meteor.call('rooms.updateS', roomId);
      }
    }
  },
  // 'click .cancel'(){

  // }
})
