import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type EmailAndPassword = {
  email: string;
  password: string;
};

export function SignUp() {
  const [emailAndPassword, setEmailAndPassword] = useState<EmailAndPassword>({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(emailAndPassword);
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailAndPassword),
      });

      if (!response.ok) {
        const errorUser = await response.json();
        setErrorEmail(errorUser.message);
        setErrorPassword(errorUser.messagePassword);
        console.info(errorEmail);
        return;
        // throw new Error("Erreur lors de la soumission du formulaire");
      }
      const data = await response.json();
      // alert("Inscription réussie");
      console.log("Réponse du serveur :", data);
      navigate("/connexion");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleSetEmailAndPassword = (
    event: FormEvent<HTMLFormElement>,
    input: keyof EmailAndPassword
  ) => {
    console.log(event.target.value);
    setEmailAndPassword((prevState) => ({
      ...prevState,
      [input]: event.target.value,
    }));
  };

  const styleColorPassword = { background: "" };
  let buttonActiveEmail = true;
  let buttonActivePassword = true;
  if (emailAndPassword.password.length > 0) {
    styleColorPassword.background = "red";
    if (
      emailAndPassword.password.match(/[A-Z]/) ||
      emailAndPassword.password.match(/[!@]/)
    ) {
      styleColorPassword.background = "green";
      if (
        emailAndPassword.password.match(/[A-Z]/) &&
        emailAndPassword.password.match(/[!@]/)
      ) {
        styleColorPassword.background = "yellow";
        if (
          emailAndPassword.password.match(
            /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{20,55}$/
          )
        ) {
          styleColorPassword.background = "blue";
          buttonActivePassword = false;
        }
      }
    }
  } else {
    styleColorPassword.background = "transparent";
  }

  if (
    emailAndPassword.email.match(/@(gmail\.com|hotmail\.com|.+\.com|.+\.fr)$/i)
  ) {
    if (
      emailAndPassword.email.match(
        /^(?=.*[^@])[\w.-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$/
      )
    ) {
      buttonActiveEmail = false;
    }
  }
  let validateEnter = true;
  if (!buttonActiveEmail) {
    if (!buttonActivePassword) {
      validateEnter = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="SignUp">
      <div className="userBox">
        <label htmlFor="email">""</label>
        <input
          type="text"
          id="email"
          onChange={() => handleSetEmailAndPassword(event, "email")}
        />
      </div>
      {errorEmail ?? <p>{errorEmail}</p>}
      <div className="userBox">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          onChange={() => handleSetEmailAndPassword(event, "password")}
        />
      </div>
      {errorPassword ?? <p>{errorPassword}</p>}
      <div className="passwordRenforced" style={styleColorPassword}></div>
      <button disabled={validateEnter} type="submit">
        Submit
      </button>
    </form>
  );
}
