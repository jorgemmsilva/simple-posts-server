const moment = require('moment')

var friday

const updateFriday = () => {
  // get next friday
  friday = moment().utc()
    .isoWeekday('friday')
    .set({ hour:15, minute:0, second:0, millisecond:0 })

  const now = moment.utc()

  if (now < friday){
    friday.subtract(1, 'week')
  }

  const millisecondsTillNextFriday = (
    friday.clone().add(1, 'week').valueOf() - now.valueOf() + 60000
  )

  // schedule to update next friday
  setTimeout(updateFriday, millisecondsTillNextFriday)
}

updateFriday()

module.exports = friday
