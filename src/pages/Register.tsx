import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { handleRegistration } from "../services";

export const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Provera da li su svi podaci uneti
    if (!username || !email || !password) {
      alert("Molimo unesite sve potrebne podatke.");
      return;
    }

    // Provera formata email adrese
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Molimo unesite validnu email adresu.");
      return;
    }

    const res = await handleRegistration(username, email, password);

    if (!res) return alert("Došlo je do greške prilikom registracije.");

    if (res.Status === "Success") {
      navigate("/");
    } else {
      alert(res.Error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.alphacoders.com/132/1326370.png)",
        }}
      >
        <div className="absolute bg-gradient-to-b from-primary to-text opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen flex flex-row mx-0 justify-center">
          <div className="flex content-center align-middle justify-center self-center z-10">
            <div className="py-10 px-12 bg-background mx-auto shadow-md shadow-primary rounded-2xl">
              <div className="mb-4 text-center space-y-2">
                <h3 className="font-semibold text-2xl text-primary">
                  Registruj se
                </h3>
                <p className="text-gray-500">
                  Unesi podatke radi registracije na platformu.
                </p>
              </div>
              <form className="space-y-5 pt-4" onSubmit={handleSubmit}>
                <div className=" form-control">
                  <span className="label-text mb-1 text-text">
                    Korisnicko Ime
                  </span>
                  <label className="input input-bordered input-accent flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="#24366a"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      value={username}
                      className="grow"
                      onChange={handleUsernameChange}
                      placeholder="PeraPerić05"
                    />
                  </label>
                </div>
                <div className=" form-control">
                  <span className="label-text mb-1 text-text">Email</span>
                  <label className="input input-bordered input-accent flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="#24366a"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="mail@gmail.com"
                    />
                  </label>
                </div>

                <div className=" form-control">
                  <span className="label-text mb-1 text-text">Lozinka</span>
                  <label className="input input-bordered input-accent flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="#24366a"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      className="grow"
                      onChange={handlePasswordChange}
                      value={password}
                      placeholder="password"
                    />
                  </label>
                  <label className="label label-text">
                    <Link to="/login" className=" label-text text-text">
                      Imaš Nalog?
                      <span className=" link-accent link link-hover">
                        {" "}
                        Prijavi se
                      </span>
                    </Link>
                  </label>
                </div>

                <div className="form-control">
                  <button className="btn mt-2 btn-primary" type="submit">
                    Registruj se
                  </button>
                </div>
              </form>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2024{" "}
                  <a
                    href="https://github.com/Dzekanaa"
                    rel=""
                    target="_blank"
                    title="Dzektor"
                    className="link link-hover link-accent"
                  >
                    Nikola Pešić
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
