"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, type ReactNode, useCallback, useEffect, useRef } from "react";
import { getRouteSeries } from "@/data/series";

import { useHistoryStore } from "./history-store";
import { parseHistoryQuery, serializeHistoryQuery } from "./history-url";

interface RouteSnapshot {
  pathname: string;
  query: string;
}

function routesMatch(left: RouteSnapshot, right: RouteSnapshot) {
  return left.pathname === right.pathname && left.query === right.query;
}

function routeHref(route: RouteSnapshot) {
  return route.query ? `${route.pathname}?${route.query}` : route.pathname;
}

export function HistoryProvider({ children }: { children: ReactNode }) {
  return <><Suspense fallback={null}><HistoryUrlSync /></Suspense>{children}</>;
}

function HistoryUrlSync() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const series = getRouteSeries(pathname, searchParams.get("series"));
  const routePrefix = (pathname.startsWith("/series/") || series.id !== "five-dynasties") ? `/series/${series.slug}` : "";
  const initialized = useRef(false);
  const observedRoute = useRef<RouteSnapshot | null>(null);
  const latestDesiredRoute = useRef<RouteSnapshot | null>(null);
  const pendingInternalRoute = useRef<(RouteSnapshot & { local: boolean }) | null>(null);
  const pendingInternalRoutes = useRef<RouteSnapshot[]>([]);
  const applyingUrl = useRef(false);

  const resetStoreFromUrl = useCallback((incomingQuery: string) => {
    const parsed = parseHistoryQuery(incomingQuery, series);
    const state = useHistoryStore.getState();
    if (
      state.series.id === series.id && state.routePrefix === routePrefix &&
      parsed.currentYear === state.currentYear &&
      parsed.selectedDynasty === state.selectedDynasty &&
      parsed.selectedPerson === state.selectedPerson &&
      parsed.selectedEvent === state.selectedEvent
    ) {
      return;
    }
    applyingUrl.current = true;
    try {
      state.reset({
        ...parsed,
        series,
        routePrefix,
        isPlaying: false,
        aiDrawerOpen: state.aiDrawerOpen,
      });
    } finally {
      applyingUrl.current = false;
    }
  }, [series, routePrefix]);

  useEffect(() => {
    const incoming = { pathname, query };
    if (!initialized.current) {
      observedRoute.current = incoming;
      latestDesiredRoute.current = incoming;
      pendingInternalRoute.current = null;
      pendingInternalRoutes.current = [];
      useHistoryStore.getState().reset({ ...parseHistoryQuery(query, series), series, routePrefix });
      initialized.current = true;
      return;
    }

    const observed = observedRoute.current;
    if (observed?.pathname !== incoming.pathname) {
      observedRoute.current = incoming;
      latestDesiredRoute.current = incoming;
      pendingInternalRoute.current = null;
      pendingInternalRoutes.current = [];
      resetStoreFromUrl(query);
      return;
    }
    if (observed && routesMatch(observed, incoming)) return;

    observedRoute.current = incoming;
    const desired = latestDesiredRoute.current ?? incoming;
    if (pendingInternalRoute.current) {
      if (routesMatch(incoming, desired)) {
        pendingInternalRoute.current = null;
        pendingInternalRoutes.current = [];
        return;
      }
      // Native history already changed the URL; an older React snapshot must not replay navigation.
      if (pendingInternalRoute.current.local) {
        if (pendingInternalRoutes.current.some(route => routesMatch(route, incoming))) return;
        pendingInternalRoute.current = null;
        pendingInternalRoutes.current = [];
        latestDesiredRoute.current = incoming;
        resetStoreFromUrl(query);
        return;
      }
      pendingInternalRoute.current = { ...desired, local: false };
      router.replace(routeHref(desired), { scroll: false });
      return;
    }

    latestDesiredRoute.current = incoming;
    resetStoreFromUrl(query);
  }, [pathname, query, router, series, routePrefix, resetStoreFromUrl]);

  useEffect(() => {
    return useHistoryStore.subscribe((state, previous) => {
      if (!initialized.current || applyingUrl.current) return;
      const changed =
        state.currentYear !== previous.currentYear ||
        state.selectedDynasty !== previous.selectedDynasty ||
        state.selectedPerson !== previous.selectedPerson ||
        state.selectedEvent !== previous.selectedEvent;
      if (!changed) return;
      const observed = observedRoute.current;
      if (!observed) return;
      if (observed.pathname === "/" || observed.pathname === "/series" || observed.pathname.startsWith("/archive/") || observed.pathname.startsWith("/investigate/")) return;
      const desired = {
        pathname: observed.pathname,
        query: serializeHistoryQuery(state),
      };
      const onEventPage = observed.pathname.startsWith("/explore/");
      const onNarrativePage = ["jin-sixteen-kingdoms", "western-jin", "eastern-jin"].includes(state.series.id) &&
        (onEventPage || observed.pathname === `/series/${state.series.slug}` || observed.pathname === `/series/${state.series.slug}/map`);
      if (onEventPage || onNarrativePage) {
        const previousQuery = new URLSearchParams(observed.query);
        const desiredQuery = new URLSearchParams(desired.query);
        for (const key of [...(onEventPage ? ["series", "path"] : []), ...(onNarrativePage ? ["sequence", "step"] : [])]) {
          const value = previousQuery.get(key);
          if (value) desiredQuery.set(key, value);
        }
        desired.query = desiredQuery.toString();
      }
      latestDesiredRoute.current = desired;
      if (
        pendingInternalRoute.current ||
        !routesMatch(desired, observed)
      ) {
        const localMapYear = (observed.pathname === "/map" || /^\/series\/[^/]+\/map$/.test(observed.pathname)) && state.currentYear !== previous.currentYear;
        const localTimelineYear = (observed.pathname === "/timeline" || /^\/series\/[^/]+\/timeline$/.test(observed.pathname)) && state.currentYear !== previous.currentYear;
        const localPerson = (observed.pathname === "/people" || /^\/series\/[^/]+\/people$/.test(observed.pathname)) && state.selectedPerson !== previous.selectedPerson;
        pendingInternalRoute.current = { ...desired, local: localMapYear || localTimelineYear || localPerson };
        // A local update can supersede server navigations whose snapshots have not arrived yet.
        pendingInternalRoutes.current.push(desired);
        if (localMapYear || localTimelineYear || localPerson) {
          // These views already hold their data; an RSC replace can race a subsequent story link.
          window.history.replaceState(null, "", routeHref(desired));
        } else {
          router.replace(routeHref(desired), { scroll: false });
        }
      }
    });
  }, [router]);

  return null;
}
