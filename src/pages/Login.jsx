import axios from "axios";
import { Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { catchError } from "../hooks/useAxios";
import { MAIN_URL } from "../store/slices/products.slice";
import { useNavigate } from "react-router-dom";

const url = `${MAIN_URL}/users/login`;

export default function Login() {
  const {register, handleSubmit} = useForm();
  /* const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNTksImZpcnN0TmFtZSI6IkJyYXVsaW8iLCJsYXN0TmFtZSI6IkFsZXhpcyIsImVtYWlsIjoibGFsYWxhQGdtYWlsLmNvbSIsInBob25lIjoiMTMxNDE1OTI2NSIsImNyZWF0ZWRBdCI6IjIwMjMtMDQtMTFUMDE6NTc6MjQuODY3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMTFUMDE6NTc6MjQuODY3WiJ9LCJpYXQiOjE2ODExNzgyNjZ9.pGAcFZ4ArMj3X5cHXUX7q2Vvv2Q-Dpm3GUX4qy1coR8"; */
  /* const config = {
    headers: { Authorization: `Bearer ${token}` }
  }; */
  const navigate = useNavigate();
  const submit = data => {
    console.log(data);
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate('/');
        } else {
          console.error(res);
        }
      })
      .catch(catchError);
  }
  return (
    <Form
      style={{
        maxWidth: 500, margin: "1rem auto"
      }}
      onSubmit={handleSubmit(submit)}>
        <div style={{
          marginBottom: 25
        }}>
          <h5>Test data</h5>
          email: lalala@gmail.com
          <br />
          password: password'
        </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email", { required: true })}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
