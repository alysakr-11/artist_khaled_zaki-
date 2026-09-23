import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  // Keep the legacy khaled-zaki.com URLs working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/bio.html", destination: "/biography", permanent: true },
      { source: "/stone.html", destination: "/sculptures/stone", permanent: true },
      { source: "/bronze.html", destination: "/sculptures/bronze", permanent: true },
      { source: "/oldworks.html", destination: "/sculptures/old-works", permanent: true },
      { source: "/figures.html", destination: "/drawings/figures", permanent: true },
      { source: "/profiles.html", destination: "/drawings/profiles", permanent: true },
      { source: "/sitting_people.html", destination: "/drawings/sitting-people", permanent: true },
      { source: "/sufis.html", destination: "/drawings/sufis", permanent: true },
      { source: "/time_to_return_exhibition.html", destination: "/drawings/time-to-return", permanent: true },
      { source: "/videogallery.html", destination: "/video", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/news.html", destination: "/news", permanent: true },
      { source: "/newspages/news_1.html", destination: "/news/egyptian-pavilion-venice-biennale", permanent: true },
      { source: "/newspages/news_2.html", destination: "/news/european-travelers", permanent: true },
      { source: "/newspages/news_3.html", destination: "/news/in-the-wind-of-january", permanent: true },
      { source: "/newspages/news_4.html", destination: "/news/bayn-ibda-tutmusi-wa-sufiyyat-al-rumi", permanent: true },
      { source: "/newspages/news_5.html", destination: "/news/intersections", permanent: true },
      { source: "/newspages/news_6.html", destination: "/news/first-national-prize", permanent: true },
      { source: "/newspages/news_7.html", destination: "/news/first-prize-in-painting", permanent: true },
      { source: "/newspages/news_8.html", destination: "/news/riyah-kanun-al-thani", permanent: true },
      { source: "/newspages/the-return-khaled-zaki.html", destination: "/news/the-return", permanent: true },
      { source: "/newspages/beirut-art-fair.html", destination: "/news/beirut-art-fair", permanent: true },
    ];
  },
};

export default nextConfig;
