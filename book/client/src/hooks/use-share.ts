import { useEffect, useState } from "react";

export const useShare = () => {
	const [text, setText] = useState("Share");
	const [hasShared, setHasShared] = useState<boolean | null>(false);

	const handleCannotShare = () => {
		setHasShared(null);
		setText("Disabled");
	};

	const handler = async (data: ShareData) => {
		try {
			const navigatorVariable = navigator;
			if ("share" in navigatorVariable) {
				setText("Sharing");
				await navigator.share(data);
				setHasShared(true);
			} else if ("clipboard" in navigatorVariable && data.url) {
				setText("Copying");
				await navigator.clipboard.writeText(data.url);
				setHasShared(true);
				setText("Copied");
			} else {
				handleCannotShare();
			}
		} catch {
			setText("Cancelled");
		}
	};

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (text) {
			timer = setTimeout(() => {
				setHasShared(false);
				setText("Share");
			}, 2000);
		}
		return () => clearTimeout(timer);
	}, [text]);

	return [
		handler,
		{
			hasShared,
			shareText: text,
		},
	] as const;
};
