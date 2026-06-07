import { Tool, ToolCategory } from '@/types/tool';
import { financeTools } from './tools/finance';
import { healthTools } from './tools/health';
import { generalTools } from './tools/general';
import { convertersTools } from './tools/converters';
import { pdfTools } from './tools/pdf';
import { developerTools } from './tools/developer';
import { imageTools } from './tools/image';
import { businessTools } from './tools/business';

export const allTools: Tool[] = [
  ...financeTools,
  ...healthTools,
  ...generalTools,
  ...convertersTools,
  ...pdfTools,
  ...developerTools,
  ...imageTools,
  ...businessTools,
];

const toolsBySlug = new Map<string, Tool>();
const toolsById = new Map<string, Tool>();
const toolsByCategory = new Map<ToolCategory, Tool[]>();

allTools.forEach((tool) => {
  toolsBySlug.set(tool.slug, tool);
  toolsById.set(tool.id, tool);

  const categoryTools = toolsByCategory.get(tool.category) || [];
  categoryTools.push(tool);
  toolsByCategory.set(tool.category, categoryTools);
});

export function getToolBySlug(slug: string): Tool | undefined {
  return toolsBySlug.get(slug);
}

export function getToolById(id: string): Tool | undefined {
  return toolsById.get(id);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return toolsByCategory.get(category) || [];
}

export function searchTools(query: string): Tool[] {
  if (!query) return [];
  const normalizedQuery = query.toLowerCase().trim();

  return allTools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery) ||
      tool.seo.keywords.some((kw) => kw.toLowerCase().includes(normalizedQuery)) ||
      tool.category.toLowerCase().includes(normalizedQuery)
  );
}

export function getTrendingTools(): Tool[] {
  const trendingSlugs = [
    'bmi-calculator',
    'emi-calculator',
    'age-calculator',
    'pdf-merge',
    'pdf-compress',
    'currency-converter',
  ];
  return trendingSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is Tool => !!tool);
}
