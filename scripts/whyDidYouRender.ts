//import React from 'react';
//import whyDidYouRender from '@welldone-software/why-did-you-render';
//whyDidYouRender(React);
/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react'

if (process.env.NODE_ENV === 'development' && typeof window === 'object') {
	// eslint-disable-next-line
	const whyDidYouRender = require('@welldone-software/why-did-you-render')
	// @ts-ignore
	whyDidYouRender(React, {
		trackAllPureComponents: true,
	})
}
