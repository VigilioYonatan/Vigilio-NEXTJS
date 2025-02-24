export function slug(text: string) {
	const slugText = text
		.toLowerCase() // Convertir a minúsculas
		.replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales, excepto guiones y espacios
		.trim() // Eliminar espacios en los extremos
		.replace(/\s+/g, "-") // Reemplazar espacios con guiones
		.replace(/--+/g, "-"); // Reemplazar múltiples guiones contiguos con solo uno
	return slugText;
}
