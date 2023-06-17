import { tokens } from './tokens';

export const light = {
  color: 'rgb(0, 0, 0)', // default for icons
  textPrimary: 'rgb(0, 0, 0)',
  textSecondary: 'rgba(0, 0, 0, 0.56)',
  textDisabled: 'rgba(0, 0, 0, 0.32)',
  textPlaceholder: 'rgba(0, 0, 0, 0.32)',
  textAlwaysWhite: 'rgb(255, 255, 255)',
  textAlwaysBlack: 'rgb(0, 0, 0)',
  textLink: tokens.color.accentPrimary.val,
  textError: 'rgb(203, 16, 29)',

  iconPrimary: 'rgb(0, 0, 0)',
  iconSecondary: 'rgba(0, 0, 0, 0.56)',
  iconDisabled: 'rgb(175, 175, 175)',
  iconLink: tokens.color.accentPrimary.val,

  borderPrimary: 'rgba(0, 0, 0, 0.12)',
  borderSecondary: 'rgba(0, 0, 0, 0.08)',

  backgroundPrimary: '#fff',
  backgroundSecondary: 'rgb(245, 245, 245)',
  backgroundOverlayPrimary: 'rgba(0, 0, 0, 0.1)',
  backgroundOverlaySecondary: 'rgba(0, 0, 0, 0.08)',
  backgroundAccent: '#5a58f2',
  backgroundAccentSecondary: '#e8e7fd',
};

type BaseTheme = typeof light;

export const dark: BaseTheme = {
  color: 'rgb(255, 255, 255)', // default for icons
  textPrimary: 'rgb(255, 255, 255)',
  textSecondary: 'rgba(255, 255, 255, 0.54)',
  textDisabled: 'rgba(255, 255, 255, 0.28)',
  textPlaceholder: 'rgba(255, 255, 255, 0.28)',
  textAlwaysWhite: 'rgb(255, 255, 255)',
  textAlwaysBlack: 'rgb(0, 0, 0)',
  textLink: tokens.color.accentPrimary.val,
  textError: 'rgb(235, 102, 102)',

  iconPrimary: 'rgb(255, 255, 255)',
  iconSecondary: 'rgba(255, 255, 255, 0.54)',
  iconDisabled: 'rgb(69, 69, 69)',
  iconLink: tokens.color.accentPrimary.val,

  borderPrimary: 'rgba(255, 255, 255, 0.12)',
  borderSecondary: 'rgba(255, 255, 255, 0.08)',

  backgroundPrimary: '#040506', //rgba(4, 5, 6, 0.34)',
  backgroundSecondary: 'rgb(14, 15, 17)',
  backgroundOverlayPrimary: 'rgba(255, 255, 255, 0.1)',
  backgroundOverlaySecondary: 'rgba(255, 255, 255, 0.08)',
  backgroundAccent: '#5a58f2',
  backgroundAccentSecondary: '#1c1e55',
};
