import { createHandler } from "@vigilio/next-api";
import { UploadsController } from "@/uploads/uploads.controller";
// // Esta ruta fue creada para usar endpoints para subir archivos Content-Type/multi-form-data
export const config = {
    api: {
        bodyParser: false,
    },
};

export default createHandler([UploadsController]);
