
import { HelloPart } from './HelloPart'

let workspace;
let part;
export function initActions(ctx: PluginContext) {
    workspace = ctx.getApi().workspace;
    let d1 = ctx.getApi().actionManager.registerAction("cjp.test.action", (d: any) => { d.setEnabledAndVisible(true) }, showPart);
    let d2 = ctx.getApi().actionManager.registerAction("cjp.action.in.group", (d: any) => { d.setEnabledAndVisible(true) }, hidePart);
    ctx.addDisposable(d1);
    ctx.addDisposable(d2);
}

function showPart() {
    if (!part) {
        part = new HelloPart("Js Part");
        let parts = che.ide.parts.PartStackType;
        workspace.openPart(part, parts.INFORMATION);
        workspace.activatePart(part);
    } else {
        workspace.activatePart(part);
    }

}

function hidePart() {
    workspace.hidePart(part);
}