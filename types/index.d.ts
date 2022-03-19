declare module '*.md' {
  const value: string;
  export default value
}

export interface NSISDocumentation {
  [key: string]: {
    name: string;
    content: string;
  };
}