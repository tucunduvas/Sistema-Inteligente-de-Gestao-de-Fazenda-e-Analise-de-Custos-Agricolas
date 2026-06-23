export function getErrorMessage(error: unknown): string {
  // Axios / Fetch style
  if (typeof error === 'object' && error !== null) {
    const anyErr = error as any;

    // Axios
    const data = anyErr?.response?.data;
    const status = anyErr?.response?.status;

    if (typeof data === 'string') {
      return status ? `Erro (${status}): ${data}` : data;
    }

    if (typeof data === 'object' && data) {
      const msg = data?.detail || data?.mensagem || data?.message;
      if (typeof msg === 'string' && msg.trim()) {
        return status ? `Erro (${status}): ${msg}` : msg;
      }
    }

    const message = anyErr?.message;
    if (typeof message === 'string' && message.trim()) return message;
  }

  return 'Erro inesperado ao comunicar com o servidor.';
}

