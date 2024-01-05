import {
  component$,
  noSerialize,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import QrScanner from "qr-scanner";

import styles from "./index.css?inline";
import Swal from "sweetalert2";
import { useRecuperarTalleres } from "../../layout";

interface TallerProps {
  id_doc: number;
  nombre: string;
  instructor: string;
  dias: string;
  mes: string;
  cupo: number;
}

function formatFecha(dato: number) {
  if (dato < 10) {
    return `0${dato}`;
  } else {
    return String(dato);
  }
}

function listarTalleres(talleres: any) {
  const talleresOpts = [];
  for (let i = 0; i < talleres.length; i++) {
    const taller = talleres[i];
    const tallerOpt = <option value={taller.id_doc}>{taller.nombre}</option>;
    talleresOpts.push(tallerOpt);
  }
  return talleresOpts;
}

function listarAsistentes(asistentes: any) {
  const asistentesOpts = [];
  for (let i = 0; i < asistentes.length; i++) {
    const asistente = asistentes[i];
    const nombre: string = `${asistente.nombre} ${asistente.apellidos}`;
    const asistenteOpt = <option value={asistente.id_doc}>{nombre}</option>;
    asistentesOpts.push(asistenteOpt);
  }
  return asistentesOpts;
}

const useRecuperarAsistentes = routeLoader$(async (requestEvent) => {
  const response = await fetch(
    "https://talleres-imm-aziv.onrender.com/participantes/1"
  );
  const asistentes = await response.json();
  return asistentes;
});

const recuperarAsistentes = async (taller: number) => {
  const response = await fetch(
    `https://talleres-imm-aziv.onrender.com/participantes/${taller}`
  );
  const asistentes = await response.json();
  return asistentes;
};

export default component$(() => {
  useStylesScoped$(styles);

  const talleres = useRecuperarTalleres().value;
  const asistentes = useSignal(useRecuperarAsistentes().value);

  // console.log(asistentesMostrar.value);

  const corriendo_scanner = useSignal(false);

  interface AsistenciaQR {
    asistente: number;
    // taller: number;
  }
  const scannerInstance = useSignal({});
  useVisibleTask$(() => {
    const scannerQR = document.getElementById("qr_video") as HTMLVideoElement;
    const scanner = new QrScanner(
      scannerQR,
      (result) => {
        scanner.stop();
        try {
          const datos_qr: AsistenciaQR = JSON.parse(result.data);
          const date = new Date();
          const fecha = `${formatFecha(date.getDay())}/${formatFecha(
            date.getMonth()
          )}/${formatFecha(date.getFullYear())}`;
          const hora = `${formatFecha(date.getHours())}:${formatFecha(
            date.getMinutes()
          )}`;

          if (
            Object.keys(datos_qr).length == 1 &&
            datos_qr.hasOwnProperty("asistente")
          ) {
            fetch("https://talleres-imm-aziv.onrender.com/asistencia/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: datos_qr.asistente }),
            })
              .then((response) => {
                if (response.ok) {
                  if (response.status == 200) {
                    Swal.fire({
                      text: "Asistencia registrada",
                      icon: "success",
                      showConfirmButton: true,
                      confirmButtonColor: "#d43b69",
                    }).then(() => {
                      scanner.start();
                    });
                  } else if (response.status == 203) {
                    Swal.fire({
                      text: "Asistencia registrada con anterioridad",
                      icon: "error",
                      showConfirmButton: true,
                      confirmButtonColor: "#d43b69",
                    }).then(() => {
                      scanner.start();
                    });
                  } else if (response.status == 404) {
                    Swal.fire({
                      text: "Asistente no encontrado",
                      icon: "error",
                      showConfirmButton: true,
                      confirmButtonColor: "#d43b69",
                    }).then(() => {
                      scanner.start();
                    });
                  }
                }
              })
              .catch((error) => {
                Swal.fire({
                  text: "Hubo un error al registrar la asistencia",
                  icon: "error",
                  showConfirmButton: true,
                  confirmButtonColor: "#d43b69",
                });
              });
          } else {
            throw new Error();
          }
        } catch {
          Swal.fire({
            text: "Codigo QR erroneo",
            icon: "error",
          }).then(() => {
            console.log(result.data);
            scanner.start();
          });
        }
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    scannerInstance.value = noSerialize(scanner);
  });

  return (
    <>
      <section class="contenedor_asistencias">
        <div class="scanner_qr">
          <h2 class="titulos">Escaner de QR</h2>
          <span id="cont_qr_video">
            <video id="qr_video"></video>
          </span>
          <span class="cont_botones">
            <button
              class="boton"
              disabled={corriendo_scanner.value}
              onClick$={() => {
                corriendo_scanner.value = true;
                scannerInstance.value.start();
              }}
            >
              Iniciar
            </button>
            <button
              class="boton"
              disabled={!corriendo_scanner.value}
              onClick$={() => {
                corriendo_scanner.value = false;
                scannerInstance.value.stop();
              }}
            >
              Parar
            </button>
          </span>
        </div>
        <div class="cont_form_asistencias">
          <h2 class="titulos">Llenado de asistencias</h2>
          <form
            class="form_asistencias"
            preventdefault:submit
            onSubmit$={(event) => {
              const form = event.target as HTMLFormElement;
              const asistente_id = form.asistente.value as Number;
              console.log(asistente_id);

              fetch("https://talleres-imm-aziv.onrender.com/asistencia/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: asistente_id }),
              }).then((response) => {
                if (response.ok) {
                  if (response.status == 200) {
                    Swal.fire({
                      text: "Asistencia registrada",
                      icon: "success",
                      showConfirmButton: true,
                      confirmButtonColor: "#d43b69",
                    });
                  } else if (response.status == 203) {
                    Swal.fire({
                      text: "Asistencia registrada con anterioridad",
                      icon: "error",
                      showConfirmButton: true,
                      confirmButtonColor: "#d43b69",
                    });
                  } else if (response.status == 404) {
                    Swal.fire({
                      text: "Asistente no encontrado",
                      icon: "error",
                      showConfirmButton: true,
                      confirmButtonColor: "#d43b69",
                    });
                  }
                }
              });
            }}
          >
            <span class="campo_formulario">
              <label for="taller" class="etiqueta_form">
                Taller:
              </label>
              <select
                name="taller"
                id="taller"
                class="input_form"
                onChange$={(event) => {
                  const selct = event.target as HTMLSelectElement;
                  Swal.showLoading();
                  fetch(
                    `https://talleres-imm-aziv.onrender.com/participantes/${selct.value}`
                  )
                    .then((response) => {
                      if (response.ok) {
                        if (response.status == 200) {
                          return response.json();
                        }
                      }
                    })
                    .then((data: any) => {
                      asistentes.value = data;
                    })
                    .catch((error: any) => {
                      console.log(error);
                    })
                    .finally(() => {
                      Swal.close();
                    });
                }}
              >
                {listarTalleres(talleres)}
              </select>
            </span>
            <span class="campo_formulario">
              <label for="asistente" class="etiqueta_form">
                Asistente:
              </label>
              <select name="asistente" id="asistente" class="input_form">
                {listarAsistentes(asistentes.value)}
              </select>
            </span>
            <input
              type="submit"
              class="btn_submit"
              value="Agregar asistencia"
            />
          </form>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Toma de asistencias",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
