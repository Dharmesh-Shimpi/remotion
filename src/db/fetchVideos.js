export const fetchVideos = async () => {
	try {
		const response = await fetch('http://localhost:3001/api/fetchVideos');
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
