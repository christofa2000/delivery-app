/**
 * Sistema de diseño centralizado
 * Paleta minimalista premium basada en azules y blanco
 */

export const colors = {
  primary: '#3A86FF',        // azul principal
  secondary: '#8338EC',      // violeta secundario
  background: '#FFFFFF',     // fondo base
  backgroundSoft: '#F5F7FB', // fondos de pantalla suaves
  card: '#FFFFFF',           // fondo de cards
  border: '#E0E4F0',         // bordes suaves
  header: '#EFF4FF',         // azul suave para headers
  footer: '#EFF4FF',        // azul suave para footer/tab bar
  textPrimary: '#1E1E1E',
  textSecondary: '#6B7280',
  muted: '#9CA3AF',
  danger: '#EF4444',
  success: '#10B981',
  badge: '#3A86FF',          // badges principales
  badgeSoft: '#E0ECFF',      // fondo de chips/badges suaves
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    shadowColor: '#3A86FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  float: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
};

/**
 * Tipografía recomendada: Inter
 * Fuente moderna y legible, optimizada para interfaces digitales
 */
export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    fontFamily: 'Inter_700Bold',
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    fontFamily: 'Inter_700Bold',
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    fontFamily: 'Inter_400Regular',
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
  },
  // Variantes adicionales de Inter
  medium: {
    fontSize: 16,
    fontWeight: '500' as const,
    fontFamily: 'Inter_500Medium',
    color: colors.textPrimary,
  },
  semibold: {
    fontSize: 16,
    fontWeight: '600' as const,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
  },
};


