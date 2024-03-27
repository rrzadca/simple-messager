import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default variant primary', () => {
        const nativeElement = fixture.debugElement.nativeElement;

        expect(nativeElement.querySelector('button').classList).toContain(
            'bg-primary-700',
        );
    });

    it('should change variant to secondary', () => {
        const nativeElement = fixture.debugElement.nativeElement;
        component.variant = 'secondary';
        fixture.detectChanges();

        expect(nativeElement.querySelector('button').classList).toContain(
            'bg-tertiary-700',
        );
        expect(nativeElement.querySelector('button').classList).toContain(
            'dark:bg-tertiary-900',
        );
        expect(nativeElement.querySelector('button').classList).toContain(
            'text-tertiary-100',
        );
        expect(nativeElement.querySelector('button').classList).not.toContain(
            'bg-primary-700',
        );
        expect(nativeElement.querySelector('button').classList).not.toContain(
            'text-white',
        );
        expect(nativeElement.querySelector('button').classList).not.toContain(
            'dark:bg-primary-700',
        );
        expect(nativeElement.querySelector('button').classList).not.toContain(
            'dark:text-black',
        );
    });
});
