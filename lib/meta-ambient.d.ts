// The `server-only` package has no bundled type declarations. This marks it as a
// side-effect-only module so TypeScript resolves `import 'server-only'` cleanly.
declare module 'server-only';
