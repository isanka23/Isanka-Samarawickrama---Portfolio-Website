/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST endpoint that accepts a JSON BookingRequest. Unset = booking disabled. */
  readonly VITE_BOOKING_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
