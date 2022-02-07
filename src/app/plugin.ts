import {PluginAdapter} from '@coyoapp/plugin-adapter';

export class DemoPlugin {
    constructor() {
        const adapter = new PluginAdapter();
        adapter.init().then(data => {
            const name = data.claims.ctx.userName;
            this.changeName(name);
            console.log("Data:", data);
            const background = data.claims.cfg.background;
            this.setBackgroundColor(background);
        });
        adapter.observeHeight();
    }

    private changeName(userName: string) {
        const nameElem = document.getElementById('userName')!;
        if (nameElem) {
            nameElem.innerText = userName;
        }
    }

    private setBackgroundColor(background: string) {
        document.body.style.backgroundColor = background;
    }
}
