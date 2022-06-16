import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Pokedex, usePokemon } from "../../components/fetch";
import styles from "../../styles/details.module.css";

const Details = () => {
  const {
    query: { id },
  } = useRouter();

  const { pokemons, isLoading, isError } = usePokemon<Pokedex>(
    `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${id}.json`
  );

  if (!pokemons) return <div>loading...</div>;

  return (
    <div>
      <Head>
        <title>{pokemons.name}</title>
      </Head>

      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>

      <main className={styles.layout}>
        <div className={styles.img}>
          <Image
            src={`https://raw.githubusercontent.com/jherr/pokemon/main/${pokemons.image}`}
            alt={pokemons.name}
            width={300}
            height={400}
            layout="responsive"
          />
        </div>
        <div>
          <p className={styles.name}>{pokemons.name}</p>
          <p className={styles.type}>{pokemons.type.join(", ")}</p>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemons.stats.map(({ name, value }) => (
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

export default Details;
