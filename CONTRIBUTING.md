# Contributing to Emblem Eight

Thank you for your interest in contributing to Emblem Eight! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/emblem-eight.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Guidelines

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages

### Component Structure

```typescript
'use client'; // Only if needed

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ComponentProps {
  // Props definition
}

export default function Component({ prop }: ComponentProps) {
  const t = useTranslations('Namespace');
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### Internationalization

- All user-facing text must be translatable
- Add translations to both `messages/en.json` and `messages/ar.json`
- Use the `useTranslations` hook in client components
- Use `getTranslations` in server components

### Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design (mobile-first)
- Support RTL for Arabic

### Testing

Before submitting a PR:
- Test in both English and Arabic
- Test all view modes (grid, list, masonry)
- Verify responsive design on mobile
- Check browser console for errors
- Run `npm run build` to check for TypeScript errors

## Pull Request Process

1. Update the README.md if needed
2. Test your changes thoroughly
3. Create a pull request with a clear description
4. Reference any related issues

### PR Checklist

- [ ] Code follows the project style
- [ ] Changes work in both English and Arabic
- [ ] Tested on mobile and desktop
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] Documentation updated if needed

## Feature Requests

Have an idea? Open an issue with:
- Clear description of the feature
- Use case / benefit
- Any implementation suggestions

## Bug Reports

Found a bug? Open an issue with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for helping make Emblem Eight better! 🙏

