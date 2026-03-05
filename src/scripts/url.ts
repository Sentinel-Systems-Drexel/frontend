// src/utils/url.ts
const base = import.meta.env.BASE_URL;

export const url = (path: string) =>
    `${base}${path.replace(/^\//, '')}`;