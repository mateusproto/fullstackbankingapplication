const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UseEffect = React.UseEffect;
const UserContext = React.createContext();

const firebaseConfig = {
  apiKey: "AIzaSyBpQW23Go-IExXQ13AvlOEIr-5EaOAIEGk",
  authDomain: "mateusproto-badbank-e4d70.firebaseapp.com",
  projectId: "mateusproto-badbank-e4d70",
  storageBucket: "mateusproto-badbank-e4d70.appspot.com",
  messagingSenderId: "348060295130",
  appId: "1:348060295130:web:e8870ebed22dd196896ae3"
};

firebase.initializeApp(firebaseConfig);
 
const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = React.useState({ name: '', email: '', auth: false });

  // Login updates the user data with a name parameter
  const login = (name, email) => {
    setUser((user) => ({
      name: name,
      email: email,
      auth: true,
    }));
    console.log(`login: ${name}`);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: '',
      email: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{maxWidth: "18rem"}}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>      
  );    
}
