
import { HelloPart } from './HelloPart'

let partManager;
let part;
export function initActions(ctx: PluginContext) {
    partManager = ctx.getApi().partManager;
    let d1 = ctx.getApi().actionManager.registerAction("cjp.test.action", (d: any) => { d.setEnabledAndVisible(true) }, showPart);
    let d2 = ctx.getApi().actionManager.registerAction("cjp.action.in.group", (d: any) => { d.setEnabledAndVisible(true) }, hidePart);
    ctx.addDisposable(d1);
    ctx.addDisposable(d2);
}

function showPart() {
    if (!part) {
        part = new HelloPart("Js Part");
        let parts = che.ide.parts.PartStackType;
        partManager.openPart(part, parts.INFORMATION);
        partManager.activatePart(part);
    } else {
        partManager.activatePart(part);
    }

}

function hidePart() {
    partManager.hidePart(part);
}