import React, { useState, useEffect } from 'react';
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import Heading2 from '../components/Heading2';
import axios from "axios";
import { useParams } from 'react-router-dom';
import fetchAllMatchesFromAPI from "../fetchAllMatchesFromAPI";

function UpdateMatch() {
    const { id } = useParams();

    const [player1, setPlayer1] = useState("Yasmine");
    const [player2, setPlayer2] = useState("");
    const [player1Set1, setPlayer1Set1] = useState(0);
    const [player2Set1, setPlayer2Set1] = useState(0);
    const [player1Set2, setPlayer1Set2] = useState(0);
    const [player2Set2, setPlayer2Set2] = useState(0);
    const [player1Set3, setPlayer1Set3] = useState(0);
    const [player2Set3, setPlayer2Set3] = useState(0);
    const [message, setMessage] = useState("");
    const [stage, setStage] = useState(1);
    const [set3Bool, setSet3Bool] = useState(false);

    const fetchData = async () => {
        try {
			const matches = await fetchAllMatchesFromAPI();
			const match = matches.filter(match => match.id == id);
            setPlayer2(match[0].players.player2);
            setPlayer1Set1(match[0].sets[0].player1Score);
            setPlayer2Set1(match[0].sets[0].player2Score);
            setPlayer1Set2(match[0].sets[1].player1Score);
            setPlayer2Set2(match[0].sets[1].player2Score);
            if (match[0].sets.length === 3) {
                setPlayer1Set3(match[0].sets[2].player1Score);
                setPlayer2Set3(match[0].sets[2].player2Score);
                setSet3Bool(true);
            }
        } catch (error) {
            console.error("Error fetching match:", error);
        }
    };

    // Fetches data on component mount
    useEffect(() => {
        fetchData();
    }, [id]);

    function handleSet3Change() {
        setSet3Bool(prevValue => !prevValue);
    }

    function handleNext() {
        setStage(stage + 1);
    }

    function handleBack() {
        setStage(stage - 1);
    }

    function handleRefresh() {
        setPlayer1("Yasmine")
        setPlayer2("")
        setPlayer1Set1(0)
        setPlayer1Set2(0)
        setPlayer1Set3(0)
        setPlayer2Set1(0)
        setPlayer2Set2(0)
        setPlayer2Set3(0)
        setMessage("")
        setStage(1)
        setSet3Bool(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send a PUT request to update the match
            const response = await axios.put(`/api/matches/${id}`, {
                player1,
                player2,
                player1Set1,
                player2Set1,
                player1Set2,
                player2Set2,
                player1Set3,
                player2Set3
            });
            response.data ? setMessage(response.data) : setMessage("Error");
			console.log(response.data); 
        } catch (error) {
            console.error('Error updating match:', error);
            setMessage(error.response ? error.response.data.message : error.message);
        }
    }

    return (
        <>
		<div className="container mx-auto text-white">
			<div className="text-white flex justify-center items-center my-10">
			{message ? (
                <>
                    {message[0].message}
                    <ButtonPrimary onClick={handleRefresh}>Add another match</ButtonPrimary>
                </>
            )
                : (<form onSubmit={handleSubmit} className="w-full max-w-sm">
                    {stage === 1 && (
                        <>
                            <Heading2>Your results for the match</Heading2>
                            <label htmlFor="player1Set1">Your set 1 games:</label>
                            <input
                                type="number"
                                id="player1Set1"
                                min={0}
                                max={10}
                                value={player1Set1}
                                onChange={(e) => setPlayer1Set1(parseInt(e.target.value))}
                                className="my-5 bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                                    text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                            />
                            <label htmlFor="player1Set2">Your set 2 games:</label>
                            <input
                                type="number"
                                id="player1Set2"
                                value={player1Set2}
                                min={0}
                                max={10}
                                onChange={(e) => setPlayer1Set2(parseInt(e.target.value))}
                                className="my-5 bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                                    text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                            />
                            {set3Bool ? (
                                <>
                                    <label htmlFor="player1Set3">Your set 3 games:</label>
                                    <input
                                        type="number"
                                        id="player1Set3"
                                        value={player1Set3}
                                        min={0}
                                        max={10}
                                        onChange={(e) => setPlayer1Set3(parseInt(e.target.value))}
                                        className="my-5 bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                                            text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                                    />
                                    <ButtonSecondary onClick={handleSet3Change}>Remove set 3</ButtonSecondary>
                                </>
                            ) : (
                                <ButtonSecondary onClick={handleSet3Change}>Add set 3</ButtonSecondary>
                            )}
                            <ButtonSecondary onClick={handleNext}>Next</ButtonSecondary>
                        </>
                    )}
                    {stage === 2 && (
                        <>
                            <h2 className="text-center text-2xl mb-5">Your opponent's results:</h2>
                            <label htmlFor="player2">Your opponent:</label>
                            <input
                                type="text"
                                id="player2"
                                value={player2}
                                onChange={(e) => setPlayer2(e.target.value)}
                                className="my-5 bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                                    text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                            />

                            <label htmlFor="player2Set1">Opponent's set 1 games:</label>
                            <input
                                type="number"
                                id="player2Set1"
                                min={0}
                                max={10}
                                value={player2Set1}
                                onChange={(e) => setPlayer2Set1(parseInt(e.target.value))}
                                className="my-5 bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                                    text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                            />

                            <label htmlFor="player2Set2">Opponent's set 2 games:</label>
                            <input
                                type="number"
                                id="player2Set2"
                                value={player2Set2}
                                min={0}
                                max={10}
                                onChange={(e) => setPlayer2Set2(parseInt(e.target.value))}
                                className="my-5 bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                                    text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                            />
                            {set3Bool ? (
                                <>
                                    <label htmlFor="player2Set3">Opponent's set 3 games:</label>
                                    <input
                                        type="number"
                                        id="player2Set3"
                                        value={player2Set3}
                                        min={0}
                                        max={10}
                                        onChange={(e) => setPlayer2Set3(parseInt(e.target.value))}
                                        className="my-5 bg-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                                            text-gray-200 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                                    />
                                    <ButtonSecondary onClick={handleSet3Change}>Remove set 3</ButtonSecondary>
                                </>
                            ) : (
                                <ButtonSecondary onClick={handleSet3Change}>Add set 3</ButtonSecondary>
                            )}
                            <ButtonSecondary onClick={handleBack}>Back</ButtonSecondary>
                            <ButtonPrimary type="submit">Submit match</ButtonPrimary>
                        </>
                    )}
                </form>
                )}
			</div>
		
		</div>
            
        </>
    )
}

export default UpdateMatch;
