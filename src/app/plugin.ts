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


            const spotifyLayout = data.claims.cfg.spotifyLayout;
            const spotifyLink = data.claims.cfg.spotifyLink;
            if (spotifyLink && spotifyLayout) {
                this.addSpotify(spotifyLink, spotifyLayout);
            }

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

    private addSpotify(spotifyLink: string, spotifyLayout: "LARGE" | "COMPACT") {
        const spotifyFrame = document.createElement("iframe");
        spotifyFrame.width = '200';
        spotifyFrame.height = spotifyLayout === "LARGE" ? '380' : '80';
        spotifyFrame.allow = "encrypted-media";
        spotifyFrame.src = spotifyLink.replace('https://open.spotify.com', 'https://open.spotify.com/embed');
        document.body.appendChild(spotifyFrame);
    }

}
