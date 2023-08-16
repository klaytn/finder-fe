type EventType = keyof GlobalEventHandlersEventMap

export class GlobalEventHandlerManager<Key, Handler extends () => void = () => void> {
    private readonly handlerMap = new Map<Key, Handler>()
    private isInstalled = false

    constructor(readonly eventType: EventType) {}

    add(key: Key, handler: Handler) {
        this.handlerMap.set(key, handler)
        if (!this.isInstalled && this.handlerMap.size > 0) {
            this.install()
        }
    }

    remove(key: Key) {
        this.handlerMap.delete(key)
        if (this.isInstalled && this.handlerMap.size === 0) {
            this.uninstall()
        }
    }

    private handleEvent = () => {
        this.handlerMap.forEach((handler) => handler())
    }

    private install() {
        window.addEventListener(this.eventType, this.handleEvent, true)
        this.isInstalled = true
    }

    private uninstall() {
        window.removeEventListener(this.eventType, this.handleEvent, true)
        this.isInstalled = false
    }
}
