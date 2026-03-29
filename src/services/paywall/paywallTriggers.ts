/**
 * Paywall trigger helpers.
 *
 * - **Preview-style (soft):** use `getPremiumVoicePaywallTrigger` when free users get a few tries
 *   before a paywall (e.g. practice “Natural voice” previews).
 * - **Intent-style (direct):** use `getManualPremiumTapTrigger` when the user explicitly chose a
 *   premium entry point (Settings “Upgrade”, review insights, voice settings, locked packs).
 *   Do not use it on the main practice hear buttons — it is an immediate wall and kills preview value.
 */
import { FREE_LIMITS, type UserPlan } from '@/src/constants/plan';

type TriggerReason =
  | 'premium_voice_preview_limit'
  | 'premium_voice_manual_tap'
  | 'premium_feature_lock';

type TriggerResult = {
  shouldShow: boolean;
  reason?: TriggerReason;
};

/** Free users: paywall only after `premiumHearPreviewCount` natural-voice previews. Premium: never. */
export function getPremiumVoicePaywallTrigger(params: {
  plan: UserPlan;
  premiumHearCount: number;
}): TriggerResult {
  const { plan, premiumHearCount } = params;

  if (plan === 'premium') {
    return { shouldShow: false };
  }

  if (premiumHearCount >= FREE_LIMITS.premiumHearPreviewCount) {
    return {
      shouldShow: true,
      reason: 'premium_voice_preview_limit',
    };
  }

  return { shouldShow: false };
}

/**
 * Free users: always show paywall (explicit premium intent). Premium: never.
 * Use for Settings → Upgrade, review premium insights, voice settings, locked lesson packs — not practice Play/Slow.
 */
export function getManualPremiumTapTrigger(plan: UserPlan): TriggerResult {
  if (plan === 'premium') {
    return { shouldShow: false };
  }

  return {
    shouldShow: true,
    reason: 'premium_voice_manual_tap',
  };
}
