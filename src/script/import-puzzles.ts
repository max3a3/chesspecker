import PuzzleModel from '../../src/models/puzzle';
import fs from 'fs';



export async function importPuzzles() {


	const puzzles = JSON.parse(fs.readFileSync('./dump/from-lila/lila.puzzle2_puzzle.json', 'utf8'));
	for (const puzzle of puzzles) {
		try {

			const newPuzzle = new PuzzleModel({
				PuzzleId: puzzle._id,
				FEN: puzzle.fen,
				Moves: puzzle.line,
				Rating: puzzle.glicko.r,
				RatingDeviation: 3,
				Popularity: 100,
				NbPlays: puzzle.plays,
				Themes: puzzle.themes,
				GameUrl: puzzle.gameId ? `https://lichess.org/${puzzle.gameId}` : null,
			});
			await newPuzzle.save();
		} catch (error) {
			console.error('!!!Error saving puzzle:', error);
			throw error; // Rethrow the error to the outer handler
		}
	}


	console.log('Puzzle added successfully');
}

export async function countPuzzles() {
	let count = 0
	try {
		count = await PuzzleModel.countDocuments();
		console.log(`Puzzle count: ${count}`);
	}
	catch (error) {
		console.error('!!!Error counting puzzles:', error);
		throw error; // Rethrow the error to the outer handler
	}
	return count;
}
