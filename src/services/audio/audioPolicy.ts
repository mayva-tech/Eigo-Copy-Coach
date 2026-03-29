import { FREE_LIMITS, type AudioMode, type UserPlan } from '@/src/constants/plan';

type GetAudioModeParams = {
  plan: UserPlan;
};

export function getAudioMode({ plan }: GetAudioModeParams): AudioMode {
  if (plan === 'premium') return 'premium';
  return 'basic';
}

type ShouldPromptPaywallParams = {
  plan: UserPlan;
  premiumHearCount: number;
};

export function shouldPromptPaywallAfterHear({
  plan,
  premiumHearCount,
}: ShouldPromptPaywallParams): boolean {
  if (plan === 'premium') return false;
  return premiumHearCount >= FREE_LIMITS.premiumTapSoftGateAfter;
}
