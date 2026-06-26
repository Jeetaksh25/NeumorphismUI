import { Theme } from './theme-colors';

export function neuRaised(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    boxShadow: `8px 8px 16px ${theme.shadowDark}, -8px -8px 16px ${theme.shadowLight}`,
  };
}

export function neuPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    boxShadow: `inset 6px 6px 10px ${theme.shadowDark}, inset -6px -6px 10px ${theme.shadowLight}`,
  };
}

export function neuButton(theme: Theme, size: 'sm' | 'md' | 'lg' = 'md') {
  const radius = size === 'sm' ? 12 : size === 'md' ? 16 : 20;
  return {
    backgroundColor: theme.bgColor,
    borderRadius: radius,
    boxShadow: `6px 6px 12px ${theme.shadowDark}, -6px -6px 12px ${theme.shadowLight}`,
  };
}

export function neuButtonPressed(theme: Theme, size: 'sm' | 'md' | 'lg' = 'md') {
  const radius = size === 'sm' ? 12 : size === 'md' ? 16 : 20;
  return {
    backgroundColor: theme.bgColor,
    borderRadius: radius,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuIconButton(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 24,
    boxShadow: `6px 6px 12px ${theme.shadowDark}, -6px -6px 12px ${theme.shadowLight}`,
  };
}

export function neuIconButtonPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 24,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuIconOnlyButton(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 14,
    boxShadow: `5px 5px 10px ${theme.shadowDark}, -5px -5px 10px ${theme.shadowLight}`,
  };
}

export function neuIconOnlyButtonPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 14,
    boxShadow: `inset 3px 3px 6px ${theme.shadowDark}, inset -3px -3px 6px ${theme.shadowLight}`,
  };
}

export function neuRoundButton(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 28,
    boxShadow: `8px 8px 16px ${theme.shadowDark}, -8px -8px 16px ${theme.shadowLight}`,
  };
}

export function neuRoundButtonPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 28,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuInput(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 16,
    boxShadow: `inset 6px 6px 10px ${theme.shadowDark}, inset -6px -6px 10px ${theme.shadowLight}`,
  };
}

export function neuInputFocused(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 16,
    boxShadow: `inset 8px 8px 14px ${theme.shadowDark}, inset -8px -8px 14px ${theme.shadowLight}`,
  };
}

export function neuCardRaised(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 24,
    boxShadow: `10px 10px 20px ${theme.shadowDark}, -10px -10px 20px ${theme.shadowLight}`,
  };
}

export function neuCardPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 24,
    boxShadow: `inset 8px 8px 16px ${theme.shadowDark}, inset -8px -8px 16px ${theme.shadowLight}`,
  };
}

export function neuFab(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 30,
    boxShadow: `8px 8px 16px ${theme.shadowDark}, -8px -8px 16px ${theme.shadowLight}`,
  };
}

export function neuFabPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 30,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuListItem(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 20,
    boxShadow: `6px 6px 12px ${theme.shadowDark}, -6px -6px 12px ${theme.shadowLight}`,
  };
}

export function neuListItemPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 20,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuChip(theme: Theme, active: boolean) {
  if (active) {
    return {
      backgroundColor: theme.bgColor,
      borderRadius: 20,
      boxShadow: `inset 3px 3px 6px ${theme.shadowDark}, inset -3px -3px 6px ${theme.shadowLight}`,
    };
  }
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 20,
    boxShadow: `4px 4px 8px ${theme.shadowDark}, -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuToggleTrack(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 15,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuToggleThumb(theme: Theme, active: boolean) {
  return {
    backgroundColor: active ? theme.accent : theme.bgColor,
    borderRadius: 11,
    boxShadow: active
      ? `2px 2px 5px ${theme.shadowDark}, -2px -2px 5px ${theme.shadowLight}`
      : `2px 2px 5px ${theme.shadowDark}, -2px -2px 5px ${theme.shadowLight}`,
  };
}

export function neuSliderTrack(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 7,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuSliderThumb(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 15,
    boxShadow: `4px 4px 10px ${theme.shadowDark}, -4px -4px 10px ${theme.shadowLight}`,
  };
}

export function neuProgressTrack(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 9,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuStepper(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 16,
    boxShadow: `inset 5px 5px 10px ${theme.shadowDark}, inset -5px -5px 10px ${theme.shadowLight}`,
  };
}

export function neuStepperBtn(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 12,
    boxShadow: `4px 4px 8px ${theme.shadowDark}, -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuStepperBtnPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 12,
    boxShadow: `inset 2px 2px 4px ${theme.shadowDark}, inset -2px -2px 4px ${theme.shadowLight}`,
  };
}

export function neuAlert(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 20,
    boxShadow: `8px 8px 16px ${theme.shadowDark}, -8px -8px 16px ${theme.shadowLight}`,
  };
}

export function neuAlertIcon(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 14,
    boxShadow: `4px 4px 8px ${theme.shadowDark}, -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuSegmentedControl(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 16,
    boxShadow: `inset 5px 5px 10px ${theme.shadowDark}, inset -5px -5px 10px ${theme.shadowLight}`,
  };
}

export function neuSegmentActive(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 12,
    boxShadow: `4px 4px 8px ${theme.shadowDark}, -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuAvatar(theme: Theme, size: number) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: size / 2,
    boxShadow: `6px 6px 12px ${theme.shadowDark}, -6px -6px 12px ${theme.shadowLight}`,
  };
}

export function neuTab(theme: Theme, active: boolean) {
  if (active) {
    return {
      backgroundColor: theme.bgColor,
      borderRadius: 14,
      boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
    };
  }
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 14,
    boxShadow: `5px 5px 10px ${theme.shadowDark}, -5px -5px 10px ${theme.shadowLight}`,
  };
}

export function neuTag(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 12,
    boxShadow: `3px 3px 6px ${theme.shadowDark}, -3px -3px 6px ${theme.shadowLight}`,
  };
}

export function neuRadioMark(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 13,
    boxShadow: `inset 3px 3px 6px ${theme.shadowDark}, inset -3px -3px 6px ${theme.shadowLight}`,
  };
}

export function neuCheckMark(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 8,
    boxShadow: `inset 3px 3px 6px ${theme.shadowDark}, inset -3px -3px 6px ${theme.shadowLight}`,
  };
}

export function neuAccordion(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 20,
    boxShadow: `6px 6px 12px ${theme.shadowDark}, -6px -6px 12px ${theme.shadowLight}`,
  };
}

export function neuBadge(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 11,
    boxShadow: `3px 3px 6px ${theme.shadowDark}, -3px -3px 6px ${theme.shadowLight}`,
  };
}

export function neuDivider(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 1,
    boxShadow: `inset 2px 2px 4px ${theme.shadowDark}, inset -2px -2px 4px ${theme.shadowLight}`,
  };
}

export function neuSkeleton(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 12,
    boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuSearchBar(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 20,
    boxShadow: `inset 5px 5px 10px ${theme.shadowDark}, inset -5px -5px 10px ${theme.shadowLight}`,
  };
}

export function neuInputIcon(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 13,
    boxShadow: `3px 3px 6px ${theme.shadowDark}, -3px -3px 6px ${theme.shadowLight}`,
  };
}

export function neuInputIconPressed(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 13,
    boxShadow: `inset 2px 2px 4px ${theme.shadowDark}, inset -2px -2px 4px ${theme.shadowLight}`,
  };
}

export function neuListIcon(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderRadius: 14,
    boxShadow: `4px 4px 8px ${theme.shadowDark}, -4px -4px 8px ${theme.shadowLight}`,
  };
}

export function neuRatingStar(active: boolean, color: string, theme: Theme) {
  if (active) {
    return {
      backgroundColor: theme.bgColor,
      borderRadius: '50%',
      boxShadow: `inset 2px 2px 4px ${theme.shadowDark}, inset -2px -2px 4px ${theme.shadowLight}, 0 0 12px ${color}66`,
    };
  }
  return {
    backgroundColor: theme.bgColor,
    borderRadius: '50%',
    boxShadow: `3px 3px 6px ${theme.shadowDark}, -3px -3px 6px ${theme.shadowLight}`,
  };
}

export function neuNavbarBottom(theme: Theme) {
  return {
    backgroundColor: theme.bgColor,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    boxShadow: '0px -6px 20px rgba(163, 177, 198, 0.25)',
  };
}

export function neuNavItem(theme: Theme, active: boolean) {
  if (active) {
    return {
      backgroundColor: theme.bgColor,
      borderRadius: 16,
      boxShadow: `inset 4px 4px 8px ${theme.shadowDark}, inset -4px -4px 8px ${theme.shadowLight}`,
    };
  }
  return {
    backgroundColor: 'transparent',
    borderRadius: 16,
    boxShadow: 'none',
  };
}
