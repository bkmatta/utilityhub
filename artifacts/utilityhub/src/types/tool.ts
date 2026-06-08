import React from 'react';

export type ToolCategory = 'finance' | 'health' | 'general' | 'converters' | 'pdf' | 'developer' | 'image' | 'business';

export interface ToolField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'boolean' | 'file';
  defaultValue: any;
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
    pattern?: string;
  };
  options?: { label: string; value: string | number }[];
  unit?: string;
  slider?: { min: number; max: number; step: number };
  helpText?: string;
  placeholder?: string;
}

export interface ToolResultField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'currency' | 'percentage' | 'date' | 'json' | 'html';
  unit?: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  overview: string;
  formula?: {
    expression: string;
    explanation: string;
  };
  howToUse: string[];
  examples: {
    input: Record<string, any>;
    output: Record<string, any>;
    explanation: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: string;

  seo: SeoMetadata;
  inputs: ToolField[];
  outputs: ToolResultField[];

  calculate: (input: Record<string, any>) => Record<string, any> | Promise<Record<string, any>>;

  customRenderer?: React.ComponentType<{ tool: Tool }>;
}
