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
    editorManager: EditorManager;
    appContext: AppContext;
    eventBus: EventBus;
}

declare interface EventBus {
    fire<E>(type: EventType<E>, event: E): EventBus;
    addHandler<E>(type: EventType<E>, handler: { (event: E): void });
}
declare interface EventType<E> {
    type(): string;
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

    getWorkspaceId(): string;

    /**
     * Returns URL of Che Master API endpoint.
     */
    getMasterApiEndpoint(): string;

    /**
     * Returns URL of ws-agent server API endpoint.
     *
     * @throws RuntimeException if ws-agent server doesn't exist. Normally it may happen when
     *     workspace is stopped.
     */
    getWsAgentServerApiEndpoint(): string;

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
     *         string message = string.valueOf(problemMarker.getAttribute(Marker.MESSAGE));
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
    isTypeOf(type: string): boolean;

    /**
     * Returns the attribute value for given {@code key}. If such attribute doesn't exist, {@code
     * null} is returned. If there is more than one value exists for given {@code key}, than first
     * value is returned.
     *
     * @param key the attribute name
     * @return first value for the given {@code key} or null if such attribute doesn't exist
     */
    getAttribute(key: string): string;

    /**
     * Returns the list of attributes for given {@code key}. If such attribute doesn't exist, {@code
     * null} is returned.
     *
     * @param key the attribute name
     * @return the list with values for the given {@code key} or null if such attribute doesn't exist
     */
    getAttributes(key: string): string[];


}

declare interface CurrentUser {
    getId(): string;
    getPreferences(): { [key: string]: string };
}

declare interface EditorManager {

}

declare interface EditorPartPresenter {
    //TODO 
}

declare interface VirtualFile {
    getLocation(): che.ide.resource.Path;
    getName(): string;
    getDisplayName(): string;
    isReadOnly(): boolean;
    getContentUrl(): string;
    getContent(): Promise<string>;
    updateContent(content: string): Promise<void>;
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
    getTitle(): string;

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
    getTitleToolTip(): string;

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

    getImageId(): string;
}

declare namespace che {
    namespace ide {
        namespace resource {
            /**
             * A path is an ordered collection of string segments, separated by a standard separator
             * character, "/". A path may also have a leading and/or a trailing separator.
             *
             * Note that paths are value objects; all operations on paths return a new path; the path that is
             * operated on is unscathed.
             *
             * This class is not intended to be extended by clients.
             */
            class Path {
                SEPARATOR: string;
                /**
                 * Constructs a new path from the given string path. The string path must represent a valid file
                 * system path on the local file system. The path is canonicalized and double slashes are removed
                 * except at the beginning. (to handle UNC paths). All forward slashes ('/') are treated as
                 * segment delimiters, and any segment and device delimiters for the local file system are also
                 * respected.
                 */
                static valueOf(pathstring: string): Path;

                /** 
                 * Returns a new path which is the same as this path but with the given file extension added. If
                 * this path is empty, root or has a trailing separator, this path is returned. If this path
                 * already has an extension, the existing extension is left and the given extension simply
                 * appended. Clients wishing to replace the current extension should first remove the extension
                 * and then add the desired one.
                 *
                 * <p>The file extension portion is defined as the string following the last period (".")
                 * character in the last segment. The given extension should not include a leading ".".
                 * @param extension the file extension to append
                 */
                addFileExtension(extension: string): Path;
                /**
                 * Returns a path with the same segments as this path but with a trailing separator added. This
                 * path must have at least one segment.
                 *
                 * If this path already has a trailing separator, this path is returned.
                 */
                addTrailingSeparator(): Path;

                /**
                 * Returns a path with the same segments as this path but with a leading separator added.
                 *
                 * <p>If this path already has a leading separator, this path is returned.
                 *
                 * @return the new path
                 */
                addLeadingSeparator(): Path;

                /** 
                 * Returns the canonicalized path obtained from the concatenation of the given path's segments to
                 * the end of this path. If the given path has a trailing separator, the result will have a
                 * trailing separator. The device id of this path is preserved (the one of the given path is
                 * ignored). Duplicate slashes are removed from the path except at the beginning where the path is
                 * considered to be UNC.
                 */
                appendPath(path: Path): Path;

                /** 
                 * Returns the canonicalized path obtained from the concatenation of the given path's segments to
                 * the end of this path. If the given path has a trailing separator, the result will have a
                 * trailing separator. The device id of this path is preserved (the one of the given path is
                 * ignored). Duplicate slashes are removed from the path except at the beginning where the path is
                 * considered to be UNC.
                 */
                append(path: string): Path;

                equals(obj: any): boolean;

                /**
                 * Returns the device id for this path, or <code>null</code> if this path has no device id. Note
                 * that the result will end in ':'.
                 *
                 * @return the device id, or <code>null</code>
                 */
                getDevice(): string;
                /**
                 * Returns the file extension portion of this path, or <code>null</code> if there is none.
                 *
                 * <p>The file extension portion is defined as the string following the last period (".")
                 * character in the last segment. If there is no period in the last segment, the path has no file
                 * extension portion. If the last segment ends in a period, the file extension portion is the
                 * empty string.
                 *
                 * @return the file extension or <code>null</code>
                 */
                getFileExtension(): string;
                /**
                 * Returns whether this path has a trailing separator.
                 *
                 * <p>Note: In the root path ("/"), the separator is considered to be leading rather than
                 * trailing.
                 *
                 * @return <code>true</code> if this path has a trailing separator, and <code>false</code>
                 *     otherwise
                 */
                hasTrailingSeparator(): boolean;

                /**
                 * Returns whether this path has a leading separator.
                 *
                 * <p>Note: In the root path ("/"), the separator is considered to be leading rather than
                 * trailing.
                 *
                 * @return <code>true</code> if this path has a leading separator, and <code>false</code>
                 *     otherwise
                 */
                hasLeadingSeparator(): boolean;
                /**
                 * Returns whether this path is an absolute path (ignoring any device id).
                 *
                 * <p>Absolute paths start with a path separator. A root path, like <code>/</code> or <code>C:/
                 * </code>, is considered absolute. UNC paths are always absolute.
                 *
                 * @return <code>true</code> if this path is an absolute path, and <code>false</code> otherwise
                 */
                isAbsolute(): boolean;

                /**
                 * Returns whether this path has no segments and is not a root path.
                 *
                 * @return <code>true</code> if this path is empty, and <code>false</code> otherwise
                 */
                isEmpty(): boolean;
                /**
                 * Returns whether this path is a prefix of the given path. To be a prefix, this path's segments
                 * must appear in the argument path in the same order, and their device ids must match.
                 *
                 * <p>An empty path is a prefix of all paths with the same device; a root path is a prefix of all
                 * absolute paths with the same device.
                 *
                 * @param anotherPath the other path
                 * @return <code>true</code> if this path is a prefix of the given path, and <code>false</code>
                 *     otherwise
                 */
                isPrefixOf(anotherPath: Path): boolean;

                /**
                 * Returns whether this path is a root path.
                 *
                 * <p>The root path is the absolute non-UNC path with zero segments; e.g., <code>/</code> or
                 * <code>C:/</code>. The separator is considered a leading separator, not a trailing one.
                 *
                 * @return <code>true</code> if this path is a root path, and <code>false</code> otherwise
                 */
                isRoot(): boolean;

                /**
                 * Returns a boolean value indicating whether or not this path is considered to be in UNC form.
                 * Return false if this path has a device set or if the first 2 characters of the path string are
                 * not <code>Path.SEPARATOR</code>.
                 *
                 * @return boolean indicating if this path is UNC
                 */
                isUNC(): boolean;

                /**
                 * Returns the last segment of this path, or <code>null</code> if it does not have any segments.
                 *
                 * @return the last segment of this path, or <code>null</code>
                 */
                lastSegment(): string;

                /**
                 * Returns an absolute path with the segments and device id of this path. Absolute paths start
                 * with a path separator. If this path is absolute, it is simply returned.
                 *
                 * @return the new path
                 */
                makeAbsolute(): Path;

                /**
                 * Returns a relative path with the segments and device id of this path. Absolute paths start with
                 * a path separator and relative paths do not. If this path is relative, it is simply returned.
                 *
                 * @return the new path
                 */
                makeRelative(): Path;

                /**
                 * Returns a path equivalent to this path, but relative to the given base path if possible.
                 *
                 * <p>The path is only made relative if the base path if both paths have the same device and have
                 * a non-zero length common prefix. If the paths have different devices, or no common prefix, then
                 * this path is simply returned. If the path is successfully made relative, then appending the
                 * returned path to the base will always produce a path equal to this path.
                 *
                 * @param base The base path to make this path relative to
                 * @return A path relative to the base path, or this path if it could not be made relative to the
                 *     given base
                 */
                makeRelativeTo(base: Path): Path;
                /**
                 * Returns a count of the number of segments which match in this path and the given path (device
                 * ids are ignored), comparing in increasing segment number order.
                 *
                 * @param anotherPath the other path
                 * @return the number of matching segments
                 */
                matchingFirstSegments(anotherPath: Path): number;

                /**
                 * Returns a new path which is the same as this path but with the file extension removed. If this
                 * path does not have an extension, this path is returned.
                 *
                 * <p>The file extension portion is defined as the string following the last period (".")
                 * character in the last segment. If there is no period in the last segment, the path has no file
                 * extension portion. If the last segment ends in a period, the file extension portion is the
                 * empty string.
                 *
                 * @return the new path
                 */
                removeFileExtension(): Path;

                /**
                 * Returns a copy of this path with the given number of segments removed from the beginning. The
                 * device id is preserved. The number must be greater or equal zero. If the count is zero, this
                 * path is returned. The resulting path will always be a relative path with respect to this path.
                 * If the number equals or exceeds the number of segments in this path, an empty relative path is
                 * returned.
                 *
                 * @param count the number of segments to remove
                 */
                removeFirstSegments(count: number): Path;
                /**
                 * Returns a copy of this path with the given number of segments removed from the end. The device
                 * id is preserved. The number must be greater or equal zero. If the count is zero, this path is
                 * returned.
                 *
                 * <p>If this path has a trailing separator, it will still have a trailing separator after the
                 * last segments are removed (assuming there are some segments left). If there is no trailing
                 * separator, the result will not have a trailing separator. If the number equals or exceeds the
                 * number of segments in this path, a path with no segments is returned.
                 *
                 * @param count the number of segments to remove
                 */
                removeLastSegments(count: number): Path;
                /**
                 * Returns a path with the same segments as this path but with a trailing separator removed. Does
                 * nothing if this path does not have at least one segment. The device id is preserved.
                 *
                 * <p>If this path does not have a trailing separator, this path is returned.
                 *
                 * @return the new path
                 */
                removeTrailingSeparator(): Path;

                /**
                 * Returns the specified segment of this path, or <code>null</code> if the path does not have such
                 * a segment.
                 *
                 * @param index the 0-based segment index
                 * @return the specified segment, or <code>null</code>
                 */
                segment(index: number): string;
                /**
                 * Returns the number of segments in this path.
                 *
                 * <p>Note that both root and empty paths have 0 segments.
                 *
                 * @return the number of segments
                 */
                segmentCount(): number;

                /**
                 * Returns the segments in this path in order.
                 *
                 * @return an array of string segments
                 */
                segments(): string[];

                /**
                 * Returns a new path which is the same as this path but with the given device id. The device id
                 * must end with a ":". A device independent path is obtained by passing <code>null</code>.
                 *
                 * <p>For example, "C:" and "Server/Volume:" are typical device ids.
                 *
                 * @param device the device id or <code>null</code>
                 * @return a new path
                 */
                setDevice(device: string): Path;

                /**
                 * Returns a string representation of this path, including its device id. The same separator, "/",
                 * is used on all platforms.
                 *
                 * <p>Example result strings (without and with device id):
                 *
                 * <pre>
                 * "/foo/bar.txt"
                 * "bar.txt"
                 * "/foo/"
                 * "foo/"
                 * ""
                 * "/"
                 * "C:/foo/bar.txt"
                 * "C:bar.txt"
                 * "C:/foo/"
                 * "C:foo/"
                 * "C:"
                 * "C:/"
                 * </pre>
                 *
                 * This string is suitable for passing to <code>Path(string)</code>.
                 *
                 * @return a string representation of this path
                 */
                tostring(): string;
                /**
                 * Returns a copy of this path with removed last segment.
                 *
                 * @return the new path
                 */
                parent(): Path;
            }
        }
        namespace editor {
            enum FileOperation {
                OPEN,
                SAVE,
                CLOSE
            }
            class FileOperationEvent {
                static TYPE: EventType<FileOperationEvent>;

                getFile(): VirtualFile;
                getOperationType(): che.ide.editor.FileOperation
            }
            class EditorOpenedEvent {
                static TYPE: EventType<EditorOpenedEvent>;

                getFile(): VirtualFile;
                getEditor(): EditorPartPresenter;
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
        namespace workspace {
            namespace event {
                class ServerRunningEvent {
                    static TYPE : EventType<ServerRunningEvent>;

                    getServerName(): string;

                    getMachineName(): string;
                }

                class WsAgentServerRunningEvent {
                    static TYPE : EventType<WsAgentServerRunningEvent>;
                    getMachineName(): string;
                }

                class TerminalAgentServerRunningEvent {
                    static TYPE : EventType<TerminalAgentServerRunningEvent>;
                    getMachineName(): string;
                }

                class ExecAgentServerRunningEvent {
                    static TYPE : EventType<ExecAgentServerRunningEvent>;
                    getMachineName(): string;
                }

                class ServerStoppedEvent {
                    static TYPE : EventType<ServerStoppedEvent>;
                    getServerName(): string;

                    getMachineName(): string;
                }

                class WsAgentServerStoppedEvent {
                    static TYPE : EventType<WsAgentServerStoppedEvent>;
                    getMachineName(): string;
                }

                class TerminalAgentServerStoppedEvent {
                    static TYPE : EventType<TerminalAgentServerStoppedEvent>;
                    getMachineName(): string;
                }

                class ExecAgentServerStoppedEvent {
                    static TYPE : EventType<ExecAgentServerStoppedEvent>;
                    getMachineName(): string;
                }

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