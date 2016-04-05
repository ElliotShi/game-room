import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Rooms } from '../../../api/rooms.js';

Template.home.onCreated(function(){
  this.state = new ReactiveDict();
})

Template.home.helpers({
  isCreate: function(){
    return Template.instance().state.get('isCreate');
  },
  rooms: function(){
    return Rooms.find();
  },
  user: function(){
    return Session.get('user');
  }
})

Template.home.events({
  'click .create'(){
    Template.instance().state.set('isCreate', true);
  },
  'click .close'(){
    Template.instance().state.set('isCreate', false);
  },
  'submit .regist'(event){
    //Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    sessionStorage.setItem('user', target.playerName.value);
    Session.set('user', sessionStorage.getItem('user'));
  },
  'click .quit'(){
    sessionStorage.removeItem('user');
    Session.set('user', null);
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
      password: target.privatePwd.value
    }
    Meteor.call('rooms.insert', obj);
  }
})