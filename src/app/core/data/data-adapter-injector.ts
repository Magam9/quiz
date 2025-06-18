import { InjectionToken, Provider } from '@angular/core';

import { IDataAdapter } from './types';
import { IQuestion, ITopic } from '../models';
import { environment } from '../../../../environment';
import { SocketDataAdapter } from './adapters/socket.adapter';
import { LocalStorageDataAdapter } from './adapters/local-storage.adapter';
import { RestDataAdapter } from './adapters/rest.adapter';
import { GrpcDataAdapter } from './adapters/grpc.adapter';

export function selectAdapter() {
  switch (environment.transport) {
    case 'rest':
      return RestDataAdapter; // not tested
    case 'grpc':
      return GrpcDataAdapter; // not tested
    case 'socket':
      return SocketDataAdapter; // not tested
    default:
      return LocalStorageDataAdapter; // tested
  }
}

export const DATA_ADAPTER = new InjectionToken<IDataAdapter<ITopic, IQuestion>>('DATA_ADAPTER');

export function provideDataAdapter(): Provider {
  return {
    provide: DATA_ADAPTER,
    useClass: selectAdapter(),
    deps: [],
  };
}
