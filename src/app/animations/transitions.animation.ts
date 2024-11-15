import { trigger, transition, style, animate, state } from "@angular/animations";

export const fadeSlide = trigger('fadeSlide', [
    // Definindo os estados
    state('void', style({
        position: 'absolute',
        opacity: 0,
        left: 0,
        top: 0,
    })),
    state('right', style({
    })),
    state('up', style({
    })),

    transition('void => right', [
        style({
            transform: 'translateX(-50%)',
            opacity: 0
        }),
        animate('520ms ease-out', style({
            transform: 'translateX(0)',
            opacity: 1,
        }))
    ]),

    transition('void => up', [
        style({
            transform: 'translateY(50%)',
            opacity: 0
        }),
        animate('520ms ease-out', style({
            transform: 'translateY(0)',
            opacity: 1,
        }))
    ]),

    transition('right => void', [
        animate('520ms ease-in', style({
            transform: 'translateX(0)',
            opacity: 0,
        }))
    ]),

    transition('up => void', [
        animate('520ms ease-in', style({
            transform: 'translateY(0)',
            opacity: 0,
        }))
    ]),
]);