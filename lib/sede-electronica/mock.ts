// Implementación mock del adapter de Sede Electrónica (demo)
// Simula las respuestas del sistema real sin conexión.

import type { SedeElectronicaAdapter } from "./adapter";

export const mockSedeElectronica: SedeElectronicaAdapter = {
  async solicitarCita(motivo: string, idioma: string) {
    const ref = `CIT-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const messages: Record<string, string> = {
      gl: `Solicitud de cita previa registrada (referencia ${ref}). Xestionarase a través dos canles oficiais do Concello.`,
      es: `Solicitud de cita previa registrada (referencia ${ref}). Se gestionará a través de los canales oficiales del Concello.`,
      en: `Prior appointment request registered (reference ${ref}). It will be managed through the official channels of the Council.`,
    };
    return {
      ok: true,
      reference: ref,
      message: messages[idioma] ?? messages.es,
    };
  },

  async consultarEstado(reference: string) {
    return {
      ok: true,
      status: "registrada",
      message: `La cita ${reference} está registrada en modo demo (simulación). En producción se consultará el estado real.`,
    };
  },

  async registrarEscrito(titulo: string, contenido: string) {
    const regId = `REG-${Date.now().toString(36).toUpperCase()}`;
    return {
      ok: true,
      registroId: regId,
      message: `Escrito "${titulo}" registrado en modo demo (simulación). Referencia: ${regId}. En producción se presentará vía Sede Electrónica.`,
    };
  },
};
