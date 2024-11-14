import { trigger, transition, style, animate, state } from "@angular/animations";

export const fadeInOut = trigger('fadeInOut', [
    state('void', style({
        position: 'absolute',
        opacity: 0,
        left: 0,
        top: 0
    })),
    transition(':enter', [
        style({
            transform: 'translateY(5%)'
        }),
        animate('320ms ease-out')
    ]),
    transition(':leave',[
        animate('320ms ease-out')
    ])
])