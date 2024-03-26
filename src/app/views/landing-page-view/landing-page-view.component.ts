import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CurrentUserService } from '../../services/current-user.service';
import { InputTextComponent } from '../../components/form/inputs/input-text/input-text.component';
import { DeviceType } from '../../api/models/device-type';

interface DeviceItem {
    name: string;
    routerLink: string;
    type: DeviceType;
}

interface LoginForm {
    username: FormControl<string>;
}

@Component({
    selector: 'sm-landing-page-view',
    templateUrl: './landing-page-view.component.html',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    standalone: true,
    imports: [
        DeviceCardComponent,
        ButtonComponent,
        ReactiveFormsModule,
        InputTextComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageViewComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly currentUserService = inject(CurrentUserService);

    protected devices$$ = signal<DeviceItem[]>([]);

    protected form: FormGroup<LoginForm> | undefined;

    ngOnInit(): void {
        this.initForm();
        this.fetchAvailableDevices();
    }

    handleSubmit(device: DeviceItem): void {
        this.form?.markAllAsTouched();

        if (this.form?.valid && this.form.value.username) {
            this.currentUserService.login(
                this.form.value.username,
                device.type,
                device.name,
            );

            this.router.navigate([device.routerLink], {
                relativeTo: this.activatedRoute,
            });
        }
    }

    private fetchAvailableDevices(): void {
        this.devices$$.set([
            {
                name: 'iPhone 1',
                routerLink: '/field-device',
                type: DeviceType.FIELD,
            },
            {
                name: 'iPhone 2',
                routerLink: '/field-device',
                type: DeviceType.FIELD,
            },
            {
                name: 'iPad 1',
                routerLink: '/field-device',
                type: DeviceType.FIELD,
            },
            {
                name: 'iPad 2',
                routerLink: '/field-device',
                type: DeviceType.FIELD,
            },
            {
                name: 'Command device',
                routerLink: '/command-device',
                type: DeviceType.COMMAND,
            },
        ]);
    }

    private initForm(): void {
        this.form = new FormGroup<LoginForm>({
            username: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
        });
    }
}
