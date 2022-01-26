declare module '*.md' {
  const value: string;
  export default value
}

interface NSISDocumentation {
  [key: string]: {
    name: string;
    content: string;
  };
}