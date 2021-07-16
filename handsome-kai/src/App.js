import React, { useState, useEffect } from "react";
import "./App.css";
// import Form from "./Form";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is required"),
  password: yup
    .string()
    .required()
    .min(6, "please enter at least 6 char long!"),
  agree: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErroes] = useState({
    name: "",
    email: "",
    password: "",
    agree: "",
  });

  const [disabled, setDisabled] = useState(true);

  const [users, setUsers] = useState([]);

  const [post, setPost] = useState([]);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErroes({ ...errors, [name]: "" }))
      .catch((err) => setErroes({ ...errors, [name]: err.errors[0] }));
  };

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };

  const submit = (event) => {
    event.preventDefault();
    const newUser = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      agree: form.agree,
    };

    axios
      .post(`https://reqres.in/api/users`, newUser)
      .then((res) => {
        setUsers([
          // we want to first put in the original list of users
          ...users,
          {
            name: res.data.name.trim(),
            email: res.data.email.trim(),
          },
        ]);
        setPost(res.data);
        setForm({
          name: "",
          email: "",
          password: "",
          agree: false,
        });
        console.log("This is my state! : ", users);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    // console.log(schema);
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  return (
    <div className="App">
      <div>
        <h1>Enter your Info! 👾</h1>
      </div>
      <div style={{ color: "red" }} className="error">
        <div>{errors.name}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
        <div>{errors.agree}</div>
      </div>
      <form onSubmit={submit} className="formContainer">
        <label>
          Name
          <br />
          <input onChange={change} value={form.name} name="name" type="text" />
        </label>
        <label>
          Email
          <br />
          <input
            onChange={change}
            value={form.email}
            name="email"
            type="email"
          />
        </label>
        <label>
          Password
          <br />
          <input
            onChange={change}
            value={form.password}
            name="password"
            type="password"
          />
        </label>
        <label>
          Terms Of Service<span> </span>
          <input
            onChange={change}
            checked={form.agree}
            name="agree"
            type="checkbox"
          />
        </label>
        <button disabled={disabled}>Submit!</button>
      </form>

      <div className="boxContainer">
        {users.map((user) => (
          <div>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
          </div>
        ))}
        <pre>
          This is your data : <br />
          {JSON.stringify(post, null, 2)}
        </pre>
      </div>
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
