"use client";

import {
  defaultTtsValues,
  TextToSpeechForm,
} from "../components/text-to-speech-form";
import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import { VoicePreviewPlaceHolder } from "../components/voice-preview-placeholder";

export function TextToSpeechView() {
  return (
    <TextToSpeechForm defaultValues={defaultTtsValues}>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col">
          <TextInputPanel />
          <VoicePreviewPlaceHolder />
        </div>
        <SettingsPanel />
      </div>
    </TextToSpeechForm>
  );
}
