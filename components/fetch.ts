import useSWR, { Fetcher } from "swr";

export type PokemonIndex = {
  id: number;
  name: string;
  image: string;
};

export type Pokedex = {
  name: string;
  type: string[];
  stats: Stat[];
  image: string;
};

export type Stat = {
  name: string;
  value: number;
};

export const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const usePokemon = <T>(url: string) => {
  const { data, error } = useSWR<T>(url, fetcher);

  return {
    pokemons: data,
    isLoading: !error && !data,
    isError: error,
  };
};
