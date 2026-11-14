// Adapter de Sede Electrónica — VIGO AI ADMINISTRATION (Semana 4 v1.2)
// Interfaz abstracta para integración con la Sede Electrónica del Concello.
// Modo: SEDE_ELECTRONICA_MODE=mock (default) | real

export interface SedeElectronicaAdapter {
  /** Solicitar cita previa */
  solicitarCita(motivo: string, idioma: string): Promise<{
    ok: boolean;
    reference: string;
    message: string;
  }>;

  /** Consultar estado de una cita/expediente */
  consultarEstado(reference: string): Promise<{
    ok: boolean;
    status: string;
    message: string;
  }>;

  /** Registrar un escrito (solo vía electrónica autorizada) */
  registrarEscrito(titulo: string, contenido: string): Promise<{
    ok: boolean;
    registroId: string;
    message: string;
  }>;
}
