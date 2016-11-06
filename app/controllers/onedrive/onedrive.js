/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


  var ADAL = new AuthenticationContext({
      instance: 'https://login.microsoftonline.com/',
      tenant: 'common', //COMMON OR YOUR TENANT ID

      clientId: '383d6f26-f471-4bb9-9381-9897533ca82c', //This is your client ID
      redirectUri: 'http://localhost', //This is your redirect URI

      callback: userSignedIn,
      popUp: true
  });

  function signIn() {
      ADAL.login();
  }

  function userSignedIn(err, token) {
      console.log('userSignedIn called');
      if (!err) {
          console.log("token: " + token);
          showWelcomeMessage();
      }
      else {
          console.error("error: " + err);
      }
  }

  function showWelcomeMessage() {
      var user = ADAL.getCachedUser();
      var divWelcome = document.getElementById('WelcomeMessage');
      divWelcome.innerHTML = "Welcome " + user.profile.name;
  }
