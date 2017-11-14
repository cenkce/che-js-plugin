
export function initActions(ctx:PluginContext){

    let d1 = ctx.getApi().actionManager.registerAction("cjp.test.action", (d:any)=>{d.setEnabledAndVisible(true)}, (d:any)=>{alert("Test JS Action")});
    let d2 = ctx.getApi().actionManager.registerAction("cjp.action.in.group", (d:any)=>{d.setEnabledAndVisible(true)}, (d: any)=>{alert("Action in a group")});
    ctx.addDisposable(d1);
    ctx.addDisposable(d2);
}