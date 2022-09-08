import Image from "next/image";
import imageLoader from "../../imageLoader";
import { Result, Welcome } from "../../types";

function CharacterPage({ character }: { character: Result }) {
  return (
    <div>
      <h1>{character.name}</h1>
      {/* <Image
        src={character.image}
        alt={character.name}
        width="200px"
        height="200px"
        loader={imageLoader}
        unoptimized
      /> */}
    </div>
  );
}
export async function getStaticPaths() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: Welcome = await res.json();
  return {
    paths: results.map((character) => {
      return { params: { id: String(character.id) } };
    }),
    fallback: false,
  };
}
export async function getStaticProps({ params }: { params: { id: String } }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await res.json();
  return {
    props: {
      character,
    },
  };
}
export default CharacterPage;
