declare type Refs = Record<string, HTMLElement>;
declare type RefsAll = Record<string, HTMLElement[]>;
declare type Component = (payload: {
    el: HTMLElement;
    refs: Refs;
    refsAll: RefsAll;
}) => any;
declare const walkComponent: (el: HTMLElement, callback: (el: HTMLElement, isChildComponent: boolean) => any, isChild?: boolean) => void;
declare const registerComponent: (name: string, component: Component) => Component;
/**
 * Mount a single component.
 */
declare const mountComponent: (el: HTMLElement, isChild?: boolean) => void;
/**
 * Mount all components inside the element.
 */
declare const mountComponents: (root?: HTMLElement) => void;

export { mountComponent, mountComponents, registerComponent, walkComponent };
