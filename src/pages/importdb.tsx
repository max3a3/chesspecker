import type {ReactElement} from 'react';
import Layout from '@/layouts/main';
import {NextSeo} from 'next-seo';
import {Button} from '@/components/button';
import { countPuzzles } from 'src/script/import-puzzles';
type Props = {
	puzzleCount: number;
  };
  
const ImportDb = ({puzzleCount}: Props) => {
	const handleClick = async () => {
		try {
		  const response = await fetch('/api/import-puzzles', {
			method: 'POST',
		  });
		  const data = await response.json();
		  if (response.ok) {
			console.log(data.message);
		  } else {
			console.error(data.error);
		  }
		} catch (error) {
		  console.error('An error occurred:', error);
		}
	  };

	return (
		<>
			<NextSeo title="👑 ImportDb" />
			<div className="flex flex-col items-center justify-center min-h-screen pt-12 md:pt-24 pb-40">
				<h1>import puzzles</h1>
				<p>
					<br />
					<br />
				</p>
				<p>Current puzzle count: {puzzleCount}</p>
				<Button
					className="m-2"
					onClick={() => {
						handleClick();
					}}
				>
					import puzzle
				</Button>
			</div>
		</>
	);
};
ImportDb.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default ImportDb;

export const getServerSideProps = async () => {
	let puzzleCount = 0;
	try {
	  puzzleCount = await countPuzzles();
	} catch (error) {
	  console.error('Error fetching puzzle count:', error);
	}
  
	return {
	  props: {
		puzzleCount,
	  },
	};
  
}

