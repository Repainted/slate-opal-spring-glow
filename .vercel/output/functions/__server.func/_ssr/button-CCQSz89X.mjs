import { i as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn } from "./router-CnNVtgAG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CCQSz89X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-sans font-semibold transition-transform duration-[var(--motion-quick,150ms)] ease-out disabled:opacity-50 disabled:pointer-events-none min-h-11", {
	variants: {
		variant: {
			primary: "bg-cream text-navy-deep hover:bg-copper hover:text-cream-soft rounded-full px-7",
			outline: "border border-cream/70 text-cream hover:border-copper-light hover:text-cream-soft rounded-full px-7 bg-transparent",
			ghost: "text-olive-light hover:text-cream rounded-full px-4",
			olive: "border border-olive-light/50 text-olive-light hover:bg-olive/20 rounded-full px-5"
		},
		size: {
			md: "text-[1.02rem] py-2.5",
			sm: "text-sm py-2 px-4 min-h-10"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
//#endregion
export { Button as t };
