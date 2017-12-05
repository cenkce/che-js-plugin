
export function handleEvents(ctx: PluginContext) {
    ctx.getApi().workspaceRuntime.addServerRunningListener(e => {
        console.log(e.getMachineName() + " " + e.getServerName());
    });

    ctx.getApi().editorManager.addFileOperationListener(e =>{
        console.log(e.getFile().getLocation() + "@" + e.getOperationType());
        console.log("Project " + ctx.getApi().appContext.getRootProject());
    })

    ctx.getApi().editorManager.addEditorOpenedListener(e =>{
        console.log(e.getFile().getLocation() + "#" + e.getEditor());
    });
}