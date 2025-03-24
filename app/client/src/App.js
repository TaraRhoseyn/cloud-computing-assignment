// App.js
import React from 'react';
import ViewRecords from './routes/ViewRecords';
import Home from './routes/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<>
				<Navbar />
				<div>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/viewrecords" element={<ViewRecords />} />
					</Routes>
				</div>
			</>
		</Router>
	);
}

export default App;
