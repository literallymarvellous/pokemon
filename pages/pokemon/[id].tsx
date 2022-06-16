import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Pokedex, usePokemon } from "../../components/fetch";
import styles from "../../styles/details.module.css";
import { GetServerSideProps } from "next";

const Details = ({ pokemon }: { pokemon: Pokedex }) => {
  // const {
  //   query: { id },
  // } = useRouter();

  // const { pokemons, isLoading, isError } = usePokemon<Pokedex>(
  //   `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${id}.json`
  // );

  if (!pokemon) return <div>loading...</div>;

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>

      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>

      <main className={styles.layout}>
        <div className={styles.img}>
          <Image
            src={`https://raw.githubusercontent.com/jherr/pokemon/main/${pokemon.image}`}
            alt={pokemon.name}
            width={300}
            height={400}
            layout="responsive"
          />
        </div>
        <div>
          <p className={styles.name}>{pokemon.name}</p>
          <p className={styles.type}>{pokemon.type.join(", ")}</p>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(
    `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${id}.json`
  );
  const data: Pokedex = await res.json();

  return {
    props: {
      pokemon: data,
    },
  };
};

export default Details;
