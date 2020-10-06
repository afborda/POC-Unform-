import React from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import "./App.css";
import Input from "./components/Form/input";
import { useRef } from "react";
import * as Yup from "yup";
import { useEffect } from "react";

const initialData = {
  email: "abner.borda@gmail.com",
  address: {
    street: "Av. Elmira Pereira silveira",
    neighborhood: "Jardim Algarve",
    city: "Alvorada",
  },
};

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("O nome é obrigatório"),
        email: Yup.string()
          .email("Email não valido!")
          .required("O email é obrigatório"),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, "No minimo 3 caracteres!")
            .required("Cidade é Obrigatória"),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err);
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: "abner fonseca",
        email: "abner.borda@gmail.com",
        password: "333333333",
        address: {
          city: "Alvorada",
        },
      });
    }, 2000);
  });

  return (
    <div className="App">
      <h1>Formulario Unforme</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <Scope path="address">
          <Input name="street" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>
        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
