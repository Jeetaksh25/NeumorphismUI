export interface Theme {
  bgColor: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentLight: string;
  shadowLight: string;
  shadowDark: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export type ThemeOverride = Partial<Theme>;

// Core / system
export const originalTheme: Theme = {
  bgColor: "#e0e5ec",
  textPrimary: "#4a5568",
  textSecondary: "#a0aec0",
  accent: "#667eea",
  accentLight: "#764ba2",
  shadowLight: "#ffffff",
  shadowDark: "#a3b1c6",
  success: "#48bb78",
  warning: "#ed8936",
  danger: "#f56565",
  info: "#4299e1",
};

export const defaultTheme: Theme = {
  bgColor: "#EDF2FA",
  textPrimary: "#0D1117",
  textSecondary: "#5A6478",
  accent: "#4285F4",
  accentLight: "#8AB4F8",
  shadowLight: "#FFFFFF",
  shadowDark: "#B0C0E0",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const lightTheme: Theme = {
  bgColor: "#E8EEF8",
  textPrimary: "#0D1421",
  textSecondary: "#5A6478",
  accent: "#4285F4",
  accentLight: "#8AB4F8",
  shadowLight: "#FFFFFF",
  shadowDark: "#B8C6DA",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const frostCommandTheme: Theme = defaultTheme;

export const darkTheme: Theme = {
  bgColor: "#1A2030",
  textPrimary: "#E8EDF5",
  textSecondary: "#5C6680",
  accent: "#4285F4",
  accentLight: "#8AB4F8",
  shadowLight: "#252E42",
  shadowDark: "#0D1520",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

// Light themes
export const defaultThemeO: Theme = {
  bgColor: "#DDE3F0",
  textPrimary: "#161B2A",
  textSecondary: "#5A6478",
  accent: "#4D9FFF",
  accentLight: "#8AB4F8",
  shadowLight: "#FFFFFF",
  shadowDark: "#B8C2D8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const arcticFrostTheme: Theme = {
  bgColor: "#E8EEF7",
  textPrimary: "#1B2430",
  textSecondary: "#5A6478",
  accent: "#5DA9FF",
  accentLight: "#8AB4F8",
  shadowLight: "#FFFFFF",
  shadowDark: "#BEC8D8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const lavenderGlassTheme: Theme = {
  bgColor: "#ECE9F6",
  textPrimary: "#22223B",
  textSecondary: "#6E6680",
  accent: "#8B7CFF",
  accentLight: "#B0A8FF",
  shadowLight: "#FFFFFF",
  shadowDark: "#C5BEDA",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const mintBreezeTheme: Theme = {
  bgColor: "#E6F4F1",
  textPrimary: "#1F2D2A",
  textSecondary: "#5A6E6A",
  accent: "#3ECFBE",
  accentLight: "#6EDFD0",
  shadowLight: "#FFFFFF",
  shadowDark: "#BCD6D1",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const peachBloomTheme: Theme = {
  bgColor: "#F7ECE7",
  textPrimary: "#2D1F1A",
  textSecondary: "#8A7068",
  accent: "#FF8A65",
  accentLight: "#FFAB91",
  shadowLight: "#FFFFFF",
  shadowDark: "#D8C3BA",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const skyPearlTheme: Theme = {
  bgColor: "#EAF1F9",
  textPrimary: "#18202B",
  textSecondary: "#5A6478",
  accent: "#4F8CFF",
  accentLight: "#8AB4F8",
  shadowLight: "#FFFFFF",
  shadowDark: "#C1CBDD",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const ivoryDisciplineTheme: Theme = {
  bgColor: "#F0EDE8",
  textPrimary: "#1A1612",
  textSecondary: "#6A6460",
  accent: "#C4873A",
  accentLight: "#D4A76A",
  shadowLight: "#FFFFFF",
  shadowDark: "#C8C4BE",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const chalkArenaTheme: Theme = {
  bgColor: "#F5F5F7",
  textPrimary: "#111114",
  textSecondary: "#5A5A60",
  accent: "#FF3B30",
  accentLight: "#FF6B60",
  shadowLight: "#FFFFFF",
  shadowDark: "#C8C8CE",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const sandStoicTheme: Theme = {
  bgColor: "#EDE8DF",
  textPrimary: "#1C1812",
  textSecondary: "#6A6458",
  accent: "#8B5E3C",
  accentLight: "#AB7E5C",
  shadowLight: "#FFFFFF",
  shadowDark: "#C4BEB4",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const pearlSigmaTheme: Theme = {
  bgColor: "#E8ECF4",
  textPrimary: "#0A0C14",
  textSecondary: "#5A6478",
  accent: "#1A1A2E",
  accentLight: "#4A4A5E",
  shadowLight: "#FFFFFF",
  shadowDark: "#B4BAC8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const cloudDisciplineTheme: Theme = {
  bgColor: "#E4E9F2",
  textPrimary: "#141820",
  textSecondary: "#5A6478",
  accent: "#3B82F6",
  accentLight: "#6BA2F8",
  shadowLight: "#FFFFFF",
  shadowDark: "#B0B8CC",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const porcelainStudioTheme: Theme = {
  bgColor: "#F4F1EE",
  textPrimary: "#1A1714",
  textSecondary: "#6A6560",
  accent: "#6B4FBB",
  accentLight: "#9B7FEB",
  shadowLight: "#FFFFFF",
  shadowDark: "#C8C4BE",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const rosePaperTheme: Theme = {
  bgColor: "#FAF0F3",
  textPrimary: "#2A1018",
  textSecondary: "#8A6070",
  accent: "#C44472",
  accentLight: "#D474A0",
  shadowLight: "#FFFFFF",
  shadowDark: "#D8C4CC",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const creamVaultTheme: Theme = {
  bgColor: "#F8F4EC",
  textPrimary: "#18140A",
  textSecondary: "#6A6458",
  accent: "#9A6B20",
  accentLight: "#BA9B50",
  shadowLight: "#FFFFFF",
  shadowDark: "#D0C8B0",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const glacierClearTheme: Theme = {
  bgColor: "#EEF4FB",
  textPrimary: "#0C1826",
  textSecondary: "#5A6478",
  accent: "#0076D6",
  accentLight: "#3A96F6",
  shadowLight: "#FFFFFF",
  shadowDark: "#B8C8DC",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const silkSageTheme: Theme = {
  bgColor: "#EEF4EE",
  textPrimary: "#101A10",
  textSecondary: "#5A6E5A",
  accent: "#2E8B57",
  accentLight: "#5EAB87",
  shadowLight: "#FFFFFF",
  shadowDark: "#B8D0B8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const blushLienenTheme: Theme = {
  bgColor: "#FAF5F0",
  textPrimary: "#251A12",
  textSecondary: "#6A6058",
  accent: "#C07050",
  accentLight: "#D09070",
  shadowLight: "#FFFFFF",
  shadowDark: "#D8CCC0",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const hailstoneTheme: Theme = {
  bgColor: "#ECEEF4",
  textPrimary: "#0E101C",
  textSecondary: "#5A6478",
  accent: "#5060CC",
  accentLight: "#8090EC",
  shadowLight: "#FFFFFF",
  shadowDark: "#C0C4D8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const zephyrLaceTheme: Theme = {
  bgColor: "#F2F4FA",
  textPrimary: "#10142A",
  textSecondary: "#5A6478",
  accent: "#4460CC",
  accentLight: "#7490FC",
  shadowLight: "#FFFFFF",
  shadowDark: "#C0C4D8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const oldPaperTheme: Theme = {
  bgColor: "#F0E8D0",
  textPrimary: "#1A1200",
  textSecondary: "#6A6058",
  accent: "#7A5010",
  accentLight: "#AA8040",
  shadowLight: "#FFFFFF",
  shadowDark: "#C8C0A0",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const pebbleCoastTheme: Theme = {
  bgColor: "#EAE8E4",
  textPrimary: "#141210",
  textSecondary: "#6A6560",
  accent: "#506070",
  accentLight: "#8090A0",
  shadowLight: "#FFFFFF",
  shadowDark: "#C4C0B8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const apricotDustTheme: Theme = {
  bgColor: "#FAF0E8",
  textPrimary: "#2A1808",
  textSecondary: "#6A6058",
  accent: "#E07840",
  accentLight: "#F09870",
  shadowLight: "#FFFFFF",
  shadowDark: "#D8C8BC",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const lilacHazeTheme: Theme = {
  bgColor: "#F3EEF9",
  textPrimary: "#1C1028",
  textSecondary: "#6A6080",
  accent: "#8050CC",
  accentLight: "#A080EC",
  shadowLight: "#FFFFFF",
  shadowDark: "#CCC0DC",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const tealParchmentTheme: Theme = {
  bgColor: "#E8F4F0",
  textPrimary: "#081820",
  textSecondary: "#5A6E6A",
  accent: "#007B6E",
  accentLight: "#3A9B9E",
  shadowLight: "#FFFFFF",
  shadowDark: "#B0D0C8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const snowfieldTheme: Theme = {
  bgColor: "#F6F8FF",
  textPrimary: "#080C20",
  textSecondary: "#5A6478",
  accent: "#3355EE",
  accentLight: "#6385FE",
  shadowLight: "#FFFFFF",
  shadowDark: "#C0C8E0",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const sunbleachedTheme: Theme = {
  bgColor: "#F8F2E0",
  textPrimary: "#201800",
  textSecondary: "#6A6058",
  accent: "#B08000",
  accentLight: "#D0A030",
  shadowLight: "#FFFFFF",
  shadowDark: "#D0C8A8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const marbleHallTheme: Theme = {
  bgColor: "#F0EEF4",
  textPrimary: "#141018",
  textSecondary: "#6A6080",
  accent: "#785A9E",
  accentLight: "#A88ACE",
  shadowLight: "#FFFFFF",
  shadowDark: "#C8C4D4",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const celadonGalleryTheme: Theme = {
  bgColor: "#ECF2ED",
  textPrimary: "#0C180E",
  textSecondary: "#5A6E5A",
  accent: "#3A7A58",
  accentLight: "#6AAA88",
  shadowLight: "#FFFFFF",
  shadowDark: "#C0D0C4",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const dustyRoseGardenTheme: Theme = {
  bgColor: "#F6EEF0",
  textPrimary: "#200C10",
  textSecondary: "#8A6070",
  accent: "#B04468",
  accentLight: "#D07498",
  shadowLight: "#FFFFFF",
  shadowDark: "#D4C4C8",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const indigoVellumTheme: Theme = {
  bgColor: "#EEEAF8",
  textPrimary: "#100C28",
  textSecondary: "#6A6080",
  accent: "#4430A0",
  accentLight: "#7460D0",
  shadowLight: "#FFFFFF",
  shadowDark: "#C8C0DC",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const waxSealTheme: Theme = {
  bgColor: "#F2EDE8",
  textPrimary: "#1C1410",
  textSecondary: "#6A6058",
  accent: "#A03020",
  accentLight: "#C06050",
  shadowLight: "#FFFFFF",
  shadowDark: "#CCC4BC",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

// Dark themes
export const obsidianSteelTheme: Theme = {
  bgColor: "#1E2433",
  textPrimary: "#E8EDF5",
  textSecondary: "#5C6680",
  accent: "#5B8FFF",
  accentLight: "#8BB8FF",
  shadowLight: "#2A3448",
  shadowDark: "#0F1219",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const graphiteNoirTheme: Theme = {
  bgColor: "#1A1A2E",
  textPrimary: "#E0E4F0",
  textSecondary: "#5C6680",
  accent: "#E94560",
  accentLight: "#F97590",
  shadowLight: "#252540",
  shadowDark: "#0D0D1A",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const slateInkTheme: Theme = {
  bgColor: "#232B3E",
  textPrimary: "#EAF0FF",
  textSecondary: "#5C6680",
  accent: "#4ECDC4",
  accentLight: "#7EFDF4",
  shadowLight: "#2F3850",
  shadowDark: "#131820",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const titaniumTheme: Theme = {
  bgColor: "#242830",
  textPrimary: "#F0F2F8",
  textSecondary: "#5C6680",
  accent: "#A78BFA",
  accentLight: "#D7BBFF",
  shadowLight: "#2F3440",
  shadowDark: "#141618",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const carbonGoldTheme: Theme = {
  bgColor: "#1C1F2A",
  textPrimary: "#F5F0E8",
  textSecondary: "#6A6560",
  accent: "#D4A853",
  accentLight: "#F4D883",
  shadowLight: "#2A2D3A",
  shadowDark: "#0E0F16",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const voidPurpleTheme: Theme = {
  bgColor: "#1A1528",
  textPrimary: "#EDE8FF",
  textSecondary: "#6A6080",
  accent: "#9D6FFF",
  accentLight: "#CD9FFF",
  shadowLight: "#252040",
  shadowDark: "#0C0A14",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const midnightSapphireTheme: Theme = {
  bgColor: "#0D1B2A",
  textPrimary: "#E8F0FF",
  textSecondary: "#5C6680",
  accent: "#3A8EFF",
  accentLight: "#6ABEFF",
  shadowLight: "#162840",
  shadowDark: "#060E17",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const deepForestTheme: Theme = {
  bgColor: "#0F1A14",
  textPrimary: "#D8F0E0",
  textSecondary: "#5A6E5A",
  accent: "#2ECC71",
  accentLight: "#5EFCA1",
  shadowLight: "#1A2A22",
  shadowDark: "#060D09",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const crimsonNightTheme: Theme = {
  bgColor: "#1A0D12",
  textPrimary: "#FFE8EE",
  textSecondary: "#8A6070",
  accent: "#FF3366",
  accentLight: "#FF6396",
  shadowLight: "#2A1820",
  shadowDark: "#0A0508",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const auroraDepthTheme: Theme = {
  bgColor: "#0A1628",
  textPrimary: "#E0F4FF",
  textSecondary: "#5C6680",
  accent: "#00CFFF",
  accentLight: "#30FFFF",
  shadowLight: "#142640",
  shadowDark: "#040A14",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const ironVaultTheme: Theme = {
  bgColor: "#181C22",
  textPrimary: "#DCE4F0",
  textSecondary: "#5C6680",
  accent: "#7EB8FF",
  accentLight: "#AEE8FF",
  shadowLight: "#242A32",
  shadowDark: "#0B0E12",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const volcanicAshTheme: Theme = {
  bgColor: "#1C1610",
  textPrimary: "#F0E8D8",
  textSecondary: "#6A6058",
  accent: "#FF6B35",
  accentLight: "#FF9B65",
  shadowLight: "#2A2218",
  shadowDark: "#0C0A06",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const galacticIndigoTheme: Theme = {
  bgColor: "#10102A",
  textPrimary: "#E8E0FF",
  textSecondary: "#6A6080",
  accent: "#9B8FFF",
  accentLight: "#CBBFFF",
  shadowLight: "#1A1A40",
  shadowDark: "#060614",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const stormcloudTheme: Theme = {
  bgColor: "#141A24",
  textPrimary: "#D8E4F8",
  textSecondary: "#5C6680",
  accent: "#5BA8FF",
  accentLight: "#8BD8FF",
  shadowLight: "#1E2838",
  shadowDark: "#080C12",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const copperRustTheme: Theme = {
  bgColor: "#1A1410",
  textPrimary: "#F5E8D8",
  textSecondary: "#6A6058",
  accent: "#D4845A",
  accentLight: "#F4B48A",
  shadowLight: "#282018",
  shadowDark: "#0C0A08",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const neonDuskTheme: Theme = {
  bgColor: "#0E0E1E",
  textPrimary: "#F0EEFF",
  textSecondary: "#6A6080",
  accent: "#FF2D87",
  accentLight: "#FF5DB7",
  shadowLight: "#1A1A30",
  shadowDark: "#060610",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const seleniteTheme: Theme = {
  bgColor: "#15202E",
  textPrimary: "#E8F2FF",
  textSecondary: "#5C6680",
  accent: "#88C0FF",
  accentLight: "#B8F0FF",
  shadowLight: "#1F3040",
  shadowDark: "#091018",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const duneCipherTheme: Theme = {
  bgColor: "#1A160E",
  textPrimary: "#F2EAD8",
  textSecondary: "#6A6058",
  accent: "#C4A44A",
  accentLight: "#F4D47A",
  shadowLight: "#282218",
  shadowDark: "#0C0A06",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const polarNightTheme: Theme = {
  bgColor: "#101820",
  textPrimary: "#E0EEFF",
  textSecondary: "#5C6680",
  accent: "#4ECDC4",
  accentLight: "#7EFDF4",
  shadowLight: "#1A2838",
  shadowDark: "#060C10",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const phantomGrayTheme: Theme = {
  bgColor: "#171717",
  textPrimary: "#F0F0F0",
  textSecondary: "#6A6A6A",
  accent: "#A0A0A0",
  accentLight: "#D0D0D0",
  shadowLight: "#252525",
  shadowDark: "#0A0A0A",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const abyssalTealTheme: Theme = {
  bgColor: "#0A1E1E",
  textPrimary: "#D8F5F0",
  textSecondary: "#5A6E6A",
  accent: "#00BFA5",
  accentLight: "#30EFD5",
  shadowLight: "#122E2E",
  shadowDark: "#040E0E",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const onyxRoseTheme: Theme = {
  bgColor: "#1C1418",
  textPrimary: "#FFE8F0",
  textSecondary: "#8A6070",
  accent: "#E878A0",
  accentLight: "#F8A8D0",
  shadowLight: "#2A1E24",
  shadowDark: "#0C080C",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const tungstenTheme: Theme = {
  bgColor: "#1E1E1E",
  textPrimary: "#EEEEEE",
  textSecondary: "#6A6A6A",
  accent: "#F0A500",
  accentLight: "#FFD530",
  shadowLight: "#2E2E2E",
  shadowDark: "#0E0E0E",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const cosmicMerlotTheme: Theme = {
  bgColor: "#180A22",
  textPrimary: "#F0E0FF",
  textSecondary: "#6A6080",
  accent: "#C45FFF",
  accentLight: "#F48FFF",
  shadowLight: "#261036",
  shadowDark: "#0A0410",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const quartzShadowTheme: Theme = {
  bgColor: "#1A1C2A",
  textPrimary: "#EAE8FF",
  textSecondary: "#6A6080",
  accent: "#6E78FF",
  accentLight: "#9EA8FF",
  shadowLight: "#262840",
  shadowDark: "#0C0E16",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const brassTerminalTheme: Theme = {
  bgColor: "#141008",
  textPrimary: "#F8F0D0",
  textSecondary: "#6A6058",
  accent: "#D4A030",
  accentLight: "#F4D060",
  shadowLight: "#201C10",
  shadowDark: "#080604",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#4F46E5",
};

export const themes: Record<string, Theme> = {
  originalTheme,
  defaultTheme,
  frostCommandTheme,
  darkTheme,
  defaultThemeO,
  arcticFrostTheme,
  lavenderGlassTheme,
  mintBreezeTheme,
  peachBloomTheme,
  skyPearlTheme,
  ivoryDisciplineTheme,
  chalkArenaTheme,
  sandStoicTheme,
  pearlSigmaTheme,
  cloudDisciplineTheme,
  porcelainStudioTheme,
  rosePaperTheme,
  creamVaultTheme,
  glacierClearTheme,
  silkSageTheme,
  blushLienenTheme,
  hailstoneTheme,
  zephyrLaceTheme,
  oldPaperTheme,
  pebbleCoastTheme,
  apricotDustTheme,
  lilacHazeTheme,
  tealParchmentTheme,
  snowfieldTheme,
  sunbleachedTheme,
  marbleHallTheme,
  celadonGalleryTheme,
  dustyRoseGardenTheme,
  indigoVellumTheme,
  waxSealTheme,
  obsidianSteelTheme,
  graphiteNoirTheme,
  slateInkTheme,
  titaniumTheme,
  carbonGoldTheme,
  voidPurpleTheme,
  midnightSapphireTheme,
  deepForestTheme,
  crimsonNightTheme,
  auroraDepthTheme,
  ironVaultTheme,
  volcanicAshTheme,
  galacticIndigoTheme,
  stormcloudTheme,
  copperRustTheme,
  neonDuskTheme,
  seleniteTheme,
  duneCipherTheme,
  polarNightTheme,
  phantomGrayTheme,
  abyssalTealTheme,
  onyxRoseTheme,
  tungstenTheme,
  cosmicMerlotTheme,
  quartzShadowTheme,
  brassTerminalTheme,
};
