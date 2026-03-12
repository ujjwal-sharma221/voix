"use client";

import { useStore } from "@tanstack/react-form";

import {
  Select,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";
import { ttsFormOptions } from "./text-to-speech-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { useTtsVoice } from "../contexts/tts-voices-context";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { VoiceAvatar } from "@/modules/voices/components/voice-avatar";
import { VOICE_CATEGORY_LABELS } from "@/modules/voices/data/voice-categories";

export function VoiceSelector() {
  const { customVoices, systemVoices, allVoices: voices } = useTtsVoice();

  const form = useTypedAppFormContext(ttsFormOptions);
  const voiceId = useStore(form.store, (s) => s.values.voiceId);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  const selectedVoice = voices.find((v) => v.id === voiceId);
  const hasMissingSelectedVoice = Boolean(voiceId) && !selectedVoice;
  const currentVoice = selectedVoice
    ? selectedVoice
    : hasMissingSelectedVoice
      ? {
          id: voiceId,
          name: "Unavailable voice",
          category: null as null,
        }
      : voices[0];

  return (
    <Field>
      <FieldLabel>Voice Style</FieldLabel>
      <Select
        value={voiceId}
        onValueChange={(v) => form.setFieldValue("voiceId", v)}
        disabled={isSubmitting}
      >
        <SelectTrigger className="w-full h-auto gap-1 rounded-lg bg-white px-2 py-1">
          <SelectValue>
            {currentVoice ? (
              <>
                <VoiceAvatar seed={currentVoice.id} name={currentVoice.name} />
                <span className="truncate text-sm font-medium tracking-tight">
                  {currentVoice.name}
                  {currentVoice.category &&
                    ` - ${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                </span>
              </>
            ) : null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {hasMissingSelectedVoice && currentVoice && (
            <>
              <SelectGroup>
                <SelectLabel>Selected Voice</SelectLabel>
                <SelectItem value={currentVoice.id}>
                  <VoiceAvatar
                    seed={currentVoice.id}
                    name={currentVoice.name}
                  />
                  <span className="truncate text-sm font-medium tracking-tight">
                    {currentVoice.name}
                    {currentVoice.category &&
                      ` - ${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                  </span>
                </SelectItem>
              </SelectGroup>

              {(customVoices.length > 0 || systemVoices.length > 0) && (
                <SelectSeparator />
              )}
            </>
          )}

          {customVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Custom Voices</SelectLabel>
              {customVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <VoiceAvatar seed={voice.id} name={voice.name} />
                  <span className="truncate text-sm font-medium tracking-tight">
                    {voice.name}
                    {` - ${VOICE_CATEGORY_LABELS[voice.category]}`}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          )}

          {(customVoices.length > 0 || systemVoices.length > 0) && (
            <SelectSeparator />
          )}

          {systemVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Built-in-voices</SelectLabel>
              {systemVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <VoiceAvatar seed={voice.id} name={voice.name} />
                  <span className="truncate text-sm font-medium tracking-tight">
                    {voice.name}
                    {` - ${VOICE_CATEGORY_LABELS[voice.category]}`}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </Field>
  );
}
