# Arquitectura Pharmacontrol V2

Este repo contiene el frontend de la migracion. La API NestJS existente se consume mediante `VITE_API_URL`.

## Capas del frontend

```text
src/
  app/          Configuracion de rutas y layout global
  components/   Componentes reutilizables de UI
  features/     Flujos por dominio cuando empiece la migracion
  pages/        Pantallas principales
  services/     Clientes HTTP hacia NestJS
  styles.css    Tailwind y estilos globales
```

## Orden de migracion

1. Pagina principal publica desde Django, actualizando estilos.
2. Login conectado a NestJS.
3. Dashboard con datos reales.
4. Modulos internos migrados por feature.

## Reglas de trabajo

- No borrar templates o logica anterior cuando se incorporen como referencia.
- Migrar por pantalla o feature, no por archivos sueltos inconexos.
- Mantener contratos HTTP en `src/services`.
- Usar `.env` local para variables publicas de Vite, como `VITE_API_URL`.
- Mantener tipos compartidos cerca de cada feature hasta que exista una necesidad real de extraerlos.
