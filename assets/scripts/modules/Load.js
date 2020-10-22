import { module } from 'modujs';
import modularLoad from 'modularload';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
        const load = new modularLoad({
            // enterDelay: 0,
            // transitions: {
            //     customTransition: {}
            // }
            enterDelay: 600,
            transitions: {
                menu: {
                    enterDelay: 1200
                }
            }
        });

        load.on('loaded', (transition, oldContainer, newContainer) => {
            this.call('destroy', oldContainer, 'app');
            this.call('update', newContainer, 'app');
        });
    }
}
