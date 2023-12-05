export const splitParagraph=(paragraph:string, query:string) =>{
    const queryLower = query.toLowerCase();
    const paragraphLower = paragraph.toLowerCase();
  
    const index = paragraphLower.indexOf(queryLower);
    
      const beforeQuery = paragraph.slice(0, index);
      const queryPart = paragraph.slice(index, index + query.length);
      const afterQuery = paragraph.slice(index + query.length);
  
      return {
        beforeQuery: beforeQuery,
        queryPart: queryPart,
        afterQuery: afterQuery
      };

  }
  