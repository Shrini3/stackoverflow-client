import React from 'react'
import { useRouteError } from 'react-router-dom'

function Error() {
    let error = useRouteError();
    console.log(error)
  return (
    <div>Dang!</div>
  )
}

export default Error