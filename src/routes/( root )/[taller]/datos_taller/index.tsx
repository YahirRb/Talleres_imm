import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import { Mes } from "../../menus_index"

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

const OptsMesesModificar = (mesElegido: string) => {
  const mesesJSX = Object.entries(meses).map(([numeroMes, nombreMes]) => {
    const mesActual = new Date().getMonth();
    if (mesActual == Number(mesElegido))
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
  return mesesJSX;
}

interface DatosTaller {
  mes: string;
  nombre: string;
  dias: string;
  cupoMaximo: string;
  instructor: string;
}

export default component$(() => {
  const loc = useLocation();
  const taller:DatosTaller = JSON.parse(loc.params.taller);

  return (
    <>
      <form class="form_talleres" preventdefault:submit onSubmit$={() => {}}>
        <span class="campo_formulario">
          <label for="mes_taller" class="etiqueta_form">
            Taller para el mes de:
          </label>
          <select name="mes_taller" id="mes_taller" class="input_form">
            {OptsMesesModificar(taller.mes)}
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
            value={taller.nombre}
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
            value={taller.dias}
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
            value={taller.cupoMaximo}
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
            value={taller.instructor}
            required
          />
        </span>
        <input type="submit" class="btn_submit" value="Modificar" />
      </form>
    </>
  );
});