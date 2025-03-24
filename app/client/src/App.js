// App.js
import React from 'react';
import ViewMatches from './routes/ViewMatches';
import AddMatches from './routes/AddMatches';
import UpdateMatch from './routes/UpdateMatch';
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
						<Route path="/viewmatches" element={<ViewMatches />} />
						<Route path="/addmatches" element={<AddMatches />} />
						<Route path="/updatematch/:id" element={<UpdateMatch />} />

					</Routes>
				</div>
			</>
		</Router>
	);
}

export default App;
