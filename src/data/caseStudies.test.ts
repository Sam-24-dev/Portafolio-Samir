import { describe, expect, it } from 'vitest';
import { caseStudies } from './caseStudies';

describe('case studies data', () => {
  it('defines two analyst depth targets with concise bilingual sections', () => {
    expect(caseStudies.map((caseStudy) => caseStudy.projectId)).toEqual([1, 2]);

    for (const caseStudy of caseStudies) {
      expect(caseStudy.summary).toBeTruthy();
      expect(caseStudy.summaryEs).toBeTruthy();
      expect(caseStudy.roleSummary).toBeTruthy();
      expect(caseStudy.roleSummaryEs).toBeTruthy();
      expect(caseStudy.businessProblem).toHaveLength(2);
      expect(caseStudy.businessProblemEs).toHaveLength(2);
      expect(caseStudy.datasetAndWorkflow).toHaveLength(2);
      expect(caseStudy.datasetAndWorkflowEs).toHaveLength(2);
      expect(caseStudy.toolsUsed).toHaveLength(4);
      expect(caseStudy.toolsUsedEs).toHaveLength(4);
      expect(caseStudy.metricsAndResult).toHaveLength(3);
      expect(caseStudy.metricsAndResultEs).toHaveLength(3);
      expect(caseStudy.whyItMatters).toBeTruthy();
      expect(caseStudy.whyItMattersEs).toBeTruthy();
      expect(caseStudy.links.caseStudyUrl).toMatch(/^https:\/\/github\.com\//);
      expect(caseStudy.links.liveUrl).toMatch(/^https?:\/\//);
    }
  });
});
