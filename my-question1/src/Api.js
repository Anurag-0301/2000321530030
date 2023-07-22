export async function fetchDataFromURLs(urls) {
    const promises = urls.map((url) =>
      Promise.race([
        fetch(url).then((response) => response.json()),
        new Promise((resolve) => setTimeout(resolve, 500, { numbers: [] })),
      ])
    );
  
    const responses = await Promise.all(promises);
    const mergedNumbers = Array.from(new Set(responses.flatMap((response) => response.numbers)));
  
    return { numbers: mergedNumbers };
  }
  