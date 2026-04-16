import { describe, expect, it } from 'vitest';
import {
  analystOrbitIcons,
  engineeringCoreStack,
  engineeringOrbitIcons,
  engineeringSupportingStack,
} from './techIcons';

describe('tech icon registry', () => {
  it('resolves analyst orbit icons from the analyst profile folder', () => {
    analystOrbitIcons.forEach((icon) => {
      expect(icon.profile).toBe('analyst');
      expect(icon.source).toContain('/images/icons/analyst/');
    });
  });

  it('resolves engineering orbit and stack icons from the engineering profile folder', () => {
    [...engineeringOrbitIcons, ...engineeringCoreStack, ...engineeringSupportingStack].forEach((icon) => {
      expect(icon.profile).toBe('engineering');
      expect(icon.source).toContain('/images/icons/engineering/');
    });
  });

  it('keeps the engineering orbit and core stack aligned to the same icon set', () => {
    expect(engineeringOrbitIcons.map((icon) => icon.name)).toEqual(engineeringCoreStack.map((icon) => icon.name));
  });
});
