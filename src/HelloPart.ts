const clock = require('./clock/clock.html');

export class HelloPart implements Part {
    
    title: string;

    constructor(title: string) {
        this.title = title;
    }

    getTitle(): String {
        return this.title;
    }
    getUnreadNotificationsCount(): number {
        return 0;
    }
    getTitleToolTip(): String {
        return "JS Part View"
    }
    getSize(): number {
        return 280;
    }
    onOpen(): void {
       console.log("Js Part on Open");
    }
    getView(): Element {
        let view = document.createElement("div");
        view.innerHTML = clock;
        return view;
    }

    getImageId(): String {
        return "js.plugin.png"
    }
}