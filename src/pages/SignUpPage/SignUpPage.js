import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { errSignUp } from "../../modals/errorSignup";
import { successSignUp } from "../../modals/successSignup";
import {
  Container,
  ContainerLogoDescription,
  FormInputs
} from "./Styleds";

export default function SignUpPage() {

  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    name: "",
    url: ""
  });
  const [buttonStatus, setButtonStatus] = useState("");

  function controlledInput(e) {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  }

  async function signUp(e) {
    e.preventDefault();
    try {
      await api.signUp(signUpForm)
      successSignUp();
      setButtonStatus("")
      navigate('/')
    } catch (error) {
      errSignUp();
      setButtonStatus("")
      console.log(error.response.data);
    }
  }

  return (
    <Container>
      <ContainerLogoDescription>
        <h1>linkr</h1>
        <span>save, share and discover the best links on the web</span>
      </ContainerLogoDescription>
      <FormInputs onSubmit={signUp} status={buttonStatus}>
        <input type="email" placeholder="e-mail" name="email" value={signUpForm.email} onChange={controlledInput} />
        <input type="password" placeholder="password" name="password" value={signUpForm.password} onChange={controlledInput} />
        <input type="text" placeholder="username" name="name" value={signUpForm.name} onChange={controlledInput} />
        <input type="url" placeholder="picture url" name="url" value={signUpForm.url} onChange={controlledInput} />
        <button type="submit" onClick={() => setButtonStatus("loading")}>{buttonStatus === 'loading' ? <ThreeDots type="ThreeDots" color="#000000" height={50} width={50} /> : "Sign Up"}</button>
        <Link to="/">Switch back to log in</Link>
      </FormInputs>
    </Container>
  )
}