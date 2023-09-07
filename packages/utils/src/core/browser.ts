import { setFlag, _support } from './global';
import { EVENTTYPES } from '@chuche-monitor/common';

export function setSilentFlag({
    silentXhr = true,
    silentFetch = true,
    silentClick = true,
    silentHistory = true,
    silentError = true,
    silentHashchange = true,
    silentUnhandledrejection = true,
    silentWhiteScreen = false,
}): void {
    setFlag(EVENTTYPES.XHR, !silentXhr);
    setFlag(EVENTTYPES.FETCH, !silentFetch);
    setFlag(EVENTTYPES.CLICK, !silentClick);
    setFlag(EVENTTYPES.HISTORY, !silentHistory);
    setFlag(EVENTTYPES.ERROR, !silentError);
    setFlag(EVENTTYPES.HASHCHANGE, !silentHashchange);
    setFlag(EVENTTYPES.UNHANDLEDREJECTION, !silentUnhandledrejection);
    setFlag(EVENTTYPES.WHITESCREEN, !silentWhiteScreen);
}