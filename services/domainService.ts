
import type { DomainCheckResults } from '../types';

// This is a MOCK service. Real DNS lookups cannot be performed from the browser.
// This simulates the backend logic from the user's provided Express app.
export const checkDomains = async (
  names: string[],
  tlds: string[]
): Promise<DomainCheckResults> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const toDomainSlug = (s: string) =>
    s
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 25) || 'brand';

  const results: DomainCheckResults = {};

  for (const name of names) {
    const slug = toDomainSlug(name);
    results[name] = {};
    for (const tld of tlds) {
      const domain = `${slug}.${tld}`;
      // Randomly decide if it's "free" for demonstration purposes
      const likely_free = Math.random() > 0.5;
      const note = likely_free
        ? 'No DNS records found. Might be free.'
        : 'DNS exists → likely taken (or parked).';
      
      results[name][tld] = {
        domain,
        likely_free,
        note: `${note} This is a simulation, not a registrar check.`,
      };
    }
  }

  return results;
};
