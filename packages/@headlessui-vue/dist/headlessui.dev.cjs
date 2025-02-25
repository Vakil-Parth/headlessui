"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Combobox: () => Combobox,
  ComboboxButton: () => ComboboxButton,
  ComboboxInput: () => ComboboxInput,
  ComboboxLabel: () => ComboboxLabel,
  ComboboxOption: () => ComboboxOption,
  ComboboxOptions: () => ComboboxOptions,
  Dialog: () => Dialog,
  DialogBackdrop: () => DialogBackdrop,
  DialogDescription: () => DialogDescription,
  DialogOverlay: () => DialogOverlay,
  DialogPanel: () => DialogPanel,
  DialogTitle: () => DialogTitle,
  Disclosure: () => Disclosure,
  DisclosureButton: () => DisclosureButton,
  DisclosurePanel: () => DisclosurePanel,
  FocusTrap: () => FocusTrap,
  Listbox: () => Listbox,
  ListboxButton: () => ListboxButton,
  ListboxLabel: () => ListboxLabel,
  ListboxOption: () => ListboxOption,
  ListboxOptions: () => ListboxOptions,
  Menu: () => Menu,
  MenuButton: () => MenuButton,
  MenuItem: () => MenuItem,
  MenuItems: () => MenuItems,
  Popover: () => Popover,
  PopoverButton: () => PopoverButton,
  PopoverGroup: () => PopoverGroup,
  PopoverOverlay: () => PopoverOverlay,
  PopoverPanel: () => PopoverPanel,
  Portal: () => Portal,
  PortalGroup: () => PortalGroup,
  RadioGroup: () => RadioGroup,
  RadioGroupDescription: () => RadioGroupDescription,
  RadioGroupLabel: () => RadioGroupLabel,
  RadioGroupOption: () => RadioGroupOption,
  Switch: () => Switch,
  SwitchDescription: () => SwitchDescription,
  SwitchGroup: () => SwitchGroup,
  SwitchLabel: () => SwitchLabel,
  Tab: () => Tab,
  TabGroup: () => TabGroup,
  TabList: () => TabList,
  TabPanel: () => TabPanel,
  TabPanels: () => TabPanels,
  TransitionChild: () => TransitionChild,
  TransitionRoot: () => TransitionRoot
});
module.exports = __toCommonJS(src_exports);

// src/components/combobox/combobox.ts
var import_vue10 = require("vue");

// src/utils/render.ts
var import_vue = require("vue");

// src/utils/match.ts
function match(value, lookup, ...args) {
  if (value in lookup) {
    let returnValue = lookup[value];
    return typeof returnValue === "function" ? returnValue(...args) : returnValue;
  }
  let error = new Error(
    `Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      lookup
    ).map((key) => `"${key}"`).join(", ")}.`
  );
  if (Error.captureStackTrace)
    Error.captureStackTrace(error, match);
  throw error;
}

// src/utils/render.ts
function render({
  visible = true,
  features = 0 /* None */,
  ourProps,
  theirProps,
  ...main
}) {
  var _a;
  let props = mergeProps(theirProps, ourProps);
  let mainWithProps = Object.assign(main, { props });
  if (visible)
    return _render(mainWithProps);
  if (features & 2 /* Static */) {
    if (props.static)
      return _render(mainWithProps);
  }
  if (features & 1 /* RenderStrategy */) {
    let strategy = ((_a = props.unmount) != null ? _a : true) ? 0 /* Unmount */ : 1 /* Hidden */;
    return match(strategy, {
      [0 /* Unmount */]() {
        return null;
      },
      [1 /* Hidden */]() {
        return _render({
          ...main,
          props: { ...props, hidden: true, style: { display: "none" } }
        });
      }
    });
  }
  return _render(mainWithProps);
}
function _render({
  props,
  attrs,
  slots,
  slot,
  name
}) {
  var _a;
  let { as, ...incomingProps } = omit(props, ["unmount", "static"]);
  let children = (_a = slots.default) == null ? void 0 : _a.call(slots, slot);
  let dataAttributes = {};
  if (slot) {
    let exposeState = false;
    let states = [];
    for (let [k, v] of Object.entries(slot)) {
      if (typeof v === "boolean") {
        exposeState = true;
      }
      if (v === true) {
        states.push(k);
      }
    }
    if (exposeState)
      dataAttributes[`data-headlessui-state`] = states.join(" ");
  }
  if (as === "template") {
    children = flattenFragments(children != null ? children : []);
    if (Object.keys(incomingProps).length > 0 || Object.keys(attrs).length > 0) {
      let [firstChild, ...other] = children != null ? children : [];
      if (!isValidElement(firstChild) || other.length > 0) {
        throw new Error(
          [
            'Passing props on "template"!',
            "",
            `The current component <${name} /> is rendering a "template".`,
            `However we need to passthrough the following props:`,
            Object.keys(incomingProps).concat(Object.keys(attrs)).sort((a, z) => a.localeCompare(z)).map((line) => `  - ${line}`).join("\n"),
            "",
            "You can apply a few solutions:",
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',
              "Render a single element as the child so that we can forward the props onto that element."
            ].map((line) => `  - ${line}`).join("\n")
          ].join("\n")
        );
      }
      return (0, import_vue.cloneVNode)(firstChild, Object.assign({}, incomingProps, dataAttributes));
    }
    if (Array.isArray(children) && children.length === 1) {
      return children[0];
    }
    return children;
  }
  return (0, import_vue.h)(as, Object.assign({}, incomingProps, dataAttributes), {
    default: () => children
  });
}
function flattenFragments(children) {
  return children.flatMap((child) => {
    if (child.type === import_vue.Fragment) {
      return flattenFragments(child.children);
    }
    return [child];
  });
}
function mergeProps(...listOfProps) {
  var _a;
  if (listOfProps.length === 0)
    return {};
  if (listOfProps.length === 1)
    return listOfProps[0];
  let target = {};
  let eventHandlers = {};
  for (let props of listOfProps) {
    for (let prop in props) {
      if (prop.startsWith("on") && typeof props[prop] === "function") {
        (_a = eventHandlers[prop]) != null ? _a : eventHandlers[prop] = [];
        eventHandlers[prop].push(props[prop]);
      } else {
        target[prop] = props[prop];
      }
    }
  }
  if (target.disabled || target["aria-disabled"]) {
    return Object.assign(
      target,
      Object.fromEntries(Object.keys(eventHandlers).map((eventName) => [eventName, void 0]))
    );
  }
  for (let eventName in eventHandlers) {
    Object.assign(target, {
      [eventName](event, ...args) {
        let handlers = eventHandlers[eventName];
        for (let handler of handlers) {
          if (event instanceof Event && event.defaultPrevented) {
            return;
          }
          handler(event, ...args);
        }
      }
    });
  }
  return target;
}
function compact(object) {
  let clone = Object.assign({}, object);
  for (let key in clone) {
    if (clone[key] === void 0)
      delete clone[key];
  }
  return clone;
}
function omit(object, keysToOmit = []) {
  let clone = Object.assign({}, object);
  for (let key of keysToOmit) {
    if (key in clone)
      delete clone[key];
  }
  return clone;
}
function isValidElement(input) {
  if (input == null)
    return false;
  if (typeof input.type === "string")
    return true;
  if (typeof input.type === "object")
    return true;
  if (typeof input.type === "function")
    return true;
  return false;
}

// src/hooks/use-id.ts
var id = 0;
function generateId() {
  return ++id;
}
function useId() {
  return generateId();
}

// src/utils/calculate-active-index.ts
function assertNever(x) {
  throw new Error("Unexpected object: " + x);
}
function calculateActiveIndex(action, resolvers) {
  let items = resolvers.resolveItems();
  if (items.length <= 0)
    return null;
  let currentActiveIndex = resolvers.resolveActiveIndex();
  let activeIndex = currentActiveIndex != null ? currentActiveIndex : -1;
  let nextActiveIndex = (() => {
    switch (action.focus) {
      case 0 /* First */:
        return items.findIndex((item) => !resolvers.resolveDisabled(item));
      case 1 /* Previous */: {
        let idx = items.slice().reverse().findIndex((item, idx2, all) => {
          if (activeIndex !== -1 && all.length - idx2 - 1 >= activeIndex)
            return false;
          return !resolvers.resolveDisabled(item);
        });
        if (idx === -1)
          return idx;
        return items.length - 1 - idx;
      }
      case 2 /* Next */:
        return items.findIndex((item, idx) => {
          if (idx <= activeIndex)
            return false;
          return !resolvers.resolveDisabled(item);
        });
      case 3 /* Last */: {
        let idx = items.slice().reverse().findIndex((item) => !resolvers.resolveDisabled(item));
        if (idx === -1)
          return idx;
        return items.length - 1 - idx;
      }
      case 4 /* Specific */:
        return items.findIndex((item) => resolvers.resolveId(item) === action.id);
      case 5 /* Nothing */:
        return null;
      default:
        assertNever(action);
    }
  })();
  return nextActiveIndex === -1 ? currentActiveIndex : nextActiveIndex;
}

// src/utils/dom.ts
function dom(ref21) {
  var _a;
  if (ref21 == null)
    return null;
  if (ref21.value == null)
    return null;
  return (_a = ref21.value.$el) != null ? _a : ref21.value;
}

// src/internal/open-closed.ts
var import_vue2 = require("vue");
var Context = Symbol("Context");
function hasOpenClosed() {
  return useOpenClosed() !== null;
}
function useOpenClosed() {
  return (0, import_vue2.inject)(Context, null);
}
function useOpenClosedProvider(value) {
  (0, import_vue2.provide)(Context, value);
}

// src/hooks/use-resolve-button-type.ts
var import_vue3 = require("vue");
function resolveType(type, as) {
  if (type)
    return type;
  let tag = as != null ? as : "button";
  if (typeof tag === "string" && tag.toLowerCase() === "button")
    return "button";
  return void 0;
}
function useResolveButtonType(data, refElement) {
  let type = (0, import_vue3.ref)(resolveType(data.value.type, data.value.as));
  (0, import_vue3.onMounted)(() => {
    type.value = resolveType(data.value.type, data.value.as);
  });
  (0, import_vue3.watchEffect)(() => {
    var _a;
    if (type.value)
      return;
    if (!dom(refElement))
      return;
    if (dom(refElement) instanceof HTMLButtonElement && !((_a = dom(refElement)) == null ? void 0 : _a.hasAttribute("type"))) {
      type.value = "button";
    }
  });
  return type;
}

// src/hooks/use-tree-walker.ts
var import_vue4 = require("vue");

// src/utils/ssr.ts
var isServer = typeof window === "undefined" || typeof document === "undefined";

// src/utils/owner.ts
function getOwnerDocument(element) {
  if (isServer)
    return null;
  if (element instanceof Node)
    return element.ownerDocument;
  if (element == null ? void 0 : element.hasOwnProperty("value")) {
    let domElement = dom(element);
    if (domElement)
      return domElement.ownerDocument;
  }
  return document;
}

// src/hooks/use-tree-walker.ts
function useTreeWalker({
  container,
  accept,
  walk,
  enabled
}) {
  (0, import_vue4.watchEffect)(() => {
    let root = container.value;
    if (!root)
      return;
    if (enabled !== void 0 && !enabled.value)
      return;
    let ownerDocument = getOwnerDocument(container);
    if (!ownerDocument)
      return;
    let acceptNode = Object.assign((node) => accept(node), { acceptNode: accept });
    let walker = ownerDocument.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT,
      acceptNode,
      false
    );
    while (walker.nextNode())
      walk(walker.currentNode);
  });
}

// src/utils/focus-management.ts
var import_vue5 = require("vue");
var focusableSelector = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])"
].map(
  false ? (selector) => `${selector}:not([tabindex='-1']):not([style*='display: none'])` : (selector) => `${selector}:not([tabindex='-1'])`
).join(",");
function getFocusableElements(container = document.body) {
  if (container == null)
    return [];
  return Array.from(container.querySelectorAll(focusableSelector));
}
function isFocusableElement(element, mode = 0 /* Strict */) {
  var _a;
  if (element === ((_a = getOwnerDocument(element)) == null ? void 0 : _a.body))
    return false;
  return match(mode, {
    [0 /* Strict */]() {
      return element.matches(focusableSelector);
    },
    [1 /* Loose */]() {
      let next = element;
      while (next !== null) {
        if (next.matches(focusableSelector))
          return true;
        next = next.parentElement;
      }
      return false;
    }
  });
}
function restoreFocusIfNecessary(element) {
  let ownerDocument = getOwnerDocument(element);
  (0, import_vue5.nextTick)(() => {
    if (ownerDocument && !isFocusableElement(ownerDocument.activeElement, 0 /* Strict */)) {
      focusElement(element);
    }
  });
}
function focusElement(element) {
  element == null ? void 0 : element.focus({ preventScroll: true });
}
var selectableSelector = ["textarea", "input"].join(",");
function isSelectableElement(element) {
  var _a, _b;
  return (_b = (_a = element == null ? void 0 : element.matches) == null ? void 0 : _a.call(element, selectableSelector)) != null ? _b : false;
}
function sortByDomNode(nodes, resolveKey = (i) => i) {
  return nodes.slice().sort((aItem, zItem) => {
    let a = resolveKey(aItem);
    let z = resolveKey(zItem);
    if (a === null || z === null)
      return 0;
    let position = a.compareDocumentPosition(z);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING)
      return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING)
      return 1;
    return 0;
  });
}
function focusFrom(current, focus) {
  return focusIn(getFocusableElements(), focus, true, current);
}
function focusIn(container, focus, sorted = true, active = null) {
  var _a;
  let ownerDocument = (_a = Array.isArray(container) ? container.length > 0 ? container[0].ownerDocument : document : container == null ? void 0 : container.ownerDocument) != null ? _a : document;
  let elements = Array.isArray(container) ? sorted ? sortByDomNode(container) : container : getFocusableElements(container);
  active = active != null ? active : ownerDocument.activeElement;
  let direction = (() => {
    if (focus & (1 /* First */ | 4 /* Next */))
      return 1 /* Next */;
    if (focus & (2 /* Previous */ | 8 /* Last */))
      return -1 /* Previous */;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })();
  let startIndex = (() => {
    if (focus & 1 /* First */)
      return 0;
    if (focus & 2 /* Previous */)
      return Math.max(0, elements.indexOf(active)) - 1;
    if (focus & 4 /* Next */)
      return Math.max(0, elements.indexOf(active)) + 1;
    if (focus & 8 /* Last */)
      return elements.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })();
  let focusOptions = focus & 32 /* NoScroll */ ? { preventScroll: true } : {};
  let offset = 0;
  let total = elements.length;
  let next = void 0;
  do {
    if (offset >= total || offset + total <= 0)
      return 0 /* Error */;
    let nextIdx = startIndex + offset;
    if (focus & 16 /* WrapAround */) {
      nextIdx = (nextIdx + total) % total;
    } else {
      if (nextIdx < 0)
        return 3 /* Underflow */;
      if (nextIdx >= total)
        return 1 /* Overflow */;
    }
    next = elements[nextIdx];
    next == null ? void 0 : next.focus(focusOptions);
    offset += direction;
  } while (next !== ownerDocument.activeElement);
  if (focus & (4 /* Next */ | 2 /* Previous */) && isSelectableElement(next)) {
    next.select();
  }
  if (!next.hasAttribute("tabindex"))
    next.setAttribute("tabindex", "0");
  return 2 /* Success */;
}

// src/hooks/use-outside-click.ts
var import_vue7 = require("vue");

// src/hooks/use-document-event.ts
var import_vue6 = require("vue");
function useDocumentEvent(type, listener, options) {
  if (isServer)
    return;
  (0, import_vue6.watchEffect)((onInvalidate) => {
    document.addEventListener(type, listener, options);
    onInvalidate(() => document.removeEventListener(type, listener, options));
  });
}

// src/hooks/use-outside-click.ts
function useOutsideClick(containers, cb, enabled = (0, import_vue7.computed)(() => true)) {
  function handleOutsideClick(event, resolveTarget) {
    if (!enabled.value)
      return;
    if (event.defaultPrevented)
      return;
    let target = resolveTarget(event);
    if (target === null) {
      return;
    }
    if (!target.getRootNode().contains(target))
      return;
    let _containers = function resolve(containers2) {
      if (typeof containers2 === "function") {
        return resolve(containers2());
      }
      if (Array.isArray(containers2)) {
        return containers2;
      }
      if (containers2 instanceof Set) {
        return containers2;
      }
      return [containers2];
    }(containers);
    for (let container of _containers) {
      if (container === null)
        continue;
      let domNode = container instanceof HTMLElement ? container : dom(container);
      if (domNode == null ? void 0 : domNode.contains(target)) {
        return;
      }
    }
    if (!isFocusableElement(target, 1 /* Loose */) && target.tabIndex !== -1) {
      event.preventDefault();
    }
    return cb(event, target);
  }
  let initialClickTarget = (0, import_vue7.ref)(null);
  useDocumentEvent(
    "mousedown",
    (event) => {
      var _a, _b;
      if (enabled.value) {
        initialClickTarget.value = ((_b = (_a = event.composedPath) == null ? void 0 : _a.call(event)) == null ? void 0 : _b[0]) || event.target;
      }
    },
    true
  );
  useDocumentEvent(
    "click",
    (event) => {
      if (!initialClickTarget.value) {
        return;
      }
      handleOutsideClick(event, () => {
        return initialClickTarget.value;
      });
      initialClickTarget.value = null;
    },
    true
  );
  useDocumentEvent(
    "blur",
    (event) => handleOutsideClick(
      event,
      () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null
    ),
    true
  );
}

// src/internal/hidden.ts
var import_vue8 = require("vue");
var Hidden = (0, import_vue8.defineComponent)({
  name: "Hidden",
  props: {
    as: { type: [Object, String], default: "div" },
    features: { type: Number, default: 1 /* None */ }
  },
  setup(props, { slots, attrs }) {
    return () => {
      let { features, ...theirProps } = props;
      let ourProps = {
        "aria-hidden": (features & 2 /* Focusable */) === 2 /* Focusable */ ? true : void 0,
        style: {
          position: "fixed",
          top: 1,
          left: 1,
          width: 1,
          height: 0,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: "0",
          ...(features & 4 /* Hidden */) === 4 /* Hidden */ && !((features & 2 /* Focusable */) === 2 /* Focusable */) && { display: "none" }
        }
      };
      return render({
        ourProps,
        theirProps,
        slot: {},
        attrs,
        slots,
        name: "Hidden"
      });
    };
  }
});

// src/utils/form.ts
function objectToFormEntries(source = {}, parentKey = null, entries = []) {
  for (let [key, value] of Object.entries(source)) {
    append(entries, composeKey(parentKey, key), value);
  }
  return entries;
}
function composeKey(parent, key) {
  return parent ? parent + "[" + key + "]" : key;
}
function append(entries, key, value) {
  if (Array.isArray(value)) {
    for (let [subkey, subvalue] of value.entries()) {
      append(entries, composeKey(key, subkey.toString()), subvalue);
    }
  } else if (value instanceof Date) {
    entries.push([key, value.toISOString()]);
  } else if (typeof value === "boolean") {
    entries.push([key, value ? "1" : "0"]);
  } else if (typeof value === "string") {
    entries.push([key, value]);
  } else if (typeof value === "number") {
    entries.push([key, `${value}`]);
  } else if (value === null || value === void 0) {
    entries.push([key, ""]);
  } else {
    objectToFormEntries(value, key, entries);
  }
}
function attemptSubmit(element) {
  var _a;
  let form = (_a = element == null ? void 0 : element.form) != null ? _a : element.closest("form");
  if (!form)
    return;
  for (let element2 of form.elements) {
    if (element2.tagName === "INPUT" && element2.type === "submit" || element2.tagName === "BUTTON" && element2.type === "submit" || element2.nodeName === "INPUT" && element2.type === "image") {
      element2.click();
      return;
    }
  }
}

// src/hooks/use-controllable.ts
var import_vue9 = require("vue");
function useControllable(controlledValue, onChange, defaultValue) {
  let internalValue = (0, import_vue9.ref)(defaultValue == null ? void 0 : defaultValue.value);
  let isControlled = (0, import_vue9.computed)(() => controlledValue.value !== void 0);
  return [
    (0, import_vue9.computed)(() => isControlled.value ? controlledValue.value : internalValue.value),
    function(value) {
      if (isControlled.value) {
        return onChange == null ? void 0 : onChange(value);
      } else {
        internalValue.value = value;
        return onChange == null ? void 0 : onChange(value);
      }
    }
  ];
}

// src/components/combobox/combobox.ts
function defaultComparator(a, z) {
  return a === z;
}
var ComboboxContext = Symbol("ComboboxContext");
function useComboboxContext(component) {
  let context = (0, import_vue10.inject)(ComboboxContext, null);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Combobox /> component.`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useComboboxContext);
    throw err;
  }
  return context;
}
var Combobox = (0, import_vue10.defineComponent)({
  name: "Combobox",
  emits: { "update:modelValue": (_value) => true },
  props: {
    as: { type: [Object, String], default: "template" },
    disabled: { type: [Boolean], default: false },
    by: { type: [String, Function], default: () => defaultComparator },
    modelValue: { type: [Object, String, Number, Boolean], default: void 0 },
    defaultValue: { type: [Object, String, Number, Boolean], default: void 0 },
    name: { type: String },
    nullable: { type: Boolean, default: false },
    multiple: { type: [Boolean], default: false }
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
    let comboboxState = (0, import_vue10.ref)(1 /* Closed */);
    let labelRef = (0, import_vue10.ref)(null);
    let inputRef = (0, import_vue10.ref)(null);
    let buttonRef = (0, import_vue10.ref)(null);
    let optionsRef = (0, import_vue10.ref)(
      null
    );
    let optionsPropsRef = (0, import_vue10.ref)({
      static: false,
      hold: false
    });
    let options = (0, import_vue10.ref)([]);
    let activeOptionIndex = (0, import_vue10.ref)(null);
    let activationTrigger = (0, import_vue10.ref)(
      1 /* Other */
    );
    let defaultToFirstOption = (0, import_vue10.ref)(false);
    function adjustOrderedState(adjustment = (i) => i) {
      let currentActiveOption = activeOptionIndex.value !== null ? options.value[activeOptionIndex.value] : null;
      let sortedOptions = sortByDomNode(
        adjustment(options.value.slice()),
        (option) => dom(option.dataRef.domRef)
      );
      let adjustedActiveOptionIndex = currentActiveOption ? sortedOptions.indexOf(currentActiveOption) : null;
      if (adjustedActiveOptionIndex === -1) {
        adjustedActiveOptionIndex = null;
      }
      return {
        options: sortedOptions,
        activeOptionIndex: adjustedActiveOptionIndex
      };
    }
    let mode = (0, import_vue10.computed)(() => props.multiple ? 1 /* Multi */ : 0 /* Single */);
    let nullable = (0, import_vue10.computed)(() => props.nullable);
    let [value, theirOnChange] = useControllable(
      (0, import_vue10.computed)(() => props.modelValue),
      (value2) => emit("update:modelValue", value2),
      (0, import_vue10.computed)(() => props.defaultValue)
    );
    let api = {
      comboboxState,
      value,
      mode,
      compare(a, z) {
        if (typeof props.by === "string") {
          let property = props.by;
          return (a == null ? void 0 : a[property]) === (z == null ? void 0 : z[property]);
        }
        return props.by(a, z);
      },
      nullable,
      inputRef,
      labelRef,
      buttonRef,
      optionsRef,
      disabled: (0, import_vue10.computed)(() => props.disabled),
      options,
      change(value2) {
        theirOnChange(value2);
      },
      activeOptionIndex: (0, import_vue10.computed)(() => {
        if (defaultToFirstOption.value && activeOptionIndex.value === null && options.value.length > 0) {
          let localActiveOptionIndex = options.value.findIndex((option) => !option.dataRef.disabled);
          if (localActiveOptionIndex !== -1) {
            return localActiveOptionIndex;
          }
        }
        return activeOptionIndex.value;
      }),
      activationTrigger,
      optionsPropsRef,
      closeCombobox() {
        defaultToFirstOption.value = false;
        if (props.disabled)
          return;
        if (comboboxState.value === 1 /* Closed */)
          return;
        comboboxState.value = 1 /* Closed */;
        activeOptionIndex.value = null;
      },
      openCombobox() {
        defaultToFirstOption.value = true;
        if (props.disabled)
          return;
        if (comboboxState.value === 0 /* Open */)
          return;
        let optionIdx = options.value.findIndex((option) => {
          let optionValue = (0, import_vue10.toRaw)(option.dataRef.value);
          let selected = match(mode.value, {
            [0 /* Single */]: () => api.compare((0, import_vue10.toRaw)(api.value.value), (0, import_vue10.toRaw)(optionValue)),
            [1 /* Multi */]: () => (0, import_vue10.toRaw)(api.value.value).some(
              (value2) => api.compare((0, import_vue10.toRaw)(value2), (0, import_vue10.toRaw)(optionValue))
            )
          });
          return selected;
        });
        if (optionIdx !== -1) {
          activeOptionIndex.value = optionIdx;
        }
        comboboxState.value = 0 /* Open */;
      },
      goToOption(focus, id2, trigger) {
        defaultToFirstOption.value = false;
        if (props.disabled)
          return;
        if (optionsRef.value && !optionsPropsRef.value.static && comboboxState.value === 1 /* Closed */) {
          return;
        }
        let adjustedState = adjustOrderedState();
        if (adjustedState.activeOptionIndex === null) {
          let localActiveOptionIndex = adjustedState.options.findIndex(
            (option) => !option.dataRef.disabled
          );
          if (localActiveOptionIndex !== -1) {
            adjustedState.activeOptionIndex = localActiveOptionIndex;
          }
        }
        let nextActiveOptionIndex = calculateActiveIndex(
          focus === 4 /* Specific */ ? { focus: 4 /* Specific */, id: id2 } : { focus },
          {
            resolveItems: () => adjustedState.options,
            resolveActiveIndex: () => adjustedState.activeOptionIndex,
            resolveId: (option) => option.id,
            resolveDisabled: (option) => option.dataRef.disabled
          }
        );
        activeOptionIndex.value = nextActiveOptionIndex;
        activationTrigger.value = trigger != null ? trigger : 1 /* Other */;
        options.value = adjustedState.options;
      },
      selectOption(id2) {
        let option = options.value.find((item) => item.id === id2);
        if (!option)
          return;
        let { dataRef } = option;
        theirOnChange(
          match(mode.value, {
            [0 /* Single */]: () => dataRef.value,
            [1 /* Multi */]: () => {
              let copy = (0, import_vue10.toRaw)(api.value.value).slice();
              let raw = (0, import_vue10.toRaw)(dataRef.value);
              let idx = copy.findIndex((value2) => api.compare(raw, (0, import_vue10.toRaw)(value2)));
              if (idx === -1) {
                copy.push(raw);
              } else {
                copy.splice(idx, 1);
              }
              return copy;
            }
          })
        );
      },
      selectActiveOption() {
        if (api.activeOptionIndex.value === null)
          return;
        let { dataRef, id: id2 } = options.value[api.activeOptionIndex.value];
        theirOnChange(
          match(mode.value, {
            [0 /* Single */]: () => dataRef.value,
            [1 /* Multi */]: () => {
              let copy = (0, import_vue10.toRaw)(api.value.value).slice();
              let raw = (0, import_vue10.toRaw)(dataRef.value);
              let idx = copy.findIndex((value2) => api.compare(raw, (0, import_vue10.toRaw)(value2)));
              if (idx === -1) {
                copy.push(raw);
              } else {
                copy.splice(idx, 1);
              }
              return copy;
            }
          })
        );
        api.goToOption(4 /* Specific */, id2);
      },
      registerOption(id2, dataRef) {
        let option = { id: id2, dataRef };
        let adjustedState = adjustOrderedState((options2) => [...options2, option]);
        if (activeOptionIndex.value === null) {
          let optionValue = dataRef.value.value;
          let selected = match(mode.value, {
            [0 /* Single */]: () => api.compare((0, import_vue10.toRaw)(api.value.value), (0, import_vue10.toRaw)(optionValue)),
            [1 /* Multi */]: () => (0, import_vue10.toRaw)(api.value.value).some(
              (value2) => api.compare((0, import_vue10.toRaw)(value2), (0, import_vue10.toRaw)(optionValue))
            )
          });
          if (selected) {
            adjustedState.activeOptionIndex = adjustedState.options.indexOf(option);
          }
        }
        options.value = adjustedState.options;
        activeOptionIndex.value = adjustedState.activeOptionIndex;
        activationTrigger.value = 1 /* Other */;
      },
      unregisterOption(id2) {
        let adjustedState = adjustOrderedState((options2) => {
          let idx = options2.findIndex((a) => a.id === id2);
          if (idx !== -1)
            options2.splice(idx, 1);
          return options2;
        });
        options.value = adjustedState.options;
        activeOptionIndex.value = adjustedState.activeOptionIndex;
        activationTrigger.value = 1 /* Other */;
      }
    };
    useOutsideClick(
      [inputRef, buttonRef, optionsRef],
      () => api.closeCombobox(),
      (0, import_vue10.computed)(() => comboboxState.value === 0 /* Open */)
    );
    (0, import_vue10.provide)(ComboboxContext, api);
    useOpenClosedProvider(
      (0, import_vue10.computed)(
        () => match(comboboxState.value, {
          [0 /* Open */]: 0 /* Open */,
          [1 /* Closed */]: 1 /* Closed */
        })
      )
    );
    let activeOption = (0, import_vue10.computed)(
      () => api.activeOptionIndex.value === null ? null : options.value[api.activeOptionIndex.value].dataRef.value
    );
    return () => {
      let { name, disabled, ...theirProps } = props;
      let slot = {
        open: comboboxState.value === 0 /* Open */,
        disabled,
        activeIndex: api.activeOptionIndex.value,
        activeOption: activeOption.value,
        value: value.value
      };
      return (0, import_vue10.h)(import_vue10.Fragment, [
        ...name != null && value.value != null ? objectToFormEntries({ [name]: value.value }).map(([name2, value2]) => {
          return (0, import_vue10.h)(
            Hidden,
            compact({
              features: 4 /* Hidden */,
              key: name2,
              as: "input",
              type: "hidden",
              hidden: true,
              readOnly: true,
              name: name2,
              value: value2
            })
          );
        }) : [],
        render({
          theirProps: {
            ...attrs,
            ...omit(theirProps, [
              "modelValue",
              "defaultValue",
              "nullable",
              "multiple",
              "onUpdate:modelValue",
              "by"
            ])
          },
          ourProps: {},
          slot,
          slots,
          attrs,
          name: "Combobox"
        })
      ]);
    };
  }
});
var ComboboxLabel = (0, import_vue10.defineComponent)({
  name: "ComboboxLabel",
  props: { as: { type: [Object, String], default: "label" } },
  setup(props, { attrs, slots }) {
    let api = useComboboxContext("ComboboxLabel");
    let id2 = `headlessui-combobox-label-${useId()}`;
    function handleClick() {
      var _a;
      (_a = dom(api.inputRef)) == null ? void 0 : _a.focus({ preventScroll: true });
    }
    return () => {
      let slot = {
        open: api.comboboxState.value === 0 /* Open */,
        disabled: api.disabled.value
      };
      let ourProps = { id: id2, ref: api.labelRef, onClick: handleClick };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "ComboboxLabel"
      });
    };
  }
});
var ComboboxButton = (0, import_vue10.defineComponent)({
  name: "ComboboxButton",
  props: {
    as: { type: [Object, String], default: "button" }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useComboboxContext("ComboboxButton");
    let id2 = `headlessui-combobox-button-${useId()}`;
    expose({ el: api.buttonRef, $el: api.buttonRef });
    function handleClick(event) {
      if (api.disabled.value)
        return;
      if (api.comboboxState.value === 0 /* Open */) {
        api.closeCombobox();
      } else {
        event.preventDefault();
        api.openCombobox();
      }
      (0, import_vue10.nextTick)(() => {
        var _a;
        return (_a = dom(api.inputRef)) == null ? void 0 : _a.focus({ preventScroll: true });
      });
    }
    function handleKeydown(event) {
      switch (event.key) {
        case "ArrowDown" /* ArrowDown */:
          event.preventDefault();
          event.stopPropagation();
          if (api.comboboxState.value === 1 /* Closed */) {
            api.openCombobox();
          }
          (0, import_vue10.nextTick)(() => {
            var _a;
            return (_a = api.inputRef.value) == null ? void 0 : _a.focus({ preventScroll: true });
          });
          return;
        case "ArrowUp" /* ArrowUp */:
          event.preventDefault();
          event.stopPropagation();
          if (api.comboboxState.value === 1 /* Closed */) {
            api.openCombobox();
            (0, import_vue10.nextTick)(() => {
              if (!api.value.value) {
                api.goToOption(3 /* Last */);
              }
            });
          }
          (0, import_vue10.nextTick)(() => {
            var _a;
            return (_a = api.inputRef.value) == null ? void 0 : _a.focus({ preventScroll: true });
          });
          return;
        case "Escape" /* Escape */:
          if (api.comboboxState.value !== 0 /* Open */)
            return;
          event.preventDefault();
          if (api.optionsRef.value && !api.optionsPropsRef.value.static) {
            event.stopPropagation();
          }
          api.closeCombobox();
          (0, import_vue10.nextTick)(() => {
            var _a;
            return (_a = api.inputRef.value) == null ? void 0 : _a.focus({ preventScroll: true });
          });
          return;
      }
    }
    let type = useResolveButtonType(
      (0, import_vue10.computed)(() => ({ as: props.as, type: attrs.type })),
      api.buttonRef
    );
    return () => {
      var _a, _b;
      let slot = {
        open: api.comboboxState.value === 0 /* Open */,
        disabled: api.disabled.value,
        value: api.value.value
      };
      let ourProps = {
        ref: api.buttonRef,
        id: id2,
        type: type.value,
        tabindex: "-1",
        "aria-haspopup": true,
        "aria-controls": (_a = dom(api.optionsRef)) == null ? void 0 : _a.id,
        "aria-expanded": api.disabled.value ? void 0 : api.comboboxState.value === 0 /* Open */,
        "aria-labelledby": api.labelRef.value ? [(_b = dom(api.labelRef)) == null ? void 0 : _b.id, id2].join(" ") : void 0,
        disabled: api.disabled.value === true ? true : void 0,
        onKeydown: handleKeydown,
        onClick: handleClick
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "ComboboxButton"
      });
    };
  }
});
var ComboboxInput = (0, import_vue10.defineComponent)({
  name: "ComboboxInput",
  props: {
    as: { type: [Object, String], default: "input" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    displayValue: { type: Function }
  },
  emits: {
    change: (_value) => true
  },
  setup(props, { emit, attrs, slots, expose }) {
    let api = useComboboxContext("ComboboxInput");
    let id2 = `headlessui-combobox-input-${useId()}`;
    expose({ el: api.inputRef, $el: api.inputRef });
    let currentValue = (0, import_vue10.ref)(api.value.value);
    let getCurrentValue = () => {
      var _a;
      let value = api.value.value;
      if (!dom(api.inputRef))
        return "";
      if (typeof props.displayValue !== "undefined") {
        return (_a = props.displayValue(value)) != null ? _a : "";
      } else if (typeof value === "string") {
        return value;
      } else {
        return "";
      }
    };
    const __fixVueImmediateWatchBug__ = (0, import_vue10.ref)("");
    let shouldIgnoreOpenOnChange = false;
    function updateInputAndNotify(currentValue2) {
      let input = dom(api.inputRef);
      if (!input) {
        return;
      }
      input.value = currentValue2;
      shouldIgnoreOpenOnChange = true;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      shouldIgnoreOpenOnChange = false;
    }
    (0, import_vue10.onMounted)(() => {
      (0, import_vue10.watch)(
        [api.value, __fixVueImmediateWatchBug__],
        () => {
          currentValue.value = getCurrentValue();
        },
        {
          flush: "sync",
          immediate: true
        }
      );
      (0, import_vue10.watch)(
        [currentValue, api.comboboxState],
        ([currentValue2, state], [oldCurrentValue, oldState]) => {
          let input = dom(api.inputRef);
          if (!input)
            return;
          if (oldState === 0 /* Open */ && state === 1 /* Closed */) {
            updateInputAndNotify(currentValue2);
          } else if (currentValue2 !== oldCurrentValue) {
            input.value = currentValue2;
          }
        },
        { immediate: true }
      );
    });
    function handleKeyDown(event) {
      switch (event.key) {
        case "Backspace" /* Backspace */:
        case "Delete" /* Delete */:
          if (api.mode.value !== 0 /* Single */)
            return;
          if (!api.nullable.value)
            return;
          let input = event.currentTarget;
          requestAnimationFrame(() => {
            if (input.value === "") {
              api.change(null);
              let options = dom(api.optionsRef);
              if (options) {
                options.scrollTop = 0;
              }
              api.goToOption(5 /* Nothing */);
            }
          });
          break;
        case "Enter" /* Enter */:
          if (api.comboboxState.value !== 0 /* Open */)
            return;
          if (event.isComposing)
            return;
          event.preventDefault();
          event.stopPropagation();
          if (api.activeOptionIndex.value === null) {
            api.closeCombobox();
            return;
          }
          api.selectActiveOption();
          if (api.mode.value === 0 /* Single */) {
            api.closeCombobox();
          }
          break;
        case "ArrowDown" /* ArrowDown */:
          event.preventDefault();
          event.stopPropagation();
          return match(api.comboboxState.value, {
            [0 /* Open */]: () => api.goToOption(2 /* Next */),
            [1 /* Closed */]: () => api.openCombobox()
          });
        case "ArrowUp" /* ArrowUp */:
          event.preventDefault();
          event.stopPropagation();
          return match(api.comboboxState.value, {
            [0 /* Open */]: () => api.goToOption(1 /* Previous */),
            [1 /* Closed */]: () => {
              api.openCombobox();
              (0, import_vue10.nextTick)(() => {
                if (!api.value.value) {
                  api.goToOption(3 /* Last */);
                }
              });
            }
          });
        case "Home" /* Home */:
        case "PageUp" /* PageUp */:
          event.preventDefault();
          event.stopPropagation();
          return api.goToOption(0 /* First */);
        case "End" /* End */:
        case "PageDown" /* PageDown */:
          event.preventDefault();
          event.stopPropagation();
          return api.goToOption(3 /* Last */);
        case "Escape" /* Escape */:
          if (api.comboboxState.value !== 0 /* Open */)
            return;
          event.preventDefault();
          if (api.optionsRef.value && !api.optionsPropsRef.value.static) {
            event.stopPropagation();
          }
          api.closeCombobox();
          break;
        case "Tab" /* Tab */:
          if (api.comboboxState.value !== 0 /* Open */)
            return;
          if (api.mode.value === 0 /* Single */)
            api.selectActiveOption();
          api.closeCombobox();
          break;
      }
    }
    function handleChange(event) {
      emit("change", event);
    }
    function handleInput(event) {
      if (!shouldIgnoreOpenOnChange) {
        api.openCombobox();
      }
      emit("change", event);
    }
    return () => {
      var _a, _b, _c, _d, _e, _f;
      let slot = { open: api.comboboxState.value === 0 /* Open */ };
      let ourProps = {
        "aria-controls": (_a = api.optionsRef.value) == null ? void 0 : _a.id,
        "aria-expanded": api.disabled.value ? void 0 : api.comboboxState.value === 0 /* Open */,
        "aria-activedescendant": api.activeOptionIndex.value === null ? void 0 : (_b = api.options.value[api.activeOptionIndex.value]) == null ? void 0 : _b.id,
        "aria-multiselectable": api.mode.value === 1 /* Multi */ ? true : void 0,
        "aria-labelledby": (_e = (_c = dom(api.labelRef)) == null ? void 0 : _c.id) != null ? _e : (_d = dom(api.buttonRef)) == null ? void 0 : _d.id,
        id: id2,
        onKeydown: handleKeyDown,
        onChange: handleChange,
        onInput: handleInput,
        role: "combobox",
        type: (_f = attrs.type) != null ? _f : "text",
        tabIndex: 0,
        ref: api.inputRef
      };
      let theirProps = omit(props, ["displayValue"]);
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        features: 1 /* RenderStrategy */ | 2 /* Static */,
        name: "ComboboxInput"
      });
    };
  }
});
var ComboboxOptions = (0, import_vue10.defineComponent)({
  name: "ComboboxOptions",
  props: {
    as: { type: [Object, String], default: "ul" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    hold: { type: [Boolean], default: false }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useComboboxContext("ComboboxOptions");
    let id2 = `headlessui-combobox-options-${useId()}`;
    expose({ el: api.optionsRef, $el: api.optionsRef });
    (0, import_vue10.watchEffect)(() => {
      api.optionsPropsRef.value.static = props.static;
    });
    (0, import_vue10.watchEffect)(() => {
      api.optionsPropsRef.value.hold = props.hold;
    });
    let usesOpenClosedState = useOpenClosed();
    let visible = (0, import_vue10.computed)(() => {
      if (usesOpenClosedState !== null) {
        return usesOpenClosedState.value === 0 /* Open */;
      }
      return api.comboboxState.value === 0 /* Open */;
    });
    useTreeWalker({
      container: (0, import_vue10.computed)(() => dom(api.optionsRef)),
      enabled: (0, import_vue10.computed)(() => api.comboboxState.value === 0 /* Open */),
      accept(node) {
        if (node.getAttribute("role") === "option")
          return NodeFilter.FILTER_REJECT;
        if (node.hasAttribute("role"))
          return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      },
      walk(node) {
        node.setAttribute("role", "none");
      }
    });
    return () => {
      var _a, _b, _c, _d;
      let slot = { open: api.comboboxState.value === 0 /* Open */ };
      let ourProps = {
        "aria-activedescendant": api.activeOptionIndex.value === null ? void 0 : (_a = api.options.value[api.activeOptionIndex.value]) == null ? void 0 : _a.id,
        "aria-labelledby": (_d = (_b = dom(api.labelRef)) == null ? void 0 : _b.id) != null ? _d : (_c = dom(api.buttonRef)) == null ? void 0 : _c.id,
        id: id2,
        ref: api.optionsRef,
        role: "listbox"
      };
      let theirProps = omit(props, ["hold"]);
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        features: 1 /* RenderStrategy */ | 2 /* Static */,
        visible: visible.value,
        name: "ComboboxOptions"
      });
    };
  }
});
var ComboboxOption = (0, import_vue10.defineComponent)({
  name: "ComboboxOption",
  props: {
    as: { type: [Object, String], default: "li" },
    value: { type: [Object, String, Number, Boolean] },
    disabled: { type: Boolean, default: false }
  },
  setup(props, { slots, attrs, expose }) {
    let api = useComboboxContext("ComboboxOption");
    let id2 = `headlessui-combobox-option-${useId()}`;
    let internalOptionRef = (0, import_vue10.ref)(null);
    expose({ el: internalOptionRef, $el: internalOptionRef });
    let active = (0, import_vue10.computed)(() => {
      return api.activeOptionIndex.value !== null ? api.options.value[api.activeOptionIndex.value].id === id2 : false;
    });
    let selected = (0, import_vue10.computed)(
      () => match(api.mode.value, {
        [0 /* Single */]: () => api.compare((0, import_vue10.toRaw)(api.value.value), (0, import_vue10.toRaw)(props.value)),
        [1 /* Multi */]: () => (0, import_vue10.toRaw)(api.value.value).some(
          (value) => api.compare((0, import_vue10.toRaw)(value), (0, import_vue10.toRaw)(props.value))
        )
      })
    );
    let dataRef = (0, import_vue10.computed)(() => ({
      disabled: props.disabled,
      value: props.value,
      domRef: internalOptionRef
    }));
    (0, import_vue10.onMounted)(() => api.registerOption(id2, dataRef));
    (0, import_vue10.onUnmounted)(() => api.unregisterOption(id2));
    (0, import_vue10.watchEffect)(() => {
      if (api.comboboxState.value !== 0 /* Open */)
        return;
      if (!active.value)
        return;
      if (api.activationTrigger.value === 0 /* Pointer */)
        return;
      (0, import_vue10.nextTick)(() => {
        var _a, _b;
        return (_b = (_a = dom(internalOptionRef)) == null ? void 0 : _a.scrollIntoView) == null ? void 0 : _b.call(_a, { block: "nearest" });
      });
    });
    function handleClick(event) {
      if (props.disabled)
        return event.preventDefault();
      api.selectOption(id2);
      if (api.mode.value === 0 /* Single */) {
        api.closeCombobox();
      }
    }
    function handleFocus() {
      if (props.disabled)
        return api.goToOption(5 /* Nothing */);
      api.goToOption(4 /* Specific */, id2);
    }
    function handleMove() {
      if (props.disabled)
        return;
      if (active.value)
        return;
      api.goToOption(4 /* Specific */, id2, 0 /* Pointer */);
    }
    function handleLeave() {
      if (props.disabled)
        return;
      if (!active.value)
        return;
      if (api.optionsPropsRef.value.hold)
        return;
      api.goToOption(5 /* Nothing */);
    }
    return () => {
      let { disabled } = props;
      let slot = { active: active.value, selected: selected.value, disabled };
      let ourProps = {
        id: id2,
        ref: internalOptionRef,
        role: "option",
        tabIndex: disabled === true ? void 0 : -1,
        "aria-disabled": disabled === true ? true : void 0,
        "aria-selected": selected.value,
        disabled: void 0,
        onClick: handleClick,
        onFocus: handleFocus,
        onPointermove: handleMove,
        onMousemove: handleMove,
        onPointerleave: handleLeave,
        onMouseleave: handleLeave
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "ComboboxOption"
      });
    };
  }
});

// src/components/dialog/dialog.ts
var import_vue20 = require("vue");

// src/components/focus-trap/focus-trap.ts
var import_vue14 = require("vue");

// src/hooks/use-tab-direction.ts
var import_vue12 = require("vue");

// src/hooks/use-window-event.ts
var import_vue11 = require("vue");
function useWindowEvent(type, listener, options) {
  if (isServer)
    return;
  (0, import_vue11.watchEffect)((onInvalidate) => {
    window.addEventListener(type, listener, options);
    onInvalidate(() => window.removeEventListener(type, listener, options));
  });
}

// src/hooks/use-tab-direction.ts
function useTabDirection() {
  let direction = (0, import_vue12.ref)(0 /* Forwards */);
  useWindowEvent("keydown", (event) => {
    if (event.key === "Tab") {
      direction.value = event.shiftKey ? 1 /* Backwards */ : 0 /* Forwards */;
    }
  });
  return direction;
}

// src/hooks/use-event-listener.ts
var import_vue13 = require("vue");
function useEventListener(element, type, listener, options) {
  if (isServer)
    return;
  (0, import_vue13.watchEffect)((onInvalidate) => {
    element = element != null ? element : window;
    element.addEventListener(type, listener, options);
    onInvalidate(() => element.removeEventListener(type, listener, options));
  });
}

// src/utils/micro-task.ts
function microTask(cb) {
  if (typeof queueMicrotask === "function") {
    queueMicrotask(cb);
  } else {
    Promise.resolve().then(cb).catch(
      (e) => setTimeout(() => {
        throw e;
      })
    );
  }
}

// src/components/focus-trap/focus-trap.ts
var Features3 = /* @__PURE__ */ ((Features4) => {
  Features4[Features4["None"] = 1] = "None";
  Features4[Features4["InitialFocus"] = 2] = "InitialFocus";
  Features4[Features4["TabLock"] = 4] = "TabLock";
  Features4[Features4["FocusLock"] = 8] = "FocusLock";
  Features4[Features4["RestoreFocus"] = 16] = "RestoreFocus";
  Features4[Features4["All"] = 30] = "All";
  return Features4;
})(Features3 || {});
var FocusTrap = Object.assign(
  (0, import_vue14.defineComponent)({
    name: "FocusTrap",
    props: {
      as: { type: [Object, String], default: "div" },
      initialFocus: { type: Object, default: null },
      features: { type: Number, default: 30 /* All */ },
      containers: {
        type: Object,
        default: (0, import_vue14.ref)(/* @__PURE__ */ new Set())
      }
    },
    inheritAttrs: false,
    setup(props, { attrs, slots, expose }) {
      let container = (0, import_vue14.ref)(null);
      expose({ el: container, $el: container });
      let ownerDocument = (0, import_vue14.computed)(() => getOwnerDocument(container));
      useRestoreFocus(
        { ownerDocument },
        (0, import_vue14.computed)(() => Boolean(props.features & 16 /* RestoreFocus */))
      );
      let previousActiveElement = useInitialFocus(
        { ownerDocument, container, initialFocus: (0, import_vue14.computed)(() => props.initialFocus) },
        (0, import_vue14.computed)(() => Boolean(props.features & 2 /* InitialFocus */))
      );
      useFocusLock(
        {
          ownerDocument,
          container,
          containers: props.containers,
          previousActiveElement
        },
        (0, import_vue14.computed)(() => Boolean(props.features & 8 /* FocusLock */))
      );
      let direction = useTabDirection();
      function handleFocus() {
        let el = dom(container);
        if (!el)
          return;
        if (false) {
          microTask(() => {
            match(direction.value, {
              [0 /* Forwards */]: () => focusIn(el, 1 /* First */),
              [1 /* Backwards */]: () => focusIn(el, 8 /* Last */)
            });
          });
        } else {
          match(direction.value, {
            [0 /* Forwards */]: () => focusIn(el, 1 /* First */),
            [1 /* Backwards */]: () => focusIn(el, 8 /* Last */)
          });
        }
      }
      return () => {
        let slot = {};
        let ourProps = { ref: container };
        let { features, initialFocus, containers: _containers, ...theirProps } = props;
        return (0, import_vue14.h)(import_vue14.Fragment, [
          Boolean(features & 4 /* TabLock */) && (0, import_vue14.h)(Hidden, {
            as: "button",
            type: "button",
            onFocus: handleFocus,
            features: 2 /* Focusable */
          }),
          render({
            ourProps,
            theirProps: { ...attrs, ...theirProps },
            slot,
            attrs,
            slots,
            name: "FocusTrap"
          }),
          Boolean(features & 4 /* TabLock */) && (0, import_vue14.h)(Hidden, {
            as: "button",
            type: "button",
            onFocus: handleFocus,
            features: 2 /* Focusable */
          })
        ]);
      };
    }
  }),
  { features: Features3 }
);
function useRestoreFocus({ ownerDocument }, enabled) {
  let restoreElement = (0, import_vue14.ref)(null);
  function captureFocus() {
    var _a;
    if (restoreElement.value)
      return;
    restoreElement.value = (_a = ownerDocument.value) == null ? void 0 : _a.activeElement;
  }
  function restoreFocusIfNeeded() {
    if (!restoreElement.value)
      return;
    focusElement(restoreElement.value);
    restoreElement.value = null;
  }
  (0, import_vue14.onMounted)(() => {
    (0, import_vue14.watch)(
      enabled,
      (newValue, prevValue) => {
        if (newValue === prevValue)
          return;
        if (newValue) {
          captureFocus();
        } else {
          restoreFocusIfNeeded();
        }
      },
      { immediate: true }
    );
  });
  (0, import_vue14.onUnmounted)(restoreFocusIfNeeded);
}
function useInitialFocus({
  ownerDocument,
  container,
  initialFocus
}, enabled) {
  let previousActiveElement = (0, import_vue14.ref)(null);
  let mounted = (0, import_vue14.ref)(false);
  (0, import_vue14.onMounted)(() => mounted.value = true);
  (0, import_vue14.onUnmounted)(() => mounted.value = false);
  (0, import_vue14.onMounted)(() => {
    (0, import_vue14.watch)(
      [container, initialFocus, enabled],
      (newValues, prevValues) => {
        if (newValues.every((value, idx) => (prevValues == null ? void 0 : prevValues[idx]) === value))
          return;
        if (!enabled.value)
          return;
        let containerElement = dom(container);
        if (!containerElement)
          return;
        microTask(() => {
          var _a, _b;
          if (!mounted.value) {
            return;
          }
          let initialFocusElement = dom(initialFocus);
          let activeElement = (_a = ownerDocument.value) == null ? void 0 : _a.activeElement;
          if (initialFocusElement) {
            if (initialFocusElement === activeElement) {
              previousActiveElement.value = activeElement;
              return;
            }
          } else if (containerElement.contains(activeElement)) {
            previousActiveElement.value = activeElement;
            return;
          }
          if (initialFocusElement) {
            focusElement(initialFocusElement);
          } else {
            if (focusIn(containerElement, 1 /* First */ | 32 /* NoScroll */) === 0 /* Error */) {
              console.warn("There are no focusable elements inside the <FocusTrap />");
            }
          }
          previousActiveElement.value = (_b = ownerDocument.value) == null ? void 0 : _b.activeElement;
        });
      },
      { immediate: true, flush: "post" }
    );
  });
  return previousActiveElement;
}
function useFocusLock({
  ownerDocument,
  container,
  containers,
  previousActiveElement
}, enabled) {
  var _a;
  useEventListener(
    (_a = ownerDocument.value) == null ? void 0 : _a.defaultView,
    "focus",
    (event) => {
      if (!enabled.value)
        return;
      let allContainers = new Set(containers == null ? void 0 : containers.value);
      allContainers.add(container);
      let previous = previousActiveElement.value;
      if (!previous)
        return;
      let toElement = event.target;
      if (toElement && toElement instanceof HTMLElement) {
        if (!contains(allContainers, toElement)) {
          event.preventDefault();
          event.stopPropagation();
          focusElement(previous);
        } else {
          previousActiveElement.value = toElement;
          focusElement(toElement);
        }
      } else {
        focusElement(previousActiveElement.value);
      }
    },
    true
  );
}
function contains(containers, element) {
  var _a;
  for (let container of containers) {
    if ((_a = container.value) == null ? void 0 : _a.contains(element))
      return true;
  }
  return false;
}

// src/hooks/use-inert-others.ts
var import_vue15 = require("vue");
var CHILDREN_SELECTOR = false ? '[data-v-app=""] > *' : "body > *";
var interactables = /* @__PURE__ */ new Set();
var originals = /* @__PURE__ */ new Map();
function inert(element) {
  element.setAttribute("aria-hidden", "true");
  element.inert = true;
}
function restore(element) {
  let original = originals.get(element);
  if (!original)
    return;
  if (original["aria-hidden"] === null)
    element.removeAttribute("aria-hidden");
  else
    element.setAttribute("aria-hidden", original["aria-hidden"]);
  element.inert = original.inert;
}
function useInertOthers(container, enabled = (0, import_vue15.ref)(true)) {
  (0, import_vue15.watchEffect)((onInvalidate) => {
    if (!enabled.value)
      return;
    if (!container.value)
      return;
    let element = container.value;
    let ownerDocument = getOwnerDocument(element);
    if (!ownerDocument)
      return;
    interactables.add(element);
    for (let original of originals.keys()) {
      if (original.contains(element)) {
        restore(original);
        originals.delete(original);
      }
    }
    ownerDocument.querySelectorAll(CHILDREN_SELECTOR).forEach((child) => {
      if (!(child instanceof HTMLElement))
        return;
      for (let interactable of interactables) {
        if (child.contains(interactable))
          return;
      }
      if (interactables.size === 1) {
        originals.set(child, {
          "aria-hidden": child.getAttribute("aria-hidden"),
          inert: child.inert
        });
        inert(child);
      }
    });
    onInvalidate(() => {
      interactables.delete(element);
      if (interactables.size > 0) {
        ownerDocument.querySelectorAll(CHILDREN_SELECTOR).forEach((child) => {
          if (!(child instanceof HTMLElement))
            return;
          if (originals.has(child))
            return;
          for (let interactable of interactables) {
            if (child.contains(interactable))
              return;
          }
          originals.set(child, {
            "aria-hidden": child.getAttribute("aria-hidden"),
            inert: child.inert
          });
          inert(child);
        });
      } else {
        for (let element2 of originals.keys()) {
          restore(element2);
          originals.delete(element2);
        }
      }
    });
  });
}

// src/components/portal/portal.ts
var import_vue17 = require("vue");

// src/internal/portal-force-root.ts
var import_vue16 = require("vue");
var ForcePortalRootContext = Symbol("ForcePortalRootContext");
function usePortalRoot() {
  return (0, import_vue16.inject)(ForcePortalRootContext, false);
}
var ForcePortalRoot = (0, import_vue16.defineComponent)({
  name: "ForcePortalRoot",
  props: {
    as: { type: [Object, String], default: "template" },
    force: { type: Boolean, default: false }
  },
  setup(props, { slots, attrs }) {
    (0, import_vue16.provide)(ForcePortalRootContext, props.force);
    return () => {
      let { force, ...theirProps } = props;
      return render({
        theirProps,
        ourProps: {},
        slot: {},
        slots,
        attrs,
        name: "ForcePortalRoot"
      });
    };
  }
});

// src/components/portal/portal.ts
function getPortalRoot(contextElement) {
  let ownerDocument = getOwnerDocument(contextElement);
  if (!ownerDocument) {
    if (contextElement === null) {
      return null;
    }
    throw new Error(
      `[Headless UI]: Cannot find ownerDocument for contextElement: ${contextElement}`
    );
  }
  let existingRoot = ownerDocument.getElementById("headlessui-portal-root");
  if (existingRoot)
    return existingRoot;
  let root = ownerDocument.createElement("div");
  root.setAttribute("id", "headlessui-portal-root");
  return ownerDocument.body.appendChild(root);
}
var Portal = (0, import_vue17.defineComponent)({
  name: "Portal",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props, { slots, attrs }) {
    let element = (0, import_vue17.ref)(null);
    let ownerDocument = (0, import_vue17.computed)(() => getOwnerDocument(element));
    let forcePortalRoot = usePortalRoot();
    let groupContext = (0, import_vue17.inject)(PortalGroupContext, null);
    let myTarget = (0, import_vue17.ref)(
      forcePortalRoot === true ? getPortalRoot(element.value) : groupContext == null ? getPortalRoot(element.value) : groupContext.resolveTarget()
    );
    (0, import_vue17.watchEffect)(() => {
      if (forcePortalRoot)
        return;
      if (groupContext == null)
        return;
      myTarget.value = groupContext.resolveTarget();
    });
    (0, import_vue17.onUnmounted)(() => {
      var _a, _b;
      let root = (_a = ownerDocument.value) == null ? void 0 : _a.getElementById("headlessui-portal-root");
      if (!root)
        return;
      if (myTarget.value !== root)
        return;
      if (myTarget.value.children.length <= 0) {
        (_b = myTarget.value.parentElement) == null ? void 0 : _b.removeChild(myTarget.value);
      }
    });
    return () => {
      if (myTarget.value === null)
        return null;
      let ourProps = {
        ref: element,
        "data-headlessui-portal": ""
      };
      return (0, import_vue17.h)(
        import_vue17.Teleport,
        { to: myTarget.value },
        render({
          ourProps,
          theirProps: props,
          slot: {},
          attrs,
          slots,
          name: "Portal"
        })
      );
    };
  }
});
var PortalGroupContext = Symbol("PortalGroupContext");
var PortalGroup = (0, import_vue17.defineComponent)({
  name: "PortalGroup",
  props: {
    as: { type: [Object, String], default: "template" },
    target: { type: Object, default: null }
  },
  setup(props, { attrs, slots }) {
    let api = (0, import_vue17.reactive)({
      resolveTarget() {
        return props.target;
      }
    });
    (0, import_vue17.provide)(PortalGroupContext, api);
    return () => {
      let { target: _, ...theirProps } = props;
      return render({
        theirProps,
        ourProps: {},
        slot: {},
        attrs,
        slots,
        name: "PortalGroup"
      });
    };
  }
});

// src/internal/stack-context.ts
var import_vue18 = require("vue");
var StackContext = Symbol("StackContext");
function useStackContext() {
  return (0, import_vue18.inject)(StackContext, () => {
  });
}
function useStackProvider({
  type,
  enabled,
  element,
  onUpdate
}) {
  let parentUpdate = useStackContext();
  function notify(...args) {
    onUpdate == null ? void 0 : onUpdate(...args);
    parentUpdate(...args);
  }
  (0, import_vue18.onMounted)(() => {
    (0, import_vue18.watch)(
      enabled,
      (isEnabled, oldIsEnabled) => {
        if (isEnabled) {
          notify(0 /* Add */, type, element);
        } else if (oldIsEnabled === true) {
          notify(1 /* Remove */, type, element);
        }
      },
      { immediate: true, flush: "sync" }
    );
  });
  (0, import_vue18.onUnmounted)(() => {
    if (enabled.value) {
      notify(1 /* Remove */, type, element);
    }
  });
  (0, import_vue18.provide)(StackContext, notify);
}

// src/components/description/description.ts
var import_vue19 = require("vue");
var DescriptionContext = Symbol("DescriptionContext");
function useDescriptionContext() {
  let context = (0, import_vue19.inject)(DescriptionContext, null);
  if (context === null) {
    throw new Error("Missing parent");
  }
  return context;
}
function useDescriptions({
  slot = (0, import_vue19.ref)({}),
  name = "Description",
  props = {}
} = {}) {
  let descriptionIds = (0, import_vue19.ref)([]);
  function register(value) {
    descriptionIds.value.push(value);
    return () => {
      let idx = descriptionIds.value.indexOf(value);
      if (idx === -1)
        return;
      descriptionIds.value.splice(idx, 1);
    };
  }
  (0, import_vue19.provide)(DescriptionContext, { register, slot, name, props });
  return (0, import_vue19.computed)(
    () => descriptionIds.value.length > 0 ? descriptionIds.value.join(" ") : void 0
  );
}
var Description = (0, import_vue19.defineComponent)({
  name: "Description",
  props: {
    as: { type: [Object, String], default: "p" }
  },
  setup(myProps, { attrs, slots }) {
    let context = useDescriptionContext();
    let id2 = `headlessui-description-${useId()}`;
    (0, import_vue19.onMounted)(() => (0, import_vue19.onUnmounted)(context.register(id2)));
    return () => {
      let { name = "Description", slot = (0, import_vue19.ref)({}), props = {} } = context;
      let theirProps = myProps;
      let ourProps = {
        ...Object.entries(props).reduce(
          (acc, [key, value]) => Object.assign(acc, { [key]: (0, import_vue19.unref)(value) }),
          {}
        ),
        id: id2
      };
      return render({
        ourProps,
        theirProps,
        slot: slot.value,
        attrs,
        slots,
        name
      });
    };
  }
});

// src/utils/disposables.ts
function disposables() {
  let disposables2 = [];
  let queue = [];
  let api = {
    enqueue(fn) {
      queue.push(fn);
    },
    addEventListener(element, name, listener, options) {
      element.addEventListener(name, listener, options);
      return api.add(() => element.removeEventListener(name, listener, options));
    },
    requestAnimationFrame(...args) {
      let raf = requestAnimationFrame(...args);
      api.add(() => cancelAnimationFrame(raf));
    },
    nextFrame(...args) {
      api.requestAnimationFrame(() => {
        api.requestAnimationFrame(...args);
      });
    },
    setTimeout(...args) {
      let timer = setTimeout(...args);
      api.add(() => clearTimeout(timer));
    },
    add(cb) {
      disposables2.push(cb);
    },
    dispose() {
      for (let dispose of disposables2.splice(0)) {
        dispose();
      }
    },
    async workQueue() {
      for (let handle of queue.splice(0)) {
        await handle();
      }
    }
  };
  return api;
}

// src/utils/platform.ts
function isIOS() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}

// src/components/dialog/dialog.ts
var DialogContext = Symbol("DialogContext");
function useDialogContext(component) {
  let context = (0, import_vue20.inject)(DialogContext, null);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Dialog /> component.`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useDialogContext);
    throw err;
  }
  return context;
}
var Missing = "DC8F892D-2EBD-447C-A4C8-A03058436FF4";
var Dialog = (0, import_vue20.defineComponent)({
  name: "Dialog",
  inheritAttrs: false,
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    open: { type: [Boolean, String], default: Missing },
    initialFocus: { type: Object, default: null },
    closeOnEsc: { type: Boolean, default: true },
    closeOnOutsideClick: { type: Boolean, default: true }
  },
  emits: { close: (_close) => true },
  setup(props, { emit, attrs, slots, expose }) {
    var _a;
    let ready = (0, import_vue20.ref)(false);
    (0, import_vue20.onMounted)(() => {
      ready.value = true;
    });
    let nestedDialogCount = (0, import_vue20.ref)(0);
    let usesOpenClosedState = useOpenClosed();
    let open = (0, import_vue20.computed)(() => {
      if (props.open === Missing && usesOpenClosedState !== null) {
        return match(usesOpenClosedState.value, {
          [0 /* Open */]: true,
          [1 /* Closed */]: false
        });
      }
      return props.open;
    });
    let containers = (0, import_vue20.ref)(/* @__PURE__ */ new Set());
    let internalDialogRef = (0, import_vue20.ref)(null);
    let mainTreeNode = (0, import_vue20.ref)(null);
    let ownerDocument = (0, import_vue20.computed)(() => getOwnerDocument(internalDialogRef));
    expose({ el: internalDialogRef, $el: internalDialogRef });
    let hasOpen = props.open !== Missing || usesOpenClosedState !== null;
    if (!hasOpen) {
      throw new Error(`You forgot to provide an \`open\` prop to the \`Dialog\`.`);
    }
    if (typeof open.value !== "boolean") {
      throw new Error(
        `You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${open.value === Missing ? void 0 : props.open}`
      );
    }
    let dialogState = (0, import_vue20.computed)(
      () => !ready.value ? 1 /* Closed */ : open.value ? 0 /* Open */ : 1 /* Closed */
    );
    let enabled = (0, import_vue20.computed)(() => dialogState.value === 0 /* Open */);
    let hasNestedDialogs = (0, import_vue20.computed)(() => nestedDialogCount.value > 1);
    let hasParentDialog = (0, import_vue20.inject)(DialogContext, null) !== null;
    let position = (0, import_vue20.computed)(() => !hasNestedDialogs.value ? "leaf" : "parent");
    useInertOthers(
      internalDialogRef,
      (0, import_vue20.computed)(() => hasNestedDialogs.value ? enabled.value : false)
    );
    useStackProvider({
      type: "Dialog",
      enabled: (0, import_vue20.computed)(() => dialogState.value === 0 /* Open */),
      element: internalDialogRef,
      onUpdate: (message, type, element) => {
        if (type !== "Dialog")
          return;
        return match(message, {
          [0 /* Add */]() {
            containers.value.add(element);
            nestedDialogCount.value += 1;
          },
          [1 /* Remove */]() {
            containers.value.delete(element);
            nestedDialogCount.value -= 1;
          }
        });
      }
    });
    let describedby = useDescriptions({
      name: "DialogDescription",
      slot: (0, import_vue20.computed)(() => ({ open: open.value }))
    });
    let id2 = `headlessui-dialog-${useId()}`;
    let titleId = (0, import_vue20.ref)(null);
    let api = {
      titleId,
      panelRef: (0, import_vue20.ref)(null),
      dialogState,
      setTitleId(id3) {
        if (titleId.value === id3)
          return;
        titleId.value = id3;
      },
      close() {
        emit("close", false);
      }
    };
    (0, import_vue20.provide)(DialogContext, api);
    useOutsideClick(
      () => {
        var _a2, _b, _c;
        let rootContainers = Array.from(
          (_b = (_a2 = ownerDocument.value) == null ? void 0 : _a2.querySelectorAll("body > *, [data-headlessui-portal]")) != null ? _b : []
        ).filter((container) => {
          if (!(container instanceof HTMLElement))
            return false;
          if (container.contains(dom(mainTreeNode)))
            return false;
          if (api.panelRef.value && container.contains(api.panelRef.value))
            return false;
          return true;
        });
        return [...rootContainers, (_c = api.panelRef.value) != null ? _c : internalDialogRef.value];
      },
      (_event, target) => {
        api.close();
        (0, import_vue20.nextTick)(() => target == null ? void 0 : target.focus());
      },
      (0, import_vue20.computed)(
        () => dialogState.value === 0 /* Open */ && !hasNestedDialogs.value && props.closeOnOutsideClick
      )
    );
    useEventListener((_a = ownerDocument.value) == null ? void 0 : _a.defaultView, "keydown", (event) => {
      if (!props.closeOnEsc)
        return;
      if (event.defaultPrevented)
        return;
      if (event.key !== "Escape" /* Escape */)
        return;
      if (dialogState.value !== 0 /* Open */)
        return;
      if (hasNestedDialogs.value)
        return;
      event.preventDefault();
      event.stopPropagation();
      api.close();
    });
    (0, import_vue20.watchEffect)((onInvalidate) => {
      var _a2;
      if (dialogState.value !== 0 /* Open */)
        return;
      if (hasParentDialog)
        return;
      let owner = ownerDocument.value;
      if (!owner)
        return;
      let d = disposables();
      function style(node, property, value) {
        let previous = node.style.getPropertyValue(property);
        Object.assign(node.style, { [property]: value });
        return d.add(() => {
          Object.assign(node.style, { [property]: previous });
        });
      }
      let documentElement = owner == null ? void 0 : owner.documentElement;
      let ownerWindow = (_a2 = owner.defaultView) != null ? _a2 : window;
      let scrollbarWidthBefore = ownerWindow.innerWidth - documentElement.clientWidth;
      style(documentElement, "overflow", "hidden");
      if (scrollbarWidthBefore > 0) {
        let scrollbarWidthAfter = documentElement.clientWidth - documentElement.offsetWidth;
        let scrollbarWidth = scrollbarWidthBefore - scrollbarWidthAfter;
        style(documentElement, "paddingRight", `${scrollbarWidth}px`);
      }
      if (isIOS()) {
        let scrollPosition = window.pageYOffset;
        style(documentElement, "position", "fixed");
        style(documentElement, "marginTop", `-${scrollPosition}px`);
        style(documentElement, "width", `100%`);
        d.add(() => window.scrollTo(0, scrollPosition));
      }
      onInvalidate(d.dispose);
    });
    (0, import_vue20.watchEffect)((onInvalidate) => {
      if (dialogState.value !== 0 /* Open */)
        return;
      let container = dom(internalDialogRef);
      if (!container)
        return;
      let observer = new IntersectionObserver((entries) => {
        for (let entry of entries) {
          if (entry.boundingClientRect.x === 0 && entry.boundingClientRect.y === 0 && entry.boundingClientRect.width === 0 && entry.boundingClientRect.height === 0) {
            api.close();
          }
        }
      });
      observer.observe(container);
      onInvalidate(() => observer.disconnect());
    });
    return () => {
      let ourProps = {
        ...attrs,
        ref: internalDialogRef,
        id: id2,
        role: "dialog",
        "aria-modal": dialogState.value === 0 /* Open */ ? true : void 0,
        "aria-labelledby": titleId.value,
        "aria-describedby": describedby.value
      };
      let { open: _, initialFocus, ...theirProps } = props;
      let slot = { open: dialogState.value === 0 /* Open */ };
      return (0, import_vue20.h)(ForcePortalRoot, { force: true }, () => [
        (0, import_vue20.h)(
          Portal,
          () => (0, import_vue20.h)(
            PortalGroup,
            { target: internalDialogRef.value },
            () => (0, import_vue20.h)(
              ForcePortalRoot,
              { force: false },
              () => (0, import_vue20.h)(
                FocusTrap,
                {
                  initialFocus,
                  containers,
                  features: enabled.value ? match(position.value, {
                    parent: FocusTrap.features.RestoreFocus,
                    leaf: FocusTrap.features.All & ~FocusTrap.features.FocusLock
                  }) : FocusTrap.features.None
                },
                () => render({
                  ourProps,
                  theirProps,
                  slot,
                  attrs,
                  slots,
                  visible: dialogState.value === 0 /* Open */,
                  features: 1 /* RenderStrategy */ | 2 /* Static */,
                  name: "Dialog"
                })
              )
            )
          )
        ),
        (0, import_vue20.h)(Hidden, { features: 4 /* Hidden */, ref: mainTreeNode })
      ]);
    };
  }
});
var DialogOverlay = (0, import_vue20.defineComponent)({
  name: "DialogOverlay",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props, { attrs, slots }) {
    let api = useDialogContext("DialogOverlay");
    let id2 = `headlessui-dialog-overlay-${useId()}`;
    function handleClick(event) {
      if (event.target !== event.currentTarget)
        return;
      event.preventDefault();
      event.stopPropagation();
      api.close();
    }
    return () => {
      let ourProps = {
        id: id2,
        "aria-hidden": true,
        onClick: handleClick
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot: { open: api.dialogState.value === 0 /* Open */ },
        attrs,
        slots,
        name: "DialogOverlay"
      });
    };
  }
});
var DialogBackdrop = (0, import_vue20.defineComponent)({
  name: "DialogBackdrop",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    let api = useDialogContext("DialogBackdrop");
    let id2 = `headlessui-dialog-backdrop-${useId()}`;
    let internalBackdropRef = (0, import_vue20.ref)(null);
    expose({ el: internalBackdropRef, $el: internalBackdropRef });
    (0, import_vue20.onMounted)(() => {
      if (api.panelRef.value === null) {
        throw new Error(
          `A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.`
        );
      }
    });
    return () => {
      let theirProps = props;
      let ourProps = {
        id: id2,
        ref: internalBackdropRef,
        "aria-hidden": true
      };
      return (0, import_vue20.h)(
        ForcePortalRoot,
        { force: true },
        () => (0, import_vue20.h)(
          Portal,
          () => render({
            ourProps,
            theirProps: { ...attrs, ...theirProps },
            slot: { open: api.dialogState.value === 0 /* Open */ },
            attrs,
            slots,
            name: "DialogBackdrop"
          })
        )
      );
    };
  }
});
var DialogPanel = (0, import_vue20.defineComponent)({
  name: "DialogPanel",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useDialogContext("DialogPanel");
    let id2 = `headlessui-dialog-panel-${useId()}`;
    expose({ el: api.panelRef, $el: api.panelRef });
    function handleClick(event) {
      event.stopPropagation();
    }
    return () => {
      let ourProps = {
        id: id2,
        ref: api.panelRef,
        onClick: handleClick
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot: { open: api.dialogState.value === 0 /* Open */ },
        attrs,
        slots,
        name: "DialogPanel"
      });
    };
  }
});
var DialogTitle = (0, import_vue20.defineComponent)({
  name: "DialogTitle",
  props: {
    as: { type: [Object, String], default: "h2" }
  },
  setup(props, { attrs, slots }) {
    let api = useDialogContext("DialogTitle");
    let id2 = `headlessui-dialog-title-${useId()}`;
    (0, import_vue20.onMounted)(() => {
      api.setTitleId(id2);
      (0, import_vue20.onUnmounted)(() => api.setTitleId(null));
    });
    return () => {
      let ourProps = { id: id2 };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot: { open: api.dialogState.value === 0 /* Open */ },
        attrs,
        slots,
        name: "DialogTitle"
      });
    };
  }
});
var DialogDescription = Description;

// src/components/disclosure/disclosure.ts
var import_vue21 = require("vue");
var DisclosureContext = Symbol("DisclosureContext");
function useDisclosureContext(component) {
  let context = (0, import_vue21.inject)(DisclosureContext, null);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Disclosure /> component.`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useDisclosureContext);
    throw err;
  }
  return context;
}
var DisclosurePanelContext = Symbol("DisclosurePanelContext");
function useDisclosurePanelContext() {
  return (0, import_vue21.inject)(DisclosurePanelContext, null);
}
var Disclosure = (0, import_vue21.defineComponent)({
  name: "Disclosure",
  props: {
    as: { type: [Object, String], default: "template" },
    defaultOpen: { type: [Boolean], default: false }
  },
  setup(props, { slots, attrs }) {
    let buttonId = `headlessui-disclosure-button-${useId()}`;
    let panelId = `headlessui-disclosure-panel-${useId()}`;
    let disclosureState = (0, import_vue21.ref)(
      props.defaultOpen ? 0 /* Open */ : 1 /* Closed */
    );
    let panelRef = (0, import_vue21.ref)(null);
    let buttonRef = (0, import_vue21.ref)(null);
    let api = {
      buttonId,
      panelId,
      disclosureState,
      panel: panelRef,
      button: buttonRef,
      toggleDisclosure() {
        disclosureState.value = match(disclosureState.value, {
          [0 /* Open */]: 1 /* Closed */,
          [1 /* Closed */]: 0 /* Open */
        });
      },
      closeDisclosure() {
        if (disclosureState.value === 1 /* Closed */)
          return;
        disclosureState.value = 1 /* Closed */;
      },
      close(focusableElement) {
        api.closeDisclosure();
        let restoreElement = (() => {
          if (!focusableElement)
            return dom(api.button);
          if (focusableElement instanceof HTMLElement)
            return focusableElement;
          if (focusableElement.value instanceof HTMLElement)
            return dom(focusableElement);
          return dom(api.button);
        })();
        restoreElement == null ? void 0 : restoreElement.focus();
      }
    };
    (0, import_vue21.provide)(DisclosureContext, api);
    useOpenClosedProvider(
      (0, import_vue21.computed)(() => {
        return match(disclosureState.value, {
          [0 /* Open */]: 0 /* Open */,
          [1 /* Closed */]: 1 /* Closed */
        });
      })
    );
    return () => {
      let { defaultOpen: _, ...theirProps } = props;
      let slot = { open: disclosureState.value === 0 /* Open */, close: api.close };
      return render({
        theirProps,
        ourProps: {},
        slot,
        slots,
        attrs,
        name: "Disclosure"
      });
    };
  }
});
var DisclosureButton = (0, import_vue21.defineComponent)({
  name: "DisclosureButton",
  props: {
    as: { type: [Object, String], default: "button" },
    disabled: { type: [Boolean], default: false }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useDisclosureContext("DisclosureButton");
    let panelContext = useDisclosurePanelContext();
    let isWithinPanel = panelContext === null ? false : panelContext === api.panelId;
    let internalButtonRef = (0, import_vue21.ref)(null);
    expose({ el: internalButtonRef, $el: internalButtonRef });
    if (!isWithinPanel) {
      (0, import_vue21.watchEffect)(() => {
        api.button.value = internalButtonRef.value;
      });
    }
    let type = useResolveButtonType(
      (0, import_vue21.computed)(() => ({ as: props.as, type: attrs.type })),
      internalButtonRef
    );
    function handleClick() {
      var _a;
      if (props.disabled)
        return;
      if (isWithinPanel) {
        api.toggleDisclosure();
        (_a = dom(api.button)) == null ? void 0 : _a.focus();
      } else {
        api.toggleDisclosure();
      }
    }
    function handleKeyDown(event) {
      var _a;
      if (props.disabled)
        return;
      if (isWithinPanel) {
        switch (event.key) {
          case " " /* Space */:
          case "Enter" /* Enter */:
            event.preventDefault();
            event.stopPropagation();
            api.toggleDisclosure();
            (_a = dom(api.button)) == null ? void 0 : _a.focus();
            break;
        }
      } else {
        switch (event.key) {
          case " " /* Space */:
          case "Enter" /* Enter */:
            event.preventDefault();
            event.stopPropagation();
            api.toggleDisclosure();
            break;
        }
      }
    }
    function handleKeyUp(event) {
      switch (event.key) {
        case " " /* Space */:
          event.preventDefault();
          break;
      }
    }
    return () => {
      let slot = { open: api.disclosureState.value === 0 /* Open */ };
      let ourProps = isWithinPanel ? {
        ref: internalButtonRef,
        type: type.value,
        onClick: handleClick,
        onKeydown: handleKeyDown
      } : {
        id: api.buttonId,
        ref: internalButtonRef,
        type: type.value,
        "aria-expanded": props.disabled ? void 0 : api.disclosureState.value === 0 /* Open */,
        "aria-controls": dom(api.panel) ? api.panelId : void 0,
        disabled: props.disabled ? true : void 0,
        onClick: handleClick,
        onKeydown: handleKeyDown,
        onKeyup: handleKeyUp
      };
      return render({
        ourProps,
        theirProps: props,
        slot,
        attrs,
        slots,
        name: "DisclosureButton"
      });
    };
  }
});
var DisclosurePanel = (0, import_vue21.defineComponent)({
  name: "DisclosurePanel",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useDisclosureContext("DisclosurePanel");
    expose({ el: api.panel, $el: api.panel });
    (0, import_vue21.provide)(DisclosurePanelContext, api.panelId);
    let usesOpenClosedState = useOpenClosed();
    let visible = (0, import_vue21.computed)(() => {
      if (usesOpenClosedState !== null) {
        return usesOpenClosedState.value === 0 /* Open */;
      }
      return api.disclosureState.value === 0 /* Open */;
    });
    return () => {
      let slot = { open: api.disclosureState.value === 0 /* Open */, close: api.close };
      let ourProps = { id: api.panelId, ref: api.panel };
      return render({
        ourProps,
        theirProps: props,
        slot,
        attrs,
        slots,
        features: 1 /* RenderStrategy */ | 2 /* Static */,
        visible: visible.value,
        name: "DisclosurePanel"
      });
    };
  }
});

// src/components/listbox/listbox.ts
var import_vue22 = require("vue");
function defaultComparator2(a, z) {
  return a === z;
}
function nextFrame(cb) {
  requestAnimationFrame(() => requestAnimationFrame(cb));
}
var ListboxContext = Symbol("ListboxContext");
function useListboxContext(component) {
  let context = (0, import_vue22.inject)(ListboxContext, null);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Listbox /> component.`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useListboxContext);
    throw err;
  }
  return context;
}
var Listbox = (0, import_vue22.defineComponent)({
  name: "Listbox",
  emits: { "update:modelValue": (_value) => true },
  props: {
    as: { type: [Object, String], default: "template" },
    disabled: { type: [Boolean], default: false },
    by: { type: [String, Function], default: () => defaultComparator2 },
    horizontal: { type: [Boolean], default: false },
    modelValue: { type: [Object, String, Number, Boolean], default: void 0 },
    defaultValue: { type: [Object, String, Number, Boolean], default: void 0 },
    name: { type: String, optional: true },
    multiple: { type: [Boolean], default: false }
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
    let listboxState = (0, import_vue22.ref)(1 /* Closed */);
    let labelRef = (0, import_vue22.ref)(null);
    let buttonRef = (0, import_vue22.ref)(null);
    let optionsRef = (0, import_vue22.ref)(null);
    let options = (0, import_vue22.ref)([]);
    let searchQuery = (0, import_vue22.ref)("");
    let activeOptionIndex = (0, import_vue22.ref)(null);
    let activationTrigger = (0, import_vue22.ref)(
      1 /* Other */
    );
    function adjustOrderedState(adjustment = (i) => i) {
      let currentActiveOption = activeOptionIndex.value !== null ? options.value[activeOptionIndex.value] : null;
      let sortedOptions = sortByDomNode(
        adjustment(options.value.slice()),
        (option) => dom(option.dataRef.domRef)
      );
      let adjustedActiveOptionIndex = currentActiveOption ? sortedOptions.indexOf(currentActiveOption) : null;
      if (adjustedActiveOptionIndex === -1) {
        adjustedActiveOptionIndex = null;
      }
      return {
        options: sortedOptions,
        activeOptionIndex: adjustedActiveOptionIndex
      };
    }
    let mode = (0, import_vue22.computed)(() => props.multiple ? 1 /* Multi */ : 0 /* Single */);
    let [value, theirOnChange] = useControllable(
      (0, import_vue22.computed)(() => props.modelValue),
      (value2) => emit("update:modelValue", value2),
      (0, import_vue22.computed)(() => props.defaultValue)
    );
    let api = {
      listboxState,
      value,
      mode,
      compare(a, z) {
        if (typeof props.by === "string") {
          let property = props.by;
          return (a == null ? void 0 : a[property]) === (z == null ? void 0 : z[property]);
        }
        return props.by(a, z);
      },
      orientation: (0, import_vue22.computed)(() => props.horizontal ? "horizontal" : "vertical"),
      labelRef,
      buttonRef,
      optionsRef,
      disabled: (0, import_vue22.computed)(() => props.disabled),
      options,
      searchQuery,
      activeOptionIndex,
      activationTrigger,
      closeListbox() {
        if (props.disabled)
          return;
        if (listboxState.value === 1 /* Closed */)
          return;
        listboxState.value = 1 /* Closed */;
        activeOptionIndex.value = null;
      },
      openListbox() {
        if (props.disabled)
          return;
        if (listboxState.value === 0 /* Open */)
          return;
        listboxState.value = 0 /* Open */;
      },
      goToOption(focus, id2, trigger) {
        if (props.disabled)
          return;
        if (listboxState.value === 1 /* Closed */)
          return;
        let adjustedState = adjustOrderedState();
        let nextActiveOptionIndex = calculateActiveIndex(
          focus === 4 /* Specific */ ? { focus: 4 /* Specific */, id: id2 } : { focus },
          {
            resolveItems: () => adjustedState.options,
            resolveActiveIndex: () => adjustedState.activeOptionIndex,
            resolveId: (option) => option.id,
            resolveDisabled: (option) => option.dataRef.disabled
          }
        );
        searchQuery.value = "";
        activeOptionIndex.value = nextActiveOptionIndex;
        activationTrigger.value = trigger != null ? trigger : 1 /* Other */;
        options.value = adjustedState.options;
      },
      search(value2) {
        if (props.disabled)
          return;
        if (listboxState.value === 1 /* Closed */)
          return;
        let wasAlreadySearching = searchQuery.value !== "";
        let offset = wasAlreadySearching ? 0 : 1;
        searchQuery.value += value2.toLowerCase();
        let reOrderedOptions = activeOptionIndex.value !== null ? options.value.slice(activeOptionIndex.value + offset).concat(options.value.slice(0, activeOptionIndex.value + offset)) : options.value;
        let matchingOption = reOrderedOptions.find(
          (option) => option.dataRef.textValue.startsWith(searchQuery.value) && !option.dataRef.disabled
        );
        let matchIdx = matchingOption ? options.value.indexOf(matchingOption) : -1;
        if (matchIdx === -1 || matchIdx === activeOptionIndex.value)
          return;
        activeOptionIndex.value = matchIdx;
        activationTrigger.value = 1 /* Other */;
      },
      clearSearch() {
        if (props.disabled)
          return;
        if (listboxState.value === 1 /* Closed */)
          return;
        if (searchQuery.value === "")
          return;
        searchQuery.value = "";
      },
      registerOption(id2, dataRef) {
        let adjustedState = adjustOrderedState((options2) => {
          return [...options2, { id: id2, dataRef }];
        });
        options.value = adjustedState.options;
        activeOptionIndex.value = adjustedState.activeOptionIndex;
      },
      unregisterOption(id2) {
        let adjustedState = adjustOrderedState((options2) => {
          let idx = options2.findIndex((a) => a.id === id2);
          if (idx !== -1)
            options2.splice(idx, 1);
          return options2;
        });
        options.value = adjustedState.options;
        activeOptionIndex.value = adjustedState.activeOptionIndex;
        activationTrigger.value = 1 /* Other */;
      },
      select(value2) {
        if (props.disabled)
          return;
        theirOnChange(
          match(mode.value, {
            [0 /* Single */]: () => value2,
            [1 /* Multi */]: () => {
              let copy = (0, import_vue22.toRaw)(api.value.value).slice();
              let raw = (0, import_vue22.toRaw)(value2);
              let idx = copy.findIndex((value3) => api.compare(raw, (0, import_vue22.toRaw)(value3)));
              if (idx === -1) {
                copy.push(raw);
              } else {
                copy.splice(idx, 1);
              }
              return copy;
            }
          })
        );
      }
    };
    useOutsideClick(
      [buttonRef, optionsRef],
      (event, target) => {
        var _a;
        api.closeListbox();
        if (!isFocusableElement(target, 1 /* Loose */)) {
          event.preventDefault();
          (_a = dom(buttonRef)) == null ? void 0 : _a.focus();
        }
      },
      (0, import_vue22.computed)(() => listboxState.value === 0 /* Open */)
    );
    (0, import_vue22.provide)(ListboxContext, api);
    useOpenClosedProvider(
      (0, import_vue22.computed)(
        () => match(listboxState.value, {
          [0 /* Open */]: 0 /* Open */,
          [1 /* Closed */]: 1 /* Closed */
        })
      )
    );
    return () => {
      let { name, modelValue, disabled, ...theirProps } = props;
      let slot = { open: listboxState.value === 0 /* Open */, disabled, value: value.value };
      return (0, import_vue22.h)(import_vue22.Fragment, [
        ...name != null && value.value != null ? objectToFormEntries({ [name]: value.value }).map(
          ([name2, value2]) => (0, import_vue22.h)(
            Hidden,
            compact({
              features: 4 /* Hidden */,
              key: name2,
              as: "input",
              type: "hidden",
              hidden: true,
              readOnly: true,
              name: name2,
              value: value2
            })
          )
        ) : [],
        render({
          ourProps: {},
          theirProps: {
            ...attrs,
            ...omit(theirProps, [
              "defaultValue",
              "onUpdate:modelValue",
              "horizontal",
              "multiple",
              "by"
            ])
          },
          slot,
          slots,
          attrs,
          name: "Listbox"
        })
      ]);
    };
  }
});
var ListboxLabel = (0, import_vue22.defineComponent)({
  name: "ListboxLabel",
  props: { as: { type: [Object, String], default: "label" } },
  setup(props, { attrs, slots }) {
    let api = useListboxContext("ListboxLabel");
    let id2 = `headlessui-listbox-label-${useId()}`;
    function handleClick() {
      var _a;
      (_a = dom(api.buttonRef)) == null ? void 0 : _a.focus({ preventScroll: true });
    }
    return () => {
      let slot = {
        open: api.listboxState.value === 0 /* Open */,
        disabled: api.disabled.value
      };
      let ourProps = { id: id2, ref: api.labelRef, onClick: handleClick };
      return render({
        ourProps,
        theirProps: props,
        slot,
        attrs,
        slots,
        name: "ListboxLabel"
      });
    };
  }
});
var ListboxButton = (0, import_vue22.defineComponent)({
  name: "ListboxButton",
  props: {
    as: { type: [Object, String], default: "button" }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useListboxContext("ListboxButton");
    let id2 = `headlessui-listbox-button-${useId()}`;
    expose({ el: api.buttonRef, $el: api.buttonRef });
    function handleKeyDown(event) {
      switch (event.key) {
        case " " /* Space */:
        case "Enter" /* Enter */:
        case "ArrowDown" /* ArrowDown */:
          event.preventDefault();
          api.openListbox();
          (0, import_vue22.nextTick)(() => {
            var _a;
            (_a = dom(api.optionsRef)) == null ? void 0 : _a.focus({ preventScroll: true });
            if (!api.value.value)
              api.goToOption(0 /* First */);
          });
          break;
        case "ArrowUp" /* ArrowUp */:
          event.preventDefault();
          api.openListbox();
          (0, import_vue22.nextTick)(() => {
            var _a;
            (_a = dom(api.optionsRef)) == null ? void 0 : _a.focus({ preventScroll: true });
            if (!api.value.value)
              api.goToOption(3 /* Last */);
          });
          break;
      }
    }
    function handleKeyUp(event) {
      switch (event.key) {
        case " " /* Space */:
          event.preventDefault();
          break;
      }
    }
    function handleClick(event) {
      if (api.disabled.value)
        return;
      if (api.listboxState.value === 0 /* Open */) {
        api.closeListbox();
        (0, import_vue22.nextTick)(() => {
          var _a;
          return (_a = dom(api.buttonRef)) == null ? void 0 : _a.focus({ preventScroll: true });
        });
      } else {
        event.preventDefault();
        api.openListbox();
        nextFrame(() => {
          var _a;
          return (_a = dom(api.optionsRef)) == null ? void 0 : _a.focus({ preventScroll: true });
        });
      }
    }
    let type = useResolveButtonType(
      (0, import_vue22.computed)(() => ({ as: props.as, type: attrs.type })),
      api.buttonRef
    );
    return () => {
      var _a, _b;
      let slot = {
        open: api.listboxState.value === 0 /* Open */,
        disabled: api.disabled.value,
        value: api.value.value
      };
      let ourProps = {
        ref: api.buttonRef,
        id: id2,
        type: type.value,
        "aria-haspopup": true,
        "aria-controls": (_a = dom(api.optionsRef)) == null ? void 0 : _a.id,
        "aria-expanded": api.disabled.value ? void 0 : api.listboxState.value === 0 /* Open */,
        "aria-labelledby": api.labelRef.value ? [(_b = dom(api.labelRef)) == null ? void 0 : _b.id, id2].join(" ") : void 0,
        disabled: api.disabled.value === true ? true : void 0,
        onKeydown: handleKeyDown,
        onKeyup: handleKeyUp,
        onClick: handleClick
      };
      return render({
        ourProps,
        theirProps: props,
        slot,
        attrs,
        slots,
        name: "ListboxButton"
      });
    };
  }
});
var ListboxOptions = (0, import_vue22.defineComponent)({
  name: "ListboxOptions",
  props: {
    as: { type: [Object, String], default: "ul" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useListboxContext("ListboxOptions");
    let id2 = `headlessui-listbox-options-${useId()}`;
    let searchDebounce = (0, import_vue22.ref)(null);
    expose({ el: api.optionsRef, $el: api.optionsRef });
    function handleKeyDown(event) {
      if (searchDebounce.value)
        clearTimeout(searchDebounce.value);
      switch (event.key) {
        case " " /* Space */:
          if (api.searchQuery.value !== "") {
            event.preventDefault();
            event.stopPropagation();
            return api.search(event.key);
          }
        case "Enter" /* Enter */:
          event.preventDefault();
          event.stopPropagation();
          if (api.activeOptionIndex.value !== null) {
            let activeOption = api.options.value[api.activeOptionIndex.value];
            api.select(activeOption.dataRef.value);
          }
          if (api.mode.value === 0 /* Single */) {
            api.closeListbox();
            (0, import_vue22.nextTick)(() => {
              var _a;
              return (_a = dom(api.buttonRef)) == null ? void 0 : _a.focus({ preventScroll: true });
            });
          }
          break;
        case match(api.orientation.value, {
          vertical: "ArrowDown" /* ArrowDown */,
          horizontal: "ArrowRight" /* ArrowRight */
        }):
          event.preventDefault();
          event.stopPropagation();
          return api.goToOption(2 /* Next */);
        case match(api.orientation.value, { vertical: "ArrowUp" /* ArrowUp */, horizontal: "ArrowLeft" /* ArrowLeft */ }):
          event.preventDefault();
          event.stopPropagation();
          return api.goToOption(1 /* Previous */);
        case "Home" /* Home */:
        case "PageUp" /* PageUp */:
          event.preventDefault();
          event.stopPropagation();
          return api.goToOption(0 /* First */);
        case "End" /* End */:
        case "PageDown" /* PageDown */:
          event.preventDefault();
          event.stopPropagation();
          return api.goToOption(3 /* Last */);
        case "Escape" /* Escape */:
          event.preventDefault();
          event.stopPropagation();
          api.closeListbox();
          (0, import_vue22.nextTick)(() => {
            var _a;
            return (_a = dom(api.buttonRef)) == null ? void 0 : _a.focus({ preventScroll: true });
          });
          break;
        case "Tab" /* Tab */:
          event.preventDefault();
          event.stopPropagation();
          break;
        default:
          if (event.key.length === 1) {
            api.search(event.key);
            searchDebounce.value = setTimeout(() => api.clearSearch(), 350);
          }
          break;
      }
    }
    let usesOpenClosedState = useOpenClosed();
    let visible = (0, import_vue22.computed)(() => {
      if (usesOpenClosedState !== null) {
        return usesOpenClosedState.value === 0 /* Open */;
      }
      return api.listboxState.value === 0 /* Open */;
    });
    return () => {
      var _a, _b, _c, _d;
      let slot = { open: api.listboxState.value === 0 /* Open */ };
      let ourProps = {
        "aria-activedescendant": api.activeOptionIndex.value === null ? void 0 : (_a = api.options.value[api.activeOptionIndex.value]) == null ? void 0 : _a.id,
        "aria-multiselectable": api.mode.value === 1 /* Multi */ ? true : void 0,
        "aria-labelledby": (_d = (_b = dom(api.labelRef)) == null ? void 0 : _b.id) != null ? _d : (_c = dom(api.buttonRef)) == null ? void 0 : _c.id,
        "aria-orientation": api.orientation.value,
        id: id2,
        onKeydown: handleKeyDown,
        role: "listbox",
        tabIndex: 0,
        ref: api.optionsRef
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        features: 1 /* RenderStrategy */ | 2 /* Static */,
        visible: visible.value,
        name: "ListboxOptions"
      });
    };
  }
});
var ListboxOption = (0, import_vue22.defineComponent)({
  name: "ListboxOption",
  props: {
    as: { type: [Object, String], default: "li" },
    value: { type: [Object, String, Number, Boolean] },
    disabled: { type: Boolean, default: false }
  },
  setup(props, { slots, attrs, expose }) {
    let api = useListboxContext("ListboxOption");
    let id2 = `headlessui-listbox-option-${useId()}`;
    let internalOptionRef = (0, import_vue22.ref)(null);
    expose({ el: internalOptionRef, $el: internalOptionRef });
    let active = (0, import_vue22.computed)(() => {
      return api.activeOptionIndex.value !== null ? api.options.value[api.activeOptionIndex.value].id === id2 : false;
    });
    let selected = (0, import_vue22.computed)(
      () => match(api.mode.value, {
        [0 /* Single */]: () => api.compare((0, import_vue22.toRaw)(api.value.value), (0, import_vue22.toRaw)(props.value)),
        [1 /* Multi */]: () => (0, import_vue22.toRaw)(api.value.value).some(
          (value) => api.compare((0, import_vue22.toRaw)(value), (0, import_vue22.toRaw)(props.value))
        )
      })
    );
    let isFirstSelected = (0, import_vue22.computed)(() => {
      return match(api.mode.value, {
        [1 /* Multi */]: () => {
          var _a;
          let currentValues = (0, import_vue22.toRaw)(api.value.value);
          return ((_a = api.options.value.find(
            (option) => currentValues.some((value) => api.compare((0, import_vue22.toRaw)(value), (0, import_vue22.toRaw)(option.dataRef.value)))
          )) == null ? void 0 : _a.id) === id2;
        },
        [0 /* Single */]: () => selected.value
      });
    });
    let dataRef = (0, import_vue22.computed)(() => ({
      disabled: props.disabled,
      value: props.value,
      textValue: "",
      domRef: internalOptionRef
    }));
    (0, import_vue22.onMounted)(() => {
      var _a, _b;
      let textValue = (_b = (_a = dom(internalOptionRef)) == null ? void 0 : _a.textContent) == null ? void 0 : _b.toLowerCase().trim();
      if (textValue !== void 0)
        dataRef.value.textValue = textValue;
    });
    (0, import_vue22.onMounted)(() => api.registerOption(id2, dataRef));
    (0, import_vue22.onUnmounted)(() => api.unregisterOption(id2));
    (0, import_vue22.onMounted)(() => {
      (0, import_vue22.watch)(
        [api.listboxState, selected],
        () => {
          if (api.listboxState.value !== 0 /* Open */)
            return;
          if (!selected.value)
            return;
          match(api.mode.value, {
            [1 /* Multi */]: () => {
              if (isFirstSelected.value)
                api.goToOption(4 /* Specific */, id2);
            },
            [0 /* Single */]: () => {
              api.goToOption(4 /* Specific */, id2);
            }
          });
        },
        { immediate: true }
      );
    });
    (0, import_vue22.watchEffect)(() => {
      if (api.listboxState.value !== 0 /* Open */)
        return;
      if (!active.value)
        return;
      if (api.activationTrigger.value === 0 /* Pointer */)
        return;
      (0, import_vue22.nextTick)(() => {
        var _a, _b;
        return (_b = (_a = dom(internalOptionRef)) == null ? void 0 : _a.scrollIntoView) == null ? void 0 : _b.call(_a, { block: "nearest" });
      });
    });
    function handleClick(event) {
      if (props.disabled)
        return event.preventDefault();
      api.select(props.value);
      if (api.mode.value === 0 /* Single */) {
        api.closeListbox();
        (0, import_vue22.nextTick)(() => {
          var _a;
          return (_a = dom(api.buttonRef)) == null ? void 0 : _a.focus({ preventScroll: true });
        });
      }
    }
    function handleFocus() {
      if (props.disabled)
        return api.goToOption(5 /* Nothing */);
      api.goToOption(4 /* Specific */, id2);
    }
    function handleMove() {
      if (props.disabled)
        return;
      if (active.value)
        return;
      api.goToOption(4 /* Specific */, id2, 0 /* Pointer */);
    }
    function handleLeave() {
      if (props.disabled)
        return;
      if (!active.value)
        return;
      api.goToOption(5 /* Nothing */);
    }
    return () => {
      let { disabled } = props;
      let slot = { active: active.value, selected: selected.value, disabled };
      let ourProps = {
        id: id2,
        ref: internalOptionRef,
        role: "option",
        tabIndex: disabled === true ? void 0 : -1,
        "aria-disabled": disabled === true ? true : void 0,
        "aria-selected": selected.value,
        disabled: void 0,
        onClick: handleClick,
        onFocus: handleFocus,
        onPointermove: handleMove,
        onMousemove: handleMove,
        onPointerleave: handleLeave,
        onMouseleave: handleLeave
      };
      return render({
        ourProps,
        theirProps: omit(props, ["value", "disabled"]),
        slot,
        attrs,
        slots,
        name: "ListboxOption"
      });
    };
  }
});

// src/components/menu/menu.ts
var import_vue23 = require("vue");
function nextFrame2(cb) {
  requestAnimationFrame(() => requestAnimationFrame(cb));
}
var MenuContext = Symbol("MenuContext");
function useMenuContext(component) {
  let context = (0, import_vue23.inject)(MenuContext, null);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Menu /> component.`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useMenuContext);
    throw err;
  }
  return context;
}
var Menu = (0, import_vue23.defineComponent)({
  name: "Menu",
  props: { as: { type: [Object, String], default: "template" } },
  setup(props, { slots, attrs }) {
    let menuState = (0, import_vue23.ref)(1 /* Closed */);
    let buttonRef = (0, import_vue23.ref)(null);
    let itemsRef = (0, import_vue23.ref)(null);
    let items = (0, import_vue23.ref)([]);
    let searchQuery = (0, import_vue23.ref)("");
    let activeItemIndex = (0, import_vue23.ref)(null);
    let activationTrigger = (0, import_vue23.ref)(
      1 /* Other */
    );
    function adjustOrderedState(adjustment = (i) => i) {
      let currentActiveItem = activeItemIndex.value !== null ? items.value[activeItemIndex.value] : null;
      let sortedItems = sortByDomNode(
        adjustment(items.value.slice()),
        (item) => dom(item.dataRef.domRef)
      );
      let adjustedActiveItemIndex = currentActiveItem ? sortedItems.indexOf(currentActiveItem) : null;
      if (adjustedActiveItemIndex === -1) {
        adjustedActiveItemIndex = null;
      }
      return {
        items: sortedItems,
        activeItemIndex: adjustedActiveItemIndex
      };
    }
    let api = {
      menuState,
      buttonRef,
      itemsRef,
      items,
      searchQuery,
      activeItemIndex,
      activationTrigger,
      closeMenu: () => {
        menuState.value = 1 /* Closed */;
        activeItemIndex.value = null;
      },
      openMenu: () => menuState.value = 0 /* Open */,
      goToItem(focus, id2, trigger) {
        let adjustedState = adjustOrderedState();
        let nextActiveItemIndex = calculateActiveIndex(
          focus === 4 /* Specific */ ? { focus: 4 /* Specific */, id: id2 } : { focus },
          {
            resolveItems: () => adjustedState.items,
            resolveActiveIndex: () => adjustedState.activeItemIndex,
            resolveId: (item) => item.id,
            resolveDisabled: (item) => item.dataRef.disabled
          }
        );
        searchQuery.value = "";
        activeItemIndex.value = nextActiveItemIndex;
        activationTrigger.value = trigger != null ? trigger : 1 /* Other */;
        items.value = adjustedState.items;
      },
      search(value) {
        let wasAlreadySearching = searchQuery.value !== "";
        let offset = wasAlreadySearching ? 0 : 1;
        searchQuery.value += value.toLowerCase();
        let reOrderedItems = activeItemIndex.value !== null ? items.value.slice(activeItemIndex.value + offset).concat(items.value.slice(0, activeItemIndex.value + offset)) : items.value;
        let matchingItem = reOrderedItems.find(
          (item) => item.dataRef.textValue.startsWith(searchQuery.value) && !item.dataRef.disabled
        );
        let matchIdx = matchingItem ? items.value.indexOf(matchingItem) : -1;
        if (matchIdx === -1 || matchIdx === activeItemIndex.value)
          return;
        activeItemIndex.value = matchIdx;
        activationTrigger.value = 1 /* Other */;
      },
      clearSearch() {
        searchQuery.value = "";
      },
      registerItem(id2, dataRef) {
        let adjustedState = adjustOrderedState((items2) => {
          return [...items2, { id: id2, dataRef }];
        });
        items.value = adjustedState.items;
        activeItemIndex.value = adjustedState.activeItemIndex;
        activationTrigger.value = 1 /* Other */;
      },
      unregisterItem(id2) {
        let adjustedState = adjustOrderedState((items2) => {
          let idx = items2.findIndex((a) => a.id === id2);
          if (idx !== -1)
            items2.splice(idx, 1);
          return items2;
        });
        items.value = adjustedState.items;
        activeItemIndex.value = adjustedState.activeItemIndex;
        activationTrigger.value = 1 /* Other */;
      }
    };
    useOutsideClick(
      [buttonRef, itemsRef],
      (event, target) => {
        var _a;
        api.closeMenu();
        if (!isFocusableElement(target, 1 /* Loose */)) {
          event.preventDefault();
          (_a = dom(buttonRef)) == null ? void 0 : _a.focus();
        }
      },
      (0, import_vue23.computed)(() => menuState.value === 0 /* Open */)
    );
    (0, import_vue23.provide)(MenuContext, api);
    useOpenClosedProvider(
      (0, import_vue23.computed)(
        () => match(menuState.value, {
          [0 /* Open */]: 0 /* Open */,
          [1 /* Closed */]: 1 /* Closed */
        })
      )
    );
    return () => {
      let slot = { open: menuState.value === 0 /* Open */, close: api.closeMenu };
      return render({ ourProps: {}, theirProps: props, slot, slots, attrs, name: "Menu" });
    };
  }
});
var MenuButton = (0, import_vue23.defineComponent)({
  name: "MenuButton",
  props: {
    disabled: { type: Boolean, default: false },
    as: { type: [Object, String], default: "button" }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useMenuContext("MenuButton");
    let id2 = `headlessui-menu-button-${useId()}`;
    expose({ el: api.buttonRef, $el: api.buttonRef });
    function handleKeyDown(event) {
      switch (event.key) {
        case " " /* Space */:
        case "Enter" /* Enter */:
        case "ArrowDown" /* ArrowDown */:
          event.preventDefault();
          event.stopPropagation();
          api.openMenu();
          (0, import_vue23.nextTick)(() => {
            var _a;
            (_a = dom(api.itemsRef)) == null ? void 0 : _a.focus({ preventScroll: true });
            api.goToItem(0 /* First */);
          });
          break;
        case "ArrowUp" /* ArrowUp */:
          event.preventDefault();
          event.stopPropagation();
          api.openMenu();
          (0, import_vue23.nextTick)(() => {
            var _a;
            (_a = dom(api.itemsRef)) == null ? void 0 : _a.focus({ preventScroll: true });
            api.goToItem(3 /* Last */);
          });
          break;
      }
    }
    function handleKeyUp(event) {
      switch (event.key) {
        case " " /* Space */:
          event.preventDefault();
          break;
      }
    }
    function handleClick(event) {
      if (props.disabled)
        return;
      if (api.menuState.value === 0 /* Open */) {
        api.closeMenu();
        (0, import_vue23.nextTick)(() => {
          var _a;
          return (_a = dom(api.buttonRef)) == null ? void 0 : _a.focus({ preventScroll: true });
        });
      } else {
        event.preventDefault();
        api.openMenu();
        nextFrame2(() => {
          var _a;
          return (_a = dom(api.itemsRef)) == null ? void 0 : _a.focus({ preventScroll: true });
        });
      }
    }
    let type = useResolveButtonType(
      (0, import_vue23.computed)(() => ({ as: props.as, type: attrs.type })),
      api.buttonRef
    );
    return () => {
      var _a;
      let slot = { open: api.menuState.value === 0 /* Open */ };
      let ourProps = {
        ref: api.buttonRef,
        id: id2,
        type: type.value,
        "aria-haspopup": true,
        "aria-controls": (_a = dom(api.itemsRef)) == null ? void 0 : _a.id,
        "aria-expanded": props.disabled ? void 0 : api.menuState.value === 0 /* Open */,
        onKeydown: handleKeyDown,
        onKeyup: handleKeyUp,
        onClick: handleClick
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "MenuButton"
      });
    };
  }
});
var MenuItems = (0, import_vue23.defineComponent)({
  name: "MenuItems",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useMenuContext("MenuItems");
    let id2 = `headlessui-menu-items-${useId()}`;
    let searchDebounce = (0, import_vue23.ref)(null);
    expose({ el: api.itemsRef, $el: api.itemsRef });
    useTreeWalker({
      container: (0, import_vue23.computed)(() => dom(api.itemsRef)),
      enabled: (0, import_vue23.computed)(() => api.menuState.value === 0 /* Open */),
      accept(node) {
        if (node.getAttribute("role") === "menuitem")
          return NodeFilter.FILTER_REJECT;
        if (node.hasAttribute("role"))
          return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      },
      walk(node) {
        node.setAttribute("role", "none");
      }
    });
    function handleKeyDown(event) {
      var _a;
      if (searchDebounce.value)
        clearTimeout(searchDebounce.value);
      switch (event.key) {
        case " " /* Space */:
          if (api.searchQuery.value !== "") {
            event.preventDefault();
            event.stopPropagation();
            return api.search(event.key);
          }
        case "Enter" /* Enter */:
          event.preventDefault();
          event.stopPropagation();
          if (api.activeItemIndex.value !== null) {
            let activeItem = api.items.value[api.activeItemIndex.value];
            let _activeItem = activeItem;
            (_a = dom(_activeItem.dataRef.domRef)) == null ? void 0 : _a.click();
          }
          api.closeMenu();
          restoreFocusIfNecessary(dom(api.buttonRef));
          break;
        case "ArrowDown" /* ArrowDown */:
          event.preventDefault();
          event.stopPropagation();
          return api.goToItem(2 /* Next */);
        case "ArrowUp" /* ArrowUp */:
          event.preventDefault();
          event.stopPropagation();
          return api.goToItem(1 /* Previous */);
        case "Home" /* Home */:
        case "PageUp" /* PageUp */:
          event.preventDefault();
          event.stopPropagation();
          return api.goToItem(0 /* First */);
        case "End" /* End */:
        case "PageDown" /* PageDown */:
          event.preventDefault();
          event.stopPropagation();
          return api.goToItem(3 /* Last */);
        case "Escape" /* Escape */:
          event.preventDefault();
          event.stopPropagation();
          api.closeMenu();
          (0, import_vue23.nextTick)(() => {
            var _a2;
            return (_a2 = dom(api.buttonRef)) == null ? void 0 : _a2.focus({ preventScroll: true });
          });
          break;
        case "Tab" /* Tab */:
          event.preventDefault();
          event.stopPropagation();
          api.closeMenu();
          (0, import_vue23.nextTick)(
            () => focusFrom(
              dom(api.buttonRef),
              event.shiftKey ? 2 /* Previous */ : 4 /* Next */
            )
          );
          break;
        default:
          if (event.key.length === 1) {
            api.search(event.key);
            searchDebounce.value = setTimeout(() => api.clearSearch(), 350);
          }
          break;
      }
    }
    function handleKeyUp(event) {
      switch (event.key) {
        case " " /* Space */:
          event.preventDefault();
          break;
      }
    }
    let usesOpenClosedState = useOpenClosed();
    let visible = (0, import_vue23.computed)(() => {
      if (usesOpenClosedState !== null) {
        return usesOpenClosedState.value === 0 /* Open */;
      }
      return api.menuState.value === 0 /* Open */;
    });
    return () => {
      var _a, _b;
      let slot = { open: api.menuState.value === 0 /* Open */ };
      let ourProps = {
        "aria-activedescendant": api.activeItemIndex.value === null ? void 0 : (_a = api.items.value[api.activeItemIndex.value]) == null ? void 0 : _a.id,
        "aria-labelledby": (_b = dom(api.buttonRef)) == null ? void 0 : _b.id,
        id: id2,
        onKeydown: handleKeyDown,
        onKeyup: handleKeyUp,
        role: "menu",
        tabIndex: 0,
        ref: api.itemsRef
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        features: 1 /* RenderStrategy */ | 2 /* Static */,
        visible: visible.value,
        name: "MenuItems"
      });
    };
  }
});
var MenuItem = (0, import_vue23.defineComponent)({
  name: "MenuItem",
  props: {
    as: { type: [Object, String], default: "template" },
    disabled: { type: Boolean, default: false }
  },
  setup(props, { slots, attrs, expose }) {
    let api = useMenuContext("MenuItem");
    let id2 = `headlessui-menu-item-${useId()}`;
    let internalItemRef = (0, import_vue23.ref)(null);
    expose({ el: internalItemRef, $el: internalItemRef });
    let active = (0, import_vue23.computed)(() => {
      return api.activeItemIndex.value !== null ? api.items.value[api.activeItemIndex.value].id === id2 : false;
    });
    let dataRef = (0, import_vue23.computed)(() => ({
      disabled: props.disabled,
      textValue: "",
      domRef: internalItemRef
    }));
    (0, import_vue23.onMounted)(() => {
      var _a, _b;
      let textValue = (_b = (_a = dom(internalItemRef)) == null ? void 0 : _a.textContent) == null ? void 0 : _b.toLowerCase().trim();
      if (textValue !== void 0)
        dataRef.value.textValue = textValue;
    });
    (0, import_vue23.onMounted)(() => api.registerItem(id2, dataRef));
    (0, import_vue23.onUnmounted)(() => api.unregisterItem(id2));
    (0, import_vue23.watchEffect)(() => {
      if (api.menuState.value !== 0 /* Open */)
        return;
      if (!active.value)
        return;
      if (api.activationTrigger.value === 0 /* Pointer */)
        return;
      (0, import_vue23.nextTick)(() => {
        var _a, _b;
        return (_b = (_a = dom(internalItemRef)) == null ? void 0 : _a.scrollIntoView) == null ? void 0 : _b.call(_a, { block: "nearest" });
      });
    });
    function handleClick(event) {
      if (props.disabled)
        return event.preventDefault();
      api.closeMenu();
      restoreFocusIfNecessary(dom(api.buttonRef));
    }
    function handleFocus() {
      if (props.disabled)
        return api.goToItem(5 /* Nothing */);
      api.goToItem(4 /* Specific */, id2);
    }
    function handleMove() {
      if (props.disabled)
        return;
      if (active.value)
        return;
      api.goToItem(4 /* Specific */, id2, 0 /* Pointer */);
    }
    function handleLeave() {
      if (props.disabled)
        return;
      if (!active.value)
        return;
      api.goToItem(5 /* Nothing */);
    }
    return () => {
      let { disabled } = props;
      let slot = { active: active.value, disabled, close: api.closeMenu };
      let ourProps = {
        id: id2,
        ref: internalItemRef,
        role: "menuitem",
        tabIndex: disabled === true ? void 0 : -1,
        "aria-disabled": disabled === true ? true : void 0,
        onClick: handleClick,
        onFocus: handleFocus,
        onPointermove: handleMove,
        onMousemove: handleMove,
        onPointerleave: handleLeave,
        onMouseleave: handleLeave
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "MenuItem"
      });
    };
  }
});

// src/components/popover/popover.ts
var import_vue24 = require("vue");
var PopoverContext = Symbol("PopoverContext");
function usePopoverContext(component) {
  let context = (0, import_vue24.inject)(PopoverContext, null);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <${Popover.name} /> component.`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, usePopoverContext);
    throw err;
  }
  return context;
}
var PopoverGroupContext = Symbol("PopoverGroupContext");
function usePopoverGroupContext() {
  return (0, import_vue24.inject)(PopoverGroupContext, null);
}
var PopoverPanelContext = Symbol("PopoverPanelContext");
function usePopoverPanelContext() {
  return (0, import_vue24.inject)(PopoverPanelContext, null);
}
var Popover = (0, import_vue24.defineComponent)({
  name: "Popover",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props, { slots, attrs, expose }) {
    var _a;
    let buttonId = `headlessui-popover-button-${useId()}`;
    let panelId = `headlessui-popover-panel-${useId()}`;
    let internalPopoverRef = (0, import_vue24.ref)(null);
    expose({ el: internalPopoverRef, $el: internalPopoverRef });
    let popoverState = (0, import_vue24.ref)(1 /* Closed */);
    let button = (0, import_vue24.ref)(null);
    let beforePanelSentinel = (0, import_vue24.ref)(null);
    let afterPanelSentinel = (0, import_vue24.ref)(null);
    let panel = (0, import_vue24.ref)(null);
    let ownerDocument = (0, import_vue24.computed)(() => getOwnerDocument(internalPopoverRef));
    let isPortalled = (0, import_vue24.computed)(() => {
      var _a2, _b;
      if (!dom(button))
        return false;
      if (!dom(panel))
        return false;
      for (let root of document.querySelectorAll("body > *")) {
        if (Number(root == null ? void 0 : root.contains(dom(button))) ^ Number(root == null ? void 0 : root.contains(dom(panel)))) {
          return true;
        }
      }
      let elements = getFocusableElements();
      let buttonIdx = elements.indexOf(dom(button));
      let beforeIdx = (buttonIdx + elements.length - 1) % elements.length;
      let afterIdx = (buttonIdx + 1) % elements.length;
      let beforeElement = elements[beforeIdx];
      let afterElement = elements[afterIdx];
      if (!((_a2 = dom(panel)) == null ? void 0 : _a2.contains(beforeElement)) && !((_b = dom(panel)) == null ? void 0 : _b.contains(afterElement))) {
        return true;
      }
      return false;
    });
    let api = {
      popoverState,
      buttonId,
      panelId,
      panel,
      button,
      isPortalled,
      beforePanelSentinel,
      afterPanelSentinel,
      togglePopover() {
        popoverState.value = match(popoverState.value, {
          [0 /* Open */]: 1 /* Closed */,
          [1 /* Closed */]: 0 /* Open */
        });
      },
      closePopover() {
        if (popoverState.value === 1 /* Closed */)
          return;
        popoverState.value = 1 /* Closed */;
      },
      close(focusableElement) {
        api.closePopover();
        let restoreElement = (() => {
          if (!focusableElement)
            return dom(api.button);
          if (focusableElement instanceof HTMLElement)
            return focusableElement;
          if (focusableElement.value instanceof HTMLElement)
            return dom(focusableElement);
          return dom(api.button);
        })();
        restoreElement == null ? void 0 : restoreElement.focus();
      }
    };
    (0, import_vue24.provide)(PopoverContext, api);
    useOpenClosedProvider(
      (0, import_vue24.computed)(
        () => match(popoverState.value, {
          [0 /* Open */]: 0 /* Open */,
          [1 /* Closed */]: 1 /* Closed */
        })
      )
    );
    let registerBag = {
      buttonId,
      panelId,
      close() {
        api.closePopover();
      }
    };
    let groupContext = usePopoverGroupContext();
    let registerPopover = groupContext == null ? void 0 : groupContext.registerPopover;
    function isFocusWithinPopoverGroup() {
      var _a2, _b, _c, _d;
      return (_d = groupContext == null ? void 0 : groupContext.isFocusWithinPopoverGroup()) != null ? _d : ((_a2 = ownerDocument.value) == null ? void 0 : _a2.activeElement) && (((_b = dom(button)) == null ? void 0 : _b.contains(ownerDocument.value.activeElement)) || ((_c = dom(panel)) == null ? void 0 : _c.contains(ownerDocument.value.activeElement)));
    }
    (0, import_vue24.watchEffect)(() => registerPopover == null ? void 0 : registerPopover(registerBag));
    useEventListener(
      (_a = ownerDocument.value) == null ? void 0 : _a.defaultView,
      "focus",
      (event) => {
        var _a2, _b;
        if (popoverState.value !== 0 /* Open */)
          return;
        if (isFocusWithinPopoverGroup())
          return;
        if (!button)
          return;
        if (!panel)
          return;
        if ((_a2 = dom(api.beforePanelSentinel)) == null ? void 0 : _a2.contains(event.target))
          return;
        if ((_b = dom(api.afterPanelSentinel)) == null ? void 0 : _b.contains(event.target))
          return;
        api.closePopover();
      },
      true
    );
    useOutsideClick(
      [button, panel],
      (event, target) => {
        var _a2;
        api.closePopover();
        if (!isFocusableElement(target, 1 /* Loose */)) {
          event.preventDefault();
          (_a2 = dom(button)) == null ? void 0 : _a2.focus();
        }
      },
      (0, import_vue24.computed)(() => popoverState.value === 0 /* Open */)
    );
    return () => {
      let slot = { open: popoverState.value === 0 /* Open */, close: api.close };
      return render({
        theirProps: props,
        ourProps: { ref: internalPopoverRef },
        slot,
        slots,
        attrs,
        name: "Popover"
      });
    };
  }
});
var PopoverButton = (0, import_vue24.defineComponent)({
  name: "PopoverButton",
  props: {
    as: { type: [Object, String], default: "button" },
    disabled: { type: [Boolean], default: false }
  },
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    let api = usePopoverContext("PopoverButton");
    let ownerDocument = (0, import_vue24.computed)(() => getOwnerDocument(api.button));
    expose({ el: api.button, $el: api.button });
    let groupContext = usePopoverGroupContext();
    let closeOthers = groupContext == null ? void 0 : groupContext.closeOthers;
    let panelContext = usePopoverPanelContext();
    let isWithinPanel = panelContext === null ? false : panelContext === api.panelId;
    let elementRef = (0, import_vue24.ref)(null);
    let sentinelId = `headlessui-focus-sentinel-${useId()}`;
    if (!isWithinPanel) {
      (0, import_vue24.watchEffect)(() => {
        api.button.value = elementRef.value;
      });
    }
    let type = useResolveButtonType(
      (0, import_vue24.computed)(() => ({ as: props.as, type: attrs.type })),
      elementRef
    );
    function handleKeyDown(event) {
      var _a, _b, _c, _d, _e;
      if (isWithinPanel) {
        if (api.popoverState.value === 1 /* Closed */)
          return;
        switch (event.key) {
          case " " /* Space */:
          case "Enter" /* Enter */:
            event.preventDefault();
            (_b = (_a = event.target).click) == null ? void 0 : _b.call(_a);
            api.closePopover();
            (_c = dom(api.button)) == null ? void 0 : _c.focus();
            break;
        }
      } else {
        switch (event.key) {
          case " " /* Space */:
          case "Enter" /* Enter */:
            event.preventDefault();
            event.stopPropagation();
            if (api.popoverState.value === 1 /* Closed */)
              closeOthers == null ? void 0 : closeOthers(api.buttonId);
            api.togglePopover();
            break;
          case "Escape" /* Escape */:
            if (api.popoverState.value !== 0 /* Open */)
              return closeOthers == null ? void 0 : closeOthers(api.buttonId);
            if (!dom(api.button))
              return;
            if (((_d = ownerDocument.value) == null ? void 0 : _d.activeElement) && !((_e = dom(api.button)) == null ? void 0 : _e.contains(ownerDocument.value.activeElement)))
              return;
            event.preventDefault();
            event.stopPropagation();
            api.closePopover();
            break;
        }
      }
    }
    function handleKeyUp(event) {
      if (isWithinPanel)
        return;
      if (event.key === " " /* Space */) {
        event.preventDefault();
      }
    }
    function handleClick(event) {
      var _a, _b;
      if (props.disabled)
        return;
      if (isWithinPanel) {
        api.closePopover();
        (_a = dom(api.button)) == null ? void 0 : _a.focus();
      } else {
        event.preventDefault();
        event.stopPropagation();
        if (api.popoverState.value === 1 /* Closed */)
          closeOthers == null ? void 0 : closeOthers(api.buttonId);
        api.togglePopover();
        (_b = dom(api.button)) == null ? void 0 : _b.focus();
      }
    }
    function handleMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();
    }
    return () => {
      let visible = api.popoverState.value === 0 /* Open */;
      let slot = { open: visible };
      let ourProps = isWithinPanel ? {
        ref: elementRef,
        type: type.value,
        onKeydown: handleKeyDown,
        onClick: handleClick
      } : {
        ref: elementRef,
        id: api.buttonId,
        type: type.value,
        "aria-expanded": props.disabled ? void 0 : api.popoverState.value === 0 /* Open */,
        "aria-controls": dom(api.panel) ? api.panelId : void 0,
        disabled: props.disabled ? true : void 0,
        onKeydown: handleKeyDown,
        onKeyup: handleKeyUp,
        onClick: handleClick,
        onMousedown: handleMouseDown
      };
      let direction = useTabDirection();
      function handleFocus() {
        let el = dom(api.panel);
        if (!el)
          return;
        function run() {
          match(direction.value, {
            [0 /* Forwards */]: () => focusIn(el, 1 /* First */),
            [1 /* Backwards */]: () => focusIn(el, 8 /* Last */)
          });
        }
        if (false) {
          microTask(run);
        } else {
          run();
        }
      }
      return (0, import_vue24.h)(import_vue24.Fragment, [
        render({
          ourProps,
          theirProps: { ...attrs, ...props },
          slot,
          attrs,
          slots,
          name: "PopoverButton"
        }),
        visible && !isWithinPanel && api.isPortalled.value && (0, import_vue24.h)(Hidden, {
          id: sentinelId,
          features: 2 /* Focusable */,
          as: "button",
          type: "button",
          onFocus: handleFocus
        })
      ]);
    };
  }
});
var PopoverOverlay = (0, import_vue24.defineComponent)({
  name: "PopoverOverlay",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true }
  },
  setup(props, { attrs, slots }) {
    let api = usePopoverContext("PopoverOverlay");
    let id2 = `headlessui-popover-overlay-${useId()}`;
    let usesOpenClosedState = useOpenClosed();
    let visible = (0, import_vue24.computed)(() => {
      if (usesOpenClosedState !== null) {
        return usesOpenClosedState.value === 0 /* Open */;
      }
      return api.popoverState.value === 0 /* Open */;
    });
    function handleClick() {
      api.closePopover();
    }
    return () => {
      let slot = { open: api.popoverState.value === 0 /* Open */ };
      let ourProps = {
        id: id2,
        "aria-hidden": true,
        onClick: handleClick
      };
      return render({
        ourProps,
        theirProps: props,
        slot,
        attrs,
        slots,
        features: 1 /* RenderStrategy */ | 2 /* Static */,
        visible: visible.value,
        name: "PopoverOverlay"
      });
    };
  }
});
var PopoverPanel = (0, import_vue24.defineComponent)({
  name: "PopoverPanel",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    focus: { type: Boolean, default: false }
  },
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    let { focus } = props;
    let api = usePopoverContext("PopoverPanel");
    let ownerDocument = (0, import_vue24.computed)(() => getOwnerDocument(api.panel));
    let beforePanelSentinelId = `headlessui-focus-sentinel-before-${useId()}`;
    let afterPanelSentinelId = `headlessui-focus-sentinel-after-${useId()}`;
    expose({ el: api.panel, $el: api.panel });
    (0, import_vue24.provide)(PopoverPanelContext, api.panelId);
    (0, import_vue24.watchEffect)(() => {
      var _a, _b;
      if (!focus)
        return;
      if (api.popoverState.value !== 0 /* Open */)
        return;
      if (!api.panel)
        return;
      let activeElement = (_a = ownerDocument.value) == null ? void 0 : _a.activeElement;
      if ((_b = dom(api.panel)) == null ? void 0 : _b.contains(activeElement))
        return;
      focusIn(dom(api.panel), 1 /* First */);
    });
    let usesOpenClosedState = useOpenClosed();
    let visible = (0, import_vue24.computed)(() => {
      if (usesOpenClosedState !== null) {
        return usesOpenClosedState.value === 0 /* Open */;
      }
      return api.popoverState.value === 0 /* Open */;
    });
    function handleKeyDown(event) {
      var _a, _b;
      switch (event.key) {
        case "Escape" /* Escape */:
          if (api.popoverState.value !== 0 /* Open */)
            return;
          if (!dom(api.panel))
            return;
          if (ownerDocument.value && !((_a = dom(api.panel)) == null ? void 0 : _a.contains(ownerDocument.value.activeElement))) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          api.closePopover();
          (_b = dom(api.button)) == null ? void 0 : _b.focus();
          break;
      }
    }
    function handleBlur(event) {
      var _a, _b, _c, _d, _e;
      let el = event.relatedTarget;
      if (!el)
        return;
      if (!dom(api.panel))
        return;
      if ((_a = dom(api.panel)) == null ? void 0 : _a.contains(el))
        return;
      api.closePopover();
      if (((_c = (_b = dom(api.beforePanelSentinel)) == null ? void 0 : _b.contains) == null ? void 0 : _c.call(_b, el)) || ((_e = (_d = dom(api.afterPanelSentinel)) == null ? void 0 : _d.contains) == null ? void 0 : _e.call(_d, el))) {
        el.focus({ preventScroll: true });
      }
    }
    let direction = useTabDirection();
    function handleBeforeFocus() {
      let el = dom(api.panel);
      if (!el)
        return;
      function run() {
        match(direction.value, {
          [0 /* Forwards */]: () => {
            focusIn(el, 4 /* Next */);
          },
          [1 /* Backwards */]: () => {
            var _a;
            (_a = dom(api.button)) == null ? void 0 : _a.focus({ preventScroll: true });
          }
        });
      }
      if (false) {
        microTask(run);
      } else {
        run();
      }
    }
    function handleAfterFocus() {
      let el = dom(api.panel);
      if (!el)
        return;
      function run() {
        match(direction.value, {
          [0 /* Forwards */]: () => {
            var _a, _b;
            let button = dom(api.button);
            let panel = dom(api.panel);
            if (!button)
              return;
            let elements = getFocusableElements();
            let idx = elements.indexOf(button);
            let before = elements.slice(0, idx + 1);
            let after = elements.slice(idx + 1);
            let combined = [...after, ...before];
            for (let element of combined.slice()) {
              if (((_b = (_a = element == null ? void 0 : element.id) == null ? void 0 : _a.startsWith) == null ? void 0 : _b.call(_a, "headlessui-focus-sentinel-")) || (panel == null ? void 0 : panel.contains(element))) {
                let idx2 = combined.indexOf(element);
                if (idx2 !== -1)
                  combined.splice(idx2, 1);
              }
            }
            focusIn(combined, 1 /* First */, false);
          },
          [1 /* Backwards */]: () => focusIn(el, 2 /* Previous */)
        });
      }
      if (false) {
        microTask(run);
      } else {
        run();
      }
    }
    return () => {
      let slot = {
        open: api.popoverState.value === 0 /* Open */,
        close: api.close
      };
      let ourProps = {
        ref: api.panel,
        id: api.panelId,
        onKeydown: handleKeyDown,
        onFocusout: focus && api.popoverState.value === 0 /* Open */ ? handleBlur : void 0,
        tabIndex: -1
      };
      return render({
        ourProps,
        theirProps: { ...attrs, ...omit(props, ["focus"]) },
        attrs,
        slot,
        slots: {
          ...slots,
          default: (...args) => {
            var _a;
            return [
              (0, import_vue24.h)(import_vue24.Fragment, [
                visible.value && api.isPortalled.value && (0, import_vue24.h)(Hidden, {
                  id: beforePanelSentinelId,
                  ref: api.beforePanelSentinel,
                  features: 2 /* Focusable */,
                  as: "button",
                  type: "button",
                  onFocus: handleBeforeFocus
                }),
                (_a = slots.default) == null ? void 0 : _a.call(slots, ...args),
                visible.value && api.isPortalled.value && (0, import_vue24.h)(Hidden, {
                  id: afterPanelSentinelId,
                  ref: api.afterPanelSentinel,
                  features: 2 /* Focusable */,
                  as: "button",
                  type: "button",
                  onFocus: handleAfterFocus
                })
              ])
            ];
          }
        },
        features: 1 /* RenderStrategy */ | 2 /* Static */,
        visible: visible.value,
        name: "PopoverPanel"
      });
    };
  }
});
var PopoverGroup = (0, import_vue24.defineComponent)({
  name: "PopoverGroup",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props, { attrs, slots, expose }) {
    let groupRef = (0, import_vue24.ref)(null);
    let popovers = (0, import_vue24.ref)([]);
    let ownerDocument = (0, import_vue24.computed)(() => getOwnerDocument(groupRef));
    expose({ el: groupRef, $el: groupRef });
    function unregisterPopover(registerBag) {
      let idx = popovers.value.indexOf(registerBag);
      if (idx !== -1)
        popovers.value.splice(idx, 1);
    }
    function registerPopover(registerBag) {
      popovers.value.push(registerBag);
      return () => {
        unregisterPopover(registerBag);
      };
    }
    function isFocusWithinPopoverGroup() {
      var _a;
      let owner = ownerDocument.value;
      if (!owner)
        return false;
      let element = owner.activeElement;
      if ((_a = dom(groupRef)) == null ? void 0 : _a.contains(element))
        return true;
      return popovers.value.some((bag) => {
        var _a2, _b;
        return ((_a2 = owner.getElementById(bag.buttonId)) == null ? void 0 : _a2.contains(element)) || ((_b = owner.getElementById(bag.panelId)) == null ? void 0 : _b.contains(element));
      });
    }
    function closeOthers(buttonId) {
      for (let popover of popovers.value) {
        if (popover.buttonId !== buttonId)
          popover.close();
      }
    }
    (0, import_vue24.provide)(PopoverGroupContext, {
      registerPopover,
      unregisterPopover,
      isFocusWithinPopoverGroup,
      closeOthers
    });
    return () => {
      let ourProps = { ref: groupRef };
      return render({
        ourProps,
        theirProps: props,
        slot: {},
        attrs,
        slots,
        name: "PopoverGroup"
      });
    };
  }
});

// src/components/radio-group/radio-group.ts
var import_vue26 = require("vue");

// src/components/label/label.ts
var import_vue25 = require("vue");
var LabelContext = Symbol("LabelContext");
function useLabelContext() {
  let context = (0, import_vue25.inject)(LabelContext, null);
  if (context === null) {
    let err = new Error("You used a <Label /> component, but it is not inside a parent.");
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useLabelContext);
    throw err;
  }
  return context;
}
function useLabels({
  slot = {},
  name = "Label",
  props = {}
} = {}) {
  let labelIds = (0, import_vue25.ref)([]);
  function register(value) {
    labelIds.value.push(value);
    return () => {
      let idx = labelIds.value.indexOf(value);
      if (idx === -1)
        return;
      labelIds.value.splice(idx, 1);
    };
  }
  (0, import_vue25.provide)(LabelContext, { register, slot, name, props });
  return (0, import_vue25.computed)(() => labelIds.value.length > 0 ? labelIds.value.join(" ") : void 0);
}
var Label = (0, import_vue25.defineComponent)({
  name: "Label",
  props: {
    as: { type: [Object, String], default: "label" },
    passive: { type: [Boolean], default: false }
  },
  setup(myProps, { slots, attrs }) {
    let context = useLabelContext();
    let id2 = `headlessui-label-${useId()}`;
    (0, import_vue25.onMounted)(() => (0, import_vue25.onUnmounted)(context.register(id2)));
    return () => {
      let { name = "Label", slot = {}, props = {} } = context;
      let { passive, ...theirProps } = myProps;
      let ourProps = {
        ...Object.entries(props).reduce(
          (acc, [key, value]) => Object.assign(acc, { [key]: (0, import_vue25.unref)(value) }),
          {}
        ),
        id: id2
      };
      if (passive) {
        delete ourProps["onClick"];
        delete theirProps["onClick"];
      }
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name
      });
    };
  }
});

// src/components/radio-group/radio-group.ts
function defaultComparator3(a, z) {
  return a === z;
}
var RadioGroupContext = Symbol("RadioGroupContext");
function useRadioGroupContext(component) {
  let context = (0, import_vue26.inject)(RadioGroupContext, null);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <RadioGroup /> component.`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useRadioGroupContext);
    throw err;
  }
  return context;
}
var RadioGroup = (0, import_vue26.defineComponent)({
  name: "RadioGroup",
  emits: { "update:modelValue": (_value) => true },
  props: {
    as: { type: [Object, String], default: "div" },
    disabled: { type: [Boolean], default: false },
    by: { type: [String, Function], default: () => defaultComparator3 },
    modelValue: { type: [Object, String, Number, Boolean], default: void 0 },
    defaultValue: { type: [Object, String, Number, Boolean], default: void 0 },
    name: { type: String, optional: true }
  },
  inheritAttrs: false,
  setup(props, { emit, attrs, slots, expose }) {
    let radioGroupRef = (0, import_vue26.ref)(null);
    let options = (0, import_vue26.ref)([]);
    let labelledby = useLabels({ name: "RadioGroupLabel" });
    let describedby = useDescriptions({ name: "RadioGroupDescription" });
    expose({ el: radioGroupRef, $el: radioGroupRef });
    let [value, theirOnChange] = useControllable(
      (0, import_vue26.computed)(() => props.modelValue),
      (value2) => emit("update:modelValue", value2),
      (0, import_vue26.computed)(() => props.defaultValue)
    );
    let api = {
      options,
      value,
      disabled: (0, import_vue26.computed)(() => props.disabled),
      firstOption: (0, import_vue26.computed)(
        () => options.value.find((option) => {
          if (option.propsRef.disabled)
            return false;
          return true;
        })
      ),
      containsCheckedOption: (0, import_vue26.computed)(
        () => options.value.some(
          (option) => api.compare((0, import_vue26.toRaw)(option.propsRef.value), (0, import_vue26.toRaw)(props.modelValue))
        )
      ),
      compare(a, z) {
        if (typeof props.by === "string") {
          let property = props.by;
          return (a == null ? void 0 : a[property]) === (z == null ? void 0 : z[property]);
        }
        return props.by(a, z);
      },
      change(nextValue) {
        var _a;
        if (props.disabled)
          return false;
        if (api.compare((0, import_vue26.toRaw)(value.value), (0, import_vue26.toRaw)(nextValue)))
          return false;
        let nextOption = (_a = options.value.find(
          (option) => api.compare((0, import_vue26.toRaw)(option.propsRef.value), (0, import_vue26.toRaw)(nextValue))
        )) == null ? void 0 : _a.propsRef;
        if (nextOption == null ? void 0 : nextOption.disabled)
          return false;
        theirOnChange(nextValue);
        return true;
      },
      registerOption(action) {
        options.value.push(action);
        options.value = sortByDomNode(options.value, (option) => option.element);
      },
      unregisterOption(id3) {
        let idx = options.value.findIndex((radio) => radio.id === id3);
        if (idx === -1)
          return;
        options.value.splice(idx, 1);
      }
    };
    (0, import_vue26.provide)(RadioGroupContext, api);
    useTreeWalker({
      container: (0, import_vue26.computed)(() => dom(radioGroupRef)),
      accept(node) {
        if (node.getAttribute("role") === "radio")
          return NodeFilter.FILTER_REJECT;
        if (node.hasAttribute("role"))
          return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      },
      walk(node) {
        node.setAttribute("role", "none");
      }
    });
    function handleKeyDown(event) {
      if (!radioGroupRef.value)
        return;
      if (!radioGroupRef.value.contains(event.target))
        return;
      let all = options.value.filter((option) => option.propsRef.disabled === false).map((radio) => radio.element);
      switch (event.key) {
        case "Enter" /* Enter */:
          attemptSubmit(event.currentTarget);
          break;
        case "ArrowLeft" /* ArrowLeft */:
        case "ArrowUp" /* ArrowUp */:
          {
            event.preventDefault();
            event.stopPropagation();
            let result = focusIn(all, 2 /* Previous */ | 16 /* WrapAround */);
            if (result === 2 /* Success */) {
              let activeOption = options.value.find(
                (option) => {
                  var _a;
                  return option.element === ((_a = getOwnerDocument(radioGroupRef)) == null ? void 0 : _a.activeElement);
                }
              );
              if (activeOption)
                api.change(activeOption.propsRef.value);
            }
          }
          break;
        case "ArrowRight" /* ArrowRight */:
        case "ArrowDown" /* ArrowDown */:
          {
            event.preventDefault();
            event.stopPropagation();
            let result = focusIn(all, 4 /* Next */ | 16 /* WrapAround */);
            if (result === 2 /* Success */) {
              let activeOption = options.value.find(
                (option) => {
                  var _a;
                  return option.element === ((_a = getOwnerDocument(option.element)) == null ? void 0 : _a.activeElement);
                }
              );
              if (activeOption)
                api.change(activeOption.propsRef.value);
            }
          }
          break;
        case " " /* Space */:
          {
            event.preventDefault();
            event.stopPropagation();
            let activeOption = options.value.find(
              (option) => {
                var _a;
                return option.element === ((_a = getOwnerDocument(option.element)) == null ? void 0 : _a.activeElement);
              }
            );
            if (activeOption)
              api.change(activeOption.propsRef.value);
          }
          break;
      }
    }
    let id2 = `headlessui-radiogroup-${useId()}`;
    return () => {
      let { disabled, name, ...theirProps } = props;
      let ourProps = {
        ref: radioGroupRef,
        id: id2,
        role: "radiogroup",
        "aria-labelledby": labelledby.value,
        "aria-describedby": describedby.value,
        onKeydown: handleKeyDown
      };
      return (0, import_vue26.h)(import_vue26.Fragment, [
        ...name != null && value.value != null ? objectToFormEntries({ [name]: value.value }).map(
          ([name2, value2]) => (0, import_vue26.h)(
            Hidden,
            compact({
              features: 4 /* Hidden */,
              key: name2,
              as: "input",
              type: "hidden",
              hidden: true,
              readOnly: true,
              name: name2,
              value: value2
            })
          )
        ) : [],
        render({
          ourProps,
          theirProps: { ...attrs, ...omit(theirProps, ["modelValue", "defaultValue"]) },
          slot: {},
          attrs,
          slots,
          name: "RadioGroup"
        })
      ]);
    };
  }
});
var RadioGroupOption = (0, import_vue26.defineComponent)({
  name: "RadioGroupOption",
  props: {
    as: { type: [Object, String], default: "div" },
    value: { type: [Object, String, Number, Boolean] },
    disabled: { type: Boolean, default: false }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useRadioGroupContext("RadioGroupOption");
    let id2 = `headlessui-radiogroup-option-${useId()}`;
    let labelledby = useLabels({ name: "RadioGroupLabel" });
    let describedby = useDescriptions({ name: "RadioGroupDescription" });
    let optionRef = (0, import_vue26.ref)(null);
    let propsRef = (0, import_vue26.computed)(() => ({ value: props.value, disabled: props.disabled }));
    let state = (0, import_vue26.ref)(1 /* Empty */);
    expose({ el: optionRef, $el: optionRef });
    (0, import_vue26.onMounted)(() => api.registerOption({ id: id2, element: optionRef, propsRef }));
    (0, import_vue26.onUnmounted)(() => api.unregisterOption(id2));
    let isFirstOption = (0, import_vue26.computed)(() => {
      var _a;
      return ((_a = api.firstOption.value) == null ? void 0 : _a.id) === id2;
    });
    let disabled = (0, import_vue26.computed)(() => api.disabled.value || props.disabled);
    let checked = (0, import_vue26.computed)(() => api.compare((0, import_vue26.toRaw)(api.value.value), (0, import_vue26.toRaw)(props.value)));
    let tabIndex = (0, import_vue26.computed)(() => {
      if (disabled.value)
        return -1;
      if (checked.value)
        return 0;
      if (!api.containsCheckedOption.value && isFirstOption.value)
        return 0;
      return -1;
    });
    function handleClick() {
      var _a;
      if (!api.change(props.value))
        return;
      state.value |= 2 /* Active */;
      (_a = optionRef.value) == null ? void 0 : _a.focus();
    }
    function handleFocus() {
      state.value |= 2 /* Active */;
    }
    function handleBlur() {
      state.value &= ~2 /* Active */;
    }
    return () => {
      let theirProps = omit(props, ["value", "disabled"]);
      let slot = {
        checked: checked.value,
        disabled: disabled.value,
        active: Boolean(state.value & 2 /* Active */)
      };
      let ourProps = {
        id: id2,
        ref: optionRef,
        role: "radio",
        "aria-checked": checked.value ? "true" : "false",
        "aria-labelledby": labelledby.value,
        "aria-describedby": describedby.value,
        "aria-disabled": disabled.value ? true : void 0,
        tabIndex: tabIndex.value,
        onClick: disabled.value ? void 0 : handleClick,
        onFocus: disabled.value ? void 0 : handleFocus,
        onBlur: disabled.value ? void 0 : handleBlur
      };
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "RadioGroupOption"
      });
    };
  }
});
var RadioGroupLabel = Label;
var RadioGroupDescription = Description;

// src/components/switch/switch.ts
var import_vue27 = require("vue");
var GroupContext = Symbol("GroupContext");
var SwitchGroup = (0, import_vue27.defineComponent)({
  name: "SwitchGroup",
  props: {
    as: { type: [Object, String], default: "template" }
  },
  setup(props, { slots, attrs }) {
    let switchRef = (0, import_vue27.ref)(null);
    let labelledby = useLabels({
      name: "SwitchLabel",
      props: {
        onClick() {
          if (!switchRef.value)
            return;
          switchRef.value.click();
          switchRef.value.focus({ preventScroll: true });
        }
      }
    });
    let describedby = useDescriptions({ name: "SwitchDescription" });
    let api = { switchRef, labelledby, describedby };
    (0, import_vue27.provide)(GroupContext, api);
    return () => render({ theirProps: props, ourProps: {}, slot: {}, slots, attrs, name: "SwitchGroup" });
  }
});
var Switch = (0, import_vue27.defineComponent)({
  name: "Switch",
  emits: { "update:modelValue": (_value) => true },
  props: {
    as: { type: [Object, String], default: "button" },
    modelValue: { type: Boolean, default: void 0 },
    defaultChecked: { type: Boolean, default: false },
    name: { type: String, optional: true },
    value: { type: String, optional: true }
  },
  inheritAttrs: false,
  setup(props, { emit, attrs, slots, expose }) {
    let api = (0, import_vue27.inject)(GroupContext, null);
    let id2 = `headlessui-switch-${useId()}`;
    let [checked, theirOnChange] = useControllable(
      (0, import_vue27.computed)(() => props.modelValue),
      (value) => emit("update:modelValue", value),
      (0, import_vue27.computed)(() => props.defaultChecked)
    );
    function toggle() {
      theirOnChange(!checked.value);
    }
    let internalSwitchRef = (0, import_vue27.ref)(null);
    let switchRef = api === null ? internalSwitchRef : api.switchRef;
    let type = useResolveButtonType(
      (0, import_vue27.computed)(() => ({ as: props.as, type: attrs.type })),
      switchRef
    );
    expose({ el: switchRef, $el: switchRef });
    function handleClick(event) {
      event.preventDefault();
      toggle();
    }
    function handleKeyUp(event) {
      if (event.key === " " /* Space */) {
        event.preventDefault();
        toggle();
      } else if (event.key === "Enter" /* Enter */) {
        attemptSubmit(event.currentTarget);
      }
    }
    function handleKeyPress(event) {
      event.preventDefault();
    }
    return () => {
      let { name, value, ...theirProps } = props;
      let slot = { checked: checked.value };
      let ourProps = {
        id: id2,
        ref: switchRef,
        role: "switch",
        type: type.value,
        tabIndex: 0,
        "aria-checked": checked.value,
        "aria-labelledby": api == null ? void 0 : api.labelledby.value,
        "aria-describedby": api == null ? void 0 : api.describedby.value,
        onClick: handleClick,
        onKeyup: handleKeyUp,
        onKeypress: handleKeyPress
      };
      return (0, import_vue27.h)(import_vue27.Fragment, [
        name != null && checked.value != null ? (0, import_vue27.h)(
          Hidden,
          compact({
            features: 4 /* Hidden */,
            as: "input",
            type: "checkbox",
            hidden: true,
            readOnly: true,
            checked: checked.value,
            name,
            value
          })
        ) : null,
        render({
          ourProps,
          theirProps: { ...attrs, ...omit(theirProps, ["modelValue", "defaultChecked"]) },
          slot,
          attrs,
          slots,
          name: "Switch"
        })
      ]);
    };
  }
});
var SwitchLabel = Label;
var SwitchDescription = Description;

// src/components/tabs/tabs.ts
var import_vue29 = require("vue");

// src/internal/focus-sentinel.ts
var import_vue28 = require("vue");
var FocusSentinel = (0, import_vue28.defineComponent)({
  props: {
    onFocus: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    let enabled = (0, import_vue28.ref)(true);
    return () => {
      if (!enabled.value)
        return null;
      return (0, import_vue28.h)(Hidden, {
        as: "button",
        type: "button",
        features: 2 /* Focusable */,
        onFocus(event) {
          event.preventDefault();
          let frame;
          let tries = 50;
          function forwardFocus() {
            var _a;
            if (tries-- <= 0) {
              if (frame)
                cancelAnimationFrame(frame);
              return;
            }
            if ((_a = props.onFocus) == null ? void 0 : _a.call(props)) {
              enabled.value = false;
              cancelAnimationFrame(frame);
              return;
            }
            frame = requestAnimationFrame(forwardFocus);
          }
          frame = requestAnimationFrame(forwardFocus);
        }
      });
    };
  }
});

// src/components/tabs/tabs.ts
var TabsContext = Symbol("TabsContext");
function useTabsContext(component) {
  let context = (0, import_vue29.inject)(TabsContext, null);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <TabGroup /> component.`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useTabsContext);
    throw err;
  }
  return context;
}
var TabGroup = (0, import_vue29.defineComponent)({
  name: "TabGroup",
  emits: {
    change: (_index) => true
  },
  props: {
    as: { type: [Object, String], default: "template" },
    selectedIndex: { type: [Number], default: null },
    defaultIndex: { type: [Number], default: 0 },
    vertical: { type: [Boolean], default: false },
    manual: { type: [Boolean], default: false }
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
    let selectedIndex = (0, import_vue29.ref)(null);
    let tabs = (0, import_vue29.ref)([]);
    let panels = (0, import_vue29.ref)([]);
    let isControlled = (0, import_vue29.computed)(() => props.selectedIndex !== null);
    let realSelectedIndex = (0, import_vue29.computed)(
      () => isControlled.value ? props.selectedIndex : selectedIndex.value
    );
    let api = {
      selectedIndex,
      orientation: (0, import_vue29.computed)(() => props.vertical ? "vertical" : "horizontal"),
      activation: (0, import_vue29.computed)(() => props.manual ? "manual" : "auto"),
      tabs,
      panels,
      setSelectedIndex(index) {
        if (realSelectedIndex.value !== index) {
          emit("change", index);
        }
        if (!isControlled.value) {
          selectedIndex.value = index;
        }
      },
      registerTab(tab) {
        if (!tabs.value.includes(tab))
          tabs.value.push(tab);
      },
      unregisterTab(tab) {
        let idx = tabs.value.indexOf(tab);
        if (idx !== -1)
          tabs.value.splice(idx, 1);
      },
      registerPanel(panel) {
        if (!panels.value.includes(panel))
          panels.value.push(panel);
      },
      unregisterPanel(panel) {
        let idx = panels.value.indexOf(panel);
        if (idx !== -1)
          panels.value.splice(idx, 1);
      }
    };
    (0, import_vue29.provide)(TabsContext, api);
    (0, import_vue29.watchEffect)(() => {
      var _a;
      if (api.tabs.value.length <= 0)
        return;
      if (props.selectedIndex === null && selectedIndex.value !== null)
        return;
      let tabs2 = api.tabs.value.map((tab) => dom(tab)).filter(Boolean);
      let focusableTabs = tabs2.filter((tab) => !tab.hasAttribute("disabled"));
      let indexToSet = (_a = props.selectedIndex) != null ? _a : props.defaultIndex;
      if (indexToSet < 0) {
        selectedIndex.value = tabs2.indexOf(focusableTabs[0]);
      } else if (indexToSet > api.tabs.value.length) {
        selectedIndex.value = tabs2.indexOf(focusableTabs[focusableTabs.length - 1]);
      } else {
        let before = tabs2.slice(0, indexToSet);
        let after = tabs2.slice(indexToSet);
        let next = [...after, ...before].find((tab) => focusableTabs.includes(tab));
        if (!next)
          return;
        selectedIndex.value = tabs2.indexOf(next);
      }
    });
    return () => {
      let slot = { selectedIndex: selectedIndex.value };
      return (0, import_vue29.h)(import_vue29.Fragment, [
        tabs.value.length <= 0 && (0, import_vue29.h)(FocusSentinel, {
          onFocus: () => {
            for (let tab of tabs.value) {
              let el = dom(tab);
              if ((el == null ? void 0 : el.tabIndex) === 0) {
                el.focus();
                return true;
              }
            }
            return false;
          }
        }),
        render({
          theirProps: {
            ...attrs,
            ...omit(props, ["selectedIndex", "defaultIndex", "manual", "vertical", "onChange"])
          },
          ourProps: {},
          slot,
          slots,
          attrs,
          name: "TabGroup"
        })
      ]);
    };
  }
});
var TabList = (0, import_vue29.defineComponent)({
  name: "TabList",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props, { attrs, slots }) {
    let api = useTabsContext("TabList");
    return () => {
      let slot = { selectedIndex: api.selectedIndex.value };
      let ourProps = {
        role: "tablist",
        "aria-orientation": api.orientation.value
      };
      let theirProps = props;
      return render({
        ourProps,
        theirProps,
        slot,
        attrs,
        slots,
        name: "TabList"
      });
    };
  }
});
var Tab = (0, import_vue29.defineComponent)({
  name: "Tab",
  props: {
    as: { type: [Object, String], default: "button" },
    disabled: { type: [Boolean], default: false }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useTabsContext("Tab");
    let id2 = `headlessui-tabs-tab-${useId()}`;
    let internalTabRef = (0, import_vue29.ref)(null);
    expose({ el: internalTabRef, $el: internalTabRef });
    (0, import_vue29.onMounted)(() => api.registerTab(internalTabRef));
    (0, import_vue29.onUnmounted)(() => api.unregisterTab(internalTabRef));
    let myIndex = (0, import_vue29.computed)(() => api.tabs.value.indexOf(internalTabRef));
    let selected = (0, import_vue29.computed)(() => myIndex.value === api.selectedIndex.value);
    function activateUsing(cb) {
      var _a;
      let result = cb();
      if (result === 2 /* Success */ && api.activation.value === "auto") {
        let newTab = (_a = getOwnerDocument(internalTabRef)) == null ? void 0 : _a.activeElement;
        let idx = api.tabs.value.findIndex((tab) => dom(tab) === newTab);
        if (idx !== -1)
          api.setSelectedIndex(idx);
      }
      return result;
    }
    function handleKeyDown(event) {
      let list = api.tabs.value.map((tab) => dom(tab)).filter(Boolean);
      if (event.key === " " /* Space */ || event.key === "Enter" /* Enter */) {
        event.preventDefault();
        event.stopPropagation();
        api.setSelectedIndex(myIndex.value);
        return;
      }
      switch (event.key) {
        case "Home" /* Home */:
        case "PageUp" /* PageUp */:
          event.preventDefault();
          event.stopPropagation();
          return activateUsing(() => focusIn(list, 1 /* First */));
        case "End" /* End */:
        case "PageDown" /* PageDown */:
          event.preventDefault();
          event.stopPropagation();
          return activateUsing(() => focusIn(list, 8 /* Last */));
      }
      let result = activateUsing(
        () => match(api.orientation.value, {
          vertical() {
            if (event.key === "ArrowUp" /* ArrowUp */)
              return focusIn(list, 2 /* Previous */ | 16 /* WrapAround */);
            if (event.key === "ArrowDown" /* ArrowDown */)
              return focusIn(list, 4 /* Next */ | 16 /* WrapAround */);
            return 0 /* Error */;
          },
          horizontal() {
            if (event.key === "ArrowLeft" /* ArrowLeft */)
              return focusIn(list, 2 /* Previous */ | 16 /* WrapAround */);
            if (event.key === "ArrowRight" /* ArrowRight */)
              return focusIn(list, 4 /* Next */ | 16 /* WrapAround */);
            return 0 /* Error */;
          }
        })
      );
      if (result === 2 /* Success */) {
        return event.preventDefault();
      }
    }
    let ready = (0, import_vue29.ref)(false);
    function handleSelection() {
      var _a;
      if (ready.value)
        return;
      ready.value = true;
      if (props.disabled)
        return;
      (_a = dom(internalTabRef)) == null ? void 0 : _a.focus();
      api.setSelectedIndex(myIndex.value);
      microTask(() => {
        ready.value = false;
      });
    }
    function handleMouseDown(event) {
      event.preventDefault();
    }
    let type = useResolveButtonType(
      (0, import_vue29.computed)(() => ({ as: props.as, type: attrs.type })),
      internalTabRef
    );
    return () => {
      var _a;
      let slot = { selected: selected.value };
      let ourProps = {
        ref: internalTabRef,
        onKeydown: handleKeyDown,
        onMousedown: handleMouseDown,
        onClick: handleSelection,
        id: id2,
        role: "tab",
        type: type.value,
        "aria-controls": (_a = dom(api.panels.value[myIndex.value])) == null ? void 0 : _a.id,
        "aria-selected": selected.value,
        tabIndex: selected.value ? 0 : -1,
        disabled: props.disabled ? true : void 0
      };
      return render({
        ourProps,
        theirProps: props,
        slot,
        attrs,
        slots,
        name: "Tab"
      });
    };
  }
});
var TabPanels = (0, import_vue29.defineComponent)({
  name: "TabPanels",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props, { slots, attrs }) {
    let api = useTabsContext("TabPanels");
    return () => {
      let slot = { selectedIndex: api.selectedIndex.value };
      return render({
        theirProps: props,
        ourProps: {},
        slot,
        attrs,
        slots,
        name: "TabPanels"
      });
    };
  }
});
var TabPanel = (0, import_vue29.defineComponent)({
  name: "TabPanel",
  props: {
    as: { type: [Object, String], default: "div" },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true }
  },
  setup(props, { attrs, slots, expose }) {
    let api = useTabsContext("TabPanel");
    let id2 = `headlessui-tabs-panel-${useId()}`;
    let internalPanelRef = (0, import_vue29.ref)(null);
    expose({ el: internalPanelRef, $el: internalPanelRef });
    (0, import_vue29.onMounted)(() => api.registerPanel(internalPanelRef));
    (0, import_vue29.onUnmounted)(() => api.unregisterPanel(internalPanelRef));
    let myIndex = (0, import_vue29.computed)(() => api.panels.value.indexOf(internalPanelRef));
    let selected = (0, import_vue29.computed)(() => myIndex.value === api.selectedIndex.value);
    return () => {
      var _a;
      let slot = { selected: selected.value };
      let ourProps = {
        ref: internalPanelRef,
        id: id2,
        role: "tabpanel",
        "aria-labelledby": (_a = dom(api.tabs.value[myIndex.value])) == null ? void 0 : _a.id,
        tabIndex: selected.value ? 0 : -1
      };
      if (!selected.value && props.unmount && !props.static) {
        return (0, import_vue29.h)(Hidden, { as: "span", ...ourProps });
      }
      return render({
        ourProps,
        theirProps: props,
        slot,
        attrs,
        slots,
        features: 2 /* Static */ | 1 /* RenderStrategy */,
        visible: selected.value,
        name: "TabPanel"
      });
    };
  }
});

// src/components/transitions/transition.ts
var import_vue30 = require("vue");

// src/utils/once.ts
function once(cb) {
  let state = { called: false };
  return (...args) => {
    if (state.called)
      return;
    state.called = true;
    return cb(...args);
  };
}

// src/components/transitions/utils/transition.ts
function addClasses(node, ...classes) {
  node && classes.length > 0 && node.classList.add(...classes);
}
function removeClasses(node, ...classes) {
  node && classes.length > 0 && node.classList.remove(...classes);
}
function waitForTransition(node, done) {
  let d = disposables();
  if (!node)
    return d.dispose;
  let { transitionDuration, transitionDelay } = getComputedStyle(node);
  let [durationMs, delaysMs] = [transitionDuration, transitionDelay].map((value) => {
    let [resolvedValue = 0] = value.split(",").filter(Boolean).map((v) => v.includes("ms") ? parseFloat(v) : parseFloat(v) * 1e3).sort((a, z) => z - a);
    return resolvedValue;
  });
  if (durationMs !== 0) {
    d.setTimeout(() => done("finished" /* Finished */), durationMs + delaysMs);
  } else {
    done("finished" /* Finished */);
  }
  d.add(() => done("cancelled" /* Cancelled */));
  return d.dispose;
}
function transition(node, base, from, to, entered, done) {
  let d = disposables();
  let _done = done !== void 0 ? once(done) : () => {
  };
  removeClasses(node, ...entered);
  addClasses(node, ...base, ...from);
  d.nextFrame(() => {
    removeClasses(node, ...from);
    addClasses(node, ...to);
    d.add(
      waitForTransition(node, (reason) => {
        removeClasses(node, ...to, ...base);
        addClasses(node, ...entered);
        return _done(reason);
      })
    );
  });
  d.add(() => removeClasses(node, ...base, ...from, ...to, ...entered));
  d.add(() => _done("cancelled" /* Cancelled */));
  return d.dispose;
}

// src/components/transitions/transition.ts
function splitClasses(classes = "") {
  return classes.split(" ").filter((className) => className.trim().length > 1);
}
var TransitionContext = Symbol("TransitionContext");
function hasTransitionContext() {
  return (0, import_vue30.inject)(TransitionContext, null) !== null;
}
function useTransitionContext() {
  let context = (0, import_vue30.inject)(TransitionContext, null);
  if (context === null) {
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  }
  return context;
}
function useParentNesting() {
  let context = (0, import_vue30.inject)(NestingContext, null);
  if (context === null) {
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  }
  return context;
}
var NestingContext = Symbol("NestingContext");
function hasChildren(bag) {
  if ("children" in bag)
    return hasChildren(bag.children);
  return bag.value.filter(({ state }) => state === "visible" /* Visible */).length > 0;
}
function useNesting(done) {
  let transitionableChildren = (0, import_vue30.ref)([]);
  let mounted = (0, import_vue30.ref)(false);
  (0, import_vue30.onMounted)(() => mounted.value = true);
  (0, import_vue30.onUnmounted)(() => mounted.value = false);
  function unregister(childId, strategy = 1 /* Hidden */) {
    let idx = transitionableChildren.value.findIndex(({ id: id2 }) => id2 === childId);
    if (idx === -1)
      return;
    match(strategy, {
      [0 /* Unmount */]() {
        transitionableChildren.value.splice(idx, 1);
      },
      [1 /* Hidden */]() {
        transitionableChildren.value[idx].state = "hidden" /* Hidden */;
      }
    });
    if (!hasChildren(transitionableChildren) && mounted.value) {
      done == null ? void 0 : done();
    }
  }
  function register(childId) {
    let child = transitionableChildren.value.find(({ id: id2 }) => id2 === childId);
    if (!child) {
      transitionableChildren.value.push({ id: childId, state: "visible" /* Visible */ });
    } else if (child.state !== "visible" /* Visible */) {
      child.state = "visible" /* Visible */;
    }
    return () => unregister(childId, 0 /* Unmount */);
  }
  return {
    children: transitionableChildren,
    register,
    unregister
  };
}
var TransitionChildRenderFeatures = 1 /* RenderStrategy */;
var TransitionChild = (0, import_vue30.defineComponent)({
  props: {
    as: { type: [Object, String], default: "div" },
    show: { type: [Boolean], default: null },
    unmount: { type: [Boolean], default: true },
    appear: { type: [Boolean], default: false },
    enter: { type: [String], default: "" },
    enterFrom: { type: [String], default: "" },
    enterTo: { type: [String], default: "" },
    entered: { type: [String], default: "" },
    leave: { type: [String], default: "" },
    leaveFrom: { type: [String], default: "" },
    leaveTo: { type: [String], default: "" }
  },
  emits: {
    beforeEnter: () => true,
    afterEnter: () => true,
    beforeLeave: () => true,
    afterLeave: () => true
  },
  setup(props, { emit, attrs, slots, expose }) {
    if (!hasTransitionContext() && hasOpenClosed()) {
      return () => (0, import_vue30.h)(
        TransitionRoot,
        {
          ...props,
          onBeforeEnter: () => emit("beforeEnter"),
          onAfterEnter: () => emit("afterEnter"),
          onBeforeLeave: () => emit("beforeLeave"),
          onAfterLeave: () => emit("afterLeave")
        },
        slots
      );
    }
    let container = (0, import_vue30.ref)(null);
    let state = (0, import_vue30.ref)("visible" /* Visible */);
    let strategy = (0, import_vue30.computed)(() => props.unmount ? 0 /* Unmount */ : 1 /* Hidden */);
    expose({ el: container, $el: container });
    let { show, appear } = useTransitionContext();
    let { register, unregister } = useParentNesting();
    let initial = { value: true };
    let id2 = useId();
    let isTransitioning = { value: false };
    let nesting = useNesting(() => {
      if (!isTransitioning.value) {
        state.value = "hidden" /* Hidden */;
        unregister(id2);
        emit("afterLeave");
      }
    });
    (0, import_vue30.onMounted)(() => {
      let unregister2 = register(id2);
      (0, import_vue30.onUnmounted)(unregister2);
    });
    (0, import_vue30.watchEffect)(() => {
      if (strategy.value !== 1 /* Hidden */)
        return;
      if (!id2)
        return;
      if (show && state.value !== "visible" /* Visible */) {
        state.value = "visible" /* Visible */;
        return;
      }
      match(state.value, {
        ["hidden" /* Hidden */]: () => unregister(id2),
        ["visible" /* Visible */]: () => register(id2)
      });
    });
    let enterClasses = splitClasses(props.enter);
    let enterFromClasses = splitClasses(props.enterFrom);
    let enterToClasses = splitClasses(props.enterTo);
    let enteredClasses = splitClasses(props.entered);
    let leaveClasses = splitClasses(props.leave);
    let leaveFromClasses = splitClasses(props.leaveFrom);
    let leaveToClasses = splitClasses(props.leaveTo);
    (0, import_vue30.onMounted)(() => {
      (0, import_vue30.watchEffect)(() => {
        if (state.value === "visible" /* Visible */) {
          let domElement = dom(container);
          let isEmptyDOMNode = domElement instanceof Comment && domElement.data === "";
          if (isEmptyDOMNode) {
            throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
          }
        }
      });
    });
    function executeTransition(onInvalidate) {
      let skip = initial.value && !appear.value;
      let node = dom(container);
      if (!node || !(node instanceof HTMLElement))
        return;
      if (skip)
        return;
      isTransitioning.value = true;
      if (show.value)
        emit("beforeEnter");
      if (!show.value)
        emit("beforeLeave");
      onInvalidate(
        show.value ? transition(
          node,
          enterClasses,
          enterFromClasses,
          enterToClasses,
          enteredClasses,
          (reason) => {
            isTransitioning.value = false;
            if (reason === "finished" /* Finished */)
              emit("afterEnter");
          }
        ) : transition(
          node,
          leaveClasses,
          leaveFromClasses,
          leaveToClasses,
          enteredClasses,
          (reason) => {
            isTransitioning.value = false;
            if (reason !== "finished" /* Finished */)
              return;
            if (!hasChildren(nesting)) {
              state.value = "hidden" /* Hidden */;
              unregister(id2);
              emit("afterLeave");
            }
          }
        )
      );
    }
    (0, import_vue30.onMounted)(() => {
      (0, import_vue30.watch)(
        [show],
        (_oldValues, _newValues, onInvalidate) => {
          executeTransition(onInvalidate);
          initial.value = false;
        },
        { immediate: true }
      );
    });
    (0, import_vue30.provide)(NestingContext, nesting);
    useOpenClosedProvider(
      (0, import_vue30.computed)(
        () => match(state.value, {
          ["visible" /* Visible */]: 0 /* Open */,
          ["hidden" /* Hidden */]: 1 /* Closed */
        })
      )
    );
    return () => {
      let {
        appear: appear2,
        show: show2,
        enter,
        enterFrom,
        enterTo,
        entered,
        leave,
        leaveFrom,
        leaveTo,
        ...rest
      } = props;
      let ourProps = { ref: container };
      let theirProps = rest;
      return render({
        theirProps,
        ourProps,
        slot: {},
        slots,
        attrs,
        features: TransitionChildRenderFeatures,
        visible: state.value === "visible" /* Visible */,
        name: "TransitionChild"
      });
    };
  }
});
var _TransitionChild = TransitionChild;
var TransitionRoot = (0, import_vue30.defineComponent)({
  inheritAttrs: false,
  props: {
    as: { type: [Object, String], default: "div" },
    show: { type: [Boolean], default: null },
    unmount: { type: [Boolean], default: true },
    appear: { type: [Boolean], default: false },
    enter: { type: [String], default: "" },
    enterFrom: { type: [String], default: "" },
    enterTo: { type: [String], default: "" },
    entered: { type: [String], default: "" },
    leave: { type: [String], default: "" },
    leaveFrom: { type: [String], default: "" },
    leaveTo: { type: [String], default: "" }
  },
  emits: {
    beforeEnter: () => true,
    afterEnter: () => true,
    beforeLeave: () => true,
    afterLeave: () => true
  },
  setup(props, { emit, attrs, slots }) {
    let usesOpenClosedState = useOpenClosed();
    let show = (0, import_vue30.computed)(() => {
      if (props.show === null && usesOpenClosedState !== null) {
        return match(usesOpenClosedState.value, {
          [0 /* Open */]: true,
          [1 /* Closed */]: false
        });
      }
      return props.show;
    });
    (0, import_vue30.watchEffect)(() => {
      if (![true, false].includes(show.value)) {
        throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
      }
    });
    let state = (0, import_vue30.ref)(show.value ? "visible" /* Visible */ : "hidden" /* Hidden */);
    let nestingBag = useNesting(() => {
      state.value = "hidden" /* Hidden */;
    });
    let initial = (0, import_vue30.ref)(true);
    let transitionBag = {
      show,
      appear: (0, import_vue30.computed)(() => props.appear || !initial.value)
    };
    (0, import_vue30.onMounted)(() => {
      (0, import_vue30.watchEffect)(() => {
        initial.value = false;
        if (show.value) {
          state.value = "visible" /* Visible */;
        } else if (!hasChildren(nestingBag)) {
          state.value = "hidden" /* Hidden */;
        }
      });
    });
    (0, import_vue30.provide)(NestingContext, nestingBag);
    (0, import_vue30.provide)(TransitionContext, transitionBag);
    return () => {
      let theirProps = omit(props, [
        "show",
        "appear",
        "unmount",
        "onBeforeEnter",
        "onBeforeLeave",
        "onAfterEnter",
        "onAfterLeave"
      ]);
      let sharedProps = { unmount: props.unmount };
      return render({
        ourProps: {
          ...sharedProps,
          as: "template"
        },
        theirProps: {},
        slot: {},
        slots: {
          ...slots,
          default: () => [
            (0, import_vue30.h)(
              _TransitionChild,
              {
                onBeforeEnter: () => emit("beforeEnter"),
                onAfterEnter: () => emit("afterEnter"),
                onBeforeLeave: () => emit("beforeLeave"),
                onAfterLeave: () => emit("afterLeave"),
                ...attrs,
                ...sharedProps,
                ...theirProps
              },
              slots.default
            )
          ]
        },
        attrs: {},
        features: TransitionChildRenderFeatures,
        visible: state.value === "visible" /* Visible */,
        name: "Transition"
      });
    };
  }
});
