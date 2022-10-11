import React from 'react'
import {useState} from 'react'

// login form
const Login  = (props) => {

  // props.mode = true = Sign Up Mode

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChange = (value, state) => {
    state(value);
  }

  let linkText = props.mode ? 'Back to login' : "Don't have an account?"
  let titleText = props.mode ? 'Sign up' : "Login"

  // TODO:  add a random recpie name to the title that changes every refresh just for flair


  if(!props.mode){
    // login mode
    return(
      <div className="Login">
        <section>
          <h1>Recipe App</h1>
          <form>
            <h3>{titleText}</h3>
            <article>
              <div>
                <input placeholder="Username" value={username} onChange={(e) => handleChange(e.target.value, setUsername)} ></input>
              </div>
              <div>
              <input placeholder="Password" type="password" value={password} onChange={(e) => handleChange(e.target.value, setPassword)} ></input>
              </div>
            </article>
            <button onClick={(e) => props.handleSubmit(e, props.mode, {username, password})}>
              Submit
            </button>
          <sub>
            <a onClick={(e) => { props.handleLoginModeChange()}}>
              {linkText}
            </a>
          </sub>
          </form>
        </section>
      </div>
    )
  } else {
    // sign up mode
    return(
      <div className="Signup">
        <section>
          <h1>Recipe App</h1>
          <form>
            <h3>{titleText}</h3>
            <article>
              <div>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => handleChange(e.target.value, setUsername)}
                />
              </div>
              <div>
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => handleChange(e.target.value, setFirstName)}
                />
              </div>
              <div>
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => handleChange(e.target.value, setLastName)}
                />
              </div>
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => handleChange(e.target.value, setPassword)}
                />
              </div>
              <div>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  value={password2}
                  onChange={(e) => handleChange(e.target.value, setPassword2)}
                />
              </div>
            </article>
            <button onClick={(e) => props.handleSubmit(e, props.mode, {username, password})}>
              Submit
            </button>
          <sub>
            <a onClick={(e) => { props.handleLoginModeChange()}}>
              {linkText}
            </a>
          </sub>
          </form>
        </section>
      </div>
    )
  }

}

export default Login