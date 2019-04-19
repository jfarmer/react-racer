import Word from './Word';

function* allMatches(regex, str) {
  let match = regex.exec(str);

  while (match) {
    yield match;
    match = regex.exec(str);
  }
}

const mapMatches = (regex, str, fn) => (
  Array.from(allMatches(regex, str)).map(fn)
);

const QuoteMap = ({ quote }) => {
  const allWords = mapMatches(/[^\s]+(\s|$)/g, quote, match => (
    Word({ text: match[0], offset: match.index })
  ));

  return {
    quote,
    words: () => allWords.values(),
    getWord: i => allWords[i],
    getWordOffset: i => allWords[i].offset,
    wordsCount: () => allWords.length,
  };
};

export default QuoteMap;
