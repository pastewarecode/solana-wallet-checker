import Link from 'next/link';

export default function Page() {


    return (
        <main>
            <h1 className="font-bold text-2xl p-4">SolSearch</h1>

            <div>
                <Link legacyBehavior href='http://localhost:3000/Pages' passHref>
                    <a className='text-blue-700 hover:text-violet-900 underline ml-5'>Portfolio Page</a>
                </Link>

                <Link legacyBehavior href='http://localhost:3000/Pages/TestPage' passHref>
                    <a className='text-blue-700 hover:text-violet-900 underline ml-5'>Test Page</a>
                </Link>
            </div>
        </main>
    )
}