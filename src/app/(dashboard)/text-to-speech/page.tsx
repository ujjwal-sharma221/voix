import { Suspense } from "react";
import type { Metadata } from "next";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

import GridLoader from "@/components/smoothui/grid-loader";
import { TextToSpeechView } from "@/modules/text-to-speech/views/text-to-speech-view";

export const metadata: Metadata = { title: "Text to speech" };

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}) => {
  const { text, voiceId } = await searchParams;

  prefetch(trpc.voices.getAll.queryOptions());

  return (
    <HydrateClient>
      <Suspense fallback={<LoadingSkeleton />}>
        <TextToSpeechView initialValues={{ text, voiceId }} />
      </Suspense>
    </HydrateClient>
  );
};

export default Page;

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <GridLoader
        color="black"
        gap={1}
        mode="pulse"
        pattern="solo-center"
        rounded
      />
      <span className="font-medium text-sm text-black">Loading</span>
    </div>
  );
}
