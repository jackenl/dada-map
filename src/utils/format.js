export function timeFormat(second) {
  let result = ''
  if (second < 3600) {
    const minute = Math.floor(second / 60).toString()
    second = (second % 60).toString()
    if (minute.length < 2) {
      result = result + '0' + minute + ':'
    } else {
      result = result + minute + ':'
    }
    if (second.length < 2) {
      result = result + '0' + second
    } else {
      result = result + second
    }
  } else {
    const hour = Math.floor(second / 3600).toString()
    second %= 3600
    const minute = Math.floor(second / 60).toString()
    second = (second % 60).toString()
    if (hour.length < 2) {
      result = result + '0' + hour + ':'
    } else {
      result = result + hour + ':'
    }
    if (minute.length < 2) {
      result = result + '0' + minute + ':'
    } else {
      result = result + minute + ':'
    }
    if (second.length < 2) {
      result = result + '0' + second
    } else {
      result = result + second
    }
  }
  return result
}

export function speedFormat(value) {
  let result = ''
  const value1 = Math.floor(value / 60).toString()
  const value2 = (value % 60).toString()
  if (value1.length < 2) {
    result = '0' + value1 + '\''
  } else {
    result = value1 + '\''
  }
  if (value2.length < 2) {
    result = result + '0' + value2 + '\'\''
  } else {
    result = result + value2 + '\'\''
  }
  return result
}

export function kilometerFormat(value) {
  return (value / 1000).toFixed(1)
}