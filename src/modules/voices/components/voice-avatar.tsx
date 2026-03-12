import { cn } from "@/lib/utils";
import { useVoiceAvatar } from "@/hooks/use-voice-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  seed: string;
  name: string;
  className?: string;
}

export function VoiceAvatar({ seed, className, name }: Props) {
  const avatarUrl = useVoiceAvatar(seed);

  return (
    <Avatar className={cn("size-4 border-white shadow-xs", className)}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className="text-[8px]">{name}</AvatarFallback>
    </Avatar>
  );
}
