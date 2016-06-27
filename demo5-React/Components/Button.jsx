import React from "react";
import "./Button.css"

// Note:
// - use `export default` to avoid import destructuring
// - parameter destructuring
export default function Button({ text, onClick }) {
  return <div className='btn' onClick={onClick}>{text}</div>
}
