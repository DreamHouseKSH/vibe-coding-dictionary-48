// Project rules, not an official shadcn plugin or certification.
export default {
  "use-ui-primitives": {
    meta: {
      type: "problem",
      schema: [],
      messages: {
        native: "Use the canonical shadcn/ui wrapper for this form control.",
      },
    },
    create(context) {
      return {
        JSXOpeningElement(node) {
          if (
            node.name.type === "JSXIdentifier" &&
            ["button", "input", "textarea", "select"].includes(node.name.name)
          )
            context.report({ node, messageId: "native" });
        },
      };
    },
  },
  "canonical-ui-imports": {
    meta: {
      type: "problem",
      schema: [],
      messages: {
        path: "Import UI components from @/components/ui/<component>.",
      },
    },
    create(context) {
      return {
        ImportDeclaration(node) {
          const s = node.source.value;
          if (
            typeof s === "string" &&
            ((s.includes("components/ui/") &&
              !/^@\/components\/ui\/[^/]+$/.test(s)) ||
              s.startsWith("@radix-ui/") ||
              s === "radix-ui")
          )
            context.report({ node, messageId: "path" });
        },
      };
    },
  },
  "dialog-description": {
    meta: {
      type: "problem",
      schema: [],
      messages: {
        description:
          "DialogContent must include DialogTitle and DialogDescription.",
      },
    },
    create(context) {
      return {
        JSXElement(node) {
          if (node.openingElement.name.name !== "DialogContent") return;
          const names = [];
          function walk(n) {
            if (!n || typeof n !== "object") return;
            if (n.type === "JSXOpeningElement") names.push(n.name.name);
            for (const [k, v] of Object.entries(n)) {
              if (k === "parent") continue;
              if (Array.isArray(v)) v.forEach(walk);
              else if (v && typeof v === "object") walk(v);
            }
          }
          walk(node);
          if (
            !names.includes("DialogTitle") ||
            !names.includes("DialogDescription")
          )
            context.report({ node, messageId: "description" });
        },
      };
    },
  },
};
