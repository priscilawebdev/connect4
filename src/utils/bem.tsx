const flattenMods = (mods) =>
	Object.keys(mods).reduce((memo, key) => {
		if (mods[key]) {
			memo.push(key)
		}
		return memo
	}, [])

const applyModifiers = (base, modifiers) => {
	if (!modifiers) {
		return base
	}

	if (!Array.isArray(modifiers)) {
		if (typeof modifiers !== 'object') {
			modifiers = [modifiers]
		} else if (typeof modifiers === 'object') {
			modifiers = flattenMods(modifiers)
		}
	}

	return [base].concat(modifiers.map((mod) => `${base}--${mod}`)).join(' ')
}

export const be = (
	block: string,
	element: string,
	modifiers?: string | { [key: string]: boolean },
	utilities: string[] = []
): string =>
	`${applyModifiers(`${block}-${element}`, modifiers)} ${utilities.join(' ')}`

export const bm = (
	block: string,
	modifiers?: string | { [key: string]: boolean },
	utilities: string[] = []
): string => `${applyModifiers(block, modifiers)} ${utilities.join(' ')}`
