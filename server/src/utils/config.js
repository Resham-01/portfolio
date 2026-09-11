export function getEnv(key, fallback = undefined) {
	const v = process.env[key];
	return v === undefined || v === "" ? fallback : v;
}


