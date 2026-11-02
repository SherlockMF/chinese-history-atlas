/* Web-owned loader. The Unity binaries and HISTORY_* wire contract are unchanged. */
/* global createUnityInstance */
(() => {
  const loader = document.getElementById("history-field-loader");
  const label = document.getElementById("loading-text");
  const canvas = document.getElementById("unity-canvas");
  let instance;
  let pendingInit;
  let failed = false;
  // Unity consumes wheel events even before pointer lock. Keep the host page
  // scrollable while the mouse is released; locked input belongs to the game.
  window.addEventListener("wheel", (event) => {
    if (!window.frameElement || document.pointerLockElement || event.ctrlKey) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? parent.innerHeight : 1;
    event.preventDefault();
    event.stopImmediatePropagation();
    parent.scrollBy({ top: event.deltaY * unit, left: event.deltaX * unit, behavior: "instant" });
  }, { capture: true, passive: false });
  const fail = () => {
    failed = true;
    loader.dataset.state = "failed";
    label.textContent = "Unity 加载失败，请使用页面上方的重试加载或返回档案。";
  };
  canvas.addEventListener("webglcontextlost", fail);
  window.addEventListener("message", (event) => {
    if (event.source !== parent || event.origin !== location.origin) return;
    const data = event.data;
    if (!data || data.type !== "HISTORY_INIT" || data.schemaVersion !== 1 || data.siteId !== "li-jingxun" || !Array.isArray(data.discoveries)) return;
    const payload = JSON.stringify({ origin: event.origin, data });
    if (instance) instance.SendMessage("WebBridge", "ReceiveMessage", payload);
    else pendingInit = payload; // READY can precede createUnityInstance's resolution.
  });
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    loader.dataset.state = "unsupported";
    label.textContent = "现场探索建议使用桌面浏览器";
    return;
  }
  if (!document.createElement("canvas").getContext("webgl2")) {
    fail();
    label.textContent = "此设备不支持 WebGL 2，现场探索建议使用桌面浏览器。";
    return;
  }
  const script = document.createElement("script");
  script.src = "Build/WebGL.loader.js";
  script.onerror = fail;
  script.onload = () => {
    createUnityInstance(canvas, {
      dataUrl: "Build/WebGL.data.gz", frameworkUrl: "Build/WebGL.framework.js.gz", codeUrl: "Build/WebGL.wasm.gz",
      streamingAssetsUrl: "StreamingAssets", companyName: "DefaultCompany", productName: "game", productVersion: "1.0",
      devicePixelRatio: 1,
      showBanner: (message, type) => { if (type === "error") fail(); console[type === "error" ? "error" : "warn"](message); },
    }, (progress) => {
      if (failed) return;
      label.textContent = `正在加载场景 ${Math.round(progress * 100)}%`;
      loader.querySelector("progress").value = progress;
    }).then((unity) => {
      instance = unity;
      window.historyFieldUnityInstance = unity;
      if (pendingInit) { unity.SendMessage("WebBridge", "ReceiveMessage", pendingInit); pendingInit = null; }
      if (!failed) loader.dataset.state = "running";
    }).catch(fail);
  };
  document.body.appendChild(script);
})();
