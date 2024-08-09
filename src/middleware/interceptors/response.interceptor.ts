import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ResponseMessageKey } from '../../common/decorators/response-message.decorator';
// import { EncryptionService } from 'src/providers/encryption/encryption.service';

export interface Response<T> {
  statusCode: number;
  message: string;
  type: string;
  data: T;
}

interface IRecord {
  [key: string]: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(
    // private readonly encryptionService: EncryptionService,
    private reflector: Reflector,
  ) {}

  // This method is used to construct the final response object.
  sendSuccess(result: IRecord) {
    const statusCode = result.statusCode || 200;
    const i18n = I18nContext.current();
    const lang = I18nContext.current().lang;
    const msgType = result?.type;
    const translateMsgType = `${lang}.${msgType}`;
    const translatedMsg = i18n.t(translateMsgType, { args: result?.args }); //pass the arguments to the translate
    const message =
      translatedMsg !== translateMsgType ? translatedMsg : msgType;
    const data = {
      ...result?.data,
      ...result?.args,
      message,
      type: msgType,
      statusCode,
    };
    delete data?.args;

    let ecrytptedData = data;
    // if (data.type !== 'DATA_HAS_BEEN_DECRYPT') {
    //   ecrytptedData = this.encryptionService.encryptData(JSON.stringify(data));
    // }

    const responseData = {
      statusCode,
      message: undefined,
      type: undefined,
      data: ecrytptedData,
      result: data
    };
    return responseData;
  }

  // This method intercepts the response and transforms it before sending it to the client.
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseType =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      ''; // Get the response message type from the metadata

    const response = context.switchToHttp().getResponse();
    const statusCode = response['statusCode']; // Get the status code from the response

    return next.handle().pipe(
      map((records) => {
        const responseData: IRecord = {};
        responseData['statusCode'] = statusCode;
        responseData['type'] = responseType;
        if (records && typeof records === 'object') {
          // If the response is an object, construct the final response object using the sendSuccess method
          responseData['type'] = responseType;
          responseData['args'] = records['args'];
          responseData['data'] = records;
        }
        const result = this.sendSuccess(responseData); // Call the sendSuccess method to construct the final response object
        return result;
      }),
    );
  }
}
