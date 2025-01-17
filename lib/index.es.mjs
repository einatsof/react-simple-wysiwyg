import * as React from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function getSelectedNode() {
    if (document.selection) {
        return document.selection.createRange().parentElement();
    }
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        return selection.getRangeAt(0).startContainer.parentNode;
    }
    return null;
}
function normalizeHtml(str) {
    return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}
function replaceCaret(el) {
    // Place the caret at the end of the element
    var target = document.createTextNode('');
    el.appendChild(target);
    // do not move caret if element was not focused
    var isTargetFocused = document.activeElement === el;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
        var sel = window.getSelection();
        if (sel !== null) {
            var range = document.createRange();
            range.setStart(target, target.nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        if (el instanceof HTMLElement)
            el.focus();
    }
}

/* eslint-disable react/prop-types */
/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for a html element with editable contents.
 */
var ContentEditable = React.memo(React.forwardRef(function ContentEditable(_a, ref) {
    var className = _a.className, disabled = _a.disabled, tagName = _a.tagName, value = _a.value, rest = __rest(_a, ["className", "disabled", "tagName", "value"]);
    var elRef = React.useRef();
    var htmlRef = React.useRef(value);
    var restRef = React.useRef(rest);
    React.useEffect(function () {
        restRef.current = rest;
        var el = elRef.current;
        if (el && normalizeHtml(htmlRef.current) !== normalizeHtml(value)) {
            htmlRef.current = value;
            el.innerHTML = value;
            replaceCaret(el);
        }
    });
    return React.useMemo(function () {
        function onSetRef($el) {
            elRef.current = $el;
            if (typeof ref === 'function') {
                ref($el);
            }
            else if (typeof ref === 'object') {
                // eslint-disable-next-line no-param-reassign
                ref.current = $el;
            }
        }
        function onChange(event) {
            var _a, _b;
            var el = elRef.current;
            if (!el) {
                return;
            }
            var elementHtml = el.innerHTML;
            if (elementHtml !== htmlRef.current) {
                (_b = (_a = restRef.current).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, __assign(__assign({}, event), { target: {
                        value: elementHtml,
                        name: rest.name,
                    } }));
            }
            htmlRef.current = elementHtml;
        }
        return React.createElement(tagName || 'div', __assign(__assign({}, rest), { className: className, contentEditable: !disabled, dangerouslySetInnerHTML: { __html: value }, onBlur: function (e) { return (restRef.current.onBlur || onChange)(e); }, onInput: onChange, onKeyDown: function (e) { return (restRef.current.onKeyDown || onChange)(e); }, onKeyUp: function (e) { return (restRef.current.onKeyUp || onChange)(e); }, ref: onSetRef }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [className, disabled, tagName]);
}));

var EditorContext = React.createContext(null);
function EditorProvider(_a) {
    var children = _a.children;
    var _b = React.useState({
        htmlMode: false,
        update: update,
    }), state = _b[0], setState = _b[1];
    function update(attrs) {
        setState(function (prevState) {
            return __assign(__assign(__assign({}, prevState), attrs), { date: Date.now() });
        });
    }
    return (React.createElement(EditorContext.Provider, { value: state }, children));
}
function useEditorState() {
    var context = React.useContext(EditorContext);
    if (!context) {
        throw new Error('You should wrap your component by EditorProvider');
    }
    return context;
}

function HtmlEditor(_a) {
    var rest = __rest(_a, []);
    return React.createElement("textarea", __assign({}, rest));
}

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".rsw-editor{border-radius:.375rem;display:flex;flex-direction:column;min-height:100px;overflow:hidden}.rsw-ce{flex:1 0 auto;outline:none;padding:.5rem}.rsw-ce[contentEditable=true]:empty:not(:focus):before{color:grey;content:attr(placeholder)}.rsw-html{background:transparent;border:none;font-family:monospace,Courier New}.rsw-separator{align-self:stretch;border-right:1px solid #ddd;display:flex;margin:0 3px}.rsw-dd{box-sizing:border-box;outline:none}.rsw-btn{background:transparent;border:0;color:#222;cursor:pointer;font-size:1em;height:2em;outline:none;padding:0;width:2em}.rsw-btn:hover{background:#eaeaea}.rsw-btn[data-active=true]{background:#e0e0e0}.rsw-toolbar{align-items:center;background-color:#f5f5f5;border-radius:10px;display:flex}";
n(css,{});

function Editor(_a) {
    var children = _a.children, onSelect = _a.onSelect, rest = __rest(_a, ["children", "onSelect"]);
    var editorState = useEditorState();
    React.useEffect(function () {
        document.addEventListener('click', onClickOutside);
        return function () { return document.removeEventListener('click', onClickOutside); };
    });
    function onClickOutside(event) {
        var _a;
        if (event.target === editorState.$el) {
            return;
        }
        if ((_a = editorState.$el) === null || _a === void 0 ? void 0 : _a.contains(event.target)) {
            return;
        }
        editorState.update({ $selection: null });
    }
    function onTextSelect(event) {
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(event);
        editorState.update({ $selection: getSelectedNode() });
    }
    function setContentEditableRef($el) {
        editorState.update({ $el: $el });
    }
    if (editorState.htmlMode) {
        return (React.createElement("div", { className: "rsw-editor" },
            children,
            React.createElement(HtmlEditor, __assign({}, rest, { className: "rsw-ce rsw-html" }))));
    }
    return (React.createElement("div", { className: "rsw-editor" },
        children,
        React.createElement(ContentEditable, __assign({}, rest, { ref: setContentEditableRef, onSelect: onTextSelect, className: "rsw-ce" }))));
}

function OrderedListIcon() {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", style: { verticalAlign: 'text-top' } },
        React.createElement("path", { fill: "currentColor", d: "M6.99938 12.998v-2H20.9994v2H6.99938zm0 6.0001v-2H20.9994v2H6.99938zm0-12.00001v-2H20.9994v2H6.99938zm-4 1v-3h-1v-1h2v4h-1zm-1 9.00001v-1h3v4h-3v-1h2v-.5h-1v-1h1v-.5h-2zM4.25 10c.41421 0 .75.3358.75.75 0 .2024-.08017.3861-.2105.521L3.11983 13H5v1H2v-.9218L4 11H2v-1h2.25z" })));
}

function UnorderedListIcon() {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", style: { verticalAlign: 'text-top' } },
        React.createElement("path", { fill: "currentColor", d: "M7 5h14v2H7V5zm0 8v-2h14v2H7zM4 4.50001c.83 0 1.5.66992 1.5 1.5 0 .83007-.67 1.5-1.5 1.5s-1.5-.66993-1.5-1.5c0-.83008.67-1.5 1.5-1.5zM4 10.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM7 19v-2h14v2H7zm-3-2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" })));
}

var BtnBold = createButton('Bold', '𝐁', 'bold');
var BtnBulletList = createButton('Bullet list', React.createElement(UnorderedListIcon, null), 'insertUnorderedList');
var BtnClearFormatting = createButton('Clear formatting', 'T̲ₓ', 'removeFormat');
var BtnItalic = createButton('Italic', '𝑰', 'italic');
var BtnLink = createButton('Link', '🔗', function (_a) {
    var $selection = _a.$selection;
    if (($selection === null || $selection === void 0 ? void 0 : $selection.nodeName) === 'A') {
        document.execCommand('unlink');
    }
    else {
        // eslint-disable-next-line no-alert
        var linkURL = prompt('URL', '');
        document.execCommand('createLink', false, 'myLink');
        var a = document.querySelector('a[href="myLink"]');
        a.setAttribute('target', '_blank');
        a.setAttribute('href', linkURL);
    }
});
var BtnNumberedList = createButton('Numbered list', React.createElement(OrderedListIcon, null), 'insertOrderedList');
var BtnRedo = createButton('Redo', '↷', 'redo');
var BtnUnderline = createButton('Underline', React.createElement("span", { style: { textDecoration: 'underline' } }, "\uD835\uDC14"), 'underline');
var BtnUndo = createButton('Undo', '↶', 'undo');
function createButton(title, content, command) {
    ButtonFactory.displayName = title.replace(/\s/g, '');
    return ButtonFactory;
    function ButtonFactory(props) {
        var editorState = useEditorState();
        var $selection = editorState.$selection;
        var active = false;
        if (typeof command === 'string') {
            active = !!$selection && document.queryCommandState(command);
        }
        function onAction(e) {
            e.preventDefault();
            if (typeof command === 'function') {
                command(editorState);
            }
            else {
                document.execCommand(command);
            }
        }
        if (editorState.htmlMode) {
            return null;
        }
        return (React.createElement("button", __assign({ type: "button", title: title }, props, { className: "rsw-btn", onMouseDown: onAction, "data-active": active }), content));
    }
}

var BtnStyles = createDropdown('Styles', [
    ['Normal', 'formatBlock', 'P'],
    // ['𝗛𝗲𝗮𝗱𝗲𝗿 𝟭', 'formatBlock', 'H1'],
    // ['Header 2', 'formatBlock', 'H2'],
    ['𝗛𝗲𝗮𝗱𝗶𝗻𝗴', 'formatBlock', 'H2'],
    ['Subheading', 'formatBlock', 'H4'],
    // ['𝙲𝚘𝚍𝚎', 'formatBlock', 'PRE'],
]);
function createDropdown(title, items) {
    DropdownFactory.displayName = title;
    return DropdownFactory;
    function DropdownFactory(props) {
        var editorState = useEditorState();
        if (editorState.htmlMode) {
            return null;
        }
        return (React.createElement(Dropdown, __assign({}, props, { onChange: onChange, title: title, items: items })));
        function onChange(e) {
            var selected = parseInt(e.target.value, 10);
            var _a = items[selected], command = _a[1], commandArgument = _a[2];
            e.preventDefault();
            e.target.selectedIndex = 0;
            if (typeof command === 'function') {
                command(editorState);
            }
            else {
                document.execCommand(command, false, commandArgument);
            }
        }
    }
}
function Dropdown(_a) {
    var items = _a.items, selected = _a.selected, inputProps = __rest(_a, ["items", "selected"]);
    return (React.createElement("select", __assign({}, inputProps, { value: selected, className: "rsw-dd" }),
        React.createElement("option", { hidden: true }, inputProps.title),
        items.map(function (item, index) { return (React.createElement("option", { key: item[2], value: index }, item[0])); })));
}

function HtmlButton(_a) {
    var rest = __rest(_a, []);
    var editorState = useEditorState();
    function onClick() {
        editorState.update({
            htmlMode: !editorState.htmlMode,
        });
    }
    return (React.createElement("button", __assign({ type: "button", title: "HTML mode", className: "rsw-btn", onClick: onClick, "data-active": editorState.htmlMode }, rest), "</>"));
}

function Separator() {
    var editorState = useEditorState();
    if (editorState.htmlMode) {
        return null;
    }
    return React.createElement("div", { className: "rsw-separator" });
}

function Toolbar(props) {
    return React.createElement("div", __assign({}, props, { className: "rsw-toolbar" }));
}

function DefaultEditor(props) {
    return (React.createElement(EditorProvider, null,
        React.createElement(Editor, __assign({}, props),
            React.createElement(Toolbar, null,
                React.createElement(BtnUndo, null),
                React.createElement(BtnRedo, null),
                React.createElement(Separator, null),
                React.createElement(BtnBold, null),
                React.createElement(BtnItalic, null),
                React.createElement(BtnUnderline, null),
                React.createElement(Separator, null),
                React.createElement(BtnNumberedList, null),
                React.createElement(BtnBulletList, null),
                React.createElement(Separator, null),
                React.createElement(BtnLink, null),
                React.createElement(BtnClearFormatting, null),
                React.createElement(HtmlButton, null),
                React.createElement(Separator, null),
                React.createElement(BtnStyles, null)))));
}

export { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStyles, BtnUnderline, BtnUndo, ContentEditable, DefaultEditor, Dropdown, Editor, EditorContext, EditorProvider, HtmlButton, HtmlEditor, Separator, Toolbar, useEditorState };
//# sourceMappingURL=index.es.mjs.map
