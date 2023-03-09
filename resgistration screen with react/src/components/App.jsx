import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });
  const [heading, setHeading] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChage(event) {
    const { value, name } = event.target;
    setContact((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  }
  function handleClick(event) {
    setHeading(contact);
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>
        Hello {heading.fName} {heading.lName}
      </h1>
      <p>{heading.email}</p>
      <form onSubmit={handleClick}>
        <input onChange={handleChage} name="fName" placeholder="First Name" />
        <input onChange={handleChage} name="lName" placeholder="Last Name" />
        <input onChange={handleChage} name="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
