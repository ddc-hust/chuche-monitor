import { notify, subscribeEvent } from './index';
import {
  _global,
} from '@chuche-monitor/utils';
import { EVENTTYPES } from '@chuche-monitor/common';
import { ReplaceHandler } from '@chuche-monitor/types';

function replace(type: EVENTTYPES): void {
  switch (type) {
    case EVENTTYPES.WHITESCREEN:
      whiteScreen();
      break;
    default:
      break;
  }
}
export function addReplaceHandler(handler: ReplaceHandler): void {
  if (!subscribeEvent(handler)) return;
  replace(handler.type);
}

function whiteScreen(): void {
  notify(EVENTTYPES.WHITESCREEN);
}
