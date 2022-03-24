import path = require('path')
import fs = require('fs-extra')
import moduleAlias from 'module-alias'
moduleAlias.addAlias('@', path.join(__dirname, './'))
import Parser from 'rss-parser'
import md5 from 'md5'
import { rssParserURL } from './utils/rssParser'
import { sleep } from './utils/helper'
import { dingtalk } from './utils/dingtalk'
import { printTime, timeFormat } from './utils/time'
import { replaceImageSrc, replaceASrc, removeHtmlTag } from './utils/strHelper'
import store from './utils/store'
import { API_SLEEP_TIME, SLEEP_TIME } from './config'

async function getSubscribeList() {
    return (await fs.readFile('subscribeList.txt', 'utf-8'))
        .split(/\n/)
        .map((e) => e.trim())
        .filter((e) => !!e)
        .filter((e) => !e.startsWith('#')) // 过滤掉开头为 # 号的
}

function rssFormat(rss: Parser.Output<any>) {
    const title = `检测到【 ${rss.title} 】有更新`
    const lastItem = rss.items && rss.items[0]
    if (!lastItem) {
        return
    }
    let text = `${title}\n`
    // const itemTitle = rss.title?.replace(/\.\.\.$/, '') // 移除句末省略号
    const content = lastItem.content
    // 排除内容和标题重复
    // if (itemTitle && !content?.startsWith(itemTitle)) {
    //     text += `${itemTitle}\n`
    // }
    text += `${content}\n`
    const link = lastItem.link
    const date = timeFormat(lastItem.isoDate, 'YYYY-MM-DD HH:mm:ss')
    text += `链接：${link}\n`
    text += `时间：${date}`

    text = replaceImageSrc(text)
    text = replaceASrc(text)
    text = text.replace(/<br>/g, '\n') // 转换所有 <br> 为 \n
    text = removeHtmlTag(text)
    text = text.replace(/(\n[\s|\t]*\r*\n)/g, '\n') // 去除多余换行符
    text = text.replace(/\n/g, '\n\n') // 替换为markdown下的换行
    return {
        title,
        text,
        date: lastItem.isoDate || '',
    }
}

async function saveRss(data: {
    key: string
    date: string
}) {
    const { key, date } = data
    store.set(key, new Date(date).getTime())
    const lastDate = await fs.readJSON('data/lastDate.json')
    lastDate[key] = new Date(date).getTime()
    await fs.writeFile('data/lastDate.json', JSON.stringify(lastDate, null, 4))
}

async function pushRss(data: {
    key: string
    title: string
    text: string
    date: string
}) {
    const { key, title, text, date } = data
    const nowTime = new Date(date).getTime()
    const lastTime = Number(store.get(key) as number || 0)
    // console.log(JSON.stringify(nowTime), JSON.stringify(lastTime))
    if (nowTime > lastTime) {
        // push
        await dingtalk(title, text)
        printTime(title)
        await saveRss(data)
    }
}

async function start() {
    if (!await fs.pathExists('data')) {
        await fs.mkdir('data')
    }
    if (!await fs.pathExists('data/lastDate.json')) {
        await fs.writeFile('data/lastDate.json', JSON.stringify({}, null, 4))
    } else {
        const lastDate = await fs.readJSON('data/lastDate.json')
        Object.keys(lastDate).forEach((key) => {
            store.set(key, lastDate[key])
        })
    }
    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            const list = await getSubscribeList()
            for (let i = 0; i < list.length; i++) {
                const e = list[i]
                const rss = await rssParserURL(e)
                const data = rssFormat(rss)
                if (data) {
                    const key = e.replace(/[^A-Za-z0-9]/ig, '_')
                    await pushRss({ ...data, key })
                }
                await sleep(API_SLEEP_TIME)
            }
        } catch (error) {
            console.error(error)
        } finally {
            await sleep(SLEEP_TIME)
        }
    }
}

start()
