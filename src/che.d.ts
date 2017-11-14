
declare interface CheApi {
    imageRegistry: ImageRegistry;
    actionManager: ActionManager;

}
declare interface PluginContext {
    getApi(): CheApi;
    addDisposable(d: Disposible): void
}

declare interface Disposible {
    dispose(): void;
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