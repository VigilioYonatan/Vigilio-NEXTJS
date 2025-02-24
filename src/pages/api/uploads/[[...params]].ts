import { createHandler } from "~/decorator";
import { UploadsController } from "@/uploads/uploads.controller";

export default createHandler([UploadsController]);

// Esta ruta fue creada para usar endpoints para subir archivos Content-Type/multi-form-data
export const config = {
    api: {
        bodyParser: false,
    },
};
