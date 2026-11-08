import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../../components/ThemeToggle.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

// Exercise the actual click handler with controlled capture timing. In particular,
// a second click can arrive before the browser has called the first DOM update.
function harness({ reducedMotion = false, snapshots = true, storageBlocked = false, hidden = false } = {}) {
  const classes = new Set(["font-existing", "light"]);
  const dataset = {};
  let savedTheme;
  let update;
  let finish;
  let captures = 0;
  let ready;
  let abort;
  const document = {
    hidden,
    documentElement: {
      dataset,
      classList: {
        contains: value => classes.has(value),
        add: value => classes.add(value),
        replace: (from, to) => {
          if (!classes.delete(from)) return false;
          classes.add(to);
          return true;
        },
      },
    },
  };
  if (snapshots) document.startViewTransition = callback => {
    captures++;
    update = callback;
    return {
      ready: new Promise((resolve, reject) => { ready = resolve; abort = reject; }),
      finished: new Promise(resolve => { finish = resolve; }),
    };
  };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    document,
    window: { matchMedia: () => ({ matches: reducedMotion }), setTimeout: callback => callback() },
    localStorage: { setItem: (_key, value) => {
      if (storageBlocked) throw new Error("Storage blocked");
      savedTheme = value;
    } },
    require: name => {
      if (name === "react") return {
        useRef: value => ({ current: value }),
        useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot(),
      };
      if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (name === "lucide-react") return { Moon: "moon", Sun: "sun" };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return {
    click: exports.default().props.onClick,
    document, classes, dataset,
    get savedTheme() { return savedTheme; },
    get captures() { return captures; },
    completeCapture({ documentHidden = false } = {}) {
      update();
      if (documentHidden) {
        document.hidden = true;
        abort(new DOMException("Transition was aborted because of invalid state. Document hidden", "InvalidStateError"));
      } else ready();
      finish();
    },
  };
}

test("one coordinated capture at a time, including clicks before the DOM update", async () => {
  const h = harness();
  const first = h.click();
  await h.click();
  assert.equal(h.captures, 1);
  h.completeCapture();
  await first;
  assert.ok(h.classes.has("dark"));
  assert.ok(h.classes.has("font-existing"));
  assert.equal(h.savedTheme, "dark");
  assert.equal(h.dataset.themeTransition, undefined);

  const second = h.click();
  assert.equal(h.captures, 2);
  h.completeCapture();
  await second;
  assert.ok(h.classes.has("light"));
  assert.equal(h.savedTheme, "light");
});

test("reduced motion applies and saves the theme without a capture", async () => {
  const h = harness({ reducedMotion: true });
  await h.click();
  assert.equal(h.captures, 0);
  assert.equal(h.savedTheme, "dark");
  assert.equal(h.dataset.themeTransition, undefined);
});

test("older browsers and blocked storage still switch both ways", async () => {
  const h = harness({ snapshots: false, storageBlocked: true });
  await h.click();
  assert.ok(h.classes.has("dark"));
  await h.click();
  assert.ok(h.classes.has("light"));
  assert.equal(h.dataset.themeTransition, undefined);
});

test("failed captures leave the destination theme applied and unlock the toggle", async () => {
  const h = harness();
  h.document.startViewTransition = () => { throw new Error("Capture unavailable"); };
  await h.click();
  assert.equal(h.savedTheme, "dark");
  await h.click();
  assert.equal(h.savedTheme, "light");
  assert.equal(h.dataset.themeTransition, undefined);
});

test("a hidden document switches without starting a snapshot", async () => {
  const h = harness({ hidden: true });
  await h.click();
  assert.equal(h.captures, 0);
  assert.equal(h.savedTheme, "dark");
  assert.equal(h.dataset.themeTransition, undefined);
});

test("hiding a document during capture handles ready rejection and preserves the theme", async () => {
  const h = harness();
  const pending = h.click();
  h.completeCapture({ documentHidden: true });
  await pending;
  // Let Node report any unhandled rejection, just as the Next.js overlay does.
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(h.savedTheme, "dark");
  assert.equal(h.dataset.themeTransition, undefined);
  await h.click();
  assert.equal(h.savedTheme, "light");
});
