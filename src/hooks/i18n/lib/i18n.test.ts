import { I18n } from './i18n';

describe('I18n', () => {
  it('Should find nested translations', () => {
    const i18n = new I18n({
      en: {
        test1: {
          test2: 'hi',
        },
      },
    });

    expect(i18n.t('test1.test2')).toBe('hi');
  });

  it('Should return key when not found', () => {
    const i18n = new I18n({
      en: {
        test1: {
          test2: 'hi',
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(i18n.t('test1.test3')).toBe('test1.test3');
  });

  it('Should reference other translation', () => {
    const i18n = new I18n({
      en: {
        hello: 'hello [[world]]',
        world: 'world',

        welcome: 'Hi [[user.name]]',
        user: {
          name: 'Jon Doe',
        },
      },
    });

    expect(i18n.t('hello')).toBe('hello world');
    expect(i18n.t('welcome')).toBe('Hi Jon Doe');
  });
});
