import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import { createContext, useContext } from "react";

type ttsVoiceItem =
  inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number];

interface TtsVoiceContextValue {
  customVoices: ttsVoiceItem[];
  systemVoices: ttsVoiceItem[];
  allVoices: ttsVoiceItem[];
}

const TtsVoiceContext = createContext<TtsVoiceContextValue | null>(null);

export const TtsProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TtsVoiceContextValue;
}) => {
  return (
    <TtsVoiceContext.Provider value={value}>
      {children}
    </TtsVoiceContext.Provider>
  );
};

export function useTtsVoice() {
  const context = useContext(TtsVoiceContext);

  if (!context) {
    throw new Error("useTtsVoice must be wrapped in TtsProvider");
  }

  return context;
}
