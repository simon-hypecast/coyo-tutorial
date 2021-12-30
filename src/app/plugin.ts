import {PluginAdapter} from '@coyoapp/plugin-adapter';

export class DemoPlugin {
    constructor() {
        new PluginAdapter().init().then(data => {
            console.log(data);
            const name = data.claims.ctx.userName;
            this.getName(name);

            console.log(data.claims.cfg);
            const background = data.claims.cfg.background;
            this.setBackgroundColor(background);
        });
    }

    private getName(userName: string) {
        const nameElem = document.getElementById('userName')!;
        if (nameElem) {
            nameElem.innerText = userName;
        }
    }

    private setBackgroundColor(background: string) {
        document.body.style.backgroundColor = background;
    }

}
