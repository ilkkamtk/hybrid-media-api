const fetchData = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  console.log('fetching data');
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} occured`);
  }
  const json = response.json();
  return json;
};

export {fetchData};
