import { trigger, transition, style, animate, state, animateChild, group, query, AnimationTriggerMetadata } from "@angular/animations";







export const fadeTrigger: AnimationTriggerMetadata = trigger('fadeTrigger', [
  transition('* => *', [
    style({ opacity: 0, transform: 'translateY(40px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);





export const fadeSlide = trigger('fadeSlide', [
    // Definindo os estados
    state('void', style({
        opacity: 0,
    })),
    state('right', style({
    })),
    state('up', style({
    })),
    state('noslide', style({
    })),
    state('fastnoslide', style({
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
            opacity: 0,
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

    transition('noslide => void', [
        animate('520ms ease-in', style({
            opacity: 0,
        }))
    ]),

    transition('void => noslide', [
        animate('520ms ease-in', style({
            opacity: 1,
        }))
    ]),
    transition('fastnoslide => void', [
        animate('150ms ease-in', style({
            opacity: 0,
        }))
    ]),

    transition('void => fastnoslide', [
        animate('150ms ease-in', style({
            opacity: 1,
        }))
    ]),

]);


export const queryAnimation = [
    trigger('queryAnimation', [
      transition(':leave', [
        group([
          query('@fadeSlide', animateChild(), { optional: true }),
        ])
      ])
    ])
  ];