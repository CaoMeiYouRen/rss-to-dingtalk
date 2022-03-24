import fs from 'fs-extra'
import colors from 'colors'
import { Markdown, Robot, Text } from 'ts-dingtalk-robot'
import { DINGTALK, ENABLE_DINGTALK_PUSH } from '@/config'
import { timeFormat } from './time'


let robot: Robot
if (ENABLE_DINGTALK_PUSH) {
    robot = new Robot({
        accessToken: DINGTALK.DINGTALK_ACCESS_TOKEN,
        secret: DINGTALK.DINGTALK_SECRET,
    })
}

/**
 * 钉钉消息推送
 *
 * @author CaoMeiYouRen
 * @date 2020-06-02
 * @export
 * @param {string} title
 * @param {string} [text]
 * @returns
 */
export async function dingtalk(title: string, text?: string) {
    if (!robot) {
        console.warn(colors.yellow('robot未初始化！'))
        return
    }
    if (!text) {
        return robot.send(new Text(title))
    }
    const markDown = new Markdown()
    markDown.setTitle(title).add(`${text}`)
    return robot.send(markDown)
}
