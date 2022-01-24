console.log(Date.now())
console.log(new Date(1643673540000))
                //   1643673540000
console.log(new Date(1643673540000).toUTCString())
console.log(';')
console.log((new Date('Mon, 31 Jan 2022 23:59:00 GMT')))
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
console.log(new Date(1643673540000).toString())
// 2018-08-21T06:59:00.000Z
// 2018-08-20T23:59:00
console.log(new Date('2018-08-21T06:59:00.000Z').getTime())