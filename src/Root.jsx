import React, {useEffect, useState} from 'react';
import {Composition} from 'remotion';
import {Videos} from './Video'; // Adjust the path as needed
import {fetchVideos} from './db/fetchVideos'; // Adjust the path as needed

export const RemotionRoot = () => {
	const [videos, setVideos] = useState([]);
	let introUrl = null;
	let outroUrl = null;

	useEffect(() => {
		const loadVideos = async () => {
			const videoData = await fetchVideos();
			setVideos(videoData);
			introUrl = videoData[0].url;
			outroUrl = videoData[videoData.length - 1].url;
		};
		loadVideos();
	}, []);

	return (
		<>
			{videos.map((video) => (
				<Composition
					key={video.id}
					id={`Video-${video.id}`}
					component={() => (
						<Videos url={video.url} introUrl={introUrl} outroUrl={outroUrl} />
					)}
					durationInFrames={150 + (introUrl ? 30 : 0) + (outroUrl ? 30 : 0)}
					fps={30}
					width={1920}
					height={1080}
				/>
			))}
		</>
	);
};
