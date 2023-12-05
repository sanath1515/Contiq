export const convertFragmentText = (
  fragmentText: Array<{ pageNumber: number; text: string }>
) => {
  const pages: number[] = [];
  const paragraphs: string[] = [];

  // Create a map to group fragments by page number
  const pageMap = new Map();

  fragmentText.forEach((fragment) => {
    const { pageNumber, text } = fragment;
    pages.push(pageNumber);
    if (!pageMap.has(pageNumber)) {
      pageMap.set(pageNumber, []);
    }
    pageMap.get(pageNumber).push(text);
  });

  // Sort the pages array
  pages.sort((a, b) => a - b);

  // Iterate through sorted page numbers
  pages.forEach((pageNumber) => {
    const texts = pageMap.get(pageNumber);

    if (texts && texts.length > 0) {
      paragraphs.push(texts.shift());
    }
  });

  return { pages, paragraphs };
};
