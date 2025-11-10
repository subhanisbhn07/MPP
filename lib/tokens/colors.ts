export const colors = {
  brand: {
    blue: '#4169E1',
    yellow: '#FFD700',
  },
  surface: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    tertiary: 'bg-gray-100',
  },
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    onBrand: 'text-white',
  },
  border: {
    light: 'border-gray-200',
    default: 'border-gray-300',
  },
} as const;

export type ColorVariant = 'primary' | 'secondary';

export const sectionVariants: Record<ColorVariant, { bg: string; text: string }> = {
  primary: {
    bg: colors.surface.primary,
    text: colors.text.primary,
  },
  secondary: {
    bg: colors.surface.secondary,
    text: colors.text.primary,
  },
};
