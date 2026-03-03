import type { Metadata } from "next";

import { TextToSpeechView } from "@/modules/text-to-speech/views/text-to-speech-view";

export const metadata: Metadata = { title: "Text to speech" };

const Page = () => {
  return <TextToSpeechView />;
};

export default Page;
