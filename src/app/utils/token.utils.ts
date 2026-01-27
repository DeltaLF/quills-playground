import tokens from '@tokens';

/**
 * Extracts a flattened array of hex color values from the Core Palette.
 * Iterates through Neutral, Blue, Teal, and Red scales.
 * Useful for populating color pickers.
 */
export function getCoreColorPalette(): string[] {
  // Use 'any' to bypass strict typing on the generated token structure for now,
  // or define an interface if strictness is required later.
  const core = (tokens as any).color.core;
  const palettes = ['neutral', 'blue', 'teal', 'red'];
  const colors: string[] = [];

  palettes.forEach(palette => {
    if (core[palette]) {
      Object.values(core[palette]).forEach((token: any) => {
        colors.push(token.value);
      });
    }
  });
  return colors;
}
