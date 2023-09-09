// import ErrorStackParser from 'error-stack-parser';
import {
  openWhiteScreen,
  transportData,
  // breadcrumb,
  // resourceTransform,
  // httpTransform,
  options,
} from './index';
import { EVENTTYPES } from '@chuche-monitor/common';
import {
  getTimestamp,
} from '@chuche-monitor/utils';
// import { ErrorTarget, RouteHistory, HttpData } from '@chuche-monitor/types';

const HandleEvents = {
  handleWhiteScreen(): void {
    openWhiteScreen((res: any) => {
      // 上报白屏检测信息
      console.log("上报白屏异常信息");
      console.log(res);
      transportData.send({
        type: EVENTTYPES.WHITESCREEN,
        time: getTimestamp(),
        ...res,
      });
    }, options);
  },
};
export { HandleEvents };
