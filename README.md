# @jeetaksh/neumorphism-ui

A premium **neumorphism** React component library with **60+ built-in themes**, designed for **Next.js** and modern React apps using **Tailwind CSS**.

## Installation

```bash
npm install @jeetaksh/neumorphism-ui
```

Make sure your project has Tailwind CSS configured so the utility classes used by the components are available.

## Quick start

```tsx
'use client';

import { ThemeProvider, defaultTheme, Button, Card, Screen } from '@jeetaksh/neumorphism-ui';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Screen>
        <Card title="Welcome">
          <Button title="Get started" onPress={() => alert('Hello!')} />
        </Card>
      </Screen>
    </ThemeProvider>
  );
}
```

## Available themes

The library ships with 60+ pre-baked palettes:

```tsx
import {
  defaultTheme,
  darkTheme,
  arcticFrostTheme,
  obsidianSteelTheme,
  themes,
} from '@jeetaksh/neumorphism-ui';
```

Use any theme object directly, or import the `themes` record to swap by key.

## Theming a component

Every component accepts an optional `theme` prop for one-off overrides:

```tsx
<Button
  title="Save"
  theme={{ accent: '#10B981' }}
  onPress={() => {}}
/>
```

## Components

`Accordion`, `Alert`, `Avatar`, `Button`, `Card`, `Checkbox`, `Chip`, `DateInput`, `Divider`, `FAB`, `IconButton`, `InfoRow`, `Input`, `ListItem`, `NavbarBottom`, `NavbarTop`, `PremiumOverlay`, `ProgressBar`, `Radio`, `Rating`, `Screen`, `SearchBar`, `Section`, `SegmentedControl`, `Select`, `Skeleton`, `Slider`, `Stepper`, `SubSection`, `Tabs`, `Tag`, `TextArea`, `Toggle`.

## License

MIT © Jeetaksh
