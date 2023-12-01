import { routePath } from "./appState";

export const navigateTo = (path) => {
  window.history.pushState({}, '', path);
  routePath.set(path);
}
