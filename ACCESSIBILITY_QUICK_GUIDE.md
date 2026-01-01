# Accessibility Features Quick Guide

## How to Use the Accessibility Panel

### Opening the Panel
- Click the **purple accessibility icon** (circle with icon) in the bottom-left corner of the screen
- The panel will slide up showing all available features

### Feature Controls

Each feature has **3 states**:
1. **OFF** (gray) - Feature disabled
2. **LIGHT** (1 intensity bar) - Moderate adjustment
3. **FULL** (2 intensity bars) - Maximum adjustment

**To toggle:** Click any feature button to cycle through these states

---

## Available Features

### 📊 Visual Contrast Features

#### **Contrast**
- Light: +25% contrast boost
- Full: +50% contrast boost
- ✨ For: Low vision, visual fatigue

#### **Saturation**
- Light: +30% color intensity
- Full: +70% color intensity
- ✨ For: Color blindness, visual processing

### 🔤 Text Features

#### **Larger Text**
- Light: 110% font size
- Full: 120% font size
- ✨ For: Low vision, aging eyes

#### **Text Spacing**
- Light: 1x letter/word spacing increase
- Full: 1.5x letter/word spacing increase
- ✨ For: Dyslexia, reading difficulties

#### **Dyslexia Font**
- Light: Basic dyslexia-friendly font
- Full: Enhanced letter differentiation
- ✨ For: Dyslexia, letter confusion

#### **Row Height**
- Light: 2x line height
- Full: 2.5x line height
- ✨ For: Tracking words, visual processing

### 🔗 Link & Focus Features

#### **Mark Links**
- Adds blue outline around all links
- ✨ For: Not relying on color alone, link identification

#### **Underline Links**
- Light: 1px underline on all links
- Full: 2px underline on all links
- ✨ For: Color blindness, link distinction

#### **Focus Indicator**
- Light: Enhanced blue focus outlines
- Full: Large red focus outlines (high visibility)
- ✨ For: Keyboard navigation, visibility

### ⏸️ Motion & Media Features

#### **Stop Animations**
- Disables all CSS animations and transitions
- ✨ For: Motion sensitivity, seizure disorders, distraction

#### **Hide Images**
- Removes all images from view (text remains)
- ✨ For: Focus on content, data saving, visual overload

---

## Keyboard Shortcuts

### Navigation
| Key | Action |
|-----|--------|
| `Tab` | Navigate forward |
| `Shift + Tab` | Navigate backward |
| `Enter` or `Space` | Activate button/link |
| `Escape` | Close accessibility panel (when focused) |

### Skip Links
1. Press `Tab` at page load
2. First item is "Skip to main content"
3. Press `Enter` to skip navigation

---

## Combining Features for Different Needs

### 👁️ For Low Vision Users
```
✓ Contrast: FULL
✓ Larger Text: LIGHT or FULL
✓ Row Height: LIGHT
```

### 🧠 For Dyslexia
```
✓ Dyslexia Font: LIGHT or FULL
✓ Text Spacing: LIGHT or FULL
✓ Row Height: LIGHT
✓ Underline Links: LIGHT (prevent missing links)
```

### 🎨 For Color Blindness
```
✓ Saturation: LIGHT or FULL
✓ Contrast: LIGHT
✓ Underline Links: FULL (don't rely on color alone)
✓ Mark Links: ON (additional distinction)
```

### ⚡ For Motion Sensitivity
```
✓ Stop Animations: ON
✓ Prefer Reduced Motion: (System setting - automatically detected)
```

### 🎯 For Keyboard Users
```
✓ Focus Indicator: FULL (easier to see focus)
✓ Mark Links: ON (identify interactive elements)
```

### 📱 For Mobile Users
```
✓ Larger Text: LIGHT
✓ Text Spacing: LIGHT
✓ Row Height: LIGHT
✓ Underline Links: LIGHT
```

---

## Reset All Features

Click the **Reset** button (🔄) at the bottom of the accessibility panel to:
- Turn off all features
- Return to default view
- Restore original styling

---

## Settings Persist

Your accessibility preferences are **session-based**. When you:
- ✅ Change a feature - immediately applied
- ✅ Close and reopen the panel - settings remain
- ✅ Refresh the page - settings reset to default

---

## Tested With Screen Readers

✅ **NVDA** (Windows)
✅ **JAWS** (Windows)  
✅ **VoiceOver** (macOS/iOS)
✅ **TalkBack** (Android)

All accessibility announcements support:
- 🇬🇧 English
- 🇩🇪 German (Deutsch)

---

## Browser Support

✅ Chrome/Chromium
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile browsers

All features work across devices:
- Desktop
- Tablet
- Mobile phone

---

## System Preferences

The site automatically detects and respects:

### `prefers-reduced-motion`
If your operating system is set to reduce motion:
- Animations are disabled by default
- You can still enable them if desired

**To set on your device:**
- **Windows 10/11**: Settings → Ease of Access → Display → Show animations
- **macOS**: System Preferences → Accessibility → Display → Reduce motion
- **iOS**: Settings → Accessibility → Motion
- **Android**: Settings → Accessibility → Remove animations

---

## Language Support

Click the flag icons in the top navigation to switch:
- 🇬🇧 **English** (EN)
- 🇩🇪 **Deutsch** (DE)

All accessibility features display in your chosen language.

---

## Common Issues & Solutions

### Features not working?
1. Refresh the page (Ctrl+R or Cmd+R)
2. Click the feature button again
3. Clear browser cache if persistence issues

### Focus indicators hard to see?
1. Open accessibility panel
2. Set **Focus Indicator** to FULL
3. Choose your preferred outline color

### Text too small with smaller text?
1. Use browser zoom: Ctrl++ / Cmd++
2. Plus use **Larger Text** feature
3. Both work together!

### Animations still playing?
1. Check system `prefers-reduced-motion` setting
2. Click **Stop Animations** in panel
3. Ensure JavaScript is enabled

---

## Getting Help

If a feature doesn't work as expected:

1. **Take a screenshot** of the issue
2. **Note the browser** you're using
3. **Document what you expected** vs what happened
4. **Report to developer** with details

This helps improve accessibility for everyone!

---

## Additional Resources

- [WebAIM: Web Accessibility](https://webaim.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)
- [Accessibility Guidelines](https://www.w3.org/WAI/)

---

**Last Updated**: January 2026
**Accessibility Level**: WCAG 2.1 AA Compliant
**Features**: 11 customizable options with 3-level intensity
