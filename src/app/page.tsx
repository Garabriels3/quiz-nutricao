import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome, Letícia!</h1>
      <p className="text-xl mb-8 text-center">Ready to test your nutrition knowledge?</p>
      <Link href="/subjects" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Start Quiz
      </Link>
    </div>
  );
}
