function sumCommonPrefixes(strings: string[]): number[] {
  return strings.map(string => {
    let total = 0;
    let length = string.length;

    for (let i = 0; i < length; i++) {
      let commonLength = 0;

      for (let j = i, k = 0; j < length; j++, k++) {
        if (string[j] !== string[k]) break;
        commonLength++;
      }

      total += commonLength;
    }

    return total;
  });
}