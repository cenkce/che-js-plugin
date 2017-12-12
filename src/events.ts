
export function handleEvents(ctx: PluginContext) {
    ctx.getApi().eventBus.addHandler(che.ide.workspace.event.ServerRunningEvent.TYPE, e => {
        console.log(e.getMachineName() + " " + e.getServerName());
    });

    ctx.getApi().eventBus.addHandler(che.ide.editor.EditorOpenedEvent.TYPE, e => {
        console.log(e.getFile().getLocation() + "#" + e.getEditor());
        e.getFile().getContent().then(c => {
            console.log(c);
        });
    });

    ctx.getApi().eventBus.addHandler(che.ide.editor.FileOperationEvent.TYPE, e => {
        console.log(e.getFile().getLocation() + "@" + e.getOperationType());
    });

}