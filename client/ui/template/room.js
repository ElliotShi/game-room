import { ReactiveDict } from 'meteor/reactive-dict';

import { Rooms } from '../../../api/rooms.js';

Template.room.onCreated(function(){
  this.state = new ReactiveDict();
  Template.instance().state.set('isPrivate', false);
})

Template.room.helpers({
  isPrivate: function(){
    return Template.instance().state.get('isPrivate');
  },
  isError: function(){
    return Session.get('isError');
  }
})

Template.room.events({
  'click .room'(){
    let _id = this._id;
    if(this.access == 'public'){
      let room = Rooms.findOne({_id: this._id});
      if(room.playerA == '' && Meteor.userId() != room.playerB._id){
        Rooms.update({_id: this._id},{$set:{playerA: Meteor.user()},$inc:{countP: 1}});
      }
      if(room.playerB == '' && Meteor.userId() != room.playerA._id){
        Rooms.update({_id: this._id},{$set:{playerB: Meteor.user()},$inc:{countP: 1}});
      }
      Router.go('game',{_id: this._id});
    }else{
      Session.set('isError', false);
      Template.instance().state.set('isPrivate', true);
    }
  },
  'submit .access'(event){
    event.preventDefault();
    let target = event.target;
    let password = target.roomPwd.value;
    Meteor.call('rooms.auth', this._id, password, function(err, data){
      if(data){
        Router.go('game',{_id: data});
      }else{
        Session.set('isError', true);
      }
    });
  },
  'click .close'(){
    Session.set('isError', false);
    Template.instance().state.set('isPrivate', false);
  },
})