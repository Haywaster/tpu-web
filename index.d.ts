declare module'*.scss' {
	const content: {[key: string]: any}
	export = content
}

declare module '*.mp4' {
	const src: string;
	export default src;
}