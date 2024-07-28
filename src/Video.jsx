import React from 'react';
import {AbsoluteFill, Sequence, Video as RemotionVideo} from 'remotion';

export const Videos = ({url, introUrl, outroUrl}) => {
	const introDuration = 30;
	const outroDuration = 30;
	const mainVideoStart = introUrl ? introDuration : 0;
	const mainVideoEnd = mainVideoStart + 150;
	const outroStart = mainVideoEnd;

	return (
		<AbsoluteFill>
			{introUrl && (
				<Sequence from={0} durationInFrames={introDuration}>
					<RemotionVideo src={introUrl} />
				</Sequence>
			)}
			<Sequence from={mainVideoStart} durationInFrames={150}>
				<RemotionVideo src={url} />
			</Sequence>
			{outroUrl && (
				<Sequence from={outroStart} durationInFrames={outroDuration}>
					<RemotionVideo src={outroUrl} />
				</Sequence>
			)}
		</AbsoluteFill>
	);
};
