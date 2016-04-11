import { Rooms } from '../api/rooms.js';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});
Router.route('/game/:_id', {
  name: 'game',
  data: function(){
    return Rooms.findOne({_id: this.params._id});
  }
});