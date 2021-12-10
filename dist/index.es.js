var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Component, isValidElement, Children, Suspense } from "react";
import { jsx } from "react/jsx-runtime";
const initialState = {
  isError: false
};
const uuid = Symbol("EnhanceSusquence");
class EnhanceSusquence extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", initialState);
    __publicField(this, "getErrorElement", (error) => {
      if (isValidElement(error)) {
        return error;
      } else if (typeof error === "function") {
        try {
          return error();
        } catch (e) {
          return null;
        }
      }
      return null;
    });
  }
  static getDerivedStateFromError() {
    return {
      isError: true
    };
  }
  componentDidCatch(message, trance) {
    this.setState({
      message,
      trance
    });
  }
  render() {
    const {
      loading,
      error,
      children
    } = this.props;
    const ErrorElement = this.getErrorElement(error);
    const {
      isError
    } = this.state;
    return Children.map(children, (child) => {
      if (child && isValidElement(child) && child.type.uuid === uuid) {
        return child;
      }
      return /* @__PURE__ */ jsx(Suspense, {
        fallback: loading,
        children: isError ? ErrorElement : child
      });
    });
  }
}
__publicField(EnhanceSusquence, "uuid", uuid);
export { EnhanceSusquence as default };
