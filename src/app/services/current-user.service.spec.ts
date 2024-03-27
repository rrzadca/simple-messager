import { CurrentUserService } from './current-user.service';
import { DeviceType } from '../api/models/device-type';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '../api/services/api.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('CurrentUserService', () => {
    let service: CurrentUserService;
    let apiServiceMock: jasmine.SpyObj<ApiService>;
    let routerMock: jasmine.SpyObj<Router>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CurrentUserService,
                {
                    provide: ApiService,
                    useValue: jasmine.createSpyObj('ApiService', [
                        'registerDevice',
                        'unregisterDevice',
                    ]),
                },
                {
                    provide: Router,
                    useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
                },
            ],
        });

        service = TestBed.get(CurrentUserService);
        apiServiceMock = TestBed.get(ApiService);
        routerMock = TestBed.get(Router);
    });

    it('create an instance', () => {
        expect(service).toBeTruthy();
    });

    it('should have default state', () => {
        expect(service.state).toEqual({
            username: null,
            joinedAt: null,
            deviceId: null,
        });
    });

    it('should login', () => {
        apiServiceMock.registerDevice.and.returnValue(of('iphone-1'));

        service.login('username', DeviceType.FIELD, 'deviceName');

        expect(apiServiceMock.registerDevice).toHaveBeenCalledWith(
            'username',
            DeviceType.FIELD,
            'deviceName',
        );
        expect(service.state).toEqual({
            username: 'username',
            joinedAt: new Date(),
            deviceId: 'iphone-1',
        });
    });

    it('should logout', () => {
        apiServiceMock.registerDevice.and.returnValue(of('iphone-1'));
        apiServiceMock.unregisterDevice.and.returnValue(of('iphone-1'));

        service.login('username', DeviceType.FIELD, 'deviceName');
        service.logout();

        expect(service.state).toEqual({
            username: null,
            joinedAt: null,
            deviceId: null,
        });
        expect(apiServiceMock.unregisterDevice).toHaveBeenCalledWith(
            'iphone-1',
        );
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
    });
});
