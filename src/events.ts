
export function handleEvents(ctx: PluginContext) {
    ctx.getApi().workspaceRuntime.addServerRunningListener(e => {
        console.log(e.getMachineName() + " " + e.getServerName());
    });

    ctx.getApi().editorManager.addFileOperationListener(e =>{
        console.log(e.getFile().getLocation() + "@" + e.getOperationType());
    })

    ctx.getApi().editorManager.addEditorOpenedListener(e =>{
        console.log(e.getFile().getLocation() + "#" + e.getEditor());
        e.getFile().getContent().then(c =>{
            console.log(c);
        })
    });
}