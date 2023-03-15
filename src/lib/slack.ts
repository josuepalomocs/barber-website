import { App } from "@slack/bolt";
import { slackBotToken, slackSigningSecret } from "@/config/slack";

const slackBolt = new App({
  signingSecret: slackSigningSecret,
  token: slackBotToken,
});

(async () => {
  // Start your app
  await slackBolt.start(3080);

  console.log("⚡️ Bolt app is running!");
})();

export { slackBolt };
