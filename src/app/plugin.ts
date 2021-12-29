import {PluginAdapter} from '@coyoapp/plugin-adapter';

export class DemoPlugin {
    constructor() {
        new PluginAdapter().init().then(data => {
            const name = data['ctx.userName'];
            const email = data['ctx.emailName'];
            this.getName(name);
            this.getEmail(email);
        });
    }

    private getName(userName: string) {
        const nameElem = document.getElementById('userName')!;
        nameElem.innerText = userName;
    }

    private getEmail(email: string) {
        const emailElement = document.getElementById('userEmail')!;
        emailElement.innerText = email;
    }
}
