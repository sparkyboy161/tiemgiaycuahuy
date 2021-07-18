const createMessage = (status, message, payload) => ({ status, message, data: payload });

export const Utils = { createMessage }