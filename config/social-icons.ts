export type SocialsTypes = {
  [key: string]: {
    id: string;
    name: string;
    icon: string;
    placeholder: string; //can be a link or username or number if necessary
    example: string;
  }
}
export const socials: SocialsTypes = {
  Threads: {
    id: "threads",
    name: "Threads",
    icon: "ri-threads-line",
    placeholder: "Enter Threads Username*",
    example: "@threadsusername"
  },
  Instagram: {
    id: "instagram",
    name: "Instagram",
    icon: "ri-instagram-line",
    placeholder: "Enter Instagram Username*",
    example: "@instagramusername"
  },
  Email: {
    id: "email",
    name: "Email",
    icon: "ri-mail-line",
    placeholder: "Enter Email Address*",
    example: "example@example.com"
  },
  Facebook: {
    id: "facebook",
    name: "Facebook",
    icon: "ri-facebook-circle-line",
    placeholder: "Enter Facebook Profile URL*",
    example: "https://www.facebook.com/username"
  },
  YouTube: {
    id: "youtube",
    name: "YouTube",
    icon: "ri-youtube-line",
    placeholder: "Enter YouTube Channel URL*",
    example: "https://www.youtube.com/channel/username"
  },
  TikTok: {
    id: "tiktok",
    name: "TikTok",
    icon: "ri-tiktok-line",
    placeholder: "Enter TikTok Username*",
    example: "@tiktokusername"
  },
  X: {
    id: "x",
    name: "X (Formerly Twitter)",
    icon: "ri-twitter-x-line",
    placeholder: "Enter X (Formerly Twitter) Handle*",
    example: "@yourxhandle"
  },
  WhatsApp: {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "ri-whatsapp-line",
    placeholder: "Enter WhatsApp Number*",
    example: "+1234567890"
  },
  Snapchat: {
    id: "snapchat",
    name: "Snapchat",
    icon: "ri-snapchat-line",
    placeholder: "Enter Snapchat URL*",
    example: "https://www.snapchat.com/add/yourusername"
  },
  Amazon: {
    id: "amazon",
    name: "Amazon",
    icon: "ri-amazon-line",
    placeholder: "Enter Amazon URL*",
    example: "https://www.amazon.com/yourshopname"
  },
  "Android PlayStore": {
    id: "android-playstore",
    name: "Android PlayStore",
    icon: "ri-google-play-line",
    placeholder: "Enter Android PlayStore URL*",
    example: "https://play.google.com/store/apps/details?url=com.yourapp.app"
  },
  "Apple App Store": {
    id: "apple-appstore",
    name: "Apple App Store",
    icon: "ri-app-store-line",
    placeholder: "Enter Apple App Store*",
    example: "https://apps.apple.com/us/yourapp/url1234567890"
  },
  "Apple Music": {
    id: "apple-music",
    name: "Apple Music",
    icon: "ri-music-2-line", // no icon
    placeholder: "Enter Apple Music Profile URL*",
    example: "https://music.apple.com/us/album/youralbum"
  },
  "Apple Podcast": {
    id: "apple-podcast",
    name: "Apple Podcast",
    icon: "ri-mic-line", // no icon
    placeholder: "Enter Apple Podcast URL*",
    example: "https://podcasts.apple.com/us/podcast/yourpodcast/123456789"
  },
  /*Bandcamp: {
    id: "bandcamp",
    name: "Bandcamp",
    icon: "ri-bandcamp-line", // no icon
    placeholder: "Enter Bandcamp URL*",
    example: "https://username.bandcamp.com/"
  },
  Cameo: {
    id: "cameo",
    name: "Cameo",
    icon: "ri-cameo-line", // no icon
    placeholder: "Enter Cameo URL*",
    example: "https://www.cameo.com/"
  },
  Clubhouse: {
    id: "clubhouse",
    name: "Clubhouse",
    icon: "ri-clubhouse-line", // no icon
    placeholder: "Enter Clubhouse URL*",
    example: "https://clubhouse.com/@profile"
  },*/
  Discord: {
    id: "discord",
    name: "Discord",
    icon: "ri-discord-line",
    placeholder: "Enter Discord URL*",
    example: "https://discord.com/invite/yourchannel"
  },
  /*Etsy: {
    id: "etsy",
    name: "Etsy",
    icon: "ri-etsy-line", // no icon
    placeholder: "Enter Etsy Shop URL*",
    example: "https://www.etsy.com/shop/yourshop"
  },*/
  GitHub: {
    id: "github",
    name: "GitHub",
    icon: "ri-github-fill",
    placeholder: "Enter GitHub Profile URL*",
    example: "https://github.com/username"
  },
  Kick: {
    id: "kick",
    name: "Kick",
    icon: "ri-kick-line",
    placeholder: "Enter Kick URL*",
    example: "https://kick.com/username"
  },
  LinkedIn: {
    id: "linkedin",
    name: "LinkedIn",
    icon: "ri-linkedin-box-line",
    placeholder: "Enter LinkedIn Profile URL*",
    example: "https://www.linkedin.com/in/username"
  },
  Mastodon: {
    id: "mastodon",
    name: "Mastodon",
    icon: "ri-mastodon-line",
    placeholder: "Enter Mastodon URL*",
    example: "https://mastodon.social/@username"
  },
  Patreon: {
    id: "patreon",
    name: "Patreon",
    icon: "ri-patreon-line",
    placeholder: "Enter Patreon URL*",
    example: "https://www.patreon.com/"
  },
  Payment: {
    id: "payment",
    name: "Payment",
    icon: "ri-money-dollar-circle-line",
    placeholder: "Enter Payment Information*",
    example: "Credit Card / PayPal / etc."
  },
  Pinterest: {
    id: "pinterest",
    name: "Pinterest",
    icon: "ri-pinterest-line",
    placeholder: "Enter Pinterest URL*",
    example: "https://www.pinterest.com/"
  },
  /*Poshmark: {
    id: "poshmark",
    name: "Poshmark",
    icon: "ri-poshmark-line", // no icon
    placeholder: "Enter Poshmark URL*",
    example: "https://poshmark.com/closet/yourcloset"
  },
  Signal: {
    id: "signal",
    name: "Signal",
    icon: "ri-signal-line", // no icon
    placeholder: "Enter Signal URL*",
    example: "https://t.me/"
  },*/
  SoundCloud: {
    id: "soundcloud",
    name: "SoundCloud",
    icon: "ri-soundcloud-line",
    placeholder: "Enter SoundCloud Profile URL*",
    example: "https://soundcloud.com/username"
  },
  Spotify: {
    id: "spotify",
    name: "Spotify",
    icon: "ri-spotify-line",
    placeholder: "Enter Spotify Profile URL*",
    example: "https://open.spotify.com/user/username"
  },
  /*Substack: {
    id: "substack",
    name: "Substack",
    icon: "ri-substack-line", // no icon
    placeholder: "Enter Substack Profile URL*",
    example: "https://username.substack.com"
  },*/
  Telegram: {
    id: "telegram",
    name: "Telegram",
    icon: "ri-telegram-line",
    placeholder: "Enter Telegram URL*",
    example: "https://t.me/"
  },
  Twitch: {
    id: "twitch",
    name: "Twitch",
    icon: "ri-twitch-fill",
    placeholder: "Enter Twitch URL*",
    example: "https://twitch.tv/"
  },
};
