import { trigger, transition, style, animate, state, animateChild, group, query, AnimationTriggerMetadata } from "@angular/animations";

export const fadeTrigger: AnimationTriggerMetadata = trigger('fadeTrigger', [
  transition('* => *', [
    style({ opacity: 0, transform: 'translateY(40px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
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



//================================================= CREATE ANIMATION =======================================================
export function createAnimation(triggerName: string, 
  params: { duration?: string, animateY?:boolean, animateX?:boolean, transform?:string, opacity?:string }) {
  const animateY = params.animateY ? { height: 0, minHeight: 0, paddingTop: 0, marginTop: 0, paddingBottom: 0, marginBottom: 0 } : { }
  const animateX = params.animateX ? { width: 0, minWidth: 0, paddingRight: 0, marginRight: 0, paddingLeft: 0, marginLeft: 0 } : { }
  return trigger(triggerName, [
    state('void',
      style({
        ...animateY,
        ...animateX,
        transform: params.transform || 'none',
        opacity: params.opacity || '0'
      } as { [key: string]: string | number; }
      )
    ),
    transition(':enter, :leave', animate(params.duration ? `${params.duration} ease-in-out` : '200ms ease-in-out'))
  ])
}
//================================================= END CREATE ANIMATION ===================================================