'use client';

import { useEffect } from 'react';
import { initAllButtonEffects } from '../lib/buttonEffects';

const ClientEffects = () => {
	useEffect(() => {
		// 初始化所有客户端效果
		initAllButtonEffects();
	}, []);

	return null;
};

export default ClientEffects;