import React, { useState, useEffect } from "react";
import "./App.css";
// import Form from "./Form";
import * as yup from "yup";
// import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  password: yup
    .string()
    .required()
    .min(3, "please enter at least 3 char long!"),
  agree: yup.boolean().oneOf([true]),
});

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  // const [disabled, setDisabled] = useState(true);

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "chekbox" ? checked : value;
    setForm({ ...form, [name]: valueToUse });
  };

  // useEffect(() => {
  //   // console.log(schema);
  //   schema.isValid(form).then((valid) => setDisabled(valid));
  // }, [form]);

  return (
    <div className="App">
      <form>
        <label>
          Name:
          <input onChange={change} value={form.name} name="name" type="text" />
        </label>
        <label>
          Email:
          <input
            onChange={change}
            value={form.email}
            name="email"
            type="email"
          />
        </label>
        <label>
          Password:
          <input
            onChange={change}
            value={form.password}
            name="password"
            type="password"
          />
        </label>
        <label>
          Terms Of Service:
          <input
            onChange={change}
            checked={form.agree}
            name="agree"
            type="checkbox"
          />
        </label>
        <button>Submit!</button>
      </form>
    </div>
  );
}

export default App;

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .required("name is required")
//     .min(6, "name needs to be 6 chars min"),
//   email: yup.string().required("Please enter the email").email,
//   password: yup
//     .string()
//     .required("Please enter yout password")
//     .min(3, "password need to be 3 chars min"),
//   // .matches(
//   //   "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
//   //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
//   // ),
//   agree: yup.boolean().oneOf([true], "you need to check the box!"),
// });
