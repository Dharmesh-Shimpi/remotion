export const fetchVideos = async () => {
	try {
		const response = await fetch(
			'https://canvas-eight-nu.vercel.app/api/fetchVideos',
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		console.log(data.videos[0]);
		return data.videos || [];
	} catch (err) {
		console.error('Error fetching videos:', err);
		return [];
	}
};
