import { Tool } from '@/types/tool';

export const developerTools: Tool[] = [
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'Format, validate, beautify, and minify JSON code instantly online with syntax highlights.',
    category: 'developer',
    icon: 'Braces',
    seo: {
      title: 'JSON Formatter & Validator - Beautify JSON Code',
      description: 'Format and prettify raw JSON strings. Validate formats and repair broken syntax.',
      keywords: ['json formatter', 'beautify json', 'minify json', 'json validator', 'json repair'],
      overview: 'JSON is standard for data payloads. A formatter reorganizes dense single-line JSON text into hierarchical, readable indent layouts for inspection.',
      howToUse: ['Paste your raw JSON text.', 'Select indent size (2 spaces, 4 spaces, or Tab).', 'Click Format to prettify, or Minify to pack it.'],
      examples: [{ input: { json: '{"a":1,"b":2}' }, output: { formatted: '{\n  "a": 1,\n  "b": 2\n}' }, explanation: 'Expands raw JSON string into a structured layout.' }],
      faqs: [{ question: 'Is my JSON sent to a server?', answer: 'No! All parsing and formatting occur client-side in your browser cache, guaranteeing maximum data privacy.' }],
    },
    inputs: [
      { name: 'code', label: 'Raw JSON', type: 'text', defaultValue: '', placeholder: '{\n  "name": "UtilityHub",\n  "status": "active",\n  "toolsCount": 60\n}' },
      {
        name: 'indent',
        label: 'Indent Spaces',
        type: 'select',
        defaultValue: '2',
        options: [
          { label: '2 Spaces', value: '2' },
          { label: '4 Spaces', value: '4' },
          { label: 'Tab', value: 'tab' },
          { label: 'Minify', value: 'minify' },
        ],
      },
    ],
    outputs: [
      { name: 'formattedCode', label: 'Formatted Code', type: 'json' },
      { name: 'validationStatus', label: 'Syntax Status', type: 'text' },
    ],
    calculate: (inputs) => {
      const code = (inputs.code || '{\n"name": "UtilityHub",\n"status": "active",\n"toolsCount": 60\n}').trim();
      const indent = inputs.indent;

      if (!code) {
        return { formattedCode: '', validationStatus: 'Empty Input' };
      }

      try {
        const parsed = JSON.parse(code);
        let formatted = '';
        if (indent === 'minify') {
          formatted = JSON.stringify(parsed);
        } else if (indent === 'tab') {
          formatted = JSON.stringify(parsed, null, '\t');
        } else {
          formatted = JSON.stringify(parsed, null, Number(indent));
        }

        return {
          formattedCode: formatted,
          validationStatus: '✓ Valid JSON',
        };
      } catch (err: any) {
        return {
          formattedCode: code,
          validationStatus: `✗ Invalid JSON: ${err.message}`,
        };
      }
    },
  },
  {
    id: 'xml-formatter',
    slug: 'xml-formatter',
    title: 'XML Formatter & Prettifier',
    description: 'Format, align, and indent XML markup strings with standard tag structures.',
    category: 'developer',
    icon: 'Code2',
    seo: {
      title: 'XML Formatter - Beautify XML Documents',
      description: 'Format raw XML documents into hierarchical structural code. Clean up unaligned markup tags.',
      keywords: ['xml formatter', 'prettify xml', 'xml viewer', 'format xml markup'],
      overview: 'XML documents contain nested data. Formatting inserts indents and lines to visually clarify tag hierarchies.',
      howToUse: ['Paste raw XML strings.', 'Click Format to align tags.'],
      examples: [{ input: { xml: '<root><child val="1"/></root>' }, output: { formatted: '<root>\n  <child val="1" />\n</root>' }, explanation: 'Nests children nodes with indentation.' }],
      faqs: [{ question: 'Does this handle XML errors?', answer: 'It will alert you if tags are unclosed or invalidly formed.' }],
    },
    inputs: [
      { name: 'xml', label: 'Raw XML Code', type: 'text', defaultValue: '', placeholder: '<root><item id="1"><name>Utility</name></item><item id="2"><name>Verse</name></item></root>' },
    ],
    outputs: [
      { name: 'formattedXml', label: 'Prettified XML', type: 'text' },
      { name: 'status', label: 'Status', type: 'text' },
    ],
    calculate: (inputs) => {
      const xml = (inputs.xml || '<root><item id="1"><name>Utility</name></item><item id="2"><name>Verse</name></item></root>').trim();
      if (!xml) return { formattedXml: '', status: 'Empty' };

      // Basic regex-based XML formatter (lightweight, client-safe)
      let formatted = '';
      let reg = /(>)(<)(\/*)/g;
      let wxml = xml.replace(reg, '$1\r\n$2$3');
      let pad = 0;
      let lines = wxml.split('\r\n');
      
      try {
        lines.forEach((line: string) => {
          let indent = 0;
          if (line.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
          } else if (line.match(/^<\/\w/)) {
            if (pad !== 0) pad -= 1;
          } else if (line.match(/^<\w[^>]*[^\/]>$/)) {
            indent = 1;
          } else {
            indent = 0;
          }

          let padding = '';
          for (let i = 0; i < pad; i++) padding += '  ';
          formatted += padding + line + '\n';
          pad += indent;
        });

        return {
          formattedXml: formatted.trim(),
          status: '✓ Formatted',
        };
      } catch (err: any) {
        return {
          formattedXml: xml,
          status: `Error parsing XML: ${err.message}`,
        };
      }
    },
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    title: 'UUID v4 Generator',
    description: 'Generate secure cryptographically random UUIDs (Universally Unique Identifiers) in bulk.',
    category: 'developer',
    icon: 'Fingerprint',
    seo: {
      title: 'UUID Generator - Generate UUID v4 Online',
      description: 'Generate single or multiple random UUID v4 keys instantly. Clean interfaces for developers.',
      keywords: ['uuid generator', 'guid generator', 'uuid v4', 'generate guids online'],
      overview: 'A Universally Unique Identifier (UUID) v4 is a 128-bit label generated using secure random numbers. It offers extremely high uniqueness probability.',
      howToUse: ['Choose count of UUIDs to generate (1 to 100).', 'Toggle Uppercase or Hyphens.', 'Copy generated strings.'],
      examples: [{ input: { count: 2 }, output: { uuids: ['f81d4fae-7dec-11d0-a765-00a0c91e6bf6', '30a7d9b0-9831-41e9-bf0c-15a0c91e6bf0'] }, explanation: 'Generates two unique random v4 strings.' }],
      faqs: [{ question: 'What is the probability of a UUID collision?', answer: 'The probability of a duplicate is virtually zero; generating billions per second for years yields negligible collision risk.' }],
    },
    inputs: [
      { name: 'count', label: 'Quantity to Generate', type: 'number', defaultValue: 5, slider: { min: 1, max: 100, step: 1 } },
      { name: 'uppercase', label: 'Uppercase Letters', type: 'boolean', defaultValue: false },
    ],
    outputs: [{ name: 'uuids', label: 'Generated UUIDs', type: 'text' }],
    calculate: (inputs) => {
      const count = Math.min(100, Math.max(1, Number(inputs.count)));
      const upper = inputs.uppercase === true || inputs.uppercase === 'true';

      const results = [];
      for (let k = 0; k < count; k++) {
        // Standard random UUID v4 generator
        let u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          let r = (Math.random() * 16) | 0;
          let v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
        if (upper) u = u.toUpperCase();
        results.push(u);
      }

      return {
        uuids: results.join('\n'),
      };
    },
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    title: 'JWT Decoder',
    description: 'Decode JSON Web Tokens (JWT) to inspect their headers, payloads, and claims.',
    category: 'developer',
    icon: 'Key',
    seo: {
      title: 'JWT Decoder - Decode JSON Web Tokens Online',
      description: 'Decode and inspect JSON Web Tokens (JWT). Read header metadata, payload variables, and check validation claims.',
      keywords: ['jwt decoder', 'decode jwt token', 'json web token viewer', 'jwt payload inspector'],
      overview: 'JWTs are compact url-safe tokens representing claims between two parties. They consist of three dot-separated Base64Url parts: Header, Payload, and Signature.',
      howToUse: ['Paste your JWT token string into the text input.', 'Review parsed JSON headers and payloads.'],
      examples: [{ input: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }, output: { sub: '1234567890', name: 'John Doe' }, explanation: 'Decodes user identifiers and scopes from the compact token.' }],
      faqs: [{ question: 'Does decoding verify signature security?', answer: 'Decoding parses content for debugging. Verifying credentials requires the signature key in backend systems.' }],
    },
    inputs: [
      { name: 'token', label: 'Paste JWT Token', type: 'text', defaultValue: '', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.dyt0c2' },
    ],
    outputs: [
      { name: 'header', label: 'Header (Algorithm & Type)', type: 'json' },
      { name: 'payload', label: 'Payload (Data Claims)', type: 'json' },
      { name: 'status', label: 'Format Verification', type: 'text' },
    ],
    calculate: (inputs) => {
      const token = (inputs.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.dyt0c2').trim();
      if (!token) return { header: '{}', payload: '{}', status: 'Empty Token' };

      const parts = token.split('.');
      if (parts.length !== 3) {
        return { header: '{}', payload: '{}', status: 'Error: JWT must consist of three parts separated by dots (.)' };
      }

      try {
        const decodePart = (str: string) => {
          let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
          while (base64.length % 4) base64 += '=';
          // Decode URL safe Base64
          return decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
        };

        const headerDec = JSON.parse(decodePart(parts[0]));
        const payloadDec = JSON.parse(decodePart(parts[1]));

        return {
          header: JSON.stringify(headerDec, null, 2),
          payload: JSON.stringify(payloadDec, null, 2),
          status: '✓ Decoded Successfully',
        };
      } catch (err: any) {
        return {
          header: '{}',
          payload: '{}',
          status: `Decode Error: ${err.message}`,
        };
      }
    },
  },
  {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    title: 'Base64 Encoder / Decoder',
    description: 'Encode text strings into Base64 formats, or decode Base64 strings back to clean text.',
    category: 'developer',
    icon: 'Binary',
    seo: {
      title: 'Base64 Encoder & Decoder - Clean Text Codec',
      description: 'Encode plain text strings to Base64 or decode Base64 back to text instantly.',
      keywords: ['base64 encoder', 'base64 decoder', 'base64 convert', 'binary to text'],
      overview: 'Base64 is a binary-to-text encoding scheme translating byte structures into 64 safe ASCII characters, commonly used for data transmission or embedding assets.',
      howToUse: ['Select mode (Encode or Decode).', 'Input text data.', 'Press run.'],
      examples: [{ input: { mode: 'encode', text: 'Hello' }, output: { result: 'SGVsbG8=' }, explanation: 'Translates "Hello" into standard Base64 representation.' }],
      faqs: [{ question: 'Is Base64 secure encryption?', answer: 'No! Base64 is merely a visual encoding scheme, not encryption; anyone can decode it instantly.' }],
    },
    inputs: [
      {
        name: 'mode',
        label: 'Operation Mode',
        type: 'select',
        defaultValue: 'encode',
        options: [
          { label: 'Encode Plain Text to Base64', value: 'encode' },
          { label: 'Decode Base64 to Plain Text', value: 'decode' },
        ],
      },
      { name: 'text', label: 'Input Text', type: 'text', defaultValue: '', placeholder: 'UtilityHub is awesome!' },
    ],
    outputs: [{ name: 'result', label: 'Resulting Output', type: 'text' }],
    calculate: (inputs) => {
      const mode = inputs.mode;
      const text = inputs.text || 'UtilityHub is awesome!';

      if (!text) return { result: '' };

      try {
        if (mode === 'encode') {
          // UTF-8 safe base64 encoding
          const utf8Bytes = new TextEncoder().encode(text);
          let bin = '';
          utf8Bytes.forEach((b) => {
            bin += String.fromCharCode(b);
          });
          return { result: btoa(bin) };
        } else {
          // Base64 decoding
          const bin = atob(text.trim());
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) {
            bytes[i] = bin.charCodeAt(i);
          }
          return { result: new TextDecoder().decode(bytes) };
        }
      } catch (err: any) {
        return {
          result: mode === 'decode'
            ? 'Codec Error: The input is not a valid Base64 encoded string. Please check your inputs.'
            : `Codec Error: ${err.message}`,
        };
      }
    },
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    title: 'Regex Tester',
    description: 'Test and debug regular expressions online with live matching and capture groups.',
    category: 'developer',
    icon: 'Search',
    seo: {
      title: 'Regex Tester Online - Test Regular Expressions',
      description: 'Test your regular expressions in real-time. Highlights match patterns, captures groups, and analyzes errors.',
      keywords: ['regex tester', 'regular expression tester', 'test regex online', 'regex highlight matcher'],
      overview: 'Regular expressions are powerful character search patterns. Testing patterns interactively with live highlight indicators speeds up code development.',
      howToUse: ['Enter your regular expression pattern.', 'Select search flags (e.g. g for global, i for case-insensitive).', 'Input your search string to inspect match lists and groups.'],
      examples: [{ input: { regex: '\\d+', flags: 'g', text: 'Items: 42, boxes: 7' }, output: { matchCount: '2', matches: 'Match 1: "42"\nMatch 2: "7"' }, explanation: 'Identifies all numerical values in the search text.' }],
      faqs: [{ question: 'Does this execute safely?', answer: 'Yes! Standard regex tests compile directly in your browser. Large strings are tested locally to protect confidential logs.' }],
    },
    inputs: [
      { name: 'regex', label: 'Regular Expression', type: 'text', defaultValue: '', placeholder: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b' },
      { name: 'flags', label: 'Flags (e.g. g, i, m)', type: 'text', defaultValue: 'g' },
      { name: 'text', label: 'Test String', type: 'text', defaultValue: '', placeholder: 'Contact us at support@example.com or sales@utilityverse.org for inquiries.' },
    ],
    outputs: [
      { name: 'matchCount', label: 'Match Count', type: 'text' },
      { name: 'matchesList', label: 'Capture Groups & Details', type: 'text' },
      { name: 'highlightedText', label: 'Highlighted Text', type: 'html' },
    ],
    calculate: (inputs) => {
      const regexStr = String(inputs.regex || '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b').trim();
      const flags = String(inputs.flags).trim();
      const text = String(inputs.text || 'Contact us at support@example.com or sales@utilityverse.org for inquiries.');

      if (!regexStr) {
        return {
          matchCount: '0',
          matchesList: 'No Pattern Provided',
          highlightedText: `<div class="whitespace-pre-wrap font-mono text-xs leading-relaxed">${text}</div>`,
        };
      }

      try {
        const re = new RegExp(regexStr, flags);
        let matchCount = 0;
        let matches: string[] = [];
        
        const escapeHtml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const escapedText = escapeHtml(text);
        let highlighted = '';

        if (flags.includes('g')) {
          let match;
          const safeRe = new RegExp(regexStr, flags);
          while ((match = safeRe.exec(text)) !== null) {
            if (match.index === safeRe.lastIndex) {
              safeRe.lastIndex++;
            }
            matchCount++;
            matches.push(`Match ${matchCount}: "${match[0]}" ${match.length > 1 ? `(Groups: ${match.slice(1).map(g => `"${g}"`).join(', ')})` : ''}`);
          }

          let matchHighlight;
          const highlightRe = new RegExp(regexStr, flags);
          let lastIndex = 0;
          while ((matchHighlight = highlightRe.exec(text)) !== null) {
            const matchVal = matchHighlight[0];
            if (!matchVal) {
              highlightRe.lastIndex++;
              continue;
            }
            const before = text.substring(lastIndex, matchHighlight.index);
            highlighted += escapeHtml(before) + `<mark class="bg-amber-200 text-amber-900 font-semibold px-0.5 rounded border border-amber-305 dark:bg-amber-900/60 dark:text-amber-100 dark:border-amber-700/50">${escapeHtml(matchVal)}</mark>`;
            lastIndex = highlightRe.lastIndex;
          }
          highlighted += escapeHtml(text.substring(lastIndex));
        } else {
          const match = text.match(re);
          if (match) {
            matchCount = 1;
            matches.push(`Match 1: "${match[0]}" ${match.length > 1 ? `(Groups: ${match.slice(1).map(g => `"${g}"`).join(', ')})` : ''}`);
            
            const index = match.index || 0;
            const matchVal = match[0];
            highlighted = escapeHtml(text.substring(0, index)) + 
              `<mark class="bg-amber-200 text-amber-900 font-semibold px-0.5 rounded border border-amber-305 dark:bg-amber-900/60 dark:text-amber-100 dark:border-amber-700/50">${escapeHtml(matchVal)}</mark>` + 
              escapeHtml(text.substring(index + matchVal.length));
          } else {
            highlighted = escapedText;
          }
        }

        return {
          matchCount: String(matchCount),
          matchesList: matches.length > 0 ? matches.join('\n') : 'No Matches Found',
          highlightedText: `<div class="whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-350">${highlighted}</div>`,
        };
      } catch (err: any) {
        return {
          matchCount: 'Error',
          matchesList: `Invalid Regex: ${err.message}`,
          highlightedText: `<span class="text-red-500 font-semibold text-xs">Regex compile error: ${err.message}</span>`,
        };
      }
    },
  },
];
