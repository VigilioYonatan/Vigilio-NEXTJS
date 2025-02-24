import { File } from "formidable";
import sharp, { type OutputInfo, type Sharp } from "sharp";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { slug } from "~/libs/helpers";
import { FilesSchema } from "../uploads.schema";
import { BASE_URL, dirMode } from "~/config";

/** entities  */
export type UploadsEntities = "users";

export const uploadsEntities: UploadsEntities[] = ["users"];

/**** properties about entities *****/
export type UploadsProperties = "photo";
export const uploadsProperties: UploadsProperties[] = ["photo"];

interface uploadFilesProps {
	files: File[];
	name?: string;
	entity: UploadsEntities;
	qualities: number[] | null;
	directory?: string;
}
export async function uploadFiles({
	files,
	entity,
	name,
	qualities,
	directory = "/images",
}: uploadFilesProps) {
	let filesNames: { file: string; dimension?: number }[] = [];
	const dirEmpresa = pathUploads();
	const dir = `${dirEmpresa}/${directory}`;
	const dirEntity = `${dir}/${entity}`;
	if (!fs.existsSync(dirEmpresa)) {
		fs.mkdirSync(dirEmpresa);
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log("Creado directorio correctamente");
	}
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log("Creado directorio correctamente");
	}
	if (!fs.existsSync(dirEntity)) {
		fs.mkdirSync(dirEntity);
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log("Creado directorio correctamente");
	}

	for (const file of files) {
		let sharpFiles: Sharp | Promise<OutputInfo>[] = [];

		if (qualities && file.mimetype?.startsWith("image")) {
			for (const quality of qualities) {
				const fileName = `${
					name ? slug(name) : crypto.randomUUID()
				}${Date.now().toString(32).substring(4)}x${quality}.webp`;
				filesNames = [
					...filesNames,
					{
						file: `${directory.slice(1)}/${entity}/${fileName}`,
						dimension: quality,
					},
				] as { file: string; dimension: number }[];
				sharpFiles = [
					...sharpFiles,
					sharp(file.filepath)
						.resize(quality)
						.webp({ quality: 90 })
						.toFile(path.resolve(dirEntity, fileName)),
				];
			}
		} else {
			const ext = file.originalFilename?.split(".").at(-1);
			const fileName = `${name ? slug(name) : crypto.randomUUID()}.${
				!ext?.length ? "txt" : file.mimetype?.startsWith("image") ? "webp" : ext
			}`;
			const fileexist = path.resolve(dirEntity, fileName);
			fs.renameSync(file.filepath, fileexist);

			filesNames = [
				...filesNames,
				{ file: `${directory.slice(1)}/${entity}/${fileName}` },
			];
		}
		await Promise.all(sharpFiles);
	}
	return filesNames;
}
export function pathUploads() {
	return `${dirMode}/public`;
}

// dimension solo es valido para imagenes
export function printFileWithDimension() {
	return (
		files: { file: string; dimension?: number }[],
		dimension: number | null,
	) => {
		const filterImages = dimension
			? files.filter(
					(img) =>
						img.file!.startsWith("https://") || img.dimension === dimension,
				)
			: files;

		return filterImages.map((file) =>
			file.file!.startsWith("https://")
				? file.file
				: `${BASE_URL()}/${file.file}`,
		);
	};
}
export function removeFile(files: FilesSchema[]) {
	for (const file of files) {
		const image = `${pathUploads()}/${file.file}`;

		if (fs.existsSync(image)) {
			fs.unlinkSync(image);
		}
	}
}
