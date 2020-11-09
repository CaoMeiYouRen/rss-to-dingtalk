import dayjs from 'dayjs'
import colors from 'colors'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

/**
 * 格式化时间
 *
 * @author CaoMeiYouRen
 * @date 2020-09-23
 * @export
 * @param {(number | string | Date)} [date=Date.now()]
 * @param {string} [pattern='YYYY-MM-DD HH:mm:ss.SSS']
 * @returns
 */
export function timeFormat(date: number | string | Date = Date.now(), pattern: string = 'YYYY-MM-DD HH:mm:ss.SSS') {
    if (typeof date === 'number' && date.toString().length === 10) {
        if (date < 1e10) {
            date *= 1000
        }
    }
    return dayjs(date).tz().format(pattern)
}

export function printTime(args: any) {
    console.log(`${colors.yellow(timeFormat())}: ${colors.green(JSON.stringify(args))}`)
}