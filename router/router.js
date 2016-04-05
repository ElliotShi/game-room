Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});
Router.route('/game',function(){
  console.log("routerTest: ", data);
})