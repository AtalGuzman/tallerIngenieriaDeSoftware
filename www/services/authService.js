
angular.module('starter').factory('Auth', function () {

     if (window.localStorage['session']) {
        var _user = JSON.parse(window.localStorage['session']);
     }

     var setUser = function (session) {
        _user = session;
        window.localStorage['session'] = JSON.stringify(_user);
     }

     return {
        setUser: setUser,
        isLoggedIn: function () {
          console.log("isLoggedIn");
          return _user ? true : false;
        },
        getUser: function () {
           return _user;
        },
        logout: function () {
           console.log("logout");
           window.localStorage.removeItem("session");
           window.localStorage.removeItem("list_dependents");
           _user = null;
        },
     }
  })
