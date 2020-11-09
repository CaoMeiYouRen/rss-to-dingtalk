
/**
 * 提取 \<img\> 标签中的 src 路径
 *
 * @author CaoMeiYouRen
 * @date 2020-10-17
 * @export
 * @param {string} content
 * @returns {string[]}
 */
export function getImgSrc(content: string): string[] {
    const res = content.matchAll(/src="(.*?)"/g)
    return [...res].map(e => e[1])
}

/**
 * 替换 \<img> 为 markdown 版本图片
 *
 * @author CaoMeiYouRen
 * @date 2020-11-07
 * @export
 * @param {string} content
 * @returns
 */
export function replaceImageSrc(content: string) {
    const res = content.matchAll(/<img(.*?)>/g)
    const imgs = [...res].map(e => e[0]).map(e => {
        const f = e.match(/src="(.*?)"/)
        const src = f && f[1]
        return {
            img: e,
            src: `![](${src})`,
        }
    })
    imgs.forEach(e => {
        content = content.replace(e.img, e.src)
    })
    return content
}
/**
 * 替换 \<a>
 *
 * @author CaoMeiYouRen
 * @date 2020-11-07
 * @export
 * @param {string} content
 * @returns
 */
export function replaceASrc(content: string) {
    const res = content.matchAll(/<a(.*?)>/g)
    const imgs = [...res].map(e => e[0]).map(e => {
        const f = e.match(/href="(.*?)"/)
        const src = f && f[1]
        return {
            img: e,
            src: `${src} `,
        }
    })
    imgs.forEach(e => {
        content = content.replace(e.img, e.src || e.img)
    })
    return content
}


/**
 * 移除所有HTML标签。例如\<a\>123\</a\>
 *
 * @author CaoMeiYouRen
 * @date 2020-06-11
 * @export
 * @param {string} str
 * @returns
 */
export function removeHtmlTag(str: string) {
    return str ? str.replace(/<[^>]*>/mg, '') : str
}