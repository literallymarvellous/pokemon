import type { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PokemonIndex, usePokemon } from "../components/fetch";

const Home = ({ pokemons }: { pokemons: PokemonIndex[] }) => {
  // const { pokemons, isLoading, isError } = usePokemon<PokemonIndex[]>(
  //   "https://raw.githubusercontent.com/jherr/pokemon/main/index.json"
  // );

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon list</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <h1 className="heading">Pokemon List</h1>

      <div className={styles.grid}>
        {pokemons
          ? pokemons.map((pokemon) => (
              <div className={styles.card} key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <a className="img">
                    <Image
                      src={`https://raw.githubusercontent.com/jherr/pokemon/main/${pokemon.image}`}
                      layout="responsive"
                      alt={pokemon.name}
                      width={400}
                      height={300}
                    />
                    <p className={styles.name}>{pokemon.name}</p>
                  </a>
                </Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/jherr/pokemon/main/index.json"
  );
  const data: PokemonIndex[] = await res.json();

  return {
    props: {
      pokemons: data,
    },
  };
};

export default Home;
