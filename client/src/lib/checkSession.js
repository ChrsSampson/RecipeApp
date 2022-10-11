// Check users session in the client, stored as a token in sessionStorage

function checkSession () {
  const token = sessionStorage.getItem('cookToken')
  // there is no active session at all
  if(!token || token === null){
    return false
  } else {
    // there is something that matches the token key we are lookging for
    return token
    // TODO layer additional check on this if there is time
  }
}

export default checkSession