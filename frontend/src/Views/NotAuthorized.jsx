import React from 'react'
import { useNavigate } from 'react-router-dom'
function NotAuthorized() {
  return (
    <div>
        <h1>Not authorized</h1>
        <a href="/">Back to the login page</a>

    </div>
  )
}

export default NotAuthorized