/// <amd-module name="redhat.che-js-plugin.actions"/>
export function initActions(ctx:any){
    ctx.actionManager.registerAction("cjp.test.action", (d:any)=>{d.setEnabledAndVisible(true)}, (d:any)=>{alert(d.getText())});
    ctx.actionManager.registerAction("cjp.action.in.group", (d:any)=>{d.setEnabledAndVisible(true)}, (d: any)=>{alert(d.getText())});
}