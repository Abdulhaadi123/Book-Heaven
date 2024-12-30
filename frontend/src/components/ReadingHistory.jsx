import React, { useEffect, useState } from 'react';

const ReadingHistory = ({ userId }) => {
  const [readingHistory, setReadingHistory] = useState([]);

  useEffect(() => {
    const fetchReadingHistory = async () => {
      try {
        const response = await fetch(`/api/reading-history/user/${userId}`);
        const data = await response.json();
        setReadingHistory(data);  // Set the reading history data received from the backend
      } catch (error) {
        console.error('Error fetching reading history:', error);
      }
    };

    fetchReadingHistory();  // Fetch the reading history data when the component mounts
  }, [userId]);

  return (
    <div className="w-full max-w-3xl mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Your Reading History:</h2>
      <ul className="space-y-4">
        {readingHistory.length > 0 ? (
          readingHistory.map((entry) => (
            <li key={entry._id} className="bg-white p-4 rounded shadow-lg border border-gray-200">
              <p className="font-bold">Book: {entry.bookId.title}</p> {/* Accessing the book title */}
              <p className="text-gray-700">Started: {new Date(entry.startTime).toLocaleString()}</p>
              <p className="text-gray-700">Ended: {new Date(entry.endTime).toLocaleString()}</p>
              <p className="text-gray-600">Pages Read: {entry.pagesRead}</p>
            </li>
          ))
        ) : (
          <li className="bg-white p-4 rounded shadow-lg border border-gray-200">
            <p className="text-gray-600">No reading history found.</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ReadingHistory;
