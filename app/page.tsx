'use client'
import Link from "next/link";

export default function Home() {
  return (
   <main>
    <Link href={{ pathname: '/Game', query: { name: 'easy' } }}>Easy</Link>
      <Link href={{ pathname: '/Game', query: { name: 'med' } }}>Medium</Link>
      <Link href={{ pathname: '/Game', query: { name: 'hard' } }}>Hard</Link>
   </main>
  );
}
