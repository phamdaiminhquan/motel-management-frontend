/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    // Thêm các biến môi trường khác nếu cần
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  