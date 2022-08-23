function Spa() {
  const [isLoggedIn, setIsLoggedIn]       = React.useState(false);

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      setIsLoggedIn(true);

    } else {
      console.log("User is not logged in");
      setIsLoggedIn(false);
    }
  });
  console.log(isLoggedIn);


  return (
    <UserProvider>
    <div>
      {isLoggedIn ? <NavBarLoggedIn/> : <NavBarLoggedOut/>}        
    </div>
    </UserProvider>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
