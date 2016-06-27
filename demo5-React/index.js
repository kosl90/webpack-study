import Button from "./Components/Button"
import React from "react"
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>
    <Button
      text="Click me"
      onClick={(e)=>{console.log("I'm clicked.")}}
      />
  </div>,
  document.getElementById("container")
);
