// To parse this data:
//
//   import { Convert, Vuelo } from "./file";
//
//   const vuelo = Convert.toVuelo(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Vuelo {
    origen:  string;
    destino: string;
    fecha:   string;
    uid:     string;
}

