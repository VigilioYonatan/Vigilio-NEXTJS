import { Injectable, Param, Post, Req, Upload } from "~/decorator/decorators";
import { UploadsService } from "./uploads.service";
import { uploadsStorePipe } from "./pipes/uploads.store.pipe";
import { Pipe } from "~/decorator/validator/valibot";
import type { UploadsProperties, UploadsEntities } from "./libs/helpers";
import { uploadsUpdatePipe } from "./pipes/uploads.update.pipe";
import { File } from "formidable";
import { NextRequest } from "next/server";

@Injectable()
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @Pipe(uploadsStorePipe)
    @Upload()
    @Post("/:entity/:property")
    async store(
        @Param("entity")
        entity: UploadsEntities,
        @Param("property") property: UploadsProperties,
        @Req() req: NextRequest & { files: File[]; filesName?: string }
    ) {
        console.log({ entity });
        console.log({ property });

        const result = this.uploadsService.store({
            req,
            property,
            entity,
        });
        return result;
    }

    @Pipe(uploadsUpdatePipe)
    @Upload()
    @Post("/:entity/:property/:id")
    update(
        @Param("entity") entity: UploadsEntities,
        @Param("id") id: string,
        @Param("property") property: UploadsProperties,
        @Req() req: Request & { files: File[]; filesName?: string }
    ) {
        const result = this.uploadsService.update({
            req,
            id,
            property,
            entity,
        });
        return result;
    }
}
