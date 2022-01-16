import { Attachment } from "src/app/models/usuario.interface";

export interface LeituraPage {
  pedidoMPU: Attachment;
  relatoVitima: Attachment[];
  provasAnexadas: Attachment[];
}
