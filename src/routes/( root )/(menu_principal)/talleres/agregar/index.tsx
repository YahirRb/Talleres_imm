import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

import styles from "./index.css?inline";

interface MesesProps {
  value: number;
  mes: string;
  elegido?: boolean;
}

export const Mes = component$<MesesProps>((props) => {
  if (props.elegido)
    return (
      <option value={props.value} selected>
        {props.mes}
      </option>
    );
  return <option value={props.value}>{props.mes}</option>;
});

const meses = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const OptsMeses = Object.entries(meses).map(([numeroMes, nombreMes]) => {
  const mesActual = new Date().getMonth();
  if (mesActual + 1 == Number(numeroMes) || mesActual + 1 == 13)
    return (
      <Mes
        key={numeroMes}
        value={Number(numeroMes)}
        mes={nombreMes}
        elegido={true}
      />
    );
  return (
    <Mes
      key={numeroMes}
      value={Number(numeroMes)}
      mes={nombreMes}
      elegido={false}
    />
  );
});

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <form class="form_talleres" preventdefault: submit onSubmit$={() => {
        //Aqui se agrega la LOGICA

        let mesTaller;
        let numMesTaller = document.getElementById("mes_taller");
        let nombreTaller = document.getElementById("nombre_taller");
        let fechaTaller = document.getElementById("fecha_taller");
        let cupoTaller = document.getElementById("cupo_taller");
        let instructorTaller = document.getElementById("instructor_taller");

        if (numMesTaller.value == 1) {
          mesTaller = "Enero";
        } else if (numMesTaller.value == 2) {
          mesTaller = "Febrero";
        } else if (numMesTaller.value == 3) {
          mesTaller = "Marzo";
        } else if (numMesTaller.value == 4) {
          mesTaller = "Abril";
        } else if (numMesTaller.value == 5) {
          mesTaller = "Mayo";
        } else if (numMesTaller.value == 6) {
          mesTaller = "Junio";
        } else if (numMesTaller.value == 7) {
          mesTaller = "Julio";
        } else if (numMesTaller.value == 8) {
          mesTaller = "Agosto";
        } else if (numMesTaller.value == 9) {
          mesTaller = "Septiembre";
        } else if (numMesTaller.value == 10) {
          mesTaller = "Octubre";
        } else if (numMesTaller.value == 11) {
          mesTaller = "Noviembre";
        } else if (numMesTaller.value == 12) {
          mesTaller = "Diciembre";
        }

        console.log(mesTaller);
        console.log(nombreTaller.value);
        console.log(fechaTaller.value);
        console.log(cupoTaller.value);
        console.log(instructorTaller.value);

        fetch("https://talleres-imm.onrender.com/taller/registro", {
          method: "POST", headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify({
                nombre : nombreTaller.value,
                mes : mesTaller,
                dias : fechaTaller.value,
                cupo : cupoTaller.value,
                instructor : instructorTaller.value
            })
        })
          .then(response => {
            if (response.ok) {
              alert(response.status)
              //nav("/login");
              return response.text();
            } else {
              throw new Error('Error en la petición POST');
            }
          })

      }}>
        <span class="campo_formulario">
          <label for="mes_taller" class="etiqueta_form">
            Taller para el mes de:
          </label>
          <select name="mes_taller" id="mes_taller" class="input_form">
            {OptsMeses}
          </select>
        </span>
        <span class="campo_formulario">
          <label for="nombre_taller" class="etiqueta_form">
            Nombre del taller*:
          </label>
          <input
            type="text"
            id="nombre_taller"
            name="nombre_taller"
            class="input_form"
            placeholder="Ej. Curso para ..."
            required
          />
        </span>
        <span class="campo_formulario">
          <label for="fecha_taller" class="etiqueta_form">
            Dia(s) del taller*:
          </label>
          <input
            type="text"
            id="fecha_taller"
            name="fecha_taller"
            class="input_form"
            placeholder="Ej. 01 o 05,06"
            required
          />
        </span>
        <span class="campo_formulario">
          <label for="cupo_taller" class="etiqueta_form">
            Cantidad de cupo*:
          </label>
          <input
            type="number"
            id="cupo_taller"
            name="cupo_taller"
            class="input_form"
            placeholder="Ej. 20"
            required
          />
        </span>
        <span class="campo_formulario">
          <label for="instructor_taller" class="etiqueta_form">
            Instructor(a)*:
          </label>
          <input
            type="text"
            id="instructor_taller"
            name="instructor_taller"
            class="input_form"
            placeholder="Ej. María Perez"
            required
          />
        </span>
        <input type="submit" class="btn_submit" value="Agregar" />
      </form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Agregar taller",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
