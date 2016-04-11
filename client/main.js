Meteor.startup(function() {
  Session.set("user", sessionStorage.getItem("user"));
});
