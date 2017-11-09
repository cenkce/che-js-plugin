
export function initActions(ctx:CheApi){
    ctx.actionManager.registerAction("cjp.test.action", (d:any)=>{d.setEnabledAndVisible(true)}, (d:any)=>{alert(d.getText())});
    ctx.actionManager.registerAction("cjp.action.in.group", (d:any)=>{d.setEnabledAndVisible(true)}, (d: any)=>{alert(d.getText())});
}