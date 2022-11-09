import React, { useState } from 'react'
import LoginForm from './component/LoginForm';
import Scroll from './component/Scroll';

function App() {
  const adminUser = {
    name: "foo",
    password: "bar"
  }

  const [user, setUser] = useState({name:"",email:""});
  const [error, setError] = useState("");

  const Login = details=>{
    console.log(details);

    if(details.name === adminUser.name && details.password === adminUser.password){
      console.log("Logged In");
      setUser({
        name: details.name,
        email: details.email,
      })
    }else{
      console.log("Credentials do not match!!!")
      setError("Credentials do not match!!!");
    }
  }

  const Logout = () => {
    console.log("Logout")
    setUser({
      name:"",
      email: ""
    })
  }

  return (
    <div className="App">
      {(user.name !== "") ? (
        <div className='welcome'>
          <h2>Welcome, <span>{user.name}</span></h2>
          <div className='form-inner'><span><Scroll /></span></div>
          <button onClick={Logout} >Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}      
    </div>
  );
}

export default App;
