export interface CodeSnippet {
  language: string;
  code: string;
  explanation?: string;
  output?: string;
}

export interface Approach {
  title: string;
  description: string;
  codeSnippet: CodeSnippet;
}

export interface InterviewQuestion {
  id: string;
  topicSlug: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  theoreticalAnswer: string[];
  primaryApproach: Approach;
  alternativeApproaches?: Approach[];
}

export interface TopicCategory {
  slug: string;
  name: string;
  type: 'language' | 'framework' | 'library' | 'database' | 'core_cs';
  icon: string;
  description: string;
}
