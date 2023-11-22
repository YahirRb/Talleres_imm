import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

import styles from "./login.css?inline";
import IMMLogo from "~/media/assets/logo.png?jsx";
import BGLogin from "~/media/assets/img_login.jpg?jsx";

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  const tipoPassword = useSignal("password");

  return (
    <>
      <main>
        <div class="cont_img">
          <span class="img_fondo">
            <BGLogin />
          </span>
          <span class="logo_login">
            <IMMLogo />
          </span>
          <span class="atribucion">
            Foto de{" "}
            <a href="https://unsplash.com/es/@kmagnuson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Karl Magnuson
            </a>{" "}
            en{" "}
            <a href="https://unsplash.com/es/fotos/MvxMvPO3S1M?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </span>
        </div>
        <div class="login_panel titulos">
          <h2 class="titulo_sistema">Gestión de talleres IMM</h2>
          <form
            class="login_form"
            preventdefault: submit
            onSubmit$={(event) => {
              // Aqui se agrega la logica del LOGIN
              let usuario = event.target.campo_usuario.value;
              let contra = event.target.campo_contrasena.value;
              //nav("/");
              console.log(usuario);
              console.log(contra);

              fetch("https://talleres-imm.onrender.com/api/login", {
                method: "POST", headers: {
                  "Content-Type": "application/json"
                }, body: JSON.stringify({
                  correo: usuario,
                  password: contra
                })
              })
                .then(response => {
                  if (response.ok) {
                    //alert(response.status)
                    nav("/");
                    //return response.text();
                  } else {
                    throw new Error('Error en la petición POST');
                  }
                })
              /**
              .then(responseText => {
                const data = JSON.parse(responseText);
                console.log(data);
              })
              .catch(error => {
                console.error('Error:', error);
              })
              .finally(() => console.log("Peticion concluida")
              );
              */
            }}
          >

            <span class="cont_campo">
              <label for="campo_usuario">Usuario: </label>
              <input
                class="campo"
                id="campo_usuario"
                placeholder="usuario123"
                required
              />
            </span>
            <span class="cont_campo" id="cont_campo_contrasena">
              <label>Contraseña: </label>
              <input
                type={tipoPassword.value}
                class="campo"
                id="campo_contrasena"
                placeholder="********"
                required
              />
              <input
                type="checkbox"
                class="cambiar_vista_contra"
                onChange$={(event) => {
                  const ojo = document.getElementById(
                    "ojo_contrasena"
                  ) as HTMLElement;
                  if (event.target.checked) {
                    tipoPassword.value = "text";
                    ojo.classList.remove("bi-eye-fill");
                    ojo.classList.add("bi-eye-slash-fill");
                  } else {
                    tipoPassword.value = "password";
                    ojo.classList.remove("bi-eye-slash-fill");
                    ojo.classList.add("bi-eye-fill");
                  }
                }}
              />
              <i class="bi bi-eye-fill ojo" id="ojo_contrasena"></i>
            </span>
            <input
              type="submit"
              value="Iniciar sesión"
              class="btn_login"
              onClick$={() => {
                // window.location.href = "/";
              }}
            />
            <span class="recuperar_registrarse">
              <p class="rec_reg_texto">¿Has olvidado tu contraseña?</p>
              <a href="/recuperar-contrasena" class="enlaces">
                Recuperar contraseña
              </a>
              <p class="rec_reg_texto">O sino estas registrado</p>
              <a href="/registro" class="enlaces">
                Registrate
              </a>
            </span>
          </form>
        </div>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Iniciar sesión",
  meta: [
    {
      name: "description",
      content: "Descripción",
    },
  ],
};
