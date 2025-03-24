import React from 'react';
import { Oval } from 'react-loader-spinner';

class LoadingSpinner extends React.Component {
	render() {
		return (
			<>
			<p className='my-5 text-center'>Loading matches...</p>
			<Oval
				visible={true}
				height="80"
				width="80"
				color="#4fa94d"
				ariaLabel="oval-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
			</>
		);
	}
}

export default LoadingSpinner;
