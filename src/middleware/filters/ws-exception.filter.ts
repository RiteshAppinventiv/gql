import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const client: Socket = host.switchToWs().getClient();
    // Send the error message to the client as a WebSocket message
    const response = exception.getError();
    client.send(JSON.stringify(response));

    // Close the connection with the appropriate status code
    client.emit('exception', exception.getError());
    throw exception;
  }
}
