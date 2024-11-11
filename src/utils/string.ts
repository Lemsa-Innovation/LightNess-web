export const normalizeString = (str: string) => {
	return str
		.normalize("NFD") // Décompose les caractères accentués
		.replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
		.toLowerCase(); // Convertit en minuscule
};

export const searchIn = ({filterValue, values}: {
	filterValue: string
	values: (string | undefined)[]
}) => {
	const keywords = normalizeString(filterValue).split(" ").filter(Boolean); // Suppression des mots vides

	const normalizedValues = values
		.filter((value): value is string => !!value) // Exclure undefined
		.map(normalizeString);

	return keywords.every((keyword) =>
		normalizedValues.some((value) => value.includes(keyword))
	);
}

export const reformulateId = (str: string): string => {
	return normalizeString(str)
		.replace(/[^a-z0-9]/g, "") // Remove all non-alphanumeric characters
		.replace(/\s+/g, ""); // Remove any spaces (if any remain after normalization)
};