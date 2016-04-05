import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './home.html';

Template.home.onCreated(function(){
  this.state = new ReactiveDict();
})

Template.home.helpers({
  isCreate: function(){
    return Template.instance().state.get('isCreate');
  }
})

Template.home.events({
  'click .create'(){
    Template.instance().state.set('isCreate', true);
  },
  'click .close'(){
    Template.instance().state.set('isCreate', false);
  },
  'submit .form-horizontal'(event){
    //Prevent default browser form submit
    event.preventDefault();
    Template.instance().state.set('isCreate', false);
    //Get value from form element
    const target = event.target;
    console.log("haha: ", target.public.value);
    console.log("kaka: ", target.private.value);
    const obj = {
      name: target.roomName.value,
      game: target.gameType.value,
      access: target.publicPrivate.value,
      password: target.privatePwd.value
    }
    Meteor.call('rooms.insert', obj);
  }
})