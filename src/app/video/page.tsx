import type { Metadata } from "next";
import DarkSection from "@/components/DarkSection";
import PageIntro from "@/components/PageIntro";
import VideoCard from "@/components/VideoCard";
import { ArrowUpRight } from "@/components/icons";
import { playlistUrl, videos } from "@/content/videos";

export const metadata: Metadata = {
  title: "Video",
  description:
    "Films of Khaled Zaki's work: the 2013 Venice Biennale project, Resurrection, carving a marble portrait and the Galaa Square project.",
};

export default function VideoPage() {
  const [featured, ...rest] = videos;
  return (
    <>
      <PageIntro
        eyebrow="Video gallery"
        title="Video"
        accent="from the studio & the Biennale"
        seed={71}
        aside={
          <p>
            {videos.length} films — the Venice Biennale project, the Resurrection films, the Galaa Square award and work in
            the studio.
          </p>
        }
      />
      <DarkSection seed={73}>
        <div className="wrap py-16 md:py-24">
          <VideoCard video={featured} featured />
          <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          <div className="mt-16 border-t border-chalk/10 pt-10">
            <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="pill pill-outline text-chalk">
              Full playlist on YouTube <ArrowUpRight size={14} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </DarkSection>
    </>
  );
}
