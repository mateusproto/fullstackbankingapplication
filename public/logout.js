function Logout(){
    alert('log out');
    firebase.auth().signOut();
  }