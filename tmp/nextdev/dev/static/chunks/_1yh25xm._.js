(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/layout/Nav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Nav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const LINKS = [
    {
        label: "About",
        href: "/about",
        ready: true
    },
    {
        label: "Work",
        href: "/#projects",
        ready: true,
        anchor: "projects"
    },
    {
        label: "Playground",
        href: "/playground",
        ready: false
    },
    {
        label: "Visitor Gallery",
        href: "/gallery",
        ready: false
    }
];
/* Light-mode take on the kokonut cluster: the fused blocks are a soft ink
   wash instead of solid black, and the lifted segment is a white paper pill
   carried by its shadow. Same morph, palette that belongs to this site. */ /* px-[14px] gives the 28px gap between labels that the Figma row specifies,
   since the gap there is measured text-edge to text-edge. */ const SEGMENT = "flex items-center justify-center whitespace-nowrap bg-black/[0.05] py-[9px] px-[14px] text-[16px] text-ink-muted transition-all duration-300 max-lg:px-[10px] max-lg:text-[13px]";
function Nav() {
    _s();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const activeLabel = LINKS.find((l)=>l.ready && !l.anchor && pathname.startsWith(l.href))?.label ?? null;
    const lifted = hovered ?? activeLabel;
    const scrollToAnchor = (anchor)=>(e)=>{
            if (pathname !== "/") return; // let the /#anchor navigation happen
            e.preventDefault();
            // Desktop and mobile render separate sections — scroll whichever is live.
            const targets = document.querySelectorAll(`[data-section="${anchor}"]`);
            for (const el of targets){
                if (el.offsetParent !== null || el.getClientRects().length) {
                    el.scrollIntoView({
                        behavior: reduceMotion ? "auto" : "smooth",
                        block: "start"
                    });
                    return;
                }
            }
        };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].header, {
        className: "absolute inset-x-0 top-0 z-50",
        initial: reduceMotion ? false : {
            opacity: 0,
            y: -8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            "aria-label": "Primary",
            className: "flex w-full items-center justify-between px-gutter py-[34px] max-lg:px-5 max-lg:py-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    "data-cursor": "hover",
                    "aria-label": "Aastha Singh — home",
                    className: "block size-[48px] shrink-0 overflow-hidden rounded-[4px] max-lg:size-[40px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/assets/landing/final/aastha-logo.webp",
                        alt: "",
                        width: 96,
                        height: 96,
                        priority: true,
                        className: "size-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Nav.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/layout/Nav.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "-mr-[14px] flex items-stretch overflow-hidden rounded-xl max-lg:-mr-[10px]",
                    onPointerLeave: ()=>setHovered(null),
                    children: LINKS.map((item, i)=>{
                        const isLifted = lifted === item.label;
                        const prev = i > 0 ? LINKS[i - 1] : null;
                        const next = i < LINKS.length - 1 ? LINKS[i + 1] : null;
                        /* The kokonut morph: every segment is a solid ink block; the
               lifted one detaches as its own rounded pill (the mx margin opens
               a gap of page colour), and its neighbours' corners round toward
               the gap so the cluster appears to split and re-fuse. */ const shape = isLifted ? "mx-2 rounded-xl !bg-white font-semibold !text-black shadow-[0_1px_6px_rgba(15,23,42,0.12)]" : [
                            (i === 0 || lifted === prev?.label) && "rounded-l-xl",
                            (i === LINKS.length - 1 || lifted === next?.label) && "rounded-r-xl"
                        ].filter(Boolean).join(" ");
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex",
                            onPointerEnter: ()=>setHovered(item.label),
                            children: item.ready ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                "data-cursor": "snap",
                                "aria-current": activeLabel === item.label ? "page" : undefined,
                                onClick: item.anchor ? scrollToAnchor(item.anchor) : undefined,
                                className: `${SEGMENT} ${shape}`,
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Nav.tsx",
                                lineNumber: 118,
                                columnNumber: 19
                            }, this) : /* Coming-soon pages morph like real links — the hover cursor
                     label is what communicates their state. */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-cursor": "label",
                                "data-cursor-text": "Coming soon",
                                "aria-disabled": "true",
                                className: `${SEGMENT} ${shape} cursor-default`,
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Nav.tsx",
                                lineNumber: 130,
                                columnNumber: 19
                            }, this)
                        }, item.label, false, {
                            fileName: "[project]/components/layout/Nav.tsx",
                            lineNumber: 116,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/layout/Nav.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/layout/Nav.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/Nav.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(Nav, "7w3TzloUZ1SAoDc2pqoXWHS3kkw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Nav;
var _c;
__turbopack_context__.k.register(_c, "Nav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/ScaledStage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScaledStage,
    "useStageScale",
    ()=>useStageScale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
/** Current stage scale, for children that translate pointer deltas into
 *  canvas px (e.g. draggable collage stickers). 1 outside a ScaledStage. */ const StageScaleContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(1);
const useStageScale = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StageScaleContext);
};
_s(useStageScale, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function ScaledStage({ width = 1440, height, minWidth = 1024, children }) {
    _s1();
    const wrapper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScaledStage.useEffect": ()=>{
            const el = wrapper.current;
            if (!el) return;
            const measure = {
                "ScaledStage.useEffect.measure": ()=>{
                    const available = el.clientWidth;
                    setScale(available >= width ? 1 : Math.max(available / width, minWidth / width));
                }
            }["ScaledStage.useEffect.measure"];
            measure();
            const ro = new ResizeObserver(measure);
            ro.observe(el);
            return ({
                "ScaledStage.useEffect": ()=>ro.disconnect()
            })["ScaledStage.useEffect"];
        }
    }["ScaledStage.useEffect"], [
        width,
        minWidth
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrapper,
        className: "w-full overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: height * scale
            },
            className: "relative mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width,
                    height,
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                    marginLeft: "auto",
                    marginRight: "auto"
                },
                className: "relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StageScaleContext.Provider, {
                    value: scale,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/layout/ScaledStage.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/ScaledStage.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/layout/ScaledStage.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/ScaledStage.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s1(ScaledStage, "IqHoLGA/nLXXYrsNHZ+PAyuhgB8=");
_c = ScaledStage;
var _c;
__turbopack_context__.k.register(_c, "ScaledStage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/motion/CylinderCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CylinderCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$animation$2d$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-animation-frame.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/**
 * A vertical photo wheel: the tiles are wrapped around the inside of a
 * cylinder, so the strip curves toward the viewer at the top and bottom
 * instead of just sliding. It drifts on its own and can be grabbed and flicked.
 *
 * WHY A REAL CYLINDER, NOT A SKEW
 * -------------------------------
 * The cheap version of this effect tilts each tile by an amount interpolated
 * from its distance to the centre. It falls apart the moment you look at the
 * spacing: a foreshortened tile occupies less height than its slot, so the
 * gaps visibly stretch toward the edges. Solving the geometry properly —
 * every tile at arc position `a` sits at angle `a / RADIUS` on the wheel —
 * makes position, foreshortening and gap fall out of one number, and they stay
 * consistent at any speed or radius.
 *
 * Each tile's transform is therefore:
 *
 *   translate(-50%, -50%) translateZ(R) rotateX(θ) translateZ(-R)
 *
 * which pivots the tile about a point R behind the plane of the strip. At
 * θ = 0 it lands dead centre, flat and unscaled.
 *
 * PERFORMANCE
 * -----------
 * The transforms are written straight to the DOM inside one rAF callback —
 * no React state, so a 60fps wheel costs zero re-renders. Tiles that have
 * rotated past the horizon are `visibility: hidden`, which keeps them out of
 * paint (and stops the far side of the wheel showing through the near side).
 */ /**
 * Curvature is defined as degrees of arc per tile rather than as a fixed
 * radius, so the wheel looks identical whatever size the tiles are — the
 * mobile carousel is the same object, smaller, not a flatter one.
 *
 * 41.8° puts five tiles in view: the flat one, two neighbours at ~92% height
 * with a ~12% trapezoid flare toward the viewer, and two heavily foreshortened
 * slivers running off the top and bottom of the panel. Those slivers are what
 * make the strip read as passing through the panel rather than sitting in it,
 * so the value must stay under 45° (at 45° the second ring rotates past the
 * horizon and the strip visibly ends).
 */ const ARC_PER_TILE = 41.8;
/** perspective ÷ radius. Governs how much the near edge of a tilted tile
 *  flares; measured off the Figma mock at roughly 4.1. */ const PERSPECTIVE_RATIO = 4.1;
/** Tiles past this angle are behind the viewer — hide, don't paint. */ const HORIZON = 88;
/** Angle at which a tile starts fading out toward the horizon. */ const FADE_FROM = 55;
/** Arc px per second of idle drift — roughly one photo every five seconds. */ const DRIFT = 48;
/** Flick decay per second. */ const FRICTION = 2.6;
function CylinderCarousel({ images, cardWidth, cardHeight, gap = 16, className, label }) {
    _s();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const viewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tileRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    /* Repeat the photo set until the wheel is at least six tiles around. Fewer
     than that and half a revolution is under the horizon angle, which would
     let the same tile show at the top and the bottom of the strip at once. */ const tiles = Array.from({
        length: Math.max(6, images.length * 2)
    }, (_, i)=>images[i % images.length]);
    const step = cardHeight + gap;
    const span = tiles.length * step;
    const radius = step / (ARC_PER_TILE * Math.PI / 180);
    const perspective = radius * PERSPECTIVE_RATIO;
    const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const velocity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const dragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    /* Off-screen the wheel stops turning. A rAF loop writing ten transforms per
     frame for a section nobody is looking at is pure battery cost, and this
     panel sits two thirds of the way down a long page. */ const onScreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    const paint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CylinderCarousel.useCallback[paint]": ()=>{
            const half = span / 2;
            for(let i = 0; i < tiles.length; i++){
                const el = tileRefs.current[i];
                if (!el) continue;
                // Arc distance from the centre of the wheel, wrapped into (-half, half].
                let arc = ((i * step - offset.current) % span + span) % span;
                if (arc > half) arc -= span;
                const deg = arc / radius * (180 / Math.PI);
                if (Math.abs(deg) > HORIZON) {
                    el.style.visibility = "hidden";
                    continue;
                }
                el.style.visibility = "visible";
                el.style.transform = `translate(-50%, -50%) translateZ(${radius.toFixed(1)}px) rotateX(${deg.toFixed(2)}deg) translateZ(${(-radius).toFixed(1)}px)`;
                /* Full strength until a tile is well past three-quarter turn, then a
         quick fade into the horizon. Fading the near neighbours too would
         wash out the photographs, which are the point of the section. */ const fade = (HORIZON - Math.abs(deg)) / (HORIZON - FADE_FROM);
                el.style.opacity = String(Math.min(1, Math.max(0, fade)));
            }
        }
    }["CylinderCarousel.useCallback[paint]"], [
        span,
        step,
        radius,
        tiles.length
    ]);
    // Paint once on mount so the first frame is already arranged (and so the
    // reduced-motion build, which never animates, is laid out correctly).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(paint, [
        paint
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CylinderCarousel.useEffect": ()=>{
            const el = viewportRef.current;
            if (!el) return;
            const io = new IntersectionObserver({
                "CylinderCarousel.useEffect": ([entry])=>{
                    onScreen.current = entry.isIntersecting;
                }
            }["CylinderCarousel.useEffect"]);
            io.observe(el);
            return ({
                "CylinderCarousel.useEffect": ()=>io.disconnect()
            })["CylinderCarousel.useEffect"];
        }
    }["CylinderCarousel.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$animation$2d$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"])({
        "CylinderCarousel.useAnimationFrame": (_, delta)=>{
            if (reduceMotion || !onScreen.current) return;
            const dt = Math.min(delta, 50) / 1000; // clamp: tab-switch shouldn't lurch
            if (!dragging.current) {
                if (Math.abs(velocity.current) > 1) {
                    offset.current += velocity.current * dt;
                    velocity.current *= Math.exp(-FRICTION * dt);
                } else {
                    velocity.current = 0;
                    offset.current += DRIFT * dt;
                }
            }
            paint();
        }
    }["CylinderCarousel.useAnimationFrame"]);
    /* --- grab & flick ------------------------------------------------------
     Pointer capture rather than window listeners: the gesture keeps working
     if the pointer leaves the panel mid-drag, and cleans itself up. */ const last = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        y: 0,
        t: 0
    });
    const onPointerDown = (e)=>{
        if (reduceMotion || e.pointerType === "touch") return; // let touch scroll the page
        e.currentTarget.setPointerCapture?.(e.pointerId);
        dragging.current = true;
        velocity.current = 0;
        last.current = {
            y: e.clientY,
            t: performance.now()
        };
    };
    const onPointerMove = (e)=>{
        if (!dragging.current) return;
        const now = performance.now();
        const dy = e.clientY - last.current.y;
        const dt = Math.max(now - last.current.t, 1) / 1000;
        // Drag down = wheel rolls down = earlier photos come back.
        offset.current -= dy;
        velocity.current = -dy / dt;
        last.current = {
            y: e.clientY,
            t: now
        };
        paint();
    };
    const endDrag = (e)=>{
        if (!dragging.current) return;
        if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
        dragging.current = false;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: viewportRef,
        className: `relative select-none ${reduceMotion ? "" : "cursor-grab active:cursor-grabbing"} ${className ?? ""}`,
        style: {
            perspective: `${perspective.toFixed(0)}px`,
            perspectiveOrigin: "50% 50%"
        },
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: endDrag,
        onPointerCancel: endDrag,
        ...label ? {
            role: "group",
            "aria-label": label
        } : {
            "aria-hidden": true
        },
        children: tiles.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: (el)=>{
                    tileRefs.current[i] = el;
                },
                className: "absolute left-1/2 top-1/2 overflow-hidden rounded-[8px] bg-black/5",
                style: {
                    width: cardWidth,
                    height: cardHeight,
                    willChange: "transform, opacity"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: img.src,
                    alt: img.alt ?? "",
                    draggable: false,
                    loading: i < images.length ? "eager" : "lazy",
                    decoding: "async",
                    className: "pointer-events-none size-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/components/motion/CylinderCarousel.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this)
            }, `${img.src}-${i}`, false, {
                fileName: "[project]/components/motion/CylinderCarousel.tsx",
                lineNumber: 210,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/motion/CylinderCarousel.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
_s(CylinderCarousel, "CosKenaaqPz1uzKZ79k4PD+57PY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$animation$2d$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"]
    ];
});
_c = CylinderCarousel;
var _c;
__turbopack_context__.k.register(_c, "CylinderCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/motion/Reveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Reveal({ children, delay = 0, y = 20, className = "", style, immediate = false }) {
    _s();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    if (reduceMotion) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: style,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/motion/Reveal.tsx",
        lineNumber: 37,
        columnNumber: 7
    }, this);
    const shown = {
        opacity: 1,
        y: 0
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
        className: className,
        style: style,
        initial: {
            opacity: 0,
            y
        },
        ...immediate ? {
            animate: shown
        } : {
            whileInView: shown,
            viewport: {
                once: true,
                margin: "-12% 0px -12% 0px"
            }
        },
        transition: {
            duration: 0.6,
            delay,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/motion/Reveal.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(Reveal, "yAKkJs7CtWSNDV8HpmqLOOhKJtw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = Reveal;
var _c;
__turbopack_context__.k.register(_c, "Reveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/projects.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PROJECTS",
    ()=>PROJECTS
]);
const PROJECTS = [
    {
        id: "kora",
        title: "Kora",
        year: "2026",
        description: "A career exploration app focused on self-discovery of users. Won 3rd place in India's first AI-focused designathon.",
        tags: [
            "Designathon",
            "Developed"
        ],
        image: "/assets/landing/final/kora-thumbnail.webp"
    },
    {
        id: "design-system",
        title: "Design System",
        year: "2026",
        description: "Built high-quality Figma components with variables for faster project setup and maintenance.",
        tags: [
            "Atomic DS",
            "Tokenization"
        ],
        image: "/assets/landing/final/design-system-thumbnail.webp",
        comingSoon: true
    },
    {
        id: "sahayak",
        title: "Sahayak",
        year: "2025",
        description: "An accessible smartphone user interface for elderly and low-literacy users using voice modality, and AI support.",
        tags: [
            "Side Project"
        ],
        image: "/assets/landing/final/sahayak-thumbnail.webp",
        comingSoon: true
    },
    {
        id: "dyslexiar",
        title: "DyslexiAR",
        year: "2024",
        description: "An AR learning tool using game-like phonics practice to make dyslexia assessment less stressful for children.",
        tags: [
            "Augmented Reality"
        ],
        image: "/assets/landing/final/dyslexiar-thumbnail.webp"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/work/ProjectCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ProjectCard({ project, fixed = true }) {
    _s();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const live = !project.comingSoon;
    const media = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative w-full flex-1 overflow-hidden rounded-[12px] bg-black/[0.04] ${fixed ? "" : "aspect-[502/302]"}`,
        children: project.video ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    className: `absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:hidden motion-reduce:transition-none ${live ? "group-hover:scale-[1.04]" : ""}`,
                    src: project.video,
                    poster: project.image,
                    autoPlay: true,
                    loop: true,
                    muted: true,
                    playsInline: true,
                    preload: "none",
                    "aria-label": `${project.title} preview`
                }, void 0, false, {
                    fileName: "[project]/components/work/ProjectCard.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: project.image,
                    alt: "",
                    fill: true,
                    sizes: "(max-width: 1024px) 100vw, 502px",
                    className: "hidden object-cover motion-reduce:block"
                }, void 0, false, {
                    fileName: "[project]/components/work/ProjectCard.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: project.image,
            alt: `${project.title} preview`,
            fill: true,
            sizes: "(max-width: 1024px) 100vw, 502px",
            className: `object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${live ? "group-hover:scale-[1.04]" : ""}`
        }, void 0, false, {
            fileName: "[project]/components/work/ProjectCard.tsx",
            lineNumber: 58,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/work/ProjectCard.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
    const card = /* Media quietly pushes in on hover — the card is the target, the zoom just
       confirms it's live. */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].article, {
        className: `group flex flex-col justify-center rounded-[14px] bg-plate p-[24px] shadow-paper ${fixed ? "h-[492px] w-[550px]" : "w-full"}`,
        whileHover: reduceMotion || !live ? undefined : {
            y: -8
        },
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 28
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full flex-1 flex-col gap-[24px]",
            children: [
                media,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-full shrink-0 flex-col gap-[18px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-full flex-col gap-[12px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex w-full items-center justify-between gap-4 leading-[22px] tracking-[-0.408px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-display -my-[10px] truncate py-[10px] text-[26px] text-black",
                                            children: project.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/work/ProjectCard.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-script shrink-0 text-[18px] text-ink-muted",
                                            children: project.year
                                        }, void 0, false, {
                                            fileName: "[project]/components/work/ProjectCard.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/work/ProjectCard.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "w-full text-[16px] leading-[20px] text-ink-muted",
                                    children: project.description
                                }, void 0, false, {
                                    fileName: "[project]/components/work/ProjectCard.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/work/ProjectCard.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "flex items-center gap-[8px]",
                            children: project.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "rounded-[4px] bg-chip-bg px-[8px] py-[4px] text-[14px] font-medium capitalize tracking-[0.035px] text-chip-text",
                                    children: tag
                                }, tag, false, {
                                    fileName: "[project]/components/work/ProjectCard.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/work/ProjectCard.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/work/ProjectCard.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/work/ProjectCard.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/work/ProjectCard.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
    if (!live) {
        return(/* Not a link and not focusable: there is nowhere to go yet. The caption
         carries the state for pointer users; the visually-hidden note carries
         the same thing for everyone else. */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "block",
            "data-cursor": "label",
            "data-cursor-text": "Coming soon",
            children: [
                card,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: [
                        project.title,
                        " — case study coming soon"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/work/ProjectCard.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/work/ProjectCard.tsx",
            lineNumber: 122,
            columnNumber: 7
        }, this));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/work/${project.id}`,
        className: "block",
        "aria-label": `${project.title} — view case study`,
        "data-cursor": "label",
        "data-cursor-text": "View case study",
        children: card
    }, void 0, false, {
        fileName: "[project]/components/work/ProjectCard.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s(ProjectCard, "yAKkJs7CtWSNDV8HpmqLOOhKJtw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = ProjectCard;
var _c;
__turbopack_context__.k.register(_c, "ProjectCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/work/ProjectGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/projects.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$work$2f$ProjectCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/work/ProjectCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/* Grid geometry — Figma 569:566. Two rows of two 550x492 cards with a 60px
   gutter both ways, on an 1160x1044 canvas. */ const CARD_W = 550;
const CARD_H = 492;
const GUTTER = 60;
const COLS = 2;
const W = COLS * CARD_W + (COLS - 1) * GUTTER; // 1160
const ROWS = Math.ceil(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROJECTS"].length / COLS);
const H = ROWS * CARD_H + (ROWS - 1) * GUTTER; // 1044
const slot = (i)=>({
        left: i % COLS * (CARD_W + GUTTER),
        top: Math.floor(i / COLS) * (CARD_H + GUTTER)
    });
/**
 * The four cards arrive as one compact stack in the middle of the grid, sit
 * there for a beat, then open out to their places — the Cindy Ly work-section
 * treatment. Plays once per page load, when the section scrolls into view.
 *
 * HOLD is the length of that beat — long enough to register "a stack of work"
 * before it resolves, short enough that a scrolling visitor isn't left looking
 * at four unlabelled cards.
 */ const HOLD = 1;
function ProjectGrid() {
    _s();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const spread = (i)=>({
            type: "spring",
            stiffness: 150,
            damping: 21,
            delay: HOLD + i * 0.07
        });
    const card = {
        hidden: (i)=>{
            const { left, top } = slot(i);
            return {
                x: W / 2 - (left + CARD_W / 2),
                y: H / 2 - (top + CARD_H / 2),
                // Compact enough to read as a pile of work, not four cards overlapping.
                scale: 0.58,
                opacity: 0,
                rotate: [
                    -4,
                    2.5,
                    -1.5,
                    4
                ][i % 4]
            };
        },
        /* Two beats: the pile fades in at the centre almost at once, holds, then
       every card springs to its slot (scale riding along so the pile also
       grows as it fans). */ visible: (i)=>({
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: {
                    opacity: {
                        duration: 0.35,
                        delay: i * 0.06
                    },
                    x: spread(i),
                    y: spread(i),
                    scale: spread(i),
                    rotate: spread(i)
                }
            })
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                className: "relative hidden lg:block",
                style: {
                    width: W,
                    height: H
                },
                initial: reduceMotion ? false : "hidden",
                whileInView: "visible",
                viewport: {
                    once: true,
                    amount: 0.2
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROJECTS"].map((p, i)=>/* Each layer is positioned at the card's slot and transformed back
             to the centre, so the spring animates a pure transform — no
             layout thrash, and the stacking order stays the DOM order. */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                        className: "absolute",
                        style: slot(i),
                        custom: i,
                        variants: card,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$work$2f$ProjectCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            project: p
                        }, void 0, false, {
                            fileName: "[project]/components/work/ProjectGrid.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this)
                    }, p.id, false, {
                        fileName: "[project]/components/work/ProjectGrid.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/work/ProjectGrid.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-10 px-5 lg:hidden",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROJECTS"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$work$2f$ProjectCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        project: p,
                        fixed: false
                    }, p.id, false, {
                        fileName: "[project]/components/work/ProjectGrid.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/work/ProjectGrid.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ProjectGrid, "yAKkJs7CtWSNDV8HpmqLOOhKJtw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = ProjectGrid;
var _c;
__turbopack_context__.k.register(_c, "ProjectGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/motion/useMagnetic.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMagnetic",
    ()=>useMagnetic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useMagnetic(strength = 0.35) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const sx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(x, {
        stiffness: 260,
        damping: 22,
        mass: 0.4
    });
    const sy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(y, {
        stiffness: 260,
        damping: 22,
        mass: 0.4
    });
    const onPointerMove = (e)=>{
        if (reduceMotion || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onPointerLeave = ()=>{
        x.set(0);
        y.set(0);
    };
    return {
        ref,
        x: sx,
        y: sy,
        onPointerMove,
        onPointerLeave,
        enabled: !reduceMotion
    };
}
_s(useMagnetic, "VWIY5ME7IStpHapnllvpGCmshqA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/collage/CollageItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CollageItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$motion$2f$useMagnetic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/motion/useMagnetic.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function padStyle(pad) {
    if (!pad) return undefined;
    if ("x" in pad) return {
        padding: `${pad.y}px ${pad.x}px`
    };
    return {
        padding: `${pad.top}px ${pad.right}px ${pad.bottom}px ${pad.left}px`
    };
}
function CollageItem({ item, index, pointer, dealFrom, dealt = false, drag = false, dragConstraints }) {
    _s();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const magnetic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$motion$2f$useMagnetic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMagnetic"])(item.magnetic ?? 0);
    const depth = item.depth ?? 1;
    const dragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    /* Drag attaches only after hydration: framer serialises drag styles
     (touch-action etc.) differently on the server, which trips React's
     hydration diff. First client render must match the SSR HTML. */ const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CollageItem.useEffect": ()=>setMounted(true)
    }["CollageItem.useEffect"], []);
    /* Deeper objects travel further, which separates the collage into planes.
     Aug 2026: the travel was halved (9/6 -> 5/3.4). At the old amplitude the
     whole desk swam with the pointer, which pulled attention off the heading
     and made the stickers feel weightless; the parallax should be something
     you notice on the second look, not the first. */ const fallback = useMotionValueFallback();
    const px = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(pointer?.nx ?? fallback, [
        -1,
        1
    ], [
        depth * 5,
        -depth * 5
    ]);
    const py = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(pointer?.ny ?? fallback, [
        -1,
        1
    ], [
        depth * 3.4,
        -depth * 3.4
    ]);
    const interactive = Boolean(item.cursor || item.href);
    // Offset from this object's centre back to the deal-out origin.
    const deal = dealFrom ? {
        x: dealFrom.x - (item.box.left + item.box.width / 2),
        y: dealFrom.y - (item.box.top + item.box.height / 2)
    } : null;
    const canDrag = drag && mounted && !reduceMotion;
    const image = // eslint-disable-next-line @next/next/no-img-element
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: item.src,
        alt: item.alt,
        draggable: false,
        loading: index < 8 ? "eager" : "lazy",
        className: "pointer-events-none size-full select-none object-contain",
        style: padStyle(item.pad)
    }, void 0, false, {
        fileName: "[project]/components/collage/CollageItem.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
    const Wrapper = item.href ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].a : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div;
    /* NOTE: `dealt`/`reduceMotion` must NOT change `initial` — the server and
     the first client render have to produce identical inline styles or React
     flags a hydration mismatch. They only zero out the transition instead,
     so the entrance snaps rather than plays. */ const entrance = deal ? {
        opacity: 0,
        x: deal.x,
        y: deal.y,
        scale: 0.5,
        rotate: index % 2 ? 7 : -7
    } : {
        opacity: 0,
        y: 26,
        scale: 0.92,
        rotate: item.idle ? 0 : -2.5
    };
    const skip = dealt || reduceMotion;
    /* Deal-out springs are softer than the drop-in so the fan-out reads as one
     orchestrated motion; the stagger is what sells the "opening up". */ const spring = skip ? {
        duration: 0
    } : deal ? {
        type: "spring",
        stiffness: 170,
        damping: 22
    } : {
        type: "spring",
        stiffness: 220,
        damping: 20
    };
    const delay = skip ? 0 : deal ? 0.25 + index * 0.06 : 0.15 + index * 0.05;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
        className: "absolute",
        style: {
            left: item.box.left,
            top: item.box.top,
            width: item.box.width,
            height: item.box.height,
            x: pointer && !reduceMotion ? px : 0,
            y: pointer && !reduceMotion ? py : 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
            className: `size-full ${canDrag ? "cursor-grab active:cursor-grabbing" : ""}`,
            initial: entrance,
            animate: item.idle && !reduceMotion ? {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotate: [
                    0,
                    2,
                    0,
                    -2,
                    0
                ]
            } : {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0
            },
            transition: item.idle && !reduceMotion ? {
                opacity: {
                    delay,
                    duration: skip ? 0 : 0.5
                },
                x: {
                    delay,
                    ...spring
                },
                y: {
                    delay,
                    ...spring
                },
                scale: {
                    delay,
                    ...spring
                },
                rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                }
            } : {
                delay,
                ...spring,
                opacity: {
                    delay,
                    duration: skip ? 0 : 0.5
                }
            },
            drag: canDrag,
            dragConstraints: dragConstraints,
            dragElastic: 0.18,
            dragTransition: {
                power: 0.25,
                timeConstant: 180
            },
            whileDrag: {
                scale: 1.07,
                rotate: 0,
                zIndex: 30
            },
            onDragStart: ()=>dragging.current = true,
            onDragEnd: ()=>setTimeout(()=>dragging.current = false, 0),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wrapper, {
                ...item.href ? {
                    href: item.href,
                    target: "_blank",
                    rel: "noreferrer noopener",
                    "aria-label": item.alt
                } : {},
                ref: magnetic.ref,
                onPointerMove: item.magnetic ? magnetic.onPointerMove : undefined,
                onPointerLeave: item.magnetic ? magnetic.onPointerLeave : undefined,
                onClickCapture: item.href ? (e)=>{
                    // A flick is not a click — don't follow the link after a drag.
                    if (dragging.current) e.preventDefault();
                } : undefined,
                className: "block size-full",
                style: {
                    rotate: item.rotate ?? 0,
                    x: item.magnetic ? magnetic.x : 0,
                    y: item.magnetic ? magnetic.y : 0
                },
                whileHover: interactive && !reduceMotion ? {
                    scale: 1.04,
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }
                } : undefined,
                ...item.cursor ? {
                    "data-cursor": "label",
                    "data-cursor-text": item.cursor
                } : {},
                children: image
            }, void 0, false, {
                fileName: "[project]/components/collage/CollageItem.tsx",
                lineNumber: 153,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/collage/CollageItem.tsx",
            lineNumber: 126,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/collage/CollageItem.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s(CollageItem, "cnA5+fPAVCE31dweAt+44OK9d+w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$motion$2f$useMagnetic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMagnetic"],
        useMotionValueFallback,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = CollageItem;
/** A constant motion value, so the hooks below always run in the same order. */ function useMotionValueFallback() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
}
_s1(useMotionValueFallback, "EAmhqxMjACPPPqtmeMuaTuG1SiM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"]
    ];
});
var _c;
__turbopack_context__.k.register(_c, "CollageItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/SwashText.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A display line whose opening capital is set in the swash face (Amoresa)
 * while the rest stays in PP Editorial Old — the Figma treatment for both
 * "Product & Visual Designer" and "Feel free to connect for cool projects".
 *
 * Doing the split here rather than at each call site keeps the two lines
 * consistent and keeps the markup a single accessible string: the swash is a
 * `<span>` inside the heading, not a separate element, so screen readers and
 * text selection still see one word.
 *
 * Amoresa's capitals carry a long entry tail, so the character that follows
 * needs positive tracking to clear it. That value differs per glyph (the P's
 * tail is short, the F's is long), hence `swashTracking`.
 */ __turbopack_context__.s([
    "default",
    ()=>SwashText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SwashText({ text, swashTracking = "2.8px", className }) {
    const [first, ...restChars] = [
        ...text
    ];
    const rest = restChars.join("");
    const lines = rest.split("\n");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-swash",
                style: {
                    letterSpacing: swashTracking
                },
                children: first
            }, void 0, false, {
                fileName: "[project]/components/layout/SwashText.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            lines.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/layout/SwashText.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this),
                        line
                    ]
                }, i, true, {
                    fileName: "[project]/components/layout/SwashText.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/SwashText.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = SwashText;
var _c;
__turbopack_context__.k.register(_c, "SwashText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/collage-landing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hero collage — geometry from Figma frame 538:4602 "Landing page"
 * (page "Final version", August 2026 revision).
 *
 * The keepsakes survived the redesign but shrank by roughly a third, and the
 * postmark and yellow flower were dropped: eight objects, not ten. Smaller
 * stickers leave the heading room to be the loudest thing on the page, which
 * it wasn't before.
 *
 * ARRAY ORDER IS PAINT ORDER (bottom → top), taken 1:1 from the Figma layer
 * stack. DOM order does the layering, so no z-index juggling.
 *
 * `box` is each object's UNROTATED footprint, derived from its Figma centre
 * (absoluteBoundingBox mid-point) rather than its x/y, because Figma reports
 * the rotated origin and CSS rotates about the centre — using x/y directly
 * would drift the tilted objects by up to ~30px.
 *
 * `rotate` is CSS-positive (clockwise) = negated Figma rotation.
 *
 * Moving an object = editing one line here.
 */ __turbopack_context__.s([
    "HERO_CENTER",
    ()=>HERO_CENTER,
    "HERO_GROUP",
    ()=>HERO_GROUP,
    "HERO_ITEMS",
    ()=>HERO_ITEMS
]);
const HERO_GROUP = {
    left: 0,
    top: 0,
    width: 1440,
    height: 939
};
const HERO_CENTER = {
    x: 720,
    y: 420
};
const HERO_ITEMS = [
    /* ---- bottom of the stack ---- */ {
        id: "camera",
        src: "/assets/landing/new-ver/55-1.webp",
        alt: "Film camera",
        box: {
            left: 1151,
            top: 236,
            width: 116,
            height: 102
        },
        cursor: "say cheese",
        depth: 1
    },
    {
        id: "flower-pink",
        src: "/assets/landing/new-ver/55-2.webp",
        alt: "",
        box: {
            left: 102.8,
            top: 153.1,
            width: 91.8,
            height: 80.8
        },
        rotate: -2.7,
        cursor: "pressed & kept",
        idle: true,
        depth: 1.3
    },
    {
        id: "cloud",
        src: "/assets/landing/new-ver/55-3.webp",
        alt: "",
        box: {
            left: 345,
            top: 175,
            width: 81,
            height: 65
        },
        cursor: "head in the clouds",
        idle: true,
        depth: 1.2
    },
    {
        id: "headphones",
        src: "/assets/landing/new-ver/55-4.webp",
        alt: "Headphones",
        box: {
            left: 1059.5,
            top: 584.5,
            width: 131.3,
            height: 126.4
        },
        rotate: 21.3,
        cursor: "on loop",
        depth: 0.8
    },
    {
        id: "latte",
        src: "/assets/landing/new-ver/55-5.webp",
        alt: "Latte with heart art",
        box: {
            left: 1222,
            top: 445,
            width: 111,
            height: 108
        },
        cursor: "my fuel",
        depth: 1.2
    },
    {
        id: "cat",
        src: "/assets/landing/new-ver/56-1.webp",
        alt: "Milo the cat",
        box: {
            left: 239,
            top: 610,
            width: 115,
            height: 120
        },
        cursor: "milo",
        depth: 0.9
    },
    {
        id: "polaroid-beach",
        src: "/assets/landing/new-ver/56-2.webp",
        alt: "Polaroid photo taken at the beach",
        box: {
            left: 941.2,
            top: 140.8,
            width: 87.4,
            height: 91.5
        },
        rotate: -11.4,
        cursor: "long time no sea",
        depth: 0.7
    },
    /* ---- top of the stack ---- */ {
        id: "heart",
        src: "/assets/landing/new-ver/56-3.webp",
        alt: "",
        box: {
            left: 157.5,
            top: 436.1,
            width: 76.3,
            height: 79.9
        },
        rotate: -10.1,
        cursor: "made with love",
        depth: 1.1
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/collage/HeroCollage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroCollage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$MotionConfig$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$collage$2f$CollageItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/collage/CollageItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$SwashText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/SwashText.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collage$2d$landing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/collage-landing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ScaledStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/ScaledStage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
/** The deal-out plays once per visit — returning from a case study should
 *  feel instant, not make the visitor sit through the intro again. */ const DEALT_KEY = "hero-dealt";
const META = [
    "designing",
    "tinkering",
    "drinking coffee"
];
function HeroCollage({ variant = "desktop" }) {
    _s();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ScaledStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStageScale"])();
    const deskRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const nx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const ny = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const sx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(nx, {
        stiffness: 50,
        damping: 20,
        mass: 0.6
    });
    const sy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(ny, {
        stiffness: 50,
        damping: 20,
        mass: 0.6
    });
    // Read once on the client; the server renders the pre-deal state either way.
    const [dealt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "HeroCollage.useState": ()=>("TURBOPACK compile-time value", "object") !== "undefined" && sessionStorage.getItem(DEALT_KEY) === "1"
    }["HeroCollage.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCollage.useEffect": ()=>{
            sessionStorage.setItem(DEALT_KEY, "1");
        }
    }["HeroCollage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCollage.useEffect": ()=>{
            if (reduceMotion) return;
            const onMove = {
                "HeroCollage.useEffect.onMove": (e)=>{
                    nx.set(e.clientX / window.innerWidth * 2 - 1);
                    ny.set(e.clientY / window.innerHeight * 2 - 1);
                }
            }["HeroCollage.useEffect.onMove"];
            window.addEventListener("pointermove", onMove, {
                passive: true
            });
            return ({
                "HeroCollage.useEffect": ()=>window.removeEventListener("pointermove", onMove)
            })["HeroCollage.useEffect"];
        }
    }["HeroCollage.useEffect"], [
        nx,
        ny,
        reduceMotion
    ]);
    if (variant === "mobile") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroMobile, {}, void 0, false, {
        fileName: "[project]/components/collage/HeroCollage.tsx",
        lineNumber: 42,
        columnNumber: 36
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Introduction",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$MotionConfig$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfig"], {
                transformPagePoint: (p)=>({
                        x: p.x / scale,
                        y: p.y / scale
                    }),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: deskRef,
                    className: "absolute",
                    style: {
                        left: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collage$2d$landing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_GROUP"].left,
                        top: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collage$2d$landing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_GROUP"].top,
                        width: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collage$2d$landing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_GROUP"].width,
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collage$2d$landing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_GROUP"].height
                    },
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collage$2d$landing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_ITEMS"].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$collage$2f$CollageItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            item: item,
                            index: i,
                            pointer: {
                                nx: sx,
                                ny: sy
                            },
                            dealFrom: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collage$2d$landing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HERO_CENTER"],
                            dealt: dealt,
                            drag: true,
                            dragConstraints: deskRef
                        }, item.id, false, {
                            fileName: "[project]/components/collage/HeroCollage.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/collage/HeroCollage.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/collage/HeroCollage.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute left-[465px] top-[307px] z-10 w-[511px] px-[36px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wordmark, {}, void 0, false, {
                    fileName: "[project]/components/collage/HeroCollage.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/collage/HeroCollage.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/collage/HeroCollage.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(HeroCollage, "GUHYA1RiHin6haDVhTg9OO5rl1o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ScaledStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStageScale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c = HeroCollage;
function Wordmark({ mobile = false }) {
    _s1();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const rise = (delay)=>({
            initial: reduceMotion ? false : {
                opacity: 0,
                y: 12
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                delay,
                duration: 0.6,
                ease: [
                    0.23,
                    1,
                    0.32,
                    1
                ]
            }
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col items-center justify-center ${mobile ? "gap-[18px]" : "gap-[24px]"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].p, {
                className: `text-center font-medium uppercase text-ink-muted ${mobile ? "text-[14px] tracking-[-0.14px]" : "text-[20px] tracking-[-0.2px]"}`,
                ...rise(0.1),
                children: "Ciao! aastha here"
            }, void 0, false, {
                fileName: "[project]/components/collage/HeroCollage.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-[16px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].h1, {
                        className: `font-display text-center text-black ${mobile ? "text-[38px] leading-[48px] tracking-[-0.76px]" : "text-[56px] leading-[72px] tracking-[-1.12px]"}`,
                        ...rise(0.2),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$SwashText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            text: "Product &\nVisual Designer",
                            swashTracking: mobile ? "1.9px" : "2.8px"
                        }, void 0, false, {
                            fileName: "[project]/components/collage/HeroCollage.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/collage/HeroCollage.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                        className: "flex items-center justify-center gap-[12px]",
                        ...rise(0.45),
                        children: META.map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-[12px]",
                                children: [
                                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": true,
                                        className: "size-[6px] shrink-0 rounded-full bg-ink-muted"
                                    }, void 0, false, {
                                        fileName: "[project]/components/collage/HeroCollage.tsx",
                                        lineNumber: 120,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-center font-medium uppercase text-ink-muted ${mobile ? "text-[11px]" : "text-[20px]"}`,
                                        children: word
                                    }, void 0, false, {
                                        fileName: "[project]/components/collage/HeroCollage.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, word, true, {
                                fileName: "[project]/components/collage/HeroCollage.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/collage/HeroCollage.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/collage/HeroCollage.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/collage/HeroCollage.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s1(Wordmark, "yAKkJs7CtWSNDV8HpmqLOOhKJtw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c1 = Wordmark;
/** Purpose-built small-screen hero: a curated six from the keepsakes rather
    than all eight, scattered around the type instead of behind it. */ const MOBILE_PICKS = [
    {
        id: "polaroid-beach",
        src: "/assets/landing/new-ver/56-2.webp",
        w: 84,
        cls: "right-[2%] top-[4%] rotate-3"
    },
    {
        id: "heart",
        src: "/assets/landing/new-ver/56-3.webp",
        w: 68,
        cls: "left-[-2%] top-[8%] -rotate-6"
    },
    {
        id: "cat",
        src: "/assets/landing/new-ver/56-1.webp",
        w: 84,
        cls: "left-[-4%] bottom-[10%] -rotate-3"
    },
    {
        id: "headphones",
        src: "/assets/landing/new-ver/55-4.webp",
        w: 96,
        cls: "right-[-6%] bottom-[8%] rotate-6"
    },
    {
        id: "latte",
        src: "/assets/landing/new-ver/55-5.webp",
        w: 62,
        cls: "right-[14%] top-[40%] rotate-6"
    },
    {
        id: "flower-pink",
        src: "/assets/landing/new-ver/55-2.webp",
        w: 58,
        cls: "left-[12%] top-[38%] rotate-12"
    }
];
function HeroMobile() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Introduction",
        className: "relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative mx-auto flex min-h-[74vh] max-w-[560px] flex-col items-center justify-center px-5 pb-12 pt-28",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-hidden": true,
                    className: "pointer-events-none absolute inset-0",
                    children: MOBILE_PICKS.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].img, {
                            src: o.src,
                            alt: "",
                            initial: {
                                opacity: 0,
                                scale: 0.9
                            },
                            animate: {
                                opacity: 0.92,
                                scale: 1
                            },
                            transition: {
                                delay: 0.1 + i * 0.06,
                                duration: 0.5
                            },
                            className: `absolute object-contain ${o.cls}`,
                            style: {
                                width: o.w
                            }
                        }, o.id, false, {
                            fileName: "[project]/components/collage/HeroCollage.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/collage/HeroCollage.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wordmark, {
                        mobile: true
                    }, void 0, false, {
                        fileName: "[project]/components/collage/HeroCollage.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/collage/HeroCollage.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/collage/HeroCollage.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/collage/HeroCollage.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_c2 = HeroMobile;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HeroCollage");
__turbopack_context__.k.register(_c1, "Wordmark");
__turbopack_context__.k.register(_c2, "HeroMobile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/motion/DotGridMouse.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DotGridMouse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ScaledStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/ScaledStage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/**
 * The footer dot field, made alive: each dot leans toward the cursor with a
 * distance falloff and eases back when it leaves (the kokonutui
 * mouse-effect-card idea, drawn on one canvas instead of hundreds of DOM
 * nodes — a 1440x618 field is ~1000 dots, which would jank as elements).
 *
 * Matches .bg-grid-dots exactly when at rest: 30px grid, 1.6px #cfcfcf dots,
 * fading in toward the bottom. Under prefers-reduced-motion (or no pointer)
 * it simply renders that static field.
 */ const SPACING = 30;
const RADIUS = 1.6;
const COLOR = {
    r: 0xcf,
    g: 0xcf,
    b: 0xcf
};
const PULL = 16; // max displacement toward the cursor, px
const SIGMA = 110; // falloff radius of the cursor's influence
const EASE = 0.14; // per-frame lerp toward the target displacement
function DotGridMouse({ className = "", style, fullBleed = false }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ScaledStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStageScale"])();
    const bleedStyle = fullBleed ? {
        left: "50%",
        transform: "translateX(-50%)",
        width: `calc(100vw / ${scale})`
    } : {};
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DotGridMouse.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            let width = 0;
            let height = 0;
            let dots = [];
            let raf = 0;
            let running = false;
            let visible = true;
            const mouse = {
                x: -1e4,
                y: -1e4
            };
            const build = {
                "DotGridMouse.useEffect.build": ()=>{
                    const rect = canvas.getBoundingClientRect();
                    width = Math.round(canvas.offsetWidth);
                    height = Math.round(canvas.offsetHeight);
                    const dpr = Math.min(window.devicePixelRatio || 1, 2) * (rect.width ? rect.width / width : 1);
                    canvas.width = Math.round(width * dpr);
                    canvas.height = Math.round(height * dpr);
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    dots = [];
                    for(let y = SPACING / 2; y < height; y += SPACING){
                        // Same vertical fade as the CSS band: invisible on top, full at bottom.
                        const t = y / height;
                        const a = t < 0.45 ? t / 0.45 * 0.3 : 0.3 + (t - 0.45) / 0.55 * 0.7;
                        for(let x = SPACING / 2; x < width; x += SPACING){
                            dots.push({
                                x,
                                y,
                                dx: 0,
                                dy: 0,
                                a
                            });
                        }
                    }
                    draw();
                }
            }["DotGridMouse.useEffect.build"];
            const draw = {
                "DotGridMouse.useEffect.draw": ()=>{
                    ctx.clearRect(0, 0, width, height);
                    for (const d of dots){
                        ctx.beginPath();
                        ctx.fillStyle = `rgba(${COLOR.r},${COLOR.g},${COLOR.b},${d.a})`;
                        ctx.arc(d.x + d.dx, d.y + d.dy, RADIUS, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }["DotGridMouse.useEffect.draw"];
            const tick = {
                "DotGridMouse.useEffect.tick": ()=>{
                    let settled = true;
                    for (const d of dots){
                        const mx = mouse.x - d.x;
                        const my = mouse.y - d.y;
                        const dist2 = mx * mx + my * my;
                        const falloff = Math.exp(-dist2 / (2 * SIGMA * SIGMA));
                        const dist = Math.sqrt(dist2) || 1;
                        const tx = mx / dist * PULL * falloff;
                        const ty = my / dist * PULL * falloff;
                        d.dx += (tx - d.dx) * EASE;
                        d.dy += (ty - d.dy) * EASE;
                        if (settled && Math.abs(d.dx - tx) + Math.abs(d.dy - ty) > 0.05) settled = false;
                    }
                    draw();
                    if (visible && !settled) {
                        raf = requestAnimationFrame(tick);
                    } else {
                        running = false;
                    }
                }
            }["DotGridMouse.useEffect.tick"];
            const wake = {
                "DotGridMouse.useEffect.wake": ()=>{
                    if (!running && visible && !reduceMotion) {
                        running = true;
                        raf = requestAnimationFrame(tick);
                    }
                }
            }["DotGridMouse.useEffect.wake"];
            const onMove = {
                "DotGridMouse.useEffect.onMove": (e)=>{
                    const rect = canvas.getBoundingClientRect();
                    // The stage may be CSS-scaled: map screen px back into canvas px.
                    const s = rect.width / width || 1;
                    mouse.x = (e.clientX - rect.left) / s;
                    mouse.y = (e.clientY - rect.top) / s;
                    wake();
                }
            }["DotGridMouse.useEffect.onMove"];
            const onLeave = {
                "DotGridMouse.useEffect.onLeave": ()=>{
                    mouse.x = -1e4;
                    mouse.y = -1e4;
                    wake();
                }
            }["DotGridMouse.useEffect.onLeave"];
            const io = new IntersectionObserver({
                "DotGridMouse.useEffect": ([entry])=>{
                    visible = entry.isIntersecting;
                    if (visible) wake();
                }
            }["DotGridMouse.useEffect"]);
            io.observe(canvas);
            const ro = new ResizeObserver(build);
            ro.observe(canvas);
            build();
            if (!reduceMotion) {
                window.addEventListener("pointermove", onMove, {
                    passive: true
                });
                window.addEventListener("pointerleave", onLeave);
            }
            return ({
                "DotGridMouse.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    io.disconnect();
                    ro.disconnect();
                    window.removeEventListener("pointermove", onMove);
                    window.removeEventListener("pointerleave", onLeave);
                }
            })["DotGridMouse.useEffect"];
        }
    }["DotGridMouse.useEffect"], [
        reduceMotion
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        "aria-hidden": true,
        className: `block ${className}`,
        style: {
            ...style,
            ...bleedStyle
        }
    }, void 0, false, {
        fileName: "[project]/components/motion/DotGridMouse.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_s(DotGridMouse, "XjFaqTFQGrrnJnyAOWnRfOEnlOk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ScaledStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStageScale"]
    ];
});
_c = DotGridMouse;
var _c;
__turbopack_context__.k.register(_c, "DotGridMouse");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/motion/FooterMotion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FooterMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function FooterMotion({ children, style, className = "", rotate = -1.02 }) {
    _s();
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    if (reduceMotion) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            ...style,
            transform: `rotate(${rotate}deg)`
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/motion/FooterMotion.tsx",
        lineNumber: 25,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
        className: className,
        style: style,
        /* Rises further, over-rotated and slightly small, then spring-settles
         into its resting tilt — a postcard tossed onto the desk rather than
         a block fading in. */ initial: {
            opacity: 0,
            y: 84,
            rotate: rotate - 2.4,
            scale: 0.975
        },
        whileInView: {
            opacity: 1,
            y: 0,
            rotate,
            scale: 1
        },
        viewport: {
            once: true,
            amount: 0.3
        },
        transition: {
            opacity: {
                duration: 0.4
            },
            default: {
                type: "spring",
                stiffness: 90,
                damping: 13,
                mass: 0.9
            }
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/motion/FooterMotion.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(FooterMotion, "yAKkJs7CtWSNDV8HpmqLOOhKJtw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = FooterMotion;
var _c;
__turbopack_context__.k.register(_c, "FooterMotion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1yh25xm._.js.map