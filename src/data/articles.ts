// Fonte de dados real em src/pages/public/articles/data.ts (a tela de
// artigos é dona do conteúdo). Este módulo só re-exporta para quem
// precisa reaproveitar os mesmos artigos fora daquela pasta — hoje a
// landing (`landing-page/mock.ts`) e a Central de Conteúdos privada.
export * from "@/pages/public/articles/data";
