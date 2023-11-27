export const inSocketTypes = {
  messageReceived: 'messageReceived',
  chatConnected: 'chatConnected',
  notificationReceived: 'notificationReceived',
  spTrackUpdated: 'spTrackUpdated',
  Authorized: 'Authorized',
  Unauthorized: 'Unauthorized',
}

// sendMessage. data: { chatId, message }
// authenticate, data: “Bearer token”

export const outSocketTypes = {
  authenticate: 'authenticate',
  connectToChat: 'connectToChat',
  sendMessage: 'sendMessage',
  updateSpTrack: 'updateSpTrack',
  subscribeSpTrack: 'subscribeSpTrack',
  unsubscribeSpTrack: 'unsubscribeSpTrack',
}
