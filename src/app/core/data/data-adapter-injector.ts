import { InjectionToken, Provider } from '@angular/core';

import { IDataAdapter } from './types';
import { IQuestion, ITopic } from '../models';

export const DATA_ADAPTER = new InjectionToken<IDataAdapter<ITopic, IQuestion>>('DATA_ADAPTER');

export function provideDataAdapter(useClass: any): Provider {
  return {
    provide: DATA_ADAPTER,
    useClass,
    deps: [],
  };
}
