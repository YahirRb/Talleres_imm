import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { Header } from "../../components/header/header";

import styles from "./layout.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useRecuperarTalleres = routeLoader$(async (requestEvent) => {
  const response = await fetch(
    "https://talleres-imm-aziv.onrender.com/talleres"
  );
  const talleres = await response.json();
  return talleres;
});

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <Header />
      <div class="cont_main">
        <Slot />
      </div>
    </>
  );
});
