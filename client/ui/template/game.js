import { Session } from 'meteor/session';
import { Rooms } from '../../../api/rooms.js';


Template.game.events({
  'click .create'(){
    if(this.playerA != null && Meteor.userId() == this.playerA._id){
      Meteor.call('rooms.exitA', this._id, Meteor.userId());
      let room = Rooms.findOne({_id: this._id})
      if(room.countP == 0){
        Rooms.remove({_id: this._id});
      }
    }else if(this.playerB != null && Meteor.userId() == this.playerB._id){
      Meteor.call('rooms.exitB', this._id, Meteor.userId());
      let room = Rooms.findOne({_id: this._id})
      if(room.countP == 0){
        Rooms.remove({_id: this._id});
      }
    }
    Router.go('home');
  }
})