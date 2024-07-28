import React, {useEffect, useState} from 'react';
import {Composition} from 'remotion';
import {Videos} from './Video';
import {fetchVideos} from './db/fetchVideos';

export const RemotionRoot = () => {
	const [videos, setVideos] = useState([]);
	const [introId, setIntroId] = useState(null);
	const [outroId, setOutroId] = useState(null);

	useEffect(() => {
		const loadVideos = async () => {
			const videoData = await fetchVideos();
			setVideos(videoData);
		};
		loadVideos();
	}, []);

	const handleIntroChange = (event) => {
		setIntroId(event.target.value);
	};

	const handleOutroChange = (event) => {
		setOutroId(event.target.value);
	};

	const getVideoUrlById = (id) => {
		const video = videos.find((video) => video.id === id);
		return video ? video.url : null;
	};

	const introUrl = getVideoUrlById(introId);
	const outroUrl = getVideoUrlById(outroId);

	return (
		<div>
			<div>
				<label>Select Intro:</label>
				<select value={introId} onChange={handleIntroChange}>
					<option value="">None</option>
					{videos.map((video) => (
						<option key={video.id} value={video.id}>
							{video.title}
						</option>
					))}
				</select>
			</div>
			<div>
				<label>Select Outro:</label>
				<select value={outroId} onChange={handleOutroChange}>
					<option value="">None</option>
					{videos.map((video) => (
						<option key={video.id} value={video.id}>
							{video.title}
						</option>
					))}
				</select>
			</div>
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
		</div>
	);
};
