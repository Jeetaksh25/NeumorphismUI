# GrindOn Neumorphism Design System - Port to Next.js Reference

> **Purpose of this document**
> This is a complete, hand-rolled reference of the GrindOn React Native
> neumorphism component library. Feed this file (or relevant sections) to
> another AI and ask it to rebuild the same design system for a **Next.js**
> app using **Tailwind CSS** + **plain HTML / React Server Components**.
> The goal: every component in the web port must look **identical or
> better** to the source. Premium feel is non-negotiable.

---

## 1. How the design system is built (mental model)

GrindOn's neumorphism has three layers:

1. **Theme** - A Theme object that defines gColor, two shadow colors
   (shadowLight, shadowDark), an ccent, plus text and status colors.
   60+ palettes are pre-baked. There is also light/dark system awareness.

2. **Style helpers** - Pure functions in 
eumorphism.ts that take a
   Theme and return React Native style objects. Each helper produces
   either a *raised* look (outer dual shadow) or a *pressed/inset* look
   (inner dual shadow). Helpers are the *only* place that knows how
   shadowLight and shadowDark combine.

3. **Components** - Thin React components that:
   - Accept a 	heme?: ThemeOverride (partial override of the active theme).
   - Call 
esolveTheme(theme) to get a full Theme.
   - Pull the right 
euXxx() helper and combine it with the
     component-specific layout (padding, border radius, label, icon, etc.).
   - Wire up press state (raised -> pressed on press-in), haptics
     (expo-haptics), and accessibility roles.

For the **web port**, the same three layers exist:

1. **Theme** - A TypeScript object (or a CSS variables object) with the
   same keys, exposed as a React context plus a useTheme() hook.
2. **Style helpers** - Either a cn(...) utility that returns Tailwind
   class strings, or tiny functions returning className plus a
   style={{ boxShadow, backgroundColor }} object. The key to a
   pixel-perfect port is using real CSS ox-shadow strings
   (\Xpx Ypx Zpx A, -Xpx -Ypx Zpx B\), because that is exactly what
   the source code does on the web side.
3. **Components** - Server or client components in
   components/neumorphism/, same prop names, same defaults, same look.

> **Critical insight from the source.** The web oxShadow string is
> present in *every* helper, alongside the native shadow object.
> Example from 
euRaised:
>
> \\\	s
> dualShadow(
>   false,
>   \8px 8px 16px \, -8px -8px 16px \\,
>   nativeRaised(t.shadowDark, 4, 8, 0.3, 4)
> )
> \\\
>
> This means a clean web port can **drop the native half** and use the
> oxShadow strings 1-to-1. That gives pixel parity with the React
> Native web build for free.

---

## 2. The \Theme\ shape

\\\	s
export interface Theme {
  bgColor: string;        // Page / surface background
  textPrimary: string;    // High-emphasis text
  textSecondary: string;  // Low-emphasis text, labels, placeholders
  accent: string;         // Brand color (active states, primary CTAs)
  accentLight: string;    // Lighter accent for chips/active fills
  shadowLight: string;    // Highlight shadow (top-left, light source)
  shadowDark: string;     // Deep shadow (bottom-right)
  success: string;        // Positive status
  warning: string;        // Caution status
  danger: string;         // Destructive / error status
  info: string;           // Neutral info status
}

export type ThemeOverride = Partial<Theme>;
\\\

> The **light and dark shadow pair** is the single most important
> decision in the system. For light themes \shadowLight\ is near white
> (e.g. \#FFFFFF\), \shadowDark\ is a soft cool grey (e.g. \#B0C0E0\).
> For dark themes \shadowLight\ is a touch lighter than \gColor\
> (e.g. \#252E42\ over \#1A2030\), \shadowDark\ is near black with a
> blue tint (e.g. \#0D1520\). Always pick a \shadowDark\ that has the
> same hue family as \gColor\ so the shadow does not look out of place.

### Web implementation notes

- Set the page background to \	heme.bgColor\ on \<body>\.
- Inject the theme as CSS variables on \:root\ so Tailwind utilities
  (e.g. \g-[var(--bg)]\, \	ext-[var(--text-primary)]\) can read them.
- A helper \getThemeStyles(theme: Theme)\ can return the same
  \oxShadow\ strings used in the RN source, exposed via a
  \style={{ boxShadow }}\ prop or a Tailwind arbitrary value
  (\shadow-[8px_8px_16px_#B0C0E0,_-8px_-8px_16px_#FFFFFF]\).

---

## 3. The complete theme catalog (60+ palettes)

All themes are taken verbatim from \GrindOn/components/neumorphism/theme-colors.ts\
(re-exported through \	heme.ts\ as the \lightTheme\ / \darkTheme\ aliases).
They are grouped in the source by intent: original, light, dark, premium
"discipline" neutrals, and expressive hues. Names below are the exact
identifiers used in code; the first one (\originalTheme\) is the legacy
\e0e5ec\ palette.

### 3.1 Core / system

#### \originalTheme\
\\\	s
{ bgColor: "#e0e5ec", textPrimary: "#4a5568", textSecondary: "#a0aec0",
  accent: "#667eea", accentLight: "#764ba2",
  shadowLight: "#ffffff", shadowDark: "#a3b1c6",
  success: "#48bb78", warning: "#ed8936", danger: "#f56565", info: "#4299e1" }
\\\

#### \defaultTheme\ (alias \rostCommandTheme\)
\\\	s
{ bgColor: "#EDF2FA", textPrimary: "#0D1117", textSecondary: "#5A6478",
  accent: "#4285F4", accentLight: "#8AB4F8",
  shadowLight: "#FFFFFF", shadowDark: "#B0C0E0",
  success: "#059669", warning: "#D97706", danger: "#DC2626", info: "#4F46E5" }
\\\

#### \darkTheme\ (dark system)
\\\	s
{ bgColor: "#1A2030", textPrimary: "#E8EDF5", textSecondary: "#5C6680",
  accent: "#4285F4", accentLight: "#8AB4F8",
  shadowLight: "#252E42", shadowDark: "#0D1520",
  success: "#059669", warning: "#D97706", danger: "#DC2626", info: "#4F46E5" }
\\\

> The \	heme.ts\ file also exports the same palettes as \lightTheme\ and
> \darkTheme\ with slightly different shadowDark tuning for the system
> provider; you can pick either set - they are visually indistinguishable
> for most surfaces. Use \defaultTheme\ + \darkTheme\ from \	heme-colors.ts\
> as the canonical source.

### 3.2 Light themes (cool / warm / pastel)

| Key | bgColor | textPrimary | accent | shadowDark |
|-----|---------|-------------|--------|------------|
| \defaultThemeO\ | \#DDE3F0\ | \#161B2A\ | \#4D9FFF\ | \#B8C2D8\ |
| \rcticFrostTheme\ | \#E8EEF7\ | \#1B2430\ | \#5DA9FF\ | \#BEC8D8\ |
| \lavenderGlassTheme\ | \#ECE9F6\ | \#22223B\ | \#8B7CFF\ | \#C5BEDA\ |
| \mintBreezeTheme\ | \#E6F4F1\ | \#1F2D2A\ | \#3ECFBE\ | \#BCD6D1\ |
| \peachBloomTheme\ | \#F7ECE7\ | \#2D1F1A\ | \#FF8A65\ | \#D8C3BA\ |
| \skyPearlTheme\ | \#EAF1F9\ | \#18202B\ | \#4F8CFF\ | \#C1CBDD\ |
| \ivoryDisciplineTheme\ | \#F0EDE8\ | \#1A1612\ | \#C4873A\ | \#C8C4BE\ |
| \chalkArenaTheme\ | \#F5F5F7\ | \#111114\ | \#FF3B30\ | \#C8C8CE\ |
| \sandStoicTheme\ | \#EDE8DF\ | \#1C1812\ | \#8B5E3C\ | \#C4BEB4\ |
| \pearlSigmaTheme\ | \#E8ECF4\ | \#0A0C14\ | \#1A1A2E\ | \#B4BAC8\ |
| \cloudDisciplineTheme\ | \#E4E9F2\ | \#141820\ | \#3B82F6\ | \#B0B8CC\ |
| \rostCommandTheme\ | \#EDF2FA\ | \#0D1117\ | \#2563EB\ | \#B8C4D8\ |
| \porcelainStudioTheme\ | \#F4F1EE\ | \#1A1714\ | \#6B4FBB\ | \#C8C4BE\ |
| \
osePaperTheme\ | \#FAF0F3\ | \#2A1018\ | \#C44472\ | \#D8C4CC\ |
| \creamVaultTheme\ | \#F8F4EC\ | \#18140A\ | \#9A6B20\ | \#D0C8B0\ |
| \glacierClearTheme\ | \#EEF4FB\ | \#0C1826\ | \#0076D6\ | \#B8C8DC\ |
| \silkSageTheme\ | \#EEF4EE\ | \#101A10\ | \#2E8B57\ | \#B8D0B8\ |
| \lushLienenTheme\ | \#FAF5F0\ | \#251A12\ | \#C07050\ | \#D8CCC0\ |
| \hailstoneTheme\ | \#ECEEF4\ | \#0E101C\ | \#5060CC\ | \#C0C4D8\ |
| \zephyrLaceTheme\ | \#F2F4FA\ | \#10142A\ | \#4460CC\ | \#C0C4D8\ |
| \oldPaperTheme\ | \#F0E8D0\ | \#1A1200\ | \#7A5010\ | \#C8C0A0\ |
| \pebbleCoastTheme\ | \#EAE8E4\ | \#141210\ | \#506070\ | \#C4C0B8\ |
| \pricotDustTheme\ | \#FAF0E8\ | \#2A1808\ | \#E07840\ | \#D8C8BC\ |
| \lilacHazeTheme\ | \#F3EEF9\ | \#1C1028\ | \#8050CC\ | \#CCC0DC\ |
| \	ealParchmentTheme\ | \#E8F4F0\ | \#081820\ | \#007B6E\ | \#B0D0C8\ |
| \snowfieldTheme\ | \#F6F8FF\ | \#080C20\ | \#3355EE\ | \#C0C8E0\ |
| \sunbleachedTheme\ | \#F8F2E0\ | \#201800\ | \#B08000\ | \#D0C8A8\ |
| \marbleHallTheme\ | \#F0EEF4\ | \#141018\ | \#785A9E\ | \#C8C4D4\ |
| \celadonGalleryTheme\ | \#ECF2ED\ | \#0C180E\ | \#3A7A58\ | \#C0D0C4\ |
| \dustyRoseGardenTheme\ | \#F6EEF0\ | \#200C10\ | \#B04468\ | \#D4C4C8\ |
| \indigoVellumTheme\ | \#EEEAF8\ | \#100C28\ | \#4430A0\ | \#C8C0DC\ |
| \waxSealTheme\ | \#F2EDE8\ | \#1C1410\ | \#A03020\ | \#CCC4BC\ |

> Full per-key color values for these are in the source. For brevity the
> table above shows the four colors that drive 95% of the look; complete
> definitions live in \	heme-colors.ts\ and are reproduced verbatim in
> the file you ship with the web port.

### 3.3 Dark themes (steely / moody / luxe)

| Key | bgColor | textPrimary | accent | shadowDark |
|-----|---------|-------------|--------|------------|
| \obsidianSteelTheme\ | \#1E2433\ | \#E8EDF5\ | \#5B8FFF\ | \#0F1219\ |
| \graphiteNoirTheme\ | \#1A1A2E\ | \#E0E4F0\ | \#E94560\ | \#0D0D1A\ |
| \slateInkTheme\ | \#232B3E\ | \#EAF0FF\ | \#4ECDC4\ | \#131820\ |
| \	itaniumTheme\ | \#242830\ | \#F0F2F8\ | \#A78BFA\ | \#141618\ |
| \carbonGoldTheme\ | \#1C1F2A\ | \#F5F0E8\ | \#D4A853\ | \#0E0F16\ |
| \oidPurpleTheme\ | \#1A1528\ | \#EDE8FF\ | \#9D6FFF\ | \#0C0A14\ |
| \midnightSapphireTheme\ | \#0D1B2A\ | \#E8F0FF\ | \#3A8EFF\ | \#060E17\ |
| \deepForestTheme\ | \#0F1A14\ | \#D8F0E0\ | \#2ECC71\ | \#060D09\ |
| \crimsonNightTheme\ | \#1A0D12\ | \#FFE8EE\ | \#FF3366\ | \#0A0508\ |
| \uroraDepthTheme\ | \#0A1628\ | \#E0F4FF\ | \#00CFFF\ | \#040A14\ |
| \ironVaultTheme\ | \#181C22\ | \#DCE4F0\ | \#7EB8FF\ | \#0B0E12\ |
| \olcanicAshTheme\ | \#1C1610\ | \#F0E8D8\ | \#FF6B35\ | \#0C0A06\ |
| \galacticIndigoTheme\ | \#10102A\ | \#E8E0FF\ | \#9B8FFF\ | \#060614\ |
| \stormcloudTheme\ | \#141A24\ | \#D8E4F8\ | \#5BA8FF\ | \#080C12\ |
| \copperRustTheme\ | \#1A1410\ | \#F5E8D8\ | \#D4845A\ | \#0C0A08\ |
| \
eonDuskTheme\ | \#0E0E1E\ | \#F0EEFF\ | \#FF2D87\ | \#060610\ |
| \seleniteTheme\ | \#15202E\ | \#E8F2FF\ | \#88C0FF\ | \#091018\ |
| \duneCipherTheme\ | \#1A160E\ | \#F2EAD8\ | \#C4A44A\ | \#0C0A06\ |
| \polarNightTheme\ | \#101820\ | \#E0EEFF\ | \#4ECDC4\ | \#060C10\ |
| \phantomGrayTheme\ | \#171717\ | \#F0F0F0\ | \#A0A0A0\ | \#0A0A0A\ |
| \byssalTealTheme\ | \#0A1E1E\ | \#D8F5F0\ | \#00BFA5\ | \#040E0E\ |
| \onyxRoseTheme\ | \#1C1418\ | \#FFE8F0\ | \#E878A0\ | \#0C080C\ |
| \	ungstendTheme\ | \#1E1E1E\ | \#EEEEEE\ | \#F0A500\ | \#0E0E0E\ |
| \cosmicMerlotTheme\ | \#180A22\ | \#F0E0FF\ | \#C45FFF\ | \#0A0410\ |
| \quartzShadowTheme\ | \#1A1C2A\ | \#EAE8FF\ | \#6E78FF\ | \#0C0E16\ |
| \rassTerminalTheme\ | \#141008\ | \#F8F0D0\ | \#D4A030\ | \#080604\ |

> Same shortcut as above. Full values per key are in the source.

### 3.4 How to add more themes

To create a new palette, follow these rules:

1. Pick a \gColor\. Decide if it is light or dark and stick to one of
   the two shadow strategies.
2. **Light strategy**: \shadowLight = "#FFFFFF"\, \shadowDark\ = a cool
   grey 12-18% darker than \gColor\ with the same hue family.
3. **Dark strategy**: \shadowLight\ = \gColor\ lifted by 8-12 in
   lightness, \shadowDark\ = \gColor\ dropped by 18-25 in lightness.
   Keep a slight blue or warm tint consistent with \gColor\.
4. \	extPrimary\ = high contrast against \gColor\ (>= 7:1 for body).
5. \	extSecondary\ = \	extPrimary\ reduced to 55-65% lightness, same hue.
6. \ccent\ = saturated brand color (e.g. \#4285F4\ blue, \#D4A853\ gold).
   Pick the *opposite temperature* of \gColor\ for max pop.
7. \ccentLight\ = \ccent\ lightened by ~25% - used for chip text and
   active fills.
8. \success\ / \warning\ / \danger\ / \info\ - keep the conventional
   hues per theme family (greens, ambers, reds, blues) but feel free to
   nudge saturation to match the palette mood.

A theme is then just \export const myTheme: Theme = { ... }\ and gets
picked up automatically because every component reads from
\
esolveTheme()\.

---

## 4. The neumorphism style helpers

These are the *only* shadow recipes in the system. Every component
ultimately composes from these. The shadow strings below are exactly
the ones emitted in the web \oxShadow\. **Port them verbatim.**

> A "raised" helper produces an outer shadow on the bottom-right and an
> outer highlight on the top-left - the surface appears to lift out of
> the page. A "pressed" helper inverts both shadows inward - the surface
> appears to sink in.

| Helper | Outer / inner | Offset | Radius | Opacity | Border radius | Used by |
|--------|---------------|--------|--------|---------|---------------|---------|
| \
euRaised(theme)\ | outer | 8/8 | 16 | - | - | Generic surface (cards, list items, raised inputs) |
| \
euPressed(theme)\ | inner | 6/6 | 10 | - | - | Active state, toggles, segmented active |
| \
euButton(theme, size)\ | outer | 6/6 | 12 | - | 12/16/20 (sm/md/lg) | Button |
| \
euButtonPressed(theme, size)\ | inner | 4/4 | 8 | - | 12/16/20 | Button pressed |
| \
euIconButton(theme)\ | outer | 6/6 | 12 | - | 24 (round) | Round icon button, Navbar top icons |
| \
euIconButtonPressed(theme)\ | inner | 4/4 | 8 | - | 24 | Round icon button pressed |
| \
euIconOnlyButton(theme)\ | outer | 5/5 | 10 | - | 14 (square) | Square icon button |
| \
euIconOnlyButtonPressed(theme)\ | inner | 3/3 | 6 | - | 14 | Square icon button pressed |
| \
euRoundButton(theme)\ | outer | 8/8 | 16 | - | 28 | 56x56 round button |
| \
euRoundButtonPressed(theme)\ | inner | 4/4 | 8 | - | 28 | 56x56 round button pressed |
| \
euInput(theme)\ | inner | 6/6 | 10 | - | 16 | Text input unfocused |
| \
euInputFocused(theme)\ | inner | 8/8 | 14 | - | 16 | Text input focused (deeper inset) |
| \
euCardRaised(theme)\ | outer | 10/10 | 20 | - | 24 | Card, large container |
| \
euCardPressed(theme)\ | inner | 8/8 | 16 | - | 24 | Card pressed / variant=\"pressed\" |
| \
euFab(theme)\ | outer | 8/8 | 16 | - | 30 (60x60) | FAB |
| \
euFabPressed(theme)\ | inner | 4/4 | 8 | - | 30 | FAB pressed |
| \
euListItem(theme)\ | outer | 6/6 | 12 | - | 20 | List item |
| \
euListItemPressed(theme)\ | inner | 4/4 | 8 | - | 20 | List item pressed |
| \
euChip(theme, active)\ | outer/inner | 4/4 or 3/3 | 8 or 6 | - | 20 | Chip - switches by active state |
| \
euToggleTrack(theme)\ | inner | 4/4 | 8 | - | 15 | Toggle track |
| \
euToggleThumb(theme, active)\ | outer | 2/2 | 5 | - | 11 | Toggle thumb |
| \
euSliderTrack(theme)\ | inner | 4/4 | 8 | - | 7 | Slider track |
| \
euSliderThumb(theme)\ | outer | 4/4 | 10 | - | 15 | Slider thumb |
| \
euProgressTrack(theme)\ | inner | 4/4 | 8 | - | 9 | Progress track |
| \
euStepper(theme)\ | inner | 5/5 | 10 | - | 16 | Stepper container |
| \
euStepperBtn(theme)\ | outer | 4/4 | 8 | - | 12 | Stepper +/- button |
| \
euStepperBtnPressed(theme)\ | inner | 2/2 | 4 | - | 12 | Stepper +/- pressed |
| \
euAlert(theme)\ | outer | 8/8 | 16 | - | 20 | Alert |
| \
euAlertIcon(theme)\ | outer | 4/4 | 8 | - | 14 | Alert icon (42x42) |
| \
euSegmentedControl(theme)\ | inner | 5/5 | 10 | - | 16 | Segmented track |
| \
euSegmentActive(theme)\ | outer | 4/4 | 8 | - | 12 | Segmented active segment |
| \
euAvatar(theme, size)\ | outer | 6/6 | 12 | - | size/2 (round) | Avatar |
| \
euTab(theme, active)\ | outer/inner | 5/5 or 4/4 | 10 or 8 | - | 14 | Tab |
| \
euTag(theme)\ | outer | 3/3 | 6 | - | 12 | Tag |
| \
euRadioMark(theme)\ | inner | 3/3 | 6 | - | 13 (round) | Radio mark |
| \
euCheckMark(theme)\ | inner | 3/3 | 6 | - | 8 (square) | Checkbox mark |
| \
euAccordion(theme)\ | outer | 6/6 | 12 | - | 20 | Accordion row |
| \
euBadge(theme)\ | outer | 3/3 | 6 | - | 11 (22x22) | Badge |
| \
euDivider(theme)\ | inner | 2/2 | 4 | - | 1 (2px tall) | Divider |
| \
euSkeleton(theme)\ | inner | 4/4 | 8 | - | 12 | Skeleton placeholder |
| \
euSearchBar(theme)\ | inner | 5/5 | 10 | - | 20 | Search bar |
| \
euInputIcon(theme)\ | outer | 3/3 | 6 | - | 13 (40x40) | Input icon button (e.g. password toggle) |
| \
euInputIconPressed(theme)\ | inner | 2/2 | 4 | - | 13 | Input icon pressed |
| \
euListIcon(theme)\ | outer | 4/4 | 8 | - | 14 (46x46) | List-item leading icon |
| \
euRatingStar(active, color, theme)\ | outer / inner+glow | 3/3 or 2/2 | 6 or 4 | - | size/2 (round) | Rating star - active state adds \  0 12px \66\ outer glow |
| \
euNavbarBottom(theme)\ | outer (top only) | 0/-6 | 20 | - | 24 top corners | Bottom nav container |
| \
euNavItem(theme, active)\ | inner or transparent | 4/4 | 8 | - | 16 | Bottom nav item - active = pressed, inactive = transparent |

### 4.1 The shadow strings (the only thing that matters for the web)

A \"raised\" surface:

\\\
box-shadow: 8px 8px 16px \, -8px -8px 16px \;
\\\

A \"pressed\" surface:

\\\
box-shadow: inset 6px 6px 10px \, inset -6px -6px 10px \;
\\\

A \"navbar bottom\" (only top shadow + rounded top):

\\\
box-shadow: 0px -6px 20px rgba(163, 177, 198, 0.25);
border-top-left-radius: 24px;
border-top-right-radius: 24px;
\\\

A \"rating active\" star (glow + inset):

\\\
box-shadow: inset 2px 2px 4px \,
            inset -2px -2px 4px \,
            0 0 12px \66;   /* the 66 = 40% alpha */
\\\

The \
euCard\ raised variant uses a slightly larger spread:

\\\
box-shadow: 10px 10px 20px \, -10px -10px 20px \;
\\\

> For dark themes the \
gba(163, 177, 198, 0.25)\ navbar shadow reads
> too cool. The source code ships the same constant - feel free to
> swap it for a slightly desaturated version on dark themes, e.g.
> \
gba(255, 255, 255, 0.04)\ plus \  8px 16px rgba(0,0,0,0.5)\,
> but the constant in source is intentionally theme-agnostic.

### 4.2 Web equivalents (Tailwind)

Use arbitrary values in the \shadow-[...]\ utility, e.g

\\\html
<div class=\"rounded-2xl bg-[var(--bg)]
            shadow-[8px_8px_16px_#B0C0E0,_-8px_-8px_16px_#FFFFFF]\">
  <!-- raised -->
</div>
<div class=\"rounded-2xl bg-[var(--bg)]
            shadow-[inset_6px_6px_10px_#B0C0E0,_inset_-6px_-6px_10px_#FFFFFF]\">
  <!-- pressed -->
</div>
\\\

A helper \
eu(theme, \"raised\" | \"pressed\", { radius = 16, spread = 16 })\
can build the string and apply it via \style\. Keep the helper signature
similar to the React Native source so the port stays 1:1.

---

## 5. Resolving a theme

The \
esolveTheme(themeOverride?)\ function returns a full \Theme\ by
merging: active theme from the global store, then the optional override.

\\\	s
export function resolveTheme(themeOverride?: ThemeOverride): Theme {
  const storeTheme = useThemeStore.getState().theme;
  return { ...storeTheme, ...(themeOverride ?? {}) };
}
\\\

On the web, do the same thing against a \useTheme()\ context that
exposes the active palette. Components never read from the store
directly - they accept an optional \	heme\ prop and call \
esolveTheme\
internally.

\\\	s
// web/app/ThemeProvider.tsx
'use client';
const ThemeContext = createContext<Theme | null>(null);
export function ThemeProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext)!;
\\\

For multi-theme support (60+ palettes) use a \	hemeStore\ powered by
\zustand\ with \persist\ to \localStorage\. The store carries the
active theme key (e.g. \\"frostCommandTheme\"\) and exposes
\setThemeKey(key)\ to swap it. The Provider reads the key, looks up
the palette, and pushes it into context.

---

## 6. Common prop interface (\ThemedProps\)

Every component in the system extends this. Honor it on the web:

\\\	s
interface ThemedProps {
  theme?: ThemeOverride;       // partial override merged over active
  containerStyle?: ViewStyle;  // -> React.CSSProperties on web
  containerClassName?: string; // -> tailwind className on web
}

interface BaseInputProps extends ThemedProps {
  label?: string;
  labelStyle?: TextStyle;
  labelClassName?: string;
  error?: string;
  errorStyle?: TextStyle;
  errorClassName?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  helperClassName?: string;
  helperStyle?: TextStyle;
}

interface IconProps {
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}
\\\

A shared \Status\ enum is used for accent color selection:

\\\	s
type Status = \"default\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\";
type Size = \"sm\" | \"md\" | \"lg\";
type Variant = \"raised\" | \"pressed\";
\\\

On the web, replace \ViewStyle\ / \TextStyle\ with \CSSProperties\ and
\containerClassName\ becomes the Tailwind class name. The rest of the
API surface stays the same so the components feel like a familiar
library to anyone who has used the RN version.

---

## 7. The full component catalog (source-level)

### 7.1 \Section\

**Intent:** A column with a small uppercase title and an optional
inner container that *can* itself be a neuPressed surface (for grouping
chips, list items, etc.).

**Source:**
\\\	sx
<View style={{ gap }}>
  {title && <Text style={titleStyles}>{title}</Text>}
  {useInnerContainer && (
    <View style={[{ gap, padding, borderRadius }, neuStyle && neuPressed(theme)]}>
      {children}
    </View>
  )}
</View>
\\\

**Web:**
\\\	sx
<section className=\"flex flex-col\" style={{ gap }}>
  {title && <h3 className=\"text-xs font-bold uppercase tracking-[1.2px]\" style={{ color: t.textSecondary }}>{title}</h3>}
  {useInnerContainer && (
    <div
      className=\"flex flex-col\"
      style={{
        gap,
        padding: innerContainerPadding,
        borderRadius: innerContainerBorderRadius,
        backgroundColor: t.bgColor,
        ...(neuStyle ? { boxShadow: \inset 6px 6px 10px \, inset -6px -6px 10px \\ } : null),
      }}
    >
      {children}
    </div>
  )}
</section>
\\\

Defaults: \	itleUppercase = true\, \	itleLetterSpacing = 1.2\,
\	itleFontSize = 12\, \	itleFontWeight = \"700\"\, \gap = 12\,
\innerContainerPadding = 12\, \innerContainerBorderRadius = 22\.

### 7.2 \SubSection\

**Intent:** A nested grouping with an even smaller uppercase label.
Pointer events disabled when \disabled\.

**Source / web shape:**
\\\	sx
<div className=\"flex flex-col\" style={{ gap, opacity: disabled ? 0.4 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
  {title && <span className=\"text-[11px] font-semibold uppercase tracking-[0.8px]\" style={{ color: t.textSecondary }}>{title}</span>}
  {children}
</div>
\\\

### 7.3 \NavbarTop\

**Intent:** App bar with a back-button icon (round \IconButton\),
a bold title, and a trailing more-icon (also round \IconButton\).
Sticky to top by default.

**Shadow recipe:** \
euIconButton\ / \
euIconButtonPressed\ for the two
slots; the bar itself is just \gColor\ (no shadow) with \zIndex: 900\.

**Layout:**
\\\	sx
<header className=\"sticky top-0 z-[900] flex items-center justify-between px-4 mb-2\"
        style={{ backgroundColor: t.bgColor }}>
  <NeuIconButton icon={<ChevronLeft size={18} color={t.textPrimary} />} />
  <h1 className=\"text-xl font-extrabold tracking-tight\" style={{ color: t.textPrimary }}>{title}</h1>
  <NeuIconButton icon={<MoreVertical size={18} color={t.textPrimary} />} />
</header>
\\\

Props worth preserving: \	itle\ (default \\"Neumorphism UI\"\`),
\	itleFontSize = 20\, \	itleFontWeight = \"800\"\, \	itleStyle\ with
\letterSpacing: -0.5\, \showLeftIcon\ / \showRightIcon\ (both default
\	rue\), \sticky\ (default \	rue\), \zIndex\ (default \900\),
\onLeftPress\ / \onRightPress\, accessibility labels default to
\\"Go back\"\ / \\"More options\"\.

### 7.4 \NavbarBottom\

**Intent:** Tab bar. Each tab is a 16-radius button; the active tab
becomes a \
euPressed\ plate. Badges (e.g. notification count) sit in
the top-right as a \
euBadge\-shaped counter with a custom RN shadow
that mirrors a tiny raised chip.

**Shadow recipes:** \
euNavbarBottom(theme)\ for the container
(top-only soft shadow + \order-top-left-radius: 24\ /
\order-top-right-radius: 24\). \
euNavItem(theme, isActive)\ for the
active button. The badge uses inline \3px 3px 6px shadowDark, -3px -3px 6px shadowLight\
on the badge plate (same as \
euBadge\).

**Layout:**
\\\	sx
<nav className=\"fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-around pt-3 pb-6\"
     style={{
       backgroundColor: t.bgColor,
       borderTopLeftRadius: 24, borderTopRightRadius: 24,
       boxShadow: '0px -6px 20px rgba(163,177,198,0.25)',
     }}>
  {items.map(item => (
    <button key={item.key} onClick={() => onChange(item.key)} className=\"flex flex-col items-center gap-1 py-2 px-4 rounded-2xl\"
            style={isActive ? { backgroundColor: t.bgColor, boxShadow: \inset 4px 4px 8px \, inset -4px -4px 8px \\ } : { backgroundColor: 'transparent' }}>
      <span className=\"relative\">
        {isActive ? item.activeIcon ?? item.icon : item.icon}
        {item.badge > 0 && (
          <span className=\"absolute -top-1.5 -right-2 min-w-[22px] h-[22px] rounded-[11px] grid place-items-center px-[7px] text-[11px] font-extrabold\"
                style={{ backgroundColor: t.bgColor, color: item.badgeColor ?? t.danger,
                         boxShadow: \3px 3px 6px \, -3px -3px 6px \\ }}>
            {item.badge > 99 ? '99+' : item.badge}
          </span>
        )}
      </span>
      {showLabels && <span className=\"text-[10px] font-semibold mt-1\" style={{ color: isActive ? t.accent : t.textSecondary }}>{item.label}</span>}
    </button>
  ))}
</nav>
\\\

Props: \items: NavItem[]\ (\{ key, label, icon, activeIcon?, badge?, badgeColor? }\),
\ctiveKey: string\, \onChange: (key) => void\, \showLabels = true\,
\iconSize = 20\, \orderTopRadius = 24\, \safeAreaPadding = true\ (adds \pb-6\
so the bar clears the iOS home indicator - drop on web unless you
support \env(safe-area-inset-bottom)\).

### 7.5 \Button\

**Intent:** Primary CTA. Three sizes (\sm | md | lg\), six statuses,
optional left/right icons.

**Shadow recipe:** \
euButton\ / \
euButtonPressed\.

**Layout (md = default):**
\\\	sx
<button
  onClick={onPress}
  className=\"flex items-center justify-center gap-2 rounded-2xl bg-[var(--bg)]
             shadow-[6px_6px_12px_var(--shadow-dark),_-6px_-6px_12px_var(--shadow-light)]
             active:shadow-[inset_4px_4px_8px_var(--shadow-dark),_inset_-4px_-4px_8px_var(--shadow-light)]
             transition-shadow\"
  style={{ padding: '16px 28px', opacity: disabled ? 0.5 : 1 }}
>
  {leftIcon}
  {title && <span className=\"text-[15px] font-bold\" style={{ color: t[statusColorMap[status]] }}>{title}</span>}
  {rightIcon}
</button>
\\\

Sizing table (border radius pairs with padding):

| Size | padding | border-radius | text size |
|------|---------|---------------|-----------|
| sm | \10px 20px\ | 12 | 13 |
| md | \16px 28px\ | 16 | 15 |
| lg | \20px 36px\ | 20 | 15 |

Status to color key map: \default\ goes to \	extPrimary\, \primary\
to \ccent\, \success\ / \warning\ / \danger\ / \info\ to their
matching theme keys.

Interaction: Haptic \Soft\ on press, \ctiveOpacity\ controlled via the
pressed \
euButtonPressed\ swap. Disabled or loading -> \opacity: 0.5\.

### 7.6 \IconButton\

**Intent:** A compact square or round button for icons. Default 48x48,
14 radius (square) or full circle (round). Same status map as \Button\.

**Shadow recipes:** \
euIconOnlyButton(theme)\ /
\
euIconOnlyButtonPressed(theme)\ for \ariant=\"square\"\,
\
euRoundButton(theme)\ / \
euRoundButtonPressed(theme)\ for
\ariant=\"round\"\. The \orderRadius\ is \size / 2\ when round and
the \orderRadius\ prop (14) when square.

**Layout:**
\\\	sx
<button onClick={onPress}
        className=\"grid place-items-center bg-[var(--bg)]\"
        style={{
          width: 48, height: 48, borderRadius: variant === 'round' ? 24 : 14,
          opacity: disabled ? 0.5 : 1,
          boxShadow: pressed
            ? \inset 3px 3px 6px \, inset -3px -3px 6px \\
            : \5px 5px 10px \, -5px -5px 10px \\,
        }}>
  {icon}
</button>
\\\

### 7.7 \FAB\

**Intent:** Floating action button. 60x60 round, \ottom-right\ by
default with a configurable offset (24px from right, 90px from bottom
to clear \NavbarBottom\).

**Shadow recipe:** \
euFab(theme)\ / \
euFabPressed(theme)\.

**Layout:**
\\\	sx
<button
  onClick={onPress}
  className=\"absolute grid place-items-center rounded-full bg-[var(--bg)]\"
  style={{
    bottom: 90, right: 24, width: 60, height: 60,
    boxShadow: pressed
      ? \inset 4px 4px 8px \, inset -4px -4px 8px \\
      : \8px 8px 16px \, -8px -8px 16px \\,
  }}>
  {icon ?? <Plus size={24} color={t.accent} />}
</button>
\\\

Props: \position: \"bottomRight\" | \"bottomLeft\" | \"bottomCenter\"\,
\ottomOffset = 90\, \
ightOffset = 24\, \size = 60\.

### 7.8 \Card\

**Intent:** Container with optional title, subtitle, header, footer, and
onPress. Two variants: \
aised\ (default) and \pressed\.

**Shadow recipe:** \
euCardRaised(theme)\ for \ariant=\"raised\"\,
\
euCardPressed(theme)\ for \ariant=\"pressed\"\. When \onPress\ is
passed, the card uses \
euCardPressed\ while pressed. Default
\orderRadius = 24\, default \padding = 24\, \marginBottom = 20\.

**Layout:**
\\\	sx
<div className=\"bg-[var(--bg)]\"
     style={{
       borderRadius: 24, padding: 24, marginBottom: 20,
       boxShadow: \10px 10px 20px \, -10px -10px 20px \\,
     }}>
  {header}
  {title && <h2 className=\"text-[17px] font-bold mb-2\" style={{ color: t.textPrimary }}>{title}</h2>}
  {subtitle && <p className=\"text-sm leading-[22.4px]\" style={{ color: t.textSecondary }}>{subtitle}</p>}
  {children && <div className=\"mt-2\">{children}</div>}
  {footer}
</div>
\\\

### 7.9 \ListItem\

**Intent:** Settings-style row. Optional leading icon (\
euListIcon\),
title + subtitle, optional trailing badge, chevron, or \
ightElement\.

**Shadow recipe:** \
euListItem(theme)\ / \
euListItemPressed(theme)\.
Leading icon uses \
euListIcon(theme)\ (46x46, 14 radius). Badge uses
\
euBadge(theme)\ (22x22, 11 radius).

**Layout:**
\\\	sx
<div className=\"flex items-center gap-4 py-4 px-4 bg-[var(--bg)]\"
     style={{
       borderRadius: 20,
       boxShadow: pressed
         ? \inset 4px 4px 8px \, inset -4px -4px 8px \\
         : \6px 6px 12px \, -6px -6px 12px \\,
     }}>
  {icon && (
    <div className=\"grid place-items-center bg-[var(--bg)]\"
         style={{ width: 46, height: 46, borderRadius: 14,
                  boxShadow: \4px 4px 8px \, -4px -4px 8px \\ }}>
      {icon}
    </div>
  )}
  <div className=\"flex-1\">
    <div className=\"text-[15px] font-bold mb-0.5\" style={{ color: t.textPrimary }}>{title}</div>
    {subtitle && <div className=\"text-[13px]\" style={{ color: t.textSecondary }}>{subtitle}</div>}
  </div>
  {badge != null && (
    <div className=\"grid place-items-center min-w-[22px] h-[22px] px-[7px] rounded-[11px] bg-[var(--bg)]\"
         style={{ boxShadow: \3px 3px 6px \, -3px -3px 6px \\ }}>
      <span className=\"text-[11px] font-extrabold\" style={{ color: badgeColor ?? t.danger }}>{badge}</span>
    </div>
  )}
  {rightElement}
  {showChevron && !rightElement && <ChevronRight size={18} color={t.textSecondary} />}
</div>
\\\

Press behaviour: Haptic \Light\ on tap, swaps to \
euListItemPressed\
while pressed.

### 7.10 \Input\

**Intent:** Text input with optional label, helper, error, left/right
icon, password show/hide toggle.

**Shadow recipes:** \
euInput(theme)\ unfocused, \
euInputFocused(theme)\
when focused. The eye / eye-off toggle uses \
euInputIcon\ /
\
euInputIconPressed\ (40x40, 13 radius). Left / right slot icons are
forced to \
euInputIconPressed\ to look \"set\" inside the inset.

**Layout:**
\\\	sx
<label className=\"block mb-5\">
  {label && (
    <span className=\"block text-[12px] font-bold uppercase tracking-wide mb-2.5 pl-1\" style={{ color: t.textSecondary }}>
      {label}{required && <span style={{ color: t.danger }}> *</span>}
    </span>
  )}
  <div className=\"flex items-center rounded-2xl bg-[var(--bg)]\"
       style={{
         boxShadow: isFocused
           ? \inset 8px 8px 14px \, inset -8px -8px 14px \\
           : \inset 6px 6px 10px \, inset -6px -6px 10px \\,
       }}>
    {leftIcon && (
      <div className=\"ml-2 grid place-items-center bg-[var(--bg)]\"
           style={{ width: 40, height: 40, borderRadius: 13,
                    boxShadow: \inset 2px 2px 4px \, inset -2px -2px 4px \\ }}>
        {leftIcon}
      </div>
    )}
    <input
      className=\"flex-1 bg-transparent text-[15px] outline-none\"
      style={{ padding: '16px 24px', color: t.textPrimary }}
    />
    {/* password toggle / right icon */}
  </div>
  {error && <span className=\"block text-xs font-bold mt-1.5 ml-1\" style={{ color: t.danger }}>{error}</span>}
  {!error && helperText && <span className=\"block text-xs mt-1.5 ml-1\" style={{ color: t.textSecondary }}>{helperText}</span>}
</label>
\\\

Type to keyboard map (use the right \	ype\ on \<input>\): \	ext\,
\password\ (use \	ype=\"password\"\ plus state), \email\ -> \\"email\"\,
\	el\ -> \\"tel\"\, \
umber\ -> \\"number\"\, \url\ -> \\"url\"\, \search\ ->
\\"search\"\, \date\ -> \\"date\"\.

### 7.11 \TextArea\

**Intent:** Multiline \Input\ with a slightly larger border radius and
optional character counter.

**Shadow recipe:** \
euPressed(theme)\ (16 radius) - there is no focus
state, the field is permanently pressed-looking.

**Layout:**
\\\	sx
<div className=\"bg-[var(--bg)] rounded-2xl min-h-[120px]\"
     style={{ boxShadow: \inset 6px 6px 10px \, inset -6px -6px 10px \\ }}>
  <textarea
    className=\"block w-full bg-transparent text-[15px] outline-none\"
    style={{ padding: '16px 24px', minHeight: 120, color: t.textPrimary, textAlignVertical: 'top' }} />
</div>
\\\

Below: a flex row that renders the helper text on the left and the
character counter on the right (\{currentLength}{maxLength ? \/\\ : ''}\).
Use \utoGrow\ to grow with content - equivalent on web is \ield-sizing:
content\ (newer browsers) or a small \useEffect\ height-measure routine.

### 7.12 \SearchBar\

**Intent:** Search-shaped text input. 20-radius, persistent inset.

**Shadow recipe:** \
euSearchBar(theme)\ (inset 5/5/10).

**Layout:**
\\\	sx
<div className=\"flex items-center bg-[var(--bg)] rounded-[20px] py-4 px-4\"
     style={{ boxShadow: \inset 5px 5px 10px \, inset -5px -5px 10px \\ }}>
  <Search size={16} color={t.textSecondary} className=\"mr-3\" />
  <input className=\"flex-1 bg-transparent text-[15px] outline-none\"
         style={{ color: t.textPrimary }}
         placeholder={placeholder} />
</div>
\\\

### 7.13 \Select\

**Intent:** Trigger that opens a bottom sheet of options. 16-radius
inset trigger. Modal uses \gColor\ with \order-top-radius: 24\,
\max-height: 70%\. Selected option uses \
euRaised\ to look \"popped\",
unselected rows are flat.

**Shadow recipes:** \
euPressed(theme)\ on the trigger; each option
gets \
euRaised(theme)\ when selected and a flat surface otherwise.
Selected option text color is \	.accent\.

**Layout (trigger):**
\\\	sx
<button className=\"flex items-center justify-between w-full bg-[var(--bg)] rounded-2xl\"
        style={{ padding: '16px 24px', boxShadow: \inset 6px 6px 10px \, inset -6px -6px 10px \\ }}>
  <span className=\"text-[15px] flex-1 text-left\" style={{ color: selected ? t.textPrimary : t.textSecondary }}>{displayText}</span>
  <ChevronDown size={16} color={t.textSecondary} />
</button>
\\\

The bottom sheet itself:
\\\	sx
<div className=\"fixed inset-x-0 bottom-0 max-h-[70%] rounded-t-3xl bg-[var(--bg)] pt-4 px-3 pb-3\">
  <h3 className=\"text-lg font-bold text-center mb-1\" style={{ color: t.textPrimary }}>{modalTitle}</h3>
  <ul className=\"px-4\">
    {options.map(o => (
      <li key={o.value}>
        <button
          className=\"flex items-center w-full py-3.5 px-4 mb-2 rounded-2xl\"
          style={isSelected
            ? { backgroundColor: t.bgColor, boxShadow: \8px 8px 16px \, -8px -8px 16px \\ }
            : { backgroundColor: 'transparent' }}>
          <span className=\"text-[15px] font-semibold flex-1\" style={{ color: isSelected ? t.accent : t.textPrimary }}>{o.label}</span>
        </button>
      </li>
    ))}
  </ul>
</div>
\\\

### 7.14 \DateInput\

**Intent:** Same shell as \Input\, plus an \onChangeText\ formatter
that inserts \/\ after day and month (DD/MM/YYYY) up to 10 characters.
The web port can use \<input type=\"text\" inputMode=\"numeric\" maxLength={10}>\ plus the same formatter utility.

Shadow recipe: \
euPressed(theme)\ (same as TextArea - permanently inset).

### 7.15 \Toggle\

**Intent:** iOS-style switch. Track is \
euToggleTrack(theme)\ (54x30
default, 15 radius). Thumb is \
euToggleThumb(theme, value)\ (22x22,
11 radius). On active, the thumb color swaps to \	.accent\ and slides
right.

**Shadow recipes:** \
euToggleTrack(theme)\, \
euToggleThumb(theme, value)\.
The whole row uses \
euRaised(theme)\ when off and \
euPressed(theme)\
when on - this gives a satisfying \"the toggle sits in a recess when on\"
effect.

**Layout:**
\\\	sx
<button onClick={() => onValueChange(!value)}
        className=\"flex items-center gap-3 py-3 px-4 rounded-2xl bg-[var(--bg)]\"
        style={{
          boxShadow: value
            ? \inset 6px 6px 10px \, inset -6px -6px 10px \\
            : \8px 8px 16px \, -8px -8px 16px \\,
        }}>
  {leftIcon}
  {label && <span className=\"flex-1 text-[15px] font-semibold text-left\" style={{ color: t.textPrimary }}>{label}</span>}
  <span className=\"grid place-items-center rounded-[15px] bg-[var(--bg)]\"
        style={{ width: 54, height: 30, paddingInline: 4,
                 boxShadow: \inset 4px 4px 8px \, inset -4px -4px 8px \\ }}>
    <span className=\"block rounded-full transition-transform duration-200\"
          style={{
            width: 22, height: 22,
            backgroundColor: value ? t.accent : t.bgColor,
            transform: \	ranslateX(\px)\,
            boxShadow: \2px 2px 5px \, -2px -2px 5px \\,
          }} />
  </span>
</button>
\\\

Animation: source uses React Native \Animated.timing\ with 200ms easing.
On the web, use \	ransition-transform duration-200 ease-in-out\ and
\style.transform = 'translateX(...)'\.

### 7.16 \Radio\ / \RadioGroup\

**Intent:** A vertical (or horizontal) group of options. Each option is
a full-width row that *contains* a 26x26 mark. When unselected, the row
is \
euRaised\; when selected, the row is \
euPressed\ and the mark
contains a 12x12 filled dot with a \  0 12px \99\ glow.

**Shadow recipes:** \
euRaised(theme)\ / \
euPressed(theme)\ on the row,
\
euRadioMark(theme)\ on the mark (26x26 inset, 13 radius).

**Layout:**
\\\	sx
<button className=\"flex items-center gap-3.5 py-3.5 px-3.5 rounded-2xl mb-3 bg-[var(--bg)]\"
        style={{
          opacity: option.disabled ? 0.5 : 1,
          boxShadow: selected
            ? \inset 6px 6px 10px \, inset -6px -6px 10px \\
            : \8px 8px 16px \, -8px -8px 16px \\,
        }}>
  <div className=\"grid place-items-center bg-[var(--bg)]\"
       style={{ width: 26, height: 26, borderRadius: 13,
                boxShadow: \inset 3px 3px 6px \, inset -3px -3px 6px \\ }}>
    {selected && <span className=\"block rounded-full\"
                       style={{ width: 12, height: 12, backgroundColor: t.accent, boxShadow: \  0 12px \99\ }} />}
  </div>
  <div className=\"flex-1\">
    <div className=\"text-[15px] font-semibold\" style={{ color: t.textPrimary }}>{option.label}</div>
    {option.description && <div className=\"text-xs mt-0.5\" style={{ color: t.textSecondary }}>{option.description}</div>}
  </div>
</button>
\\\

### 7.17 \Checkbox\ / \CheckboxGroup\

**Intent:** Same row layout as \Radio\, but the mark is *square* (8
radius) and shows a \Check\ icon with \strokeWidth={3}\ when checked.

**Shadow recipes:** \
euRaised\ / \
euPressed\ on the row,
\
euCheckMark(theme)\ on the square mark.

Layout mirrors \Radio\ exactly with \orderRadius: 8\ on the mark and
the check icon in place of the filled dot.

### 7.18 \SegmentedControl\

**Intent:** Animated tab control. The container is \
euSegmentedControl\
(inset 5/5/10, 16 radius, 4px padding). The active segment is a
\
euSegmentActive\ plate that *animates* with \	ranslateX\ via React
Native \Animated.spring(friction: 8, tension: 40)\. On the web use
\ramer-motion\ or a plain CSS transition on \	ransform: translateX(...)\.

**Shadow recipes:** \
euSegmentedControl(theme)\,
\
euSegmentActive(theme)\. Inactive segments have no background;
the container's inset does the visual work.

**Layout:**
\\\	sx
<div ref={containerRef} className=\"relative flex p-1 rounded-2xl bg-[var(--bg)]\"
     style={{ boxShadow: \inset 5px 5px 10px \, inset -5px -5px 10px \\ }}>
  <div className=\"absolute top-1 bottom-1 left-1 rounded-xl bg-[var(--bg)] transition-transform duration-300\"
       style={{
         width: \\%\,
         transform: \	ranslateX(\%)\,
         boxShadow: \4px 4px 8px \, -4px -4px 8px \\,
       }} />
  {segments.map(s => (
    <button key={s.value} onClick={() => onValueChange(s.value)}
            className=\"relative flex-1 py-3 px-2 rounded-xl grid place-items-center\">
      <span className=\"text-sm font-bold\" style={{ color: s.value === selectedValue ? t.accent : t.textSecondary }}>{s.label}</span>
    </button>
  ))}
</div>
\\\

> The \lex: 1\ on the active plate is removed in the source because
> absolute positioning gives a more controlled spring animation.
> Recreate that - set \position: absolute\ on the active plate and use
> \width: 100/N%\ plus \	ranslateX(activeIndex * 100%)\.

### 7.19 \Slider\

**Intent:** Custom range slider. Track is \
euSliderTrack(theme)\
(inset, 14px high by default, 7 radius). Fill is an absolute bar in
\	.accent\ with a soft \shadowColor: accent, shadowOpacity: 0.4, shadowRadius: 10\
on the right edge. Thumb is \
euSliderThumb(theme)\ (28x28, 15 radius,
3px border in \gColor\ to \"cut\" the fill behind it).

**Shadow recipes:** \
euSliderTrack(theme)\, \
euSliderThumb(theme)\.
When dragging, the thumb swaps to \
euPressed(theme)\ to feel \"stuck\".

**Layout:**
\\\	sx
<div className=\"flex flex-col py-2.5 px-1\">
  {showValue && <div className=\"text-center text-lg font-extrabold mb-2\" style={{ color: t.accent }}>{valueFormatter(value)}</div>}
  <div className=\"relative\">
    <div ref={trackRef}
         className=\"w-full grid bg-[var(--bg)]\"
         style={{ height: 14, borderRadius: 7,
                  boxShadow: \inset 4px 4px 8px \, inset -4px -4px 8px \\ }}>
      <div className=\"absolute left-0 top-1/2 -translate-y-1/2 rounded-full\"
           style={{ height: 8, width: \\%\, backgroundColor: t.accent,
                    boxShadow: '2px 0 10px rgba(66,133,244,0.4)', marginLeft: 3 }} />
      <div className=\"absolute top-1/2 -translate-y-1/2 rounded-full bg-[var(--bg)]\"
           style={{ width: 28, height: 28, border: \3px solid \\,
                    transform: \	ranslate(\px, -50%)\,
                    boxShadow: \4px 4px 10px \, -4px -4px 10px \\ }} />
    </div>
  </div>
  {showLabels && (
    <div className=\"flex justify-between mt-2.5 text-xs font-bold\" style={{ color: t.textSecondary }}>
      <span>{minLabel}</span><span>{maxLabel}</span>
    </div>
  )}
</div>
\\\

Drag implementation on the web:
- \onPointerDown\ on the track captures pointer, sets drag state.
- \onPointerMove\ recomputes \alue\ from \(clientX - trackRect.left) /
  trackRect.width\, applies \step\, clamps to \[min, max]\, calls
  \onValueChange\.
- \onPointerUp\ ends the drag.
- Use \
equestAnimationFrame\ for smoothing if you want a 60fps feel.

### 7.20 \ProgressBar\

**Intent:** A read-only version of the slider track. 18px tall by
default, 9 radius. Fill is the same accent bar with the same right-edge
glow. Optional label on the left and \xx%\ on the right.

**Shadow recipe:** \
euProgressTrack(theme)\ (inset 4/4/8, 9 radius).
The fill itself uses inline \shadowColor: accent, shadowOffset: 2/0,
shadowOpacity: 0.4, shadowRadius: 10\ to glow on the leading edge.

**Layout:**
\\\	sx
<div className=\"mb-5\">
  {(label || showPercentage) && (
    <div className=\"flex justify-between items-center mb-2\">
      {label && <span className=\"text-sm font-semibold\" style={{ color: t.textSecondary }}>{label}</span>}
      {showPercentage && <span className=\"text-sm font-bold\" style={{ color: t.textPrimary }}>{percentage}%</span>}
    </div>
  )}
  <div className=\"w-full overflow-hidden bg-[var(--bg)]\"
       style={{ height: 18, borderRadius: 9, padding: 3,
                boxShadow: \inset 4px 4px 8px \, inset -4px -4px 8px \\ }}>
    <div className=\"h-full rounded-full\"
         style={{ width: \\%\, backgroundColor: fillColor ?? t.accent,
                  boxShadow: '2px 0 10px rgba(66,133,244,0.4)' }} />
  </div>
</div>
\\\

### 7.21 \Stepper\

**Intent:** A pill-shaped number editor with two raised buttons. The
container is \
euStepper(theme)\ (inset 5/5/10, 16 radius, internal gap
14). Buttons are \
euStepperBtn(theme)\ / \
euStepperBtnPressed(theme)\
(40x40, 12 radius).

**Layout:**
\\\	sx
<div className=\"flex items-center gap-3.5 p-1 rounded-2xl bg-[var(--bg)]\"
     style={{ boxShadow: \inset 5px 5px 10px \, inset -5px -5px 10px \\ }}>
  <button className=\"grid place-items-center bg-[var(--bg)]\"
          style={{ width: 40, height: 40, borderRadius: 12,
                   boxShadow: minusPressed
                     ? \inset 2px 2px 4px \, inset -2px -2px 4px \\
                     : \4px 4px 8px \, -4px -4px 8px \\ }}>
    <Minus size={16} color={t.textPrimary} />
  </button>
  <span className=\"text-[17px] font-extrabold min-w-[32px] text-center\" style={{ color: t.textPrimary }}>{valueFormatter(value)}</span>
  <button /* mirror minus, + icon */ />
</div>
\\\

### 7.22 \Alert\

**Intent:** Inline alert. 20-radius raised. 42x42 leading icon in its
own raised plate. 4 colors mapped to \success | warning | danger | info\
via the \	ype\ prop.

**Shadow recipes:** \
euAlert(theme)\, \
euAlertIcon(theme)\. Icon
colors come from \	.success\, \	.warning\, \	.danger\, \	.info\. Default
icons: \CheckCircle\, \AlertTriangle\, \XCircle\, \Info\. Optional
dismiss \X\ button in a \
euIconButton\.

**Layout:**
\\\	sx
<div className=\"flex items-center gap-3.5 p-[18px] mb-4 rounded-[20px] bg-[var(--bg)]\"
     style={{ boxShadow: \8px 8px 16px \, -8px -8px 16px \\ }}>
  <div className=\"grid place-items-center bg-[var(--bg)]\"
       style={{ width: 42, height: 42, borderRadius: 14,
                boxShadow: \4px 4px 8px \, -4px -4px 8px \\ }}>
    {iconForType[type]}
  </div>
  <div className=\"flex-1\">
    {title && <div className=\"text-sm font-extrabold mb-0.5\" style={{ color: t.textPrimary }}>{title}</div>}
    <div className=\"text-[13px] leading-5\" style={{ color: t.textSecondary }}>{message}</div>
  </div>
  {dismissible && /* small X icon button */}
</div>
\\\

### 7.23 \Rating\

**Intent:** A 5-star rating control. Each star is a small round plate
with a \Star\ icon. Active = \
euRatingStar(active=true, color)\ which
emits an *inset + outer glow* recipe. Inactive = \
euRatingStar(active=false)\
which is a regular raised plate.

**Shadow recipes:** Active:
\\\
box-shadow: inset 2px 2px 4px \, inset -2px -2px 4px \,
            0 0 12px \66;
\\\
Inactive:
\\\
box-shadow: 3px 3px 6px \, -3px -3px 6px \;
\\\

**Layout:**
\\\	sx
<div className=\"flex\" style={{ gap }}>
  {Array.from({length: 5}, (_, i) => i + 1).map(i => (
    <button key={i}
            className=\"grid place-items-center rounded-full bg-[var(--bg)]\"
            style={{ width: padSize, height: padSize,
                     boxShadow: isActive
                       ? \inset 2px 2px 4px \, inset -2px -2px 4px \, 0 0 12px \66\
                       : \3px 3px 6px \, -3px -3px 6px \\ }}>
      <Star size={size} color={isActive ? activeColor : t.textSecondary}
            fill={isActive ? activeColor : 'transparent'}
            strokeWidth={isActive ? 0 : 2} />
    </button>
  ))}
</div>
\\\

\padSize = size + 12\. Default \size = 26\, \ctiveColor = t.warning\.

### 7.24 \Accordion\

**Intent:** Vertical stack of collapsible rows. Each row is
\
euAccordion(theme)\ (20 radius raised). Header is a 18px-V / 20px-H
padded \Pressable\; right side has a chevron that rotates 180 deg when
open. The body is a 200ms \Animated.timing\ height + opacity
(\opacity: 0\ until 60% of progress, then 1) to avoid a flash of text.

**Shadow recipe:** \
euAccordion(theme)\ on each row (no shadow on the
header itself).

**Layout (static markup, with CSS transitions for height):**
\\\	sx
{items.map(item => (
  <div key={item.key} className=\"mb-3.5 rounded-[20px] overflow-hidden bg-[var(--bg)]\"
       style={{ boxShadow: \6px 6px 12px \, -6px -6px 12px \\ }}>
    <button onClick={() => toggle(item.key)}
            className=\"flex items-center justify-between w-full px-5 py-[18px] text-left\">
      <span className=\"text-[15px] font-bold flex-1 mr-4\" style={{ color: t.textPrimary }}>{item.title}</span>
      <span className=\"transition-transform duration-200\" style={{ transform: \
otate(\deg)\ }}>
        <ChevronDown size={16} color={t.textSecondary} />
      </span>
    </button>
    <div
      className=\"overflow-hidden transition-all duration-200\"
      style={{
        maxHeight: isOpen ? measuredHeight : 0,
        opacity: isOpen ? 1 : 0,
      }}>
      <div className=\"px-5 pb-[18px] text-sm leading-[22px]\" style={{ color: t.textSecondary }}>
        {item.content}
      </div>
    </div>
  </div>
))}
\\\

> On the web you can use \<details>/<summary>\ for zero-JS accordions,
> but the source uses explicit height measurement because multi-open +
> controlled state is a core feature. Keep the API: \llowMultiple\,
> \defaultOpenKeys\, \openKeys\ (controlled), \onOpenChange\.

### 7.25 \Skeleton\

**Intent:** A loading placeholder with a soft pulse (opacity 0.3 to 1,
2s loop, equal halves). \
euSkeleton(theme)\ is a 12-radius inset.

**Layout:**
\\\	sx
<div className=\"bg-[var(--bg)]\"
     style={{ width, height, borderRadius: circle ? height/2 : borderRadius,
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: \inset 4px 4px 8px \, inset -4px -4px 8px \\ }} />
\\\
The animation is plain CSS keyframes:
\\\css
@keyframes neu-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
\\\

### 7.26 \Divider\

**Intent:** A thin recessed line. 2px high, 1 radius, with vertical
margin 20. \
euDivider(theme)\ is inset 2/2/4.

**Layout:**
\\\	sx
<hr className=\"w-full\"
    style={{ height: 2, borderRadius: 1, marginBlock: 20, border: 0,
             backgroundColor: t.bgColor,
             boxShadow: \inset 2px 2px 4px \, inset -2px -2px 4px \\ }} />
\\\

### 7.27 \InfoRow\

**Intent:** A non-neu label/value row (e.g. inside a Card). Optional
border bottom, left/right icon, value can be a string or React node.

This is the one component that intentionally does *not* use a shadow
recipe - it lives inside a Card and is the only \"flat\" surface in the
system. Use it as-is: \paddingVertical = 14\, \paddingHorizontal = 4\,
\orderBottomWidth = 1\, \orderBottomColor = t.shadowDark\.

### 7.28 \Chip\

**Intent:** Small pill-shaped filter/option. Active = inset, inactive =
raised. Pill radius 20. Optional \X\ remove icon.

**Shadow recipe:** \
euChip(theme, active)\. The pressed state forces
inset (so chip looks \"depressed\" while being held).

**Layout:**
\\\	sx
<button onClick={onPress}
        className=\"flex items-center gap-1.5 py-2 px-4 rounded-[20px] bg-[var(--bg)]\"
        style={{ opacity: disabled ? 0.5 : 1,
                 boxShadow: active || pressed
                   ? \inset 3px 3px 6px \, inset -3px -3px 6px \\
                   : \4px 4px 8px \, -4px -4px 8px \\ }}>
  {iconLeft}
  <span className=\"text-[13px] font-bold\" style={{ color: active ? t.accent : t.textPrimary }}>{label}</span>
  {iconRight}
  {showRemoveIcon && /* X icon */}
</button>
\\\

### 7.29 \Tag\

**Intent:** Tiny read-only pill (e.g. for a status label). 12 radius.
Two sizes: \sm\ (\py-1 px-2.5 text-[10px]\) and \md\ (\py-1.5 px-3.5
text-xs\).

**Shadow recipe:** \
euTag(theme)\ (3/3/6 outer).

**Layout:** A flat flex row that uses the same \
euTag\ shadow.

### 7.30 \Avatar\

**Intent:** Circular user/bot avatar. Sizes: \sm 40 | md 56 | lg 80 | xl 120\.
Default placeholder is \initials\ text. Optional \online\ status dot
(resolved \size * 0.3\, bordered with \	.bgColor\).

**Shadow recipe:** \
euAvatar(theme, size)\ (6/6/12 outer, full circle).

**Layout:**
\\\	sx
<div className=\"relative\">
  <div className=\"grid place-items-center overflow-hidden bg-[var(--bg)]\"
       style={{ width: size, height: size, borderRadius: size / 2,
                boxShadow: \6px 6px 12px \, -6px -6px 12px \\ }}>
    {source ? <img className=\"w-full h-full object-cover\" /> : initials}
  </div>
  {online && <span className=\"absolute bottom-0 right-0 rounded-full border-2\"
                      style={{ width: size * 0.3, height: size * 0.3,
                               borderRadius: size * 0.15, backgroundColor: t.success,
                               borderColor: t.bgColor }} />}
</div>
\\\

Font sizes for initials scale with size: 14 / 20 / 28 / 36.

### 7.31 \Tabs\

**Intent:** A row of pill-style tabs that can be horizontally scrolled
or laid out in a flex row. Each tab is \
euTab(theme, active)\ (14
radius, 10px vertical / \	abPadding\ (22) horizontal). Optional badge
inside each tab. \gap = 12\ between tabs.

**Shadow recipe:** \
euTab(theme, isActive)\ (5/5/10 outer for
inactive, 4/4/8 inset for active).

**Layout:**
\\\	sx
<div className=\"overflow-x-auto\">
  <div className=\"flex pb-1\" style={{ gap, padding: 12 }}>
    {tabs.map(tab => (
      <button key={tab.key}
              className=\"flex items-center rounded-[14px] bg-[var(--bg)]\"
              style={{ padding: '10px 22px', marginRight: gap,
                       boxShadow: isActive
                         ? \inset 4px 4px 8px \, inset -4px -4px 8px \\
                         : \5px 5px 10px \, -5px -5px 10px \\ }}>
        <span className=\"text-sm font-bold whitespace-nowrap\"
              style={{ color: isActive ? t.accent : t.textSecondary }}>{tab.label}</span>
        {tab.badge && /* tiny badge with neuBadge shadow */}
      </button>
    ))}
  </div>
</div>
\\\

### 7.32 \PremiumOverlay\

**Intent:** An absolutely-positioned dimmed scrim that sits on top of
a Card / ListItem. Centered lock icon in a 60x60 round \IconButton\
with \enableHaptics\ (medium impact) and a default navigation to
\/payment\. Title and subtitle below.

The scrim itself uses \ackgroundColor: \66\ (40% alpha) so
the underlying card *bleeds through* the overlay. The lock icon button
re-uses \IconButton\ with \ariant=\"round\"\ and \size=60\.

---

## 8. Press / state rules to copy verbatim

Across the system the press feedback pattern is the same:

1. **Initial state:** \
aised\ shadow (outer dual).
2. **onMouseDown / onPressIn:** swap to \pressed\ shadow (inner dual).
3. **onMouseUp / onPressOut:** swap back to \
aised\.
4. For toggles and segmented controls, the *checked* state is \pressed\
   (i.e. the control sits inside a recess when active).
5. Haptic equivalents: \Light\ (most interactions), \Soft\ (button
   taps), \Medium\ (destructive / premium). On the web, trigger
   \
avigator.vibrate(8)\ for a tactile feel - but only on user
   gesture, never on mount.

Use Tailwind's \ctive:\ variant for the press state, e.g.
\ctive:shadow-[inset_...]\ on a \<button>\. For elements that need
\onMouseDown\/\onMouseUp\ instead, use a small \data-[pressed]:\
attribute selector or a \useState<boolean>\ flag.

---

## 9. Typography defaults

These are the fonts / sizes used in the source. Pick a system font on
the web and keep the sizes:

| Use | Size | Weight | Color |
|-----|------|--------|-------|
| Page title (NavbarTop) | 20 | 800 | \	extPrimary\ |
| Section title | 12 | 700 | \	extSecondary\ (uppercase, 1.2 letter-spacing) |
| SubSection title | 11 | 600 | \	extSecondary\ (uppercase, 0.8 letter-spacing) |
| Card title | 17 | 700 | \	extPrimary\ |
| Card subtitle | 14 | normal | \	extSecondary\ (line-height 22.4) |
| Button label (sm) | 13 | bold | status color |
| Button label (md/lg) | 15 | bold | status color |
| List item title | 15 | 700 | \	extPrimary\ |
| List item subtitle | 13 | normal | \	extSecondary\ |
| Input value | 15 | normal | \	extPrimary\ |
| Input label | 12 | 700 | \	extSecondary\ (uppercase, 0.5 letter-spacing) |
| Helper / error | 12 | normal | \	extSecondary\ / \danger\ |
| Stepper value | 17 | 800 | \	extPrimary\ |
| Slider value | 18 | 800 | \ccent\ |
| Chip | 13 | 700 | \ccent\ (active) / \	extPrimary\ (inactive) |
| Tag (sm) | 10 | 700 | \	extPrimary\ |
| Tag (md) | 12 | 700 | \	extPrimary\ |
| Alert title | 14 | 800 | \	extPrimary\ |
| Alert message | 13 | normal | \	extSecondary\ (line-height 20) |
| Badge value | 11 | 800 | \danger\ (or custom) |
| Tabs / Segmented label | 14 | 700 | active = \ccent\, inactive = \	extSecondary\ |
| Star value (Slider, not Rating) | 18 | 800 | \ccent\ |

Letter spacing: titles use \-0.5px\ (the source has a comment
\	racking-tight\ and \letterSpacing: -0.5\). Section labels are
\+1.2\ and \+0.5\ for SubSection. Set these with Tailwind's
\	racking-[-0.5px]\ / \	racking-[1.2px]\.

---

## 10. Spacing & radius defaults

- **Page padding** is implicit - components are placed inside the
  \Screen\ shell. 16-24px is a safe outer gutter.
- **Card** default \padding: 24\, \orderRadius: 24\, \marginBottom: 20\.
- **ListItem** default \padding: 16\, \orderRadius: 20\.
- **Input / TextArea** default \orderRadius: 16\, inner padding
  \16 vertical / 24 horizontal\ (or \12 horizontal\ when an icon is
  present).
- **Button** radius pairs: sm 12 / md 16 / lg 20.
- **IconButton** default 48x48. Square radius 14, round radius 24.
- **FAB** default 60x60.
- **Avatar** always \size/2\ radius (full circle).
- **SegmentedControl** outer 16, inner 12, 4px padding around the
  active segment.
- **Badge** 22x22, radius 11.
- **Chip** 20 radius (pill).
- **Tag** 12 radius, but allows \orderRadius\ override.
- **Tab** 14 radius.
- **Stepper** container 16, button 12.
- **Accordion row** 20.
- **Alert** 20.
- **Card** 24.
- **NavbarBottom** top corners 24.

---

## 11. Animation & motion

| Component | Animation | Duration | Easing |
|-----------|-----------|----------|--------|
| Toggle thumb slide | translateX 0 to \	rackWidth - thumb - 6\ | 200ms | ease-in-out |
| SegmentedControl active plate | spring | spring(friction 8, tension 40) | spring |
| Accordion height + opacity | height + opacity | 200ms | default |
| Skeleton pulse | opacity 0.3 to 1 | 2s loop | ease-in-out |
| Rating (no animation, but use a 60-100ms color flash via CSS transition) | - | - | - |
| Stepper / Chip / ListItem press swap | shadow swap | 100ms | default |

For all \"shadow swap\" transitions, a simple \	ransition: box-shadow
200ms ease\ on Tailwind (\	ransition-shadow duration-200 ease-in-out\)
covers it.

---

## 12. Accessibility

Each component declares \
ole\ and a label. Mirror them on the web:

| Component | role | label default |
|-----------|------|---------------|
| Button | button | title text |
| IconButton | button | \ccessibilityLabel\ (required when icon-only) |
| FAB | button | \"Add\" |
| NavbarTop left | button | \"Go back\" |
| NavbarTop right | button | \"More options\" |
| NavbarBottom item | button | \item.label\ |
| Toggle | switch | label or \ccessibilityLabel\ |
| Radio option | radio | \option.label\ |
| Checkbox option | checkbox | \option.label\ |
| Stepper +/- | button | \"Decrease\" / \"Increase\" |
| Tab | tab | label |
| Segmented | button | label |
| SearchBar | search | \"Search...\" |
| Input | textbox | (no default) |
| Select trigger | combobox | label |
| List item | button | title |

On the web, \ria-pressed\ for toggles, \ria-checked\ for radio /
checkbox, \ria-expanded\ for accordion, \ria-selected\ for tabs.

---

## 13. File / folder layout (recommended for the Next.js port)

\\\
app/
  layout.tsx             # ThemeProvider, body bgColor
  page.tsx               # demo
components/
  neumorphism/
    index.ts             # barrel
    theme.ts             # Theme type, resolveTheme, statusColorMap
    theme-colors.ts      # 60+ palettes
    neumorphism.ts       # style helpers (returns { className, style })
    Section.tsx
    SubSection.tsx
    NavbarTop.tsx
    NavbarBottom.tsx
    Input.tsx
    DateInput.tsx
    SearchBar.tsx
    TextArea.tsx
    Select.tsx
    Toggle.tsx
    Radio.tsx
    Checkbox.tsx
    Slider.tsx
    Stepper.tsx
    SegmentedControl.tsx
    Button.tsx
    IconButton.tsx
    FAB.tsx
    Card.tsx
    ListItem.tsx
    Avatar.tsx
    ProgressBar.tsx
    Tabs.tsx
    Chip.tsx
    Tag.tsx
    Rating.tsx
    Alert.tsx
    Accordion.tsx
    Skeleton.tsx
    Divider.tsx
    InfoRow.tsx
    PremiumOverlay.tsx
  ui/
    Screen.tsx           # page-level container
lib/
  useTheme.ts            # context consumer
  themeStore.ts          # zustand + persist
  cn.ts                  # tailwind className merge
tailwind.config.ts       # add CSS variables, extend boxShadow
\\\

---

## 14. Tailwind config cheat sheet

\\\	s
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'neu-raised':   '8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light)',
        'neu-pressed':  'inset 6px 6px 10px var(--shadow-dark), inset -6px -6px 10px var(--shadow-light)',
        'neu-button':   '6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light)',
        'neu-button-p': 'inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light)',
        // ... add the rest of the recipes from section 4
      },
      transitionProperty: { shadow: 'box-shadow' },
    },
  },
} satisfies Config;
\\\

Or skip the config and use arbitrary values everywhere - the source
already encodes the exact recipe per component, so you can just paste
them.

---

## 15. How to add new components

When you need a new component that follows the system:

1. Pick a helper from section 4. If none fit, *create a new helper* in
   \
eumorphism.ts\. Choose from the existing sizes:
   - 2/2/4 - tiny (badge, divider)
   - 3/3/6 - small (input icons, tag, radio/checkbox marks)
   - 4/4/8 - medium-small (segment active, alert icon, list icon, stepper btn)
   - 5/5/10 - medium (icon-only button, search bar, progress track)
   - 6/6/12 - standard (button, list item, chip, accordion, icon button)
   - 8/8/16 - heavy (alert, fab, round button)
   - 10/10/20 - heaviest (card)
2. Accept \ThemedProps\. Call \
esolveTheme(theme)\.
3. Default to \gColor\ for the surface and \	extPrimary\ for content.
4. Use the standard \gap\, \padding\, \orderRadius\ values from section 10.
5. If it can be pressed, swap the helper on press.
6. If it is destructive or premium, wire \enableHaptics\ (web:
   \
avigator.vibrate(15)\ inside a click handler, gated by prop).
7. If it is selectable, the **selected** state uses the *pressed*
   recipe (i.e. appears inset). This is the single most consistent
   design rule of the system.

---

## 16. Anti-patterns to avoid

- **Do not** mix a \
euPressed\ container with a \
euRaised\ *item*
  inside the same flat surface - the visual contract is that a pressed
  surface \"holds\" raised items. The exception is \Checkbox\ / \Radio\
  rows, where the row's state and the mark's state are independent.
- **Do not** add a \order\ to neu surfaces unless the design calls
  for a strong separation. Shadows do the work.
- **Do not** use a non-\gColor\ background inside a neu surface.
  Inset surfaces read as \"carved out of the page\", so a different
  fill breaks the illusion.
- **Do not** skip the \gap\ on flex rows. The system uses 4 / 8 / 12 / 14
  / 16 / 20 / 24 as the canonical rhythm. Default \gap: 12\.
- **Do not** use \letter-spacing: negative\ on labels. Only the page
  title and similar large display text use \-0.5\.

---

## 17. One-screen reference (cheat sheet for the AI)

\\\	s
// theme.ts
export interface Theme { /* section 2 */ }
export const lightTheme: Theme = defaultTheme;
export const darkTheme: Theme = darkTheme;        // see section 3
export function resolveTheme(o?: ThemeOverride): Theme;

// neumorphism.ts
export function neuRaised(theme):       { backgroundColor, boxShadow };
export function neuPressed(theme):      { backgroundColor, boxShadow };
export function neuButton(theme, size): { /* see section 4 */ };
// ... (all 30+ helpers)

// Components - see section 7 for source shapes, props, and web layouts.
```

**The single rule that ties everything together:**

> A *raised* surface uses outer shadows; a *pressed* surface uses
> inner shadows. **Selected** = **pressed**. **Active toggle** =
> **pressed** + **accent fill**. **Focused input** = **pressed** with
> deeper inset. Everything else inherits from these three rules.

If you keep this rule in mind while porting, the whole library
recreates itself with the same premium feel.
