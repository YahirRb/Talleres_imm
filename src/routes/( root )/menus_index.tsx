import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";

import "./menus_index.css";

export const MenuDefault = component$(() => {
  const nombre = "{nombre del empleado}";
  return (
    <>
      <div class="cont_bienvenida">
        <p class="bienvenida">Buen dia {nombre}</p>
      </div>
    </>
  );
});

interface MesesProps {
  value: number;
  mes: string;
  selected?: boolean;
}

const Mes = component$<MesesProps>((props) => {
  if (props.selected)
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
  if (new Date().getMonth() + 1 == Number(numeroMes))
    return (
      <Mes
        key={numeroMes}
        value={Number(numeroMes)}
        mes={nombreMes}
        selected={true}
      />
    );
  return (
    <Mes
      key={numeroMes}
      value={Number(numeroMes)}
      mes={nombreMes}
      selected={false}
    />
  );
});

export const AgregarTaller = component$(() => {
  const mesTaller = useSignal(String(new Date().getMonth() + 1));

  return (
    <>
      <form class="form_talleres" preventdefault:submit onSubmit$={() => {}}>
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
