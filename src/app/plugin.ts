import {PluginAdapter} from '@coyoapp/plugin-adapter';

export class DemoPlugin {
    constructor() {
        new PluginAdapter().init().then(data => {
            console.log(data);
            const name = data.claims.ctx.userName;

            this.getName(name);
        });
    }

    private getName(userName: string) {
        const nameElem = document.getElementById('userName')!;
        nameElem.innerText = userName;
    }

}
