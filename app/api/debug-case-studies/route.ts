import { NextResponse } from 'next/server';
import { getCaseStudies } from '@/lib/caseStudies';
import { getIndustries } from '@/lib/industries';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [caseStudies, industries] = await Promise.all([getCaseStudies(), getIndustries()]);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return NextResponse.json({
    supabaseUrlHost: url ? new URL(url).hostname : null,
    hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    industries,
    slugs: caseStudies.map((c) => c.slug),
  });
}
