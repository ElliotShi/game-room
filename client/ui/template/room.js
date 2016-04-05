
Template.room.events({
  'click .room'(){
    Router.go('/game',{_id: this._id});
  }
})