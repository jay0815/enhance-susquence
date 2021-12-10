import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, isValidElement, Children, Component } from 'react';
const initialState = {
    isError: false
};
const uuid = Symbol('EnhanceSusquence');
class EnhanceSusquence extends Component {
    state = initialState;
    static uuid = uuid;
    static getDerivedStateFromError() {
        return { isError: true };
    }
    componentDidCatch(message, trance) {
        this.setState({ message, trance });
    }
    getErrorElement = (error) => {
        if (isValidElement(error)) {
            return error;
        }
        else if (typeof error === 'function') {
            try {
                return error();
            }
            catch (e) {
                return null;
            }
        }
        return null;
    };
    render() {
        const { loading, error, children } = this.props;
        const ErrorElement = this.getErrorElement(error);
        const { isError } = this.state;
        return Children.map(children, (child) => {
            if (child && isValidElement(child) && child.type.uuid === uuid) {
                return child;
            }
            return (_jsx(Suspense, Object.assign({ fallback: loading }, { children: isError ? ErrorElement : child }), void 0));
        });
    }
}
export default EnhanceSusquence;
