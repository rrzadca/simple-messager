import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CHAT_MESSAGE_MAPPER_SERVICE } from './components/chat/services/chat-message-mapper.service';
import { ApiChatMessageMapperService } from './components/chat/services/api-chat-message-mapper.service';
import { DeviceTypePipe } from './pipes/device-type/device-type.pipe';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideToastr(),
        {
            provide: CHAT_MESSAGE_MAPPER_SERVICE,
            useClass: ApiChatMessageMapperService,
        },
    ],
};
