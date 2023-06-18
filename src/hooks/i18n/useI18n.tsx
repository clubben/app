import { getLocales } from 'expo-localization';
import React, { ComponentType } from 'react';

import { I18n } from './lib/i18n';
import { de, en } from './translations';

const locals = getLocales();

export const i18n = new I18n({
  en,
  de,
});

i18n.setLocale(locals[0]);

type Component = {
  component: ComponentType;
  props?: any;
};

type TOptions = {
  components: Component[];
};

export const useI18n = () => {
  /**
   * Returns the translation as a React Component.
   * It offers the ability to wrap parts of the translation with custom components.
   */
  const Trans = ({
    t,
    components,
  }: {
    t: Parameters<(typeof i18n)['t']>[0];
  } & TOptions) => {
    const translation = i18n.t(t);

    const row = React.useMemo(() => {
      const nodes: (string | React.ReactElement)[] = [];
      let translationToParse = translation;
      if (components) {
        components.forEach(({ component: Component, props }, index) => {
          const componentRegExp = new RegExp(`<${index}>(.*)</${index}>`, 'gi');
          const [beforeText, componentText, restText] =
            translationToParse.split(componentRegExp);
          translationToParse = restText;

          if (beforeText && componentText) {
            nodes.push(
              beforeText,
              <Component key={index} {...props}>
                {componentText}
              </Component>
            );
          }
        });
        nodes.push(translationToParse);
        return nodes;
      } else {
        return translation;
      }
    }, [translation, components]);

    return <>{row}</>;
  };

  return {
    Trans,
    t: i18n.t.bind(i18n),
    date: i18n.date.bind(i18n),
    dayjs: i18n.dayjs.bind(i18n),
    setLocale: i18n.setLocale.bind(i18n),
    getLocale: i18n.getLocale.bind(i18n),
  };
};
