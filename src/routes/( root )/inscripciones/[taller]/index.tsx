import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";

import styles from "./index.css?inline"

export default component$(() => {
  useStylesScoped$(styles)
  const loc = useLocation()
  const nav = useNavigate()

  return (
    <main>
      <Link href="/inscripciones" style={{
          position: "absolute",
          top: "15px",
          color: "var(--color_principal)",
          transition: "color 0.3s ease-out",
          cursor: "pointer"
        }}
      >{"<"} Regresar</Link>
      <form class="form_inscripcion" preventdefault:submit onSubmit$={(event) => {
        const form = event.target
        const nombreParticipante = form.nombre_participante.value;
        const apellidosParticipante = form.apellido_participante.value;
        const telefonoParticipante = form.telefono_participante.value;
        const edadParticipante = form.edad_participante.value;
        const sexoParticipante = form.sexo_participante.value;
        const correoParticipante = form.correo_participante.value;

        fetch("https://talleres-imm.onrender.com/inscripcion/inscripcion?format=json", {
          method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({
            nombre: nombreParticipante,
            apellidos: apellidosParticipante,
            telefono: telefonoParticipante,
            edad: edadParticipante,
            sexo: sexoParticipante,
            correo: correoParticipante,
            taller: loc.params.taller
          })
        })
        .then((response) => {
          if (response.ok) {
            alert("Inscripcion exitosa")
            nav("/inscripciones")
          } else {
            alert("Error en la inscripcion")
            throw new Error("Error en la peticion de inscripcion")
          }
        })
      }} >
        <span class="campo_formulario">
          <label for="nombre_participante" class="etiqueta_form">Nombre(s): </label>
          <input
            type="text"
            id="nombre_participante"
            name="nombre_participante"
            class="input_form"
            placeholder="Jane"
            required />
        </span>
        <span class="campo_formulario">
          <label for="apellido_participante" class="etiqueta_form">Apellidos: </label>
          <input
            type="text"
            id="apellido_participante"
            name="apellido_participante"
            class="input_form"
            placeholder="Doe"
            required />
        </span>
        <span class="campo_formulario">
          <label for="telefono_participante" class="etiqueta_form">Telefono: </label>
          <input
            type="tel"
            id="telefono_participante"
            name="telefono_participante"
            class="input_form"
            placeholder="9211234567"
            required />
        </span>
        <span class="campo_formulario">
          <label for="edad_participante" class="etiqueta_form">Edad: </label>
          <input
            type="number"
            id="edad_participante"
            name="edad_participante"
            class="input_form"
            placeholder="18"
            required />
        </span>
        <span class="campo_formulario">
          <label for="sexo_participante" class="etiqueta_form">Sexo: </label>
          <select
            id="sexo_participante"
            name="sexo_participante"
            class="input_form"
            required>
              <option value="M">Masculino</option>
              <option value="F" selected>Femenino</option>
              <option value="X">Otro</option>
          </select>
        </span>
        <span class="campo_formulario">
          <label for="correo_participante" class="etiqueta_form">Correo: </label>
          <input
            type="email"
            id="correo_participante"
            name="correo_participante"
            class="input_form"
            placeholder="ejemplo@email.com"
            required />
        </span>
        <input type="submit" class="btn_submit" value="Inscribirse" />
      </form>
    </main>
  )
})