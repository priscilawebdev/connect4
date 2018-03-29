interface IModifiers {
  [key: string]: boolean
}

const flattenMods = (modifiers: IModifiers) =>
	Object.keys(modifiers).reduce((mod: string[], key) => {
		if (modifiers[key]) {
      mod.push(key)
		}
		return mod
	}, [])

const applyModifiers = (base: string, modifiers: IModifiers | string[] | undefined) => {
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

	return [base].concat(modifiers.map((mod: string) => `${base}--${mod}`)).join(' ')
}

export const be = (
	block: string,
	element: string,
	modifiers?: IModifiers,
	utilities: string[] = []
): string =>
	`${applyModifiers(`${block}-${element}`, modifiers)} ${utilities.join(' ')}`

export const bm = (
	block: string,
	modifiers?: IModifiers,
	utilities: string[] = []
): string => `${applyModifiers(block, modifiers)} ${utilities.join(' ')}`
