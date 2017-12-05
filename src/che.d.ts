declare module "*.svg" {
    const content: string;
    export default content;
}
declare function require(string): any;
declare module "*.png" {
    const content: any;
    export default content;
}
declare module "*.html" {
    const content: any;
    export default content;
}

declare interface CheApi {
    imageRegistry: ImageRegistry;
    actionManager: ActionManager;
    partManager: PartManager;
    workspaceRuntime: WorkspaceRuntime;
    editorManager: EditorManager;
    appContext: AppContext;
}

declare interface PluginContext {
    getApi(): CheApi;
    addDisposable(d: Disposable): void
}

declare interface Disposable {
    dispose(): void;
}
/**
 * Represents current context of the IDE application.
 */
declare interface AppContext {

    //TODO add resources methods
    // Container getWorkspaceRoot();
    // Project[] getProjects();
    // Resource getResource();
    // Resource[] getResources();
    // Path getProjectsRoot();
    // WorkspaceImpl getWorkspace();

    /**
     * Returns the root project which is in context. To find out specified sub-project in context,
     * method {@link #getResource()} should be called. Resource is bound to own project and to get
     * {@link Project} instance from {@link Resource}, method {@link Resource#getRelatedProject()}
     * should be called.
     *
     * <p>May return {@code null} if there is no project in context.
     *
     * @return the root project or {@code null}
     */
    getRootProject(): Project;

    /**
    * Returns the current user.
    *
    * @return current user
    */
    getCurrentUser(): CurrentUser;

    getWorkspaceId(): String;

    /**
     * Returns URL of Che Master API endpoint.
     */
    getMasterApiEndpoint(): String;

    /**
     * Returns URL of ws-agent server API endpoint.
     *
     * @throws RuntimeException if ws-agent server doesn't exist. Normally it may happen when
     *     workspace is stopped.
     */
    getWsAgentServerApiEndpoint(): String;

    /**
    * Returns context properties, key-value storage that allows to store data in the context for
    * plugins and extensions.
    *
    * @return a modifiable properties map
    */
    getProperties(): { [key: string]: string }

}

/**
 * An object that represents client side project.
 *
 * <p>Features of projects include:
 *
 * <ul>
 *   <li>A project collects together a set of files and folders.
 *   <li>A project's location controls where the project's resources are stored in the local file
 *       system.
 * </ul>
 *
 * Project also extends {@link ProjectConfig} which contains the meta-data required to define a
 * project.
 *
 * <p>To get list of currently of all loaded projects in the IDE, use {@link
 * AppContext#getProjects()}
 *
 * <p>Note. This interface is not intended to be implemented by clients.
 *
 * @see AppContext#getProjects()
 */
declare interface Project {
    /**
     * Check whether current project has problems. Problem project calculates in a runtime, so it is
     * not affects stored configuration on the server. To find out the reasons why project has
     * problems, following code snippet may be helpful:
     *
     * <p>Example of usage:
     *
     * <pre>
     *     Project project = ... ;
     *     if (project.isProblem()) {
     *         Marker problemMarker = getMarker(ProblemProjectMarker.PROBLEM_PROJECT).get();
     *
     *         String message = String.valueOf(problemMarker.getAttribute(Marker.MESSAGE));
     *     }
     * </pre>
     *
     * @return {@code true} if current project has problems, otherwise {@code false}
     */
    isProblem(): boolean;
    /**
     * Returns the {@code true} if project physically exists on the file system.
     *
     * <p>Project may not be exists on file system, but workspace may has configured in the current
     * workspace.
     *
     * @return {@code true} if project physically exists on the file system, otherwise {@code false}
     * @since 4.4.0
     */
    exists(): boolean;

    /**
     * Checks whether given project {@code type} is applicable to current project.
     *
     * @param type the project type to check
     * @return true if given project type is applicable to current project
     */
    isTypeOf(type : String):boolean;
    
    /**
     * Returns the attribute value for given {@code key}. If such attribute doesn't exist, {@code
     * null} is returned. If there is more than one value exists for given {@code key}, than first
     * value is returned.
     *
     * @param key the attribute name
     * @return first value for the given {@code key} or null if such attribute doesn't exist
     */
    getAttribute(key:String) : String;

    /**
     * Returns the list of attributes for given {@code key}. If such attribute doesn't exist, {@code
     * null} is returned.
     *
     * @param key the attribute name
     * @return the list with values for the given {@code key} or null if such attribute doesn't exist
     */
    getAttributes(key:String) : String[];


}

declare interface CurrentUser {
    getId(): String;
    getPreferences(): { [key: string]: string };
}

declare interface EditorManager {
    addFileOperationListener(listener: { (event: FileOperationEvent): void }):Disposable;
    addEditorOpenedListener(listener: { (event: EditorOpenedEvent): void }):Disposable;
}

declare interface EditorOpenedEvent {
    getFile(): VirtualFile;
    getEditor(): EditorPartPresenter;
}

declare interface EditorPartPresenter {
 //TODO 
}

declare interface FileOperationEvent {
    getFile(): VirtualFile;

    getOperationType(): che.ide.editor.FileOperation
}

declare interface VirtualFile {
    getLocation(): String;
    getName(): String;
    getDisplayName(): String;
    isReadOnly(): boolean;
    getContentUrl(): String;
}

declare interface WorkspaceRuntime {
    addServerRunningListener(listener: { (event: ServerRunningEvent): void }): Disposable;

    addWsAgentServerRunningListener(listener: { (event: WsAgentServerRunningEvent): void }): Disposable;

    addTerminalAgentServerRunningListener(listener: { (event: TerminalAgentServerRunningEvent): void }): Disposable;

    addExecAgentServerRunningListener(listener: { (event: ExecAgentServerRunningEvent): void }): Disposable;

    addServerStoppedListener(listener: { (event: ServerStoppedEvent): void }): Disposable;

    addWsAgentServerStoppedListener(listener: { (event: WsAgentServerStoppedEvent): void }): Disposable;

    addTerminalAgentServerStoppedListener(listener: { (event: TerminalAgentServerStoppedEvent): void }): Disposable;

    addExecAgentServerStoppedListener(listener: { (event: ExecAgentServerStoppedEvent): void }): Disposable;
}

declare interface ServerRunningEvent {
    getServerName(): String;

    getMachineName(): String;
}

declare interface WsAgentServerRunningEvent {
    getMachineName(): String;
}

declare interface TerminalAgentServerRunningEvent {
    getMachineName(): String;
}

declare interface ExecAgentServerRunningEvent {
    getMachineName(): String;
}

declare interface ServerStoppedEvent {
    getServerName(): String;

    getMachineName(): String;
}

declare interface WsAgentServerStoppedEvent {
    getMachineName(): String;
}

declare interface TerminalAgentServerStoppedEvent {
    getMachineName(): String;
}

declare interface ExecAgentServerStoppedEvent {
    getMachineName(): String;
}

declare interface PartManager {
    /**
   * Sets passed part as active. Sets focus to part and open it.
   *
   * @param part part which will be active
   */
    activatePart(part: Part): void;

    /**
     * Check is given part is active
     *
     * @return true if part is active
     */
    isActivePart(part: Part): boolean;

    /**
     * Opens given Part
     *
     * @param part
     * @param type
     */
    openPart(part: Part, type: che.ide.parts.PartStackType): void;

    /**
     * Hides given Part
     *
     * @param part
     */
    hidePart(part: Part): void;

    /**
     * Remove given Part
     *
     * @param part
     */
    removePart(part: Part): void;
}

declare interface Part {
    /** @return Title of the Part */
    getTitle(): String;

    /**
     * Returns count of unread notifications. Is used to display a badge on part button.
     *
     * @return count of unread notifications
     */
    getUnreadNotificationsCount(): number;

    /**
     * Returns the title tool tip text of this part. An empty string result indicates no tool tip. If
     * this value changes the part must fire a property listener event with <code>PROP_TITLE</code>.
     *
     * <p>The tool tip text is used to populate the title bar of this part's visual container.
     *
     * @return the part title tool tip (not <code>null</code>)
     */
    getTitleToolTip(): String;

    /**
     * Return size of part. If current part is vertical panel then size is height. If current part is
     * horizontal panel then size is width.
     *
     * @return size of part
     */
    getSize(): number;

    /**
     * This method is called when Part is opened. Note: this method is NOT called when part gets
     * focused. It is called when new tab in PartStack created.
     */
    onOpen(): void;

    /** @return */
    getView(): Element;

    getImageId(): String;
}

declare namespace che {
    namespace ide {
        namespace editor {
            enum FileOperation {
                OPEN,
                SAVE,
                CLOSE
            }
        }
        namespace parts {
            enum PartStackType {
                /**
             * Contains navigation parts. Designed to navigate by project, types, classes and any other
             * entities. Usually placed on the LEFT side of the IDE.
             */
                NAVIGATION,
                /**
                 * Contains informative parts. Designed to display the state of the application, project or
                 * processes. Usually placed on the BOTTOM side of the IDE.
                 */
                INFORMATION,
                /**
                 * Contains editing parts. Designed to provide an ability to edit any resources or settings.
                 * Usually placed in the CENTRAL part of the IDE.
                 */
                EDITING,
                /**
                 * Contains tooling parts. Designed to provide handy features and utilities, access to other
                 * services or any other features that are out of other PartType scopes. Usually placed on the
                 * RIGHT side of the IDE.
                 */
                TOOLING
            }
        }
    }

}


/**
 * Holds and manages all IDE icon resources, each resource mapped to their id. We support 3 way to
 * provide image: URL, HTML, image element factory
 */
declare interface ImageRegistry {
    /**
     * Register image url. 
     *
     * @param id the image id
     * @param url the image url
     */
    registerUrl(id: string, url: string): Disposable;

    /**
     * Register image html. For example html may be some FontAwesome icon
     *
     * @param id the image id
     * @param html the image html
     */
    registerHtml(id: string, html: string): Disposable;

    /**
     * Register image factory.Register image factory.
     *  For example : factory may provided by GWT plugin which use ClientBundle for images or
     *  plugin may construct image element manually.
     * 
     * @param id the image id
     * @param factory the image factory
     */
    registerFactory(id: string, factory: ImageFactory): Disposable;

    /**
     * Returns new image element each time
     *
     * @param id the image id
     * @return the image element or null if no image provided
     */
    getImage(id: string): Element;

}
/**
 * Factory to create some image Element, for example it's may be from GWT Image/SVG resource.
 * Should return new element each time called.
 */
declare interface ImageFactory {
    (): Element;
}

/**
 * A manager for actions. Used to register action handlers.
 */
declare interface ActionManager {
    /**
       * Register action handlers.
       * @param actionId the action id
       * @param updateAction the update handler
       * @param performAction the perform handler
       */
    registerAction(actionId: string, updateAction: UpdateAction, performAction: PerformAction): Disposable;
}

declare interface UpdateAction {
    /**
     * Updates the state of the action.
     * This method can be called frequently, for
     * instance, if an action is added to a toolbar, it will be updated twice a second. This means
     * that this method is supposed to work really fast, no real work should be done at this phase.
     *
     * @param actionData the action state data
     */
    (d: ActionData): void;
}

declare interface PerformAction {
    /**
     * Called when action performed
     * @param actionData the action state data
     */
    (d: ActionData): void;
}

/**
 * Container for the information necessary to execute or update an action
 */
declare interface ActionData {
    getText(): string;
    setText(text: string): void;
    getDescription(): string;
    setDescription(description: string): void;
    getImageElement(): Element;
    setImagetElement(imageElement: Element): void;
    isVisible(): boolean;
    setVisible(visible: boolean): void;
    isEnabled(): boolean;
    setEnabled(enabled: boolean): void;
    setEnabledAndVisible(enabled: boolean): void;
}