import postcss from "postcss";
import { splitter } from "./plugin/splitter";
import postcssJs from "postcss-js"
import { minify } from 'csso'

import defaultStyle from './vars/style.json'


class SoftUI {
    alloweds: string[] = []

    constructor() {
        const elem = document.createElement("style")
        elem.id = 'soft-ui-dynamic-style'
        document.head.appendChild(elem)

        this.transitionLock()
        this.getAllFirstClasses()
        this.applyDefaultStyle()
        this.applyStyle()
        this.startMutation()
    }

    getClasses(elems: NodeListOf<Element>): string[] {
        const set = new Set<string>()

        elems.forEach(e => {
            e.classList.forEach(j => {
                set.add(j);
            })
        })

        return Array.from(set)
    }

    getAllFirstClasses = () => this.alloweds = this.getClasses(document.querySelectorAll("[class]"))

    startMutation() {
        new MutationObserver(mutations => {
            for (const i of mutations) {
                const set = new Set<string>(this.alloweds)

                if (i.type === "childList") {
                    this.getClasses(i.addedNodes as NodeListOf<Element>).map(e => set.add(e))
                }

                if (i.type === "attributes") {
                    this.getClasses([i.target] as unknown as NodeListOf<Element>).map(e => set.add(e))
                }

                this.alloweds = Array.from(set)
            }

            this.applyStyle()
        }).observe(
            document.body,
            {
                attributes: !0,
                attributeFilter: ["class"],
                childList: !0,
                subtree: !0,
            }
        )
    }

    async transitionLock() {
        const elem = document.createElement("style")

        elem.innerHTML = `
            * {
                transition: none !important;
            }
        `

        document.head.appendChild(elem)
        setTimeout(() => {
            elem.remove()
        }, 150);
    }

    async applyStyle() {
        const data = postcssJs.parse(splitter({
            alloweds: this.alloweds
        }))

        postcss([]).process(data, { from: undefined }).then(re => {
            document.querySelector("#soft-ui-dynamic-style")!.innerHTML = minify(re.css).css
        })
    }

    async applyDefaultStyle() {
        const elem = document.createElement("style")
        const data = postcssJs.parse(defaultStyle)

        postcss([]).process(data, { from: undefined }).then(re => {
            elem.innerHTML = minify(re.css).css
        })

        document.head.appendChild(elem)
    }
}

new SoftUI()
