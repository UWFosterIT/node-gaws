import { Logger } from 'tslog';
import got, {
  Got, isResponseOk, Options, PlainResponse,
} from 'got';
import { version } from '../../package.json';
import { IApiError, IApiResponse, ApiResult } from './IService.js';

export default class Service {
  private got: Got;

  private log: Logger<unknown>;

  constructor(config: any, log: Logger<unknown>) {
    this.log = log;
    const options = new Options({
      https: {
        certificate: config.auth.cert,
        key: config.auth.key,
      },
      prefixUrl: config.baseUrl,
      headers: {
        'User-Agent': `Foster-GAWS-SDK-${version}/${config.organizationName}`,
        Accept: 'application/json',
      },
    });
    console.log(options.headers);
    this.got = got.extend(options);
  }

  async get<T>(endpoint: string, params?: any): Promise<IApiResponse<T | IApiError>> {
    const response: PlainResponse = await this.got.get(
      endpoint,
      { searchParams: params },
    ) as PlainResponse;

    this.log.debug(`GET -- ${response.url}`);

    this.log.silly(response);

    if (!isResponseOk(response)) {
      return {
        result: ApiResult.failure,
        data: <IApiError>{
          errorCode: response.statusCode,
          description: response.body,
        },
      };
    }

    return {
      result: ApiResult.success,
      data: JSON.parse(response.body as string),
    };
  }
}
