import { getTranslate } from 'Helpers/languages'

export const getText = () => ({
  title: getTranslate('jobDetail.applyForThisJob'),
  subTitle: getTranslate('jobDetail.suggestWhichDay'),
  apply: getTranslate('findJobPage.apply'),
  skip: getTranslate('jobPost.cancel'),
})
