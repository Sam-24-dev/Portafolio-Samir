import { describe, expect, it } from 'vitest';
import { engineeringCaseStudies, engineeringRouteContent } from './engineeringContent';

describe('engineeringContent', () => {
  it('locks the proof strip to verified metrics only', () => {
    expect(engineeringRouteContent.en.proofStrip.items.map((item) => item.value)).toEqual([
      '931',
      '22',
      '33,356',
      '126',
    ]);
  });

  it('keeps the spanish engineering copy free of mojibake', () => {
    const serialized = JSON.stringify({
      route: engineeringRouteContent.es,
      cases: engineeringCaseStudies.map((caseStudy) => ({
        summaryEs: caseStudy.summaryEs,
        whyItMattersEs: caseStudy.whyItMattersEs,
      })),
    });

    expect(serialized).not.toContain('Ã');
    expect(serialized).not.toContain('ï¿½');
    expect(engineeringRouteContent.es.anchorProjects.title).toBe('Proyectos clave del perfil Data Engineer');
    expect(engineeringRouteContent.es.caseStudyModal.caseButtonLabel).toBe('Ver caso completo');
    expect(engineeringCaseStudies[0].summaryEs).toContain('señales públicas');
    expect(engineeringRouteContent.es.proofStrip.items[1].note).toContain('22 tecnologías');
  });

  it('defines architecture and delivery images for both engineering case studies', () => {
    expect(engineeringCaseStudies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'tech-trends',
          architectureImage: '/images/case-studies/engineering/tech-trends/architecture.webp',
          deliveryImage: '/images/case-studies/engineering/tech-trends/delivery.webp',
        }),
        expect.objectContaining({
          id: 'ridefare',
          architectureImage: '/images/case-studies/engineering/ridefare/architecture.webp',
          deliveryImage: '/images/case-studies/engineering/ridefare/delivery.webp',
        }),
      ])
    );
  });
});
