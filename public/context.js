const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UseEffect = React.UseEffect;
const UserContext = React.createContext();

const firebaseConfig = {
  apiKey: "AIzaSyCq8tgBaARoQQZz7KEJ0iju5iq-8rRfSxY",
  authDomain: "fullstackbankingapplication.firebaseapp.com",
  projectId: "fullstackbankingapplication",
  storageBucket: "fullstackbankingapplication.appspot.com",
  messagingSenderId: "29611998247",
  appId: "1:29611998247:web:d8f53245449070343c2202"
};

firebase.initializeApp(firebaseConfig);
 
const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = React.useState({ name: '', email: '', auth: false });

  // Login updates the user data with a name parameter
  const login = (name, email, balance) => {
    setUser((user) => ({
      name: name,
      email: email,
      balance: balance,
      auth: true,
    }));
    console.log(`login: ${name}, ${email}, ${balance}`);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: '',
      email: '',
      balance: '',
      auth: false,
    }));
    console.log(`logout: ${name}, ${email}, ${balance}`);
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
