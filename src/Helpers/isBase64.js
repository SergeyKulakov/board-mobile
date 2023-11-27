export const isBase64 = image =>
  Boolean(/(data:image\/.*?;base64),/g.exec(image))
