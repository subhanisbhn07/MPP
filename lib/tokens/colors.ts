export const colors = {
  primary: {
    yellow: '#FFD700',
    blue: '#4169E1',
  },
  text: {
    onYellow: 'text-gray-900',
    onBlue: 'text-white',
  },
  background: {
    yellow: 'bg-[#FFD700]',
    blue: 'bg-[#4169E1]',
  },
} as const;

export type ColorVariant = 'yellow' | 'blue';

export const sectionVariants: Record<ColorVariant, { bg: string; text: string }> = {
  yellow: {
    bg: colors.background.yellow,
    text: colors.text.onYellow,
  },
  blue: {
    bg: colors.background.blue,
    text: colors.text.onBlue,
  },
};
