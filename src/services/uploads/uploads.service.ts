import { UsersService } from "@/users/users.service";
import {
    removeFile,
    uploadFiles,
    UploadsEntities,
    UploadsProperties,
} from "./libs/helpers";
import { File } from "formidable";
import {
    type ValidationProps,
    validateUpload,
    BadRequestException,
    Injectable,
} from "@vigilio/next-api";

@Injectable()
export class UploadsService {
    constructor(private readonly usersService: UsersService) {}

    async store(props: { req: Request; entity: string; property: string }) {
        const { entity, property } = props;
        const { files, filesName: name } = props.req as Request & {
            files: File[];
            filesName: string;
        };
        let qualities = {} as { qualities: number[] | null; directory: string };
        switch (entity) {
            case "users":
                if (property === "photo") {
                    qualities = await this.customUpload(
                        files,
                        { maxFiles: 1, required: true },
                        [100, 300] //dimension de imagenes que crear 100px y 300px
                    );
                }
                break;
            default: {
                throw new BadRequestException(
                    "Error server, comunicarse con desarrollador"
                );
            }
        }
        const responseFile = await uploadFiles({
            files,
            entity: entity as UploadsEntities,
            name,
            ...qualities,
        });
        return {
            success: true,
            files: responseFile,
        };
    }
    async update(props: {
        req: Request;
        id: string;
        entity: UploadsEntities;
        property: UploadsProperties;
    }) {
        const { entity, property, id } = props;
        const { files, filesName: name } = props.req as Request & {
            files: File[];
            filesName: string;
        };
        let entidad = null;
        switch (entity) {
            case "users": {
                const { user } = await this.usersService.show(id);
                entidad = user;
                if (user.photo) {
                    removeFile(user.photo);
                }
                break;
            }

            default: {
                throw new BadRequestException(
                    "Error server, comunicarse con desarrollador"
                );
            }
        }
        let filesFoto = null;

        if (files) {
            const { files: responseFile } = await this.store({
                req: props.req,
                entity,
                property,
            });
            filesFoto = responseFile;
        }

        /*
        type here is so difficult but  i know that you understand me
        */
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (entidad as any)[property] = filesFoto;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        await (entidad as any).save();
        return {
            success: true,
            files: filesFoto,
        };
    }
    async customUpload(
        files: File[],
        validation: ValidationProps,
        qualities: number[] | null,
        directory = "/images"
    ) {
        try {
            await validateUpload(files, validation);
            return { qualities, directory };
        } catch (error) {
            throw new BadRequestException(error as string);
        }
    }
}
