"use client";

import { z } from "zod/v4";
import { useAppForm } from "@/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";

const formSchema = z.object({
  text: z.string().min(1, "Please enter some text"),
  voiceId: z.string().min(1, "Please select a voice"),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

export type TtsFormValues = z.infer<typeof formSchema>;

export const defaultTtsValues: TtsFormValues = {
  text: "",
  voiceId: "",
  temperature: 0.8,
  topK: 1000,
  topP: 0.95,
  repetitionPenalty: 1.2,
};

export const ttsFormOptions = formOptions({
  defaultValues: defaultTtsValues,
});

export function TextToSpeechForm({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: TtsFormValues;
}) {
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTtsValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (values) => {
      alert(values);
    },
  });

  return <form.AppForm>{children}</form.AppForm>;
}
