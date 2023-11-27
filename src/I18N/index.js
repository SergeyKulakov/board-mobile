import I18N from 'react-native-i18n'

import en from './spotJobs-localization/spotJobs-localization/locales/en'
import fr from './spotJobs-localization/spotJobs-localization/locales/fr'
import es from './spotJobs-localization/spotJobs-localization/locales/es'
import it from './spotJobs-localization/spotJobs-localization/locales/it'
import pt from './spotJobs-localization/spotJobs-localization/locales/pt'
import de from './spotJobs-localization/spotJobs-localization/locales/de'
import ru from './spotJobs-localization/spotJobs-localization/locales/ru'
import hi from './spotJobs-localization/spotJobs-localization/locales/hi'
import bg from './spotJobs-localization/spotJobs-localization/locales/bn'
import te from './spotJobs-localization/spotJobs-localization/locales/te'
import mr from './spotJobs-localization/spotJobs-localization/locales/mr'
import ta from './spotJobs-localization/spotJobs-localization/locales/ta'
import gu from './spotJobs-localization/spotJobs-localization/locales/gu'
import kn from './spotJobs-localization/spotJobs-localization/locales/kn'
import ml from './spotJobs-localization/spotJobs-localization/locales/ml'

I18N.fallbacks = true

I18N.defaultLocale = 'en'

I18N.translations = {
  en,
  fr,
  es,
  it,
  pt,
  de,
  ru,
  hi,
  bg,
  te,
  mr,
  ta,
  gu,
  kn,
  ml,
}

export default I18N
