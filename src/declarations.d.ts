// src/declarations.d.ts
declare module 'jwt-decode' {
  export default function jwt_decode<T>(token: string): T;
}
