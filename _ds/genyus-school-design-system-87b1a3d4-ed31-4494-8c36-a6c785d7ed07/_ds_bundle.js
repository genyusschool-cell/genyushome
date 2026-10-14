/* @ds-bundle: {"format":4,"namespace":"GenyusSchoolDesignSystem_87b1a3","components":[{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"Tag","sourcePath":"components/data/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"Icon","sourcePath":"components/media/Icon.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/data/Avatar.jsx":"57a33ac4c1cc","components/data/Badge.jsx":"acc33994803d","components/data/ProgressBar.jsx":"37afacbcebbc","components/data/Tag.jsx":"58f7cc7ba5db","components/feedback/Dialog.jsx":"7719a87ba407","components/feedback/Toast.jsx":"be03a5ac71ce","components/feedback/Tooltip.jsx":"1dbc30c4f4d8","components/forms/Button.jsx":"a356725d7822","components/forms/Checkbox.jsx":"80c9ae0f34c4","components/forms/IconButton.jsx":"34c043d3c2cb","components/forms/Input.jsx":"47283ccf1136","components/forms/Radio.jsx":"d3951449b804","components/forms/Select.jsx":"39099c9d8b7b","components/forms/Switch.jsx":"8aca6f59cc1b","components/layout/Card.jsx":"6a17e6da4a0c","components/media/Icon.jsx":"bcb9c1a1e04c","components/navigation/Tabs.jsx":"dac115baf0c7","ui_kits/learn/Dashboard.jsx":"ede25b50d40f","ui_kits/learn/Shell.jsx":"032124ac97f9","ui_kits/marketing/Chrome.jsx":"d670de270e20","ui_kits/marketing/Sections.jsx":"a2f0738129bd"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GenyusSchoolDesignSystem_87b1a3 = window.GenyusSchoolDesignSystem_87b1a3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/Avatar.jsx
try { (() => {
/** Genyus School — Avatar (rounded, initials fallback, gradient ring option). */
function Avatar({
  src,
  name = "",
  size = 44,
  ring = false,
  gradient = "school",
  style = {}
}) {
  const gradMap = {
    school: "var(--grad-school)",
    business: "var(--grad-business)",
    university: "var(--grad-university)",
    sky: "var(--grad-sky)"
  };
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const inner = /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      background: src ? "var(--ink-200)" : "var(--grad-sky)",
      display: "grid",
      placeItems: "center",
      flex: "none",
      color: "var(--white)",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-bold)",
      fontSize: size * 0.4
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
  if (!ring) return /*#__PURE__*/React.createElement("div", {
    style: style
  }, inner);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 3,
      borderRadius: "50%",
      background: gradMap[gradient],
      display: "inline-flex",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 2,
      borderRadius: "50%",
      background: "var(--white)"
    }
  }, inner));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
/** Genyus School — Badge (small status/count pill). */
function Badge({
  children,
  tone = "blue",
  variant = "solid",
  style = {}
}) {
  const tones = {
    blue: {
      solid: ["var(--gs-blue)", "#fff"],
      soft: ["rgba(26,172,255,0.14)", "var(--color-primary-ink)"]
    },
    pink: {
      solid: ["var(--gs-pink)", "#fff"],
      soft: ["rgba(255,53,165,0.14)", "#D01E82"]
    },
    orange: {
      solid: ["var(--gs-orange)", "#fff"],
      soft: ["rgba(255,150,42,0.18)", "#C56A00"]
    },
    green: {
      solid: ["var(--state-success)", "#fff"],
      soft: ["rgba(22,179,100,0.16)", "#0E7C46"]
    },
    danger: {
      solid: ["var(--state-danger)", "#fff"],
      soft: ["rgba(245,56,91,0.14)", "#C81F3E"]
    },
    neutral: {
      solid: ["var(--ink-800)", "#fff"],
      soft: ["var(--ink-100)", "var(--ink-700)"]
    }
  };
  const [bg, fg] = (tones[tone] || tones.blue)[variant] || tones.blue.solid;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      fontFamily: "var(--font-body)",
      fontSize: "12px",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "0.01em",
      lineHeight: 1,
      padding: "5px 10px",
      background: bg,
      color: fg,
      borderRadius: "var(--radius-pill)",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
/** Genyus School — ProgressBar (rounded track, gradient fill). */
function ProgressBar({
  value = 0,
  max = 100,
  gradient = "sky",
  height = 12,
  showLabel = false,
  style = {}
}) {
  const gradMap = {
    school: "var(--grad-school)",
    business: "var(--grad-business)",
    university: "var(--grad-university)",
    sky: "var(--grad-sky)",
    sunny: "var(--grad-sunny)"
  };
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--ink-200)",
      borderRadius: "var(--radius-pill)",
      height,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: gradMap[gradient],
      borderRadius: "var(--radius-pill)",
      transition: "width var(--dur-slow) var(--ease-out)"
    }
  })), showLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "13px",
      fontWeight: "var(--fw-semibold)",
      color: "var(--ink-600)",
      marginTop: "6px"
    }
  }, Math.round(pct), "%"));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/Tag.jsx
try { (() => {
/** Genyus School — Tag / Chip (filter or category label, optional dismiss). */
function Tag({
  children,
  color = "var(--gs-blue)",
  onRemove,
  selected = false,
  onClick,
  style = {}
}) {
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      fontWeight: "var(--fw-medium)",
      padding: "7px 14px",
      borderRadius: "var(--radius-pill)",
      background: selected ? color : "var(--white)",
      color: selected ? "var(--white)" : "var(--ink-700)",
      border: `1.5px solid ${selected ? color : "var(--ink-300)"}`,
      cursor: clickable ? "pointer" : "default",
      transition: "all var(--dur-fast) var(--ease-standard)",
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      cursor: "pointer",
      opacity: 0.7,
      fontWeight: 700,
      fontSize: "15px",
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/** Genyus School — Dialog (centered modal with scrim). */
function Dialog({
  open = false,
  onClose,
  title,
  children,
  footer,
  width = 460,
  style = {}
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(14,17,22,0.5)",
      backdropFilter: "blur(3px)",
      display: "grid",
      placeItems: "center",
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-body)",
      overflow: "hidden",
      animation: "gsDialogIn var(--dur-normal) var(--ease-bounce)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes gsDialogIn{from{opacity:0;transform:scale(0.94) translateY(8px)}to{opacity:1;transform:none}}`), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "26px 28px"
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 12px",
      fontFamily: "var(--font-display)",
      fontSize: "24px",
      color: "var(--ink-900)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--ink-700)",
      fontSize: "16px",
      lineHeight: 1.55
    }
  }, children)), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      padding: "16px 28px",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Genyus School — Tooltip (dark bubble on hover/focus). */
function Tooltip({
  children,
  content,
  placement = "top",
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos[placement],
      background: "var(--ink-900)",
      color: "var(--white)",
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      fontWeight: "var(--fw-medium)",
      padding: "7px 11px",
      borderRadius: "var(--radius-sm)",
      whiteSpace: "nowrap",
      boxShadow: "var(--shadow-md)",
      pointerEvents: "none",
      zIndex: 50,
      opacity: show ? 1 : 0,
      transition: "opacity var(--dur-fast) var(--ease-standard)"
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Genyus School — Button
 * Round, friendly, pill-shaped CTA. The signature "gradient" variant carries
 * the brand's sunset device for hero actions.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  gradient = "school",
  fullWidth = false,
  disabled = false,
  type = "button",
  leadingIcon = null,
  trailingIcon = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: "14px",
      gap: "6px"
    },
    md: {
      padding: "12px 24px",
      fontSize: "16px",
      gap: "8px"
    },
    lg: {
      padding: "16px 34px",
      fontSize: "18px",
      gap: "10px"
    }
  };
  const gradMap = {
    school: "var(--grad-school)",
    business: "var(--grad-business)",
    university: "var(--grad-university)",
    sky: "var(--grad-sky)"
  };
  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes[size].gap,
    fontFamily: "var(--font-body)",
    fontWeight: "var(--fw-bold)",
    lineHeight: 1,
    border: "1px solid transparent",
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "transform var(--dur-fast) var(--ease-bounce), box-shadow var(--dur-normal) var(--ease-standard), background var(--dur-normal) var(--ease-standard)",
    whiteSpace: "nowrap",
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: "var(--gs-blue)",
      color: "var(--white)",
      boxShadow: "var(--shadow-blue)"
    },
    gradient: {
      background: gradMap[gradient] || gradMap.school,
      color: "var(--white)",
      boxShadow: "var(--shadow-brand)"
    },
    secondary: {
      background: "var(--ink-900)",
      color: "var(--white)"
    },
    outline: {
      background: "transparent",
      color: "var(--ink-900)",
      borderColor: "var(--ink-300)"
    },
    ghost: {
      background: "transparent",
      color: "var(--color-primary-ink)"
    }
  };
  const handleDown = e => {
    if (!disabled) e.currentTarget.style.transform = "scale(0.96)";
  };
  const handleUp = e => {
    if (!disabled) e.currentTarget.style.transform = "scale(1)";
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseDown: handleDown,
    onMouseUp: handleUp,
    onMouseLeave: handleUp
  }, rest), leadingIcon, children, trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Genyus School — Checkbox (rounded, blue check). */
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  style = {}
}) {
  const cbId = id || `gs-cb-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--font-body)",
      fontSize: "15px",
      color: "var(--ink-800)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: cbId,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flex: "none",
      borderRadius: "7px",
      border: checked ? "1.5px solid var(--gs-blue)" : "1.5px solid var(--ink-300)",
      background: checked ? "var(--gs-blue)" : "var(--white)",
      display: "grid",
      placeItems: "center",
      transition: "all var(--dur-fast) var(--ease-bounce)"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "white",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Genyus School — Input
 * Rounded text field with label, helper & error states.
 */
function Input({
  label,
  hint,
  error,
  value,
  placeholder,
  type = "text",
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || `gs-input-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? "var(--state-danger)" : focused ? "var(--gs-blue)" : "var(--ink-300)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      width: "100%",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "block",
      fontSize: "14px",
      fontWeight: "var(--fw-semibold)",
      color: "var(--ink-800)",
      marginBottom: "6px"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px 16px",
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      color: "var(--ink-900)",
      background: disabled ? "var(--ink-100)" : "var(--white)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      boxShadow: focused && !error ? "var(--focus-ring)" : "none",
      transition: "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "13px",
      marginTop: "6px",
      color: error ? "var(--state-danger)" : "var(--ink-500)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Genyus School — Radio (single option; group by shared name). */
function Radio({
  label,
  checked = false,
  onChange,
  name,
  value,
  disabled = false,
  id,
  style = {}
}) {
  const rId = id || `gs-radio-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: rId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--font-body)",
      fontSize: "15px",
      color: "var(--ink-800)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: rId,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flex: "none",
      borderRadius: "50%",
      border: checked ? "6px solid var(--gs-blue)" : "1.5px solid var(--ink-300)",
      background: "var(--white)",
      transition: "all var(--dur-fast) var(--ease-bounce)"
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Genyus School — Select
 * Rounded native select styled to match Input.
 */
function Select({
  label,
  hint,
  error,
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const selId = id || `gs-select-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? "var(--state-danger)" : focused ? "var(--gs-blue)" : "var(--ink-300)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      width: "100%",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      display: "block",
      fontSize: "14px",
      fontWeight: "var(--fw-semibold)",
      color: "var(--ink-800)",
      marginBottom: "6px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px 44px 12px 16px",
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      color: value ? "var(--ink-900)" : "var(--ink-500)",
      background: disabled ? "var(--ink-100)" : "var(--white)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      appearance: "none",
      WebkitAppearance: "none",
      boxShadow: focused && !error ? "var(--focus-ring)" : "none",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)"
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--ink-500)",
      fontSize: "12px"
    }
  }, "\u25BC")), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "13px",
      marginTop: "6px",
      color: error ? "var(--state-danger)" : "var(--ink-500)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** Genyus School — Switch (pill toggle, gradient when on). */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  style = {}
}) {
  const swId = id || `gs-switch-${Math.random().toString(36).slice(2, 8)}`;
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: swId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      fontFamily: "var(--font-body)",
      fontSize: "15px",
      color: "var(--ink-800)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    id: swId,
    role: "switch",
    "aria-checked": checked,
    type: "button",
    onClick: toggle,
    disabled: disabled,
    style: {
      width: 48,
      height: 28,
      flex: "none",
      padding: 3,
      border: "none",
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--grad-sky)" : "var(--ink-300)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--dur-normal) var(--ease-standard)",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "var(--white)",
      boxShadow: "var(--shadow-sm)",
      transform: checked ? "translateX(20px)" : "translateX(0)",
      transition: "transform var(--dur-normal) var(--ease-bounce)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Genyus School — Card
 * Rounded white surface with soft shadow. Optional gradient top accent bar
 * or full gradient background (variant="gradient").
 */
function Card({
  children,
  variant = "surface",
  accent = null,
  gradient = "school",
  padding = "var(--space-6)",
  style = {},
  ...rest
}) {
  const gradMap = {
    school: "var(--grad-school)",
    business: "var(--grad-business)",
    university: "var(--grad-university)",
    sky: "var(--grad-sky)",
    sunny: "var(--grad-sunny)"
  };
  const isGrad = variant === "gradient";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      background: isGrad ? gradMap[gradient] : "var(--surface-card)",
      color: isGrad ? "var(--white)" : "var(--text-body)",
      borderRadius: "var(--radius-lg)",
      boxShadow: isGrad ? "var(--shadow-md)" : "var(--shadow-sm)",
      border: isGrad ? "none" : "1px solid var(--border-subtle)",
      padding,
      overflow: "hidden",
      ...style
    }
  }, rest), accent && !isGrad && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "6px",
      background: gradMap[accent] || accent
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/media/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Genyus School — Icon
 * Thin wrapper around Lucide line icons (the brand uses simple, single-weight
 * outlined icons — see readme ICONOGRAPHY). Requires the Lucide UMD script to be
 * present on the page (loaded via CDN). Renders a placeholder <i> that Lucide
 * upgrades to an inline SVG.
 */
function Icon({
  name = "sparkles",
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.lucide && typeof window.lucide.createIcons === "function") {
      // reset so re-renders re-draw the correct glyph
      el.innerHTML = "";
      el.setAttribute("data-lucide", name);
      window.lucide.createIcons({
        nameAttr: "data-lucide",
        attrs: {}
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("i", _extends({
    ref: ref,
    "data-lucide": name,
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      color,
      strokeWidth,
      verticalAlign: "middle",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Icon.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/** Genyus School — Toast (inline notification card). */
function Toast({
  tone = "info",
  title,
  message,
  icon,
  onClose,
  style = {}
}) {
  const tones = {
    info: {
      accent: "var(--gs-blue)",
      glyph: "info"
    },
    success: {
      accent: "var(--state-success)",
      glyph: "check-circle-2"
    },
    warning: {
      accent: "var(--gs-orange)",
      glyph: "alert-triangle"
    },
    danger: {
      accent: "var(--state-danger)",
      glyph: "x-circle"
    }
  };
  const t = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
      padding: "14px 16px",
      borderLeft: `5px solid ${t.accent}`,
      minWidth: 280,
      maxWidth: 420,
      fontFamily: "var(--font-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      flex: "none",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || t.glyph,
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--fw-bold)",
      fontSize: "15px",
      color: "var(--ink-900)"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "14px",
      color: "var(--ink-600)",
      marginTop: title ? "2px" : 0
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)",
      fontSize: "18px",
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Genyus School — IconButton
 * Circular icon-only button. Uses Lucide icons via the Icon component.
 */
function IconButton({
  icon = "plus",
  variant = "primary",
  size = "md",
  disabled = false,
  ariaLabel = "button",
  style = {},
  ...rest
}) {
  const dims = {
    sm: 34,
    md: 44,
    lg: 54
  };
  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 26
  };
  const d = dims[size];
  const variants = {
    primary: {
      background: "var(--gs-blue)",
      color: "var(--white)",
      boxShadow: "var(--shadow-blue)"
    },
    gradient: {
      background: "var(--grad-school)",
      color: "var(--white)",
      boxShadow: "var(--shadow-brand)"
    },
    soft: {
      background: "var(--ink-100)",
      color: "var(--ink-800)"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink-700)"
    },
    outline: {
      background: "var(--white)",
      color: "var(--ink-800)",
      border: "1px solid var(--ink-300)"
    }
  };
  const handleDown = e => {
    if (!disabled) e.currentTarget.style.transform = "scale(0.92)";
  };
  const handleUp = e => {
    if (!disabled) e.currentTarget.style.transform = "scale(1)";
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    disabled: disabled,
    onMouseDown: handleDown,
    onMouseUp: handleUp,
    onMouseLeave: handleUp,
    style: {
      width: d,
      height: d,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid transparent",
      borderRadius: "var(--radius-circle)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "transform var(--dur-fast) var(--ease-bounce), background var(--dur-normal) var(--ease-standard)",
      ...variants[variant],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSizes[size]
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Genyus School — Tabs (pill segmented control; animated active pill). */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  const [internal, setInternal] = React.useState(tabs[0]?.value ?? tabs[0]);
  const active = value ?? internal;
  const select = v => {
    setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: "4px",
      padding: "5px",
      background: "var(--ink-100)",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-body)",
      ...style
    }
  }, tabs.map(t => {
    const tab = typeof t === "string" ? {
      value: t,
      label: t
    } : t;
    const isActive = tab.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.value,
      onClick: () => select(tab.value),
      style: {
        border: "none",
        cursor: "pointer",
        padding: "9px 20px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-body)",
        fontSize: "15px",
        fontWeight: isActive ? "var(--fw-bold)" : "var(--fw-medium)",
        color: isActive ? "var(--white)" : "var(--ink-600)",
        background: isActive ? "var(--gs-blue)" : "transparent",
        boxShadow: isActive ? "var(--shadow-blue)" : "none",
        transition: "all var(--dur-normal) var(--ease-standard)"
      }
    }, tab.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/learn/Dashboard.jsx
try { (() => {
/* Genyus School — Learn app: dashboard content */

function Topbar({
  onOpenChallenge
}) {
  const {
    Icon,
    IconButton,
    Badge,
    Button
  } = window.GenyusSchoolDesignSystem_87b1a3;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "18px 32px",
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--white)",
      position: "sticky",
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      color: "var(--ink-500)"
    }
  }, "\xA1Hola de nuevo!"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "24px",
      margin: "2px 0 0",
      color: "var(--ink-900)"
    }
  }, "Tu aventura, Ana")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      background: "var(--ink-100)",
      borderRadius: "var(--radius-pill)",
      padding: "8px 16px",
      gap: "8px",
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18,
    color: "var(--ink-400)"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar retos\u2026",
    style: {
      border: "none",
      background: "transparent",
      outline: "none",
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    variant: "soft",
    ariaLabel: "Notificaciones"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "gradient",
    size: "sm",
    onClick: onOpenChallenge
  }, "Nuevo reto")));
}
function Dashboard({
  onOpenChallenge
}) {
  const {
    Card,
    Icon,
    Badge,
    Tabs,
    ProgressBar,
    Tag
  } = window.GenyusSchoolDesignSystem_87b1a3;
  const [tab, setTab] = React.useState("En curso");
  const stats = [{
    icon: "flame",
    grad: "sunny",
    n: "12",
    l: "Días de racha"
  }, {
    icon: "trophy",
    grad: "university",
    n: "8",
    l: "Logros"
  }, {
    icon: "rocket",
    grad: "sky",
    n: "4",
    l: "Retos activos"
  }, {
    icon: "star",
    grad: "school",
    n: "1.240",
    l: "Puntos Genyus"
  }];
  const challenges = [{
    t: "Crea tu startup",
    c: "Emprendimiento",
    p: 60,
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    due: "2 días"
  }, {
    t: "Pensamiento creativo",
    c: "Creatividad",
    p: 30,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80",
    due: "5 días"
  }, {
    t: "Habla en público",
    c: "Liderazgo",
    p: 85,
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80",
    due: "Hoy"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 32px",
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: "26px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "16px",
      marginBottom: "26px"
    }
  }, stats.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.l,
    padding: "18px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: "var(--radius-md)",
      background: `var(--grad-${s.grad})`,
      display: "grid",
      placeItems: "center",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 22,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "28px",
      fontWeight: "var(--fw-black)",
      color: "var(--ink-900)"
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      color: "var(--ink-500)"
    }
  }, s.l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "22px",
      margin: 0,
      color: "var(--ink-900)"
    }
  }, "Mis retos"), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ["En curso", "Completados"],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "18px"
    }
  }, challenges.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    onClick: onOpenChallenge,
    style: {
      cursor: "pointer",
      background: "var(--white)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 128,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img,
    alt: c.t,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 10,
      left: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "pink"
  }, c.c)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 10,
      right: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: c.due === "Hoy" ? "danger" : "neutral",
    variant: c.due === "Hoy" ? "solid" : "soft"
  }, c.due))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "18px",
      margin: "0 0 12px",
      color: "var(--ink-900)"
    }
  }, c.t), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.p,
    gradient: "sky",
    showLabel: true
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "18px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "gradient",
    gradient: "university"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 22,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-bold)",
      fontSize: "14px",
      letterSpacing: "0.02em"
    }
  }, "RETO DE LA SEMANA")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "22px",
      margin: "0 0 8px"
    }
  }, "Pitch en 60 segundos"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      opacity: 0.92,
      margin: "0 0 16px",
      lineHeight: 1.5
    }
  }, "Graba tu idea y comp\xE1rtela con tu equipo."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: onOpenChallenge
  }, "Empezar reto")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "18px",
      margin: "0 0 14px",
      color: "var(--ink-900)"
    }
  }, "Tu progreso"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, [["Emprendimiento", 72, "school"], ["Creatividad", 48, "sunny"], ["Liderazgo", 90, "sky"]].map(([l, p, g]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      marginBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-700)",
      fontWeight: "var(--fw-medium)"
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-500)"
    }
  }, p, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: p,
    gradient: g,
    height: 9
  })))))));
}
Object.assign(window, {
  Topbar,
  Dashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/learn/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/learn/Shell.jsx
try { (() => {
/* Genyus School — Learn app: Login + shell chrome */

function Login({
  onLogin
}) {
  const {
    Input,
    Button,
    Checkbox
  } = window.GenyusSchoolDesignSystem_87b1a3;
  const [remember, setRemember] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--grad-school)",
      overflow: "hidden",
      display: "grid",
      placeItems: "center",
      padding: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 320,
      height: 320,
      borderRadius: "50%",
      border: "2px solid rgba(255,255,255,0.22)",
      top: -80,
      left: -60
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 180,
      height: 180,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.10)",
      bottom: 40,
      right: 30
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      color: "#fff",
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/genyus-blanco.png",
    alt: "Genyus",
    style: {
      height: 40,
      marginBottom: 30
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-poster)",
      textTransform: "uppercase",
      fontSize: "52px",
      lineHeight: 0.95,
      margin: "0 0 16px"
    }
  }, "Bienvenido de nuevo"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "18px",
      opacity: 0.95,
      lineHeight: 1.5
    }
  }, "Contin\xFAa tu aventura de emprendimiento. Tus retos te esperan."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      padding: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "30px",
      margin: "0 0 6px",
      color: "var(--ink-900)"
    }
  }, "Entrar"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      color: "var(--ink-500)",
      margin: "0 0 26px"
    }
  }, "Accede a tu panel de alumno."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Correo",
    placeholder: "tu@email.com",
    defaultValue: "ana@genyus.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Contrase\xF1a",
    type: "password",
    defaultValue: "123456"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Recu\xE9rdame",
    checked: remember,
    onChange: e => setRemember(e.target.checked)
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "14px"
    }
  }, "\xBFOlvidaste tu contrase\xF1a?")), /*#__PURE__*/React.createElement(Button, {
    variant: "gradient",
    fullWidth: true,
    size: "lg",
    onClick: onLogin
  }, "Entrar")))));
}
function Sidebar({
  active,
  onNav,
  onLogout
}) {
  const {
    Icon,
    Avatar
  } = window.GenyusSchoolDesignSystem_87b1a3;
  const items = [{
    k: "home",
    icon: "layout-dashboard",
    label: "Inicio"
  }, {
    k: "retos",
    icon: "rocket",
    label: "Retos"
  }, {
    k: "cursos",
    icon: "book-open",
    label: "Cursos"
  }, {
    k: "logros",
    icon: "trophy",
    label: "Logros"
  }, {
    k: "equipo",
    icon: "users",
    label: "Mi equipo"
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flex: "none",
      background: "var(--white)",
      borderRight: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      padding: "22px 16px",
      height: "100vh",
      position: "sticky",
      top: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/genyus-azul.png",
    alt: "Genyus",
    style: {
      height: 28,
      margin: "4px 8px 26px"
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      flex: 1
    }
  }, items.map(it => {
    const on = active === it.k;
    return /*#__PURE__*/React.createElement("button", {
      key: it.k,
      onClick: () => onNav(it.k),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "11px 14px",
        border: "none",
        cursor: "pointer",
        borderRadius: "var(--radius-md)",
        background: on ? "var(--grad-sky)" : "transparent",
        color: on ? "#fff" : "var(--ink-600)",
        fontFamily: "var(--font-body)",
        fontSize: "15px",
        fontWeight: on ? "var(--fw-bold)" : "var(--fw-medium)",
        boxShadow: on ? "var(--shadow-blue)" : "none",
        transition: "all var(--dur-normal) var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 20,
      color: on ? "#fff" : "var(--ink-500)"
    }), it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 8px",
      borderTop: "1px solid var(--border-subtle)",
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Ana L\xF3pez",
    size: 38,
    ring: true,
    gradient: "school"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--fw-bold)",
      fontSize: "14px",
      color: "var(--ink-900)"
    }
  }, "Ana L\xF3pez"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--ink-500)"
    }
  }, "Nivel 4 \xB7 Genyus School")), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    "aria-label": "Salir",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-400)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 18
  }))));
}
Object.assign(window, {
  Login,
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/learn/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Chrome.jsx
try { (() => {
/* Genyus School — Marketing site: shared chrome (Nav + Footer) */

function Nav({
  onNav
}) {
  const [open, setOpen] = React.useState(false);
  const links = ["School", "Business", "University", "Retos", "Nosotros"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 40,
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      gap: "28px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/genyus-azul.png",
    alt: "Genyus",
    style: {
      height: "30px"
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "26px",
      marginLeft: "8px"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
    },
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "15px",
      color: "var(--ink-700)"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: "12px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => onNav && onNav("app")
  }, "Entrar"), /*#__PURE__*/React.createElement(Button, {
    variant: "gradient",
    size: "sm"
  }, "Empieza gratis"))));
}
function Footer() {
  const cols = [{
    h: "Verticales",
    items: ["Genyus School", "Genyus Business", "Genyus University"]
  }, {
    h: "Recursos",
    items: ["Retos", "Metodología", "Future Minds", "Blog"]
  }, {
    h: "Genyus",
    items: ["Nosotros", "Centros", "Contacto", "Empleo"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--ink-900)",
      color: "var(--white)",
      padding: "56px 24px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/genyus-blanco.png",
    alt: "Genyus",
    style: {
      height: "32px",
      marginBottom: "16px"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      color: "var(--ink-400)",
      maxWidth: "30ch",
      lineHeight: 1.6
    }
  }, "El coraz\xF3n de la educaci\xF3n emprendedora. Parte del Movimiento Future Minds.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-bold)",
      fontSize: "14px",
      letterSpacing: "var(--tracking-caps)",
      textTransform: "uppercase",
      color: "var(--gs-yellow)",
      marginBottom: "14px"
    }
  }, c.h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, c.items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      color: "var(--ink-300)"
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "36px auto 0",
      paddingTop: "22px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      color: "var(--ink-500)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Genyus School"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "16px"
    }
  }, "Privacidad \xB7 Cookies \xB7 Aviso legal")));
}
Object.assign(window, {
  Nav,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Sections.jsx
try { (() => {
/* Genyus School — Marketing site: page sections */

function Hero() {
  const {
    Badge
  } = window.GenyusSchoolDesignSystem_87b1a3;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--grad-school)",
      overflow: "hidden",
      color: "var(--white)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 380,
      height: 380,
      borderRadius: "50%",
      border: "2px solid rgba(255,255,255,0.25)",
      top: -120,
      right: -80
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 220,
      height: 220,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.10)",
      bottom: -70,
      left: "38%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "84px 24px",
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: "40px",
      alignItems: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      background: "rgba(255,255,255,0.18)",
      backdropFilter: "blur(6px)",
      padding: "7px 14px",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-bold)",
      fontSize: "13px",
      letterSpacing: "0.02em",
      marginBottom: "22px"
    }
  }, "\u2726 Movimiento Future Minds"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-poster)",
      textTransform: "uppercase",
      fontSize: "72px",
      lineHeight: 0.94,
      margin: "0 0 18px",
      letterSpacing: "0.01em"
    }
  }, "Aprender es", /*#__PURE__*/React.createElement("br", null), "una aventura"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "20px",
      lineHeight: 1.5,
      maxWidth: "44ch",
      opacity: 0.95,
      margin: "0 0 30px"
    }
  }, "Formamos a ni\xF1os, j\xF3venes y adultos en emprendimiento y habilidades sociales, mezclando emoci\xF3n y diversi\xF3n."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, "Empieza gratis"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    style: {
      color: "#fff",
      borderColor: "rgba(255,255,255,0.7)"
    }
  }, "Ver metodolog\xEDa")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "30px",
      marginTop: "38px",
      fontFamily: "var(--font-body)"
    }
  }, [["+120", "Centros"], ["+50k", "Alumnos"], ["4.9★", "Valoración"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "30px",
      fontWeight: "var(--fw-black)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "14px",
      opacity: 0.85
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      boxShadow: "var(--shadow-lg)",
      aspectRatio: "4/5",
      background: "rgba(255,255,255,0.15)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    alt: "Estudiantes de Genyus School",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -18,
      left: -18,
      background: "var(--white)",
      color: "var(--ink-900)",
      borderRadius: "var(--radius-lg)",
      padding: "14px 18px",
      boxShadow: "var(--shadow-md)",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "var(--grad-sunny)",
      display: "grid",
      placeItems: "center",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "data-lucide": "rocket"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--fw-bold)",
      fontSize: "15px"
    }
  }, "Reto de la semana"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "13px",
      color: "var(--ink-500)"
    }
  }, "Crea tu primera startup"))))));
}
function Verticals() {
  const {
    Card,
    Icon
  } = window.GenyusSchoolDesignSystem_87b1a3;
  const items = [{
    key: "school",
    grad: "school",
    icon: "graduation-cap",
    title: "Genyus School",
    desc: "Para niños y jóvenes. Emprendimiento y habilidades sociales con retos y dinámicas.",
    tag: "6–17 años"
  }, {
    key: "business",
    grad: "business",
    icon: "briefcase",
    title: "Genyus Business",
    desc: "Programas para profesionales y equipos que quieren pensar como emprendedores.",
    tag: "Adultos"
  }, {
    key: "university",
    grad: "university",
    icon: "lightbulb",
    title: "Genyus University",
    desc: "Formación avanzada para líderes que construyen el futuro con creatividad.",
    tag: "+18 años"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "84px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: "48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--tracking-caps)",
      textTransform: "uppercase",
      fontSize: "13px",
      color: "var(--gs-pink)",
      marginBottom: "12px"
    }
  }, "Tres formas de crecer"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "46px",
      margin: 0,
      color: "var(--ink-900)"
    }
  }, "Una marca, tres verticales")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "24px"
    }
  }, items.map(it => /*#__PURE__*/React.createElement(Card, {
    key: it.key,
    accent: it.grad,
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "var(--radius-md)",
      background: `var(--grad-${it.grad})`,
      display: "grid",
      placeItems: "center",
      color: "#fff",
      marginBottom: "18px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 28,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "24px",
      margin: "0 0 8px",
      color: "var(--ink-900)"
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "15px",
      lineHeight: 1.6,
      color: "var(--ink-600)",
      margin: "0 0 18px",
      flex: 1
    }
  }, it.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      fontWeight: "var(--fw-bold)",
      color: "var(--ink-500)"
    }
  }, it.tag), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Descubrir \u2192"))))));
}
function Programs() {
  const {
    Badge,
    Tag,
    ProgressBar
  } = window.GenyusSchoolDesignSystem_87b1a3;
  const [filter, setFilter] = React.useState("Todos");
  const filters = ["Todos", "Emprendimiento", "Creatividad", "Liderazgo"];
  const cards = [{
    t: "Crea tu startup",
    c: "Emprendimiento",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    lvl: "Principiante",
    p: 40
  }, {
    t: "Pensamiento creativo",
    c: "Creatividad",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    lvl: "Intermedio",
    p: 70
  }, {
    t: "Habla en público",
    c: "Liderazgo",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    lvl: "Todos",
    p: 20
  }];
  const shown = cards.filter(c => filter === "Todos" || c.c === filter);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--ink-050)",
      padding: "84px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "32px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--tracking-caps)",
      textTransform: "uppercase",
      fontSize: "13px",
      color: "var(--gs-blue)",
      marginBottom: "12px"
    }
  }, "Retos & Programas"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "42px",
      margin: 0,
      color: "var(--ink-900)"
    }
  }, "Aprende haciendo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap"
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    color: "var(--gs-blue)",
    selected: filter === f,
    onClick: () => setFilter(f)
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "24px"
    }
  }, shown.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    style: {
      background: "var(--white)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-sm)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 168,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img,
    alt: c.t,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "pink"
  }, c.c))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "20px",
      margin: "0 0 4px",
      color: "var(--ink-900)"
    }
  }, c.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      color: "var(--ink-500)",
      marginBottom: "14px"
    }
  }, c.lvl), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.p,
    gradient: "sky"
  })))))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "84px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
      background: "var(--grad-university)",
      borderRadius: "var(--radius-xl)",
      padding: "64px 48px",
      color: "#fff",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: "50%",
      border: "2px solid rgba(255,255,255,0.2)",
      top: -140,
      left: -60
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-poster)",
      textTransform: "uppercase",
      fontSize: "56px",
      lineHeight: 0.95,
      margin: "0 0 16px",
      position: "relative"
    }
  }, "\xDAnete a Future Minds"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "19px",
      opacity: 0.95,
      maxWidth: "48ch",
      margin: "0 auto 28px",
      position: "relative"
    }
  }, "Empieza hoy y descubre c\xF3mo el emprendimiento transforma la manera de aprender."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      justifyContent: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, "Empieza gratis"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    style: {
      color: "#fff",
      borderColor: "rgba(255,255,255,0.7)"
    }
  }, "Habla con nosotros"))));
}
Object.assign(window, {
  Hero,
  Verticals,
  Programs,
  CTA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
