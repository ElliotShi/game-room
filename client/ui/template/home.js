import { ReactiveDict } from 'meteor/reactive-dict';
import { Accounts } from 'meteor/accounts-base';

import { Rooms } from '../../../api/rooms.js';

Template.home.onCreated(function(){
  this.state = new ReactiveDict();
  Meteor.subscribe('rooms');
  Template.instance().state.set('isPublic', true);
  Session.set('loginError', false);
})

Template.home.helpers({
  isCreate: function(){
    return Template.instance().state.get('isCreate');
  },
  rooms: function(){
    let rooms = Rooms.find();
    rooms.forEach(function(room){
      if(room.playerA == '' && room.playerB == ''){
        Meteor.call('rooms.remove', room._id);
      }
    });
    return Rooms.find();
  },
  isPublic: function(){
    return Template.instance().state.get('isPublic');
  },
  isSignUp: function(){
    return Template.instance().state.get('isSignUp');
  },
  loginError: function(){
    return Session.get('loginError');
  }
})

Template.home.events({
  'click .create'(){
    Template.instance().state.set('isCreate', true);
  },
  'click .close'(){
    Template.instance().state.set('isCreate', false);
    Template.instance().state.set('isPublic', true);
  },
  'click #public'(){
    Template.instance().state.set('isPublic', true);
  },
  'click #private'(){
    Template.instance().state.set('isPublic', false);
  },
  'submit .login'(event){
    event.preventDefault();
    const target = event.target;
    let username = target.playerName.value;
    let password = target.playerPassword.value;
    Meteor.loginWithPassword(username, password, function(error){
      if(error){
        Session.set('loginError', error.reason);
      }
    });
  },
  'submit .regist'(event){
    event.preventDefault();
    const target = event.target;
    let username = target.playerName.value;
    let password = target.playerPassword.value;
    Accounts.createUser({
      username: username,
      password: password
    },function(error){
      if(error){
        Session.set('loginError', error.reason);
      }
    })
  },
  'click .signup'(){
    Template.instance().state.set('isSignUp', true);
  },
  'click .playerLogin'(){
    Template.instance().state.set('isSignUp', false);
  },
  'click .quit'(){
    let userid = Meteor.userId();
    Meteor.logout();
    // Meteor.users.remove({_id: userid});
  },
  'submit .createRoom'(event){
    //Prevent default browser form submit
    event.preventDefault();
    Template.instance().state.set('isCreate', false);
    //Get value from form element
    const target = event.target;
    let access = '';
    if(target.public.checked){
      access = "public";
    }else{
      access = "private";
    }
    const obj = {
      name: target.roomName.value,
      game: target.gameType.value,
      access: access,
      password: target.privatePwd.value,
      playerA: Meteor.user(),
      playerNo: target.playerNo.value,
    }
    Meteor.call('rooms.insert', obj, function(err, data){
      Router.go('game', {_id: data});
    });
  }
})