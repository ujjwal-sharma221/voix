"use client";

import { useStore } from "@tanstack/react-form";

import { sliders } from "../data/sliders";
import { Slider } from "@/components/ui/slider";
import { ttsFormOptions } from "./text-to-speech-form";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export function SettingsPanelSettings() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    <>
      <div className="border-b border-dashed p-4">
        <p>Voice selector</p>
      </div>

      <div className="p-4 flex-1">
        <FieldGroup className="gap-8">
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {slider.leftLabel}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {slider.rightLabel}
                    </span>
                  </div>
                  <Slider
                    value={[field.state.value]}
                    onValueChange={(val) => field.handleChange(val[0])}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    disabled={isSubmitting}
                    className="**:data-[slot=slider-thumb]:size-3  **:data-[slot=slider-track]:h-1"
                  />
                </Field>
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
}
