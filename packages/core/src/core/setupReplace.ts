import { HandleEvents } from './handleEvents';
// import { breadcrumb } from './index';
import { addReplaceHandler } from './replace';
import { EVENTTYPES } from '@chuche-monitor/common';
export function setupReplace(): void {
  // 白屏检测
  addReplaceHandler({
    callback: () => {
      HandleEvents.handleWhiteScreen();
    },
    type: EVENTTYPES.WHITESCREEN,
  });
}
