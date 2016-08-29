
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'newsbot',
  icon_emoji: config('ICON_EMOJI')
}

let attachments = [
  {
    title: 'newsBot will help you find the hippest repos on GitHub',
    color: '#FF6600',
    text: '`/newsbot repos` returns hip repos \n`/newsbot javascript` returns hip JavaScript repos \n `/newsbot python` returns hip Python repos',
    mrkdwn_in: ['text']
  },
  {
    title: 'Configuring newsBot',
    color: '#E3E4E6',
    text: '`/newsbot help` ... you\'re lookin at it! \n',
    mrkdwn_in: ['text']
  }
]

const handler = (payload, res) => {
  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /help/ig, handler: handler }
