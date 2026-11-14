// Factory del adapter de Sede Electrónica (Semana 4 v1.2)
// Selecciona mock o real según SEDE_ELECTRONICA_MODE.

import type { SedeElectronicaAdapter } from "./adapter";
import { mockSedeElectronica } from "./mock";

export function getSedeElectronicaAdapter(): SedeElectronicaAdapter {
  const mode = process.env.SEDE_ELECTRONICA_MODE ?? "mock";
  if (mode === "real") {
    // TODO: implementar adapter real cuando se disponga de credenciales
    // return new RealSedeElectronicaAdapter(process.env.SEDE_ELECTRONICA_BASE_URL!, process.env.SEDE_ELECTRONICA_TOKEN!);
    console.warn("[sede-electronica] mode=real solicitado pero no implementado; usando mock");
  }
  return mockSedeElectronica;
}
