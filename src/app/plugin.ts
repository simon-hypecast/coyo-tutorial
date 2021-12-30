import {PluginAdapter} from '@coyoapp/plugin-adapter';

export class DemoPlugin {
    constructor() {
        new PluginAdapter().init().then(data => {
            console.log(data);
            const name = data.claims.ctx.userName;
            this.getName(name);

            const email = data.claims.ctx.userEmail;
            this.getEmail(email);

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
    private getEmail(userEmail: string) {
        const emailElem = document.getElementById('userEmail')!;
        if (emailElem) {
            emailElem.innerText = userEmail;
        }
    }

    private setBackgroundColor(background: string) {
        document.body.style.backgroundColor = background;
    }

}
