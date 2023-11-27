export default {
  topBar: {
    drawBehind: true,
    visible: false,
    animate: false,
    height: 0,
    elevation: 0,
    noBorder: true,
  },
  sideMenu: {
    left: {
      width: 300,
      visible: false,
      enabled: false,
    },
  },
  animations: {
    setRoot: {
      alpha: {
        from: 0,
        to: 1,
        duration: 800,
        startDelay: 200,
        interpolation: 'accelerate',
      },
    },
  },
}
