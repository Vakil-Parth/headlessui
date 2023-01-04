export declare function useDocumentEvent<TType extends keyof DocumentEventMap>(type: TType, listener: (this: Document, ev: DocumentEventMap[TType]) => any, options?: boolean | AddEventListenerOptions): void;
