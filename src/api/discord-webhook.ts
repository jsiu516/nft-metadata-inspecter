import BaseApi from "@api/base-api";

export default class DiscordWebhookApi extends BaseApi {
  constructor(url = process.env.DISCORD_WEBHOOK_URL) {
    super(url);
  }
  public async sendMsg(message: string) {
    try {
      await this.post<void>(this.axios, "", {
        username: "VoteStat Reporter",
        avatar_url:
          "https://stickercommunity.com/uploads/icon/1603898407_icon.png",
        content: message
      });
    } catch (err) {
      return;
    }
  }
}
