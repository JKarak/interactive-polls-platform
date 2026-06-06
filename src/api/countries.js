export async function fetchCountries() {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name'
    );

    if (!response.ok) {
      throw new Error('Ошибка загрузки стран');
    }

    const countries =
      await response.json();

    return countries
      .map(
        (country) =>
          country.name.common
      )
      .sort();
  } catch (error) {
    console.error(error);

    return [];
  }
}