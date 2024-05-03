import lang from '@lib/lang/en'

export function __(
  key: string,
  replacements: string[] = [],
): string | undefined {
  let value: any = lang

  for (const k of key.split('.')) {
    if (value && value[k] !== undefined) {
      value = value[k]
    } else {
      return undefined
    }
  }

  if (typeof value === 'string') {
    // Replace template placeholders with replacements in sequence
    value = value.replace(/:[a-zA-Z]+/g, () => {
      const replacement = replacements.shift()
      return replacement !== undefined ? replacement : ''
    })
  }

  return value
}
