declare module "*.svg"{
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

}
declare interface PluginContext {
    getApi(): CheApi;
    addDisposable(d: Disposible): void
}

declare interface Disposible {
    dispose(): void;
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
    registerUrl(id: string, url: string): Disposible;

    /**
     * Register image html. For example html may be some FontAwesome icon
     *
     * @param id the image id
     * @param html the image html
     */
    registerHtml(id: string, html: string): Disposible;

    /**
     * Register image factory.Register image factory.
     *  For example : factory may provided by GWT plugin which use ClientBundle for images or
     *  plugin may construct image element manually.
     * 
     * @param id the image id
     * @param factory the image factory
     */
    registerFactory(id: string, factory: ImageFactory): Disposible;

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
    registerAction(actionId: string, updateAction: UpdateAction, performAction: PerformAction): Disposible;
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