const Word = ({ offset, text }) => {
  const [word, whitespace] = text.match(/([^\s]+)(\s|$)/).slice(1);

  return {
    offset,
    text,
    word,
    whitespace,
    letters: Array.from(text),
    hasWhitespace: () => Boolean(whitespace),
    toString: () => text,
  };
};

export default Word;
