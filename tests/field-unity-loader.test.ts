import { readFileSync } from "node:fs";
import { afterEach, expect, it, vi } from "vitest";

const code = readFileSync("public/history-field/li-jingxun/player.js", "utf8");
const init = { type: "HISTORY_INIT", schemaVersion: 1, siteId: "li-jingxun", discoveries: [{ discoveryId: "li-jingxun.epitaph", state: "catalogued" }] };
const callbacks = new Map<string, (event: unknown) => void>();
afterEach(() => { vi.restoreAllMocks(); callbacks.clear(); document.body.innerHTML = ""; Reflect.deleteProperty(document, "pointerLockElement"); });
function boot() {
  document.body.innerHTML = '<canvas id="unity-canvas"></canvas><div id="history-field-loader" data-state="loading"><span id="loading-text"></span><progress></progress></div>';
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({} as WebGL2RenderingContext);
  let finish!: (value: unknown) => void;
  const create = vi.fn(() => new Promise((resolve) => { finish = resolve; }));
  const parent = { scrollBy: vi.fn(), innerHeight: 720 };
  const host = { frameElement: {}, addEventListener: (name: string, callback: (event: unknown) => void) => callbacks.set(name, callback) };
  new Function("window", "document", "navigator", "location", "parent", "createUnityInstance", code)(host, document, { userAgent: "Desktop", platform: "Win32" }, { origin: "https://history.test" }, parent, create);
  document.querySelector("script")!.dispatchEvent(new Event("load"));
  return { finish, create, parent };
}
it("queues a real INIT until Unity resolves, rejects wrong source/origin, and forwards the exact payload", async () => {
  const { finish, parent } = boot();
  const receive = callbacks.get("message")!;
  receive({ source: parent, origin: "https://history.test", data: init });
  receive({ source: {}, origin: "https://history.test", data: { ...init, discoveries: [] } });
  receive({ source: parent, origin: "https://evil.test", data: { ...init, discoveries: [] } });
  const SendMessage = vi.fn();
  finish({ SendMessage });
  await Promise.resolve();
  expect(SendMessage).toHaveBeenCalledExactlyOnceWith("WebBridge", "ReceiveMessage", JSON.stringify({ origin: "https://history.test", data: init }));
  expect(document.getElementById("history-field-loader")!.dataset.state).toBe("running");
});
it("preserves a loader failure even if Unity later resolves", async () => {
  const { finish } = boot();
  document.querySelector("script")!.dispatchEvent(new Event("error"));
  finish({ SendMessage: vi.fn() });
  await Promise.resolve();
  expect(document.getElementById("history-field-loader")!.dataset.state).toBe("failed");
});
it("does not turn an unrelated pointer-lock rejection into a failed Unity load", async () => {
  const { finish } = boot();
  finish({ SendMessage: vi.fn() });
  await Promise.resolve();
  callbacks.get("unhandledrejection")?.({ reason: new DOMException("Not focused", "WrongDocumentError") });
  expect(document.getElementById("history-field-loader")!.dataset.state).toBe("running");
});

it.each([[0, 120], [1, 1920], [2, 86400]])("scrolls the host page for unlocked wheel input (deltaMode %s)", (deltaMode, top) => {
  const { parent } = boot();
  const event = new WheelEvent("wheel", { deltaY: 120, deltaMode, cancelable: true });
  callbacks.get("wheel")?.(event);
  expect(parent.scrollBy).toHaveBeenCalledWith({ top, left: 0, behavior: "instant" });
  expect(event.defaultPrevented).toBe(true);
});

it("leaves locked game input and browser zoom untouched", () => {
  const { parent } = boot();
  Object.defineProperty(document, "pointerLockElement", { configurable: true, value: document.querySelector("canvas") });
  const playing = new WheelEvent("wheel", { deltaY: 120, cancelable: true });
  callbacks.get("wheel")?.(playing);
  Reflect.deleteProperty(document, "pointerLockElement");
  const zoom = new WheelEvent("wheel", { deltaY: 120, ctrlKey: true, cancelable: true });
  callbacks.get("wheel")?.(zoom);
  expect(parent.scrollBy).not.toHaveBeenCalled();
  expect(playing.defaultPrevented).toBe(false);
  expect(zoom.defaultPrevented).toBe(false);
});
