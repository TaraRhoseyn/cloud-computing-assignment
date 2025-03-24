// App.js
import React from 'react';
import ViewRecords from './routes/ViewRecords';
import AddAppointment from "./routes/addAppointment";
import Home from './routes/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black-950">
			<Router>
				<>
					<Navbar />
					<div>
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route path="/viewrecords" element={<ViewRecords />} />
							<Route path="/appointments/new" element={<AddAppointment />} />
						</Routes>
					</div>
				</>
			</Router>
		</div>
	);
}

export default App;
