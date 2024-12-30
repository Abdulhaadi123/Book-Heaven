import React, { useState, useEffect } from 'react';  
import axios from 'axios';  

const AuthorListPage = () => {  
  const [authors, setAuthors] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {  
    const fetchAuthors = async () => {  
      try {  
        const response = await axios.get('http://localhost:5000/api/authors');  
        setAuthors(response.data);  
        setLoading(false);  
      } catch (err) {  
        console.error(err);  
        setLoading(false);  
      }  
    };  

    fetchAuthors();  
  }, []);  

  if (loading) {  
    return (  
      <div className="text-center text-xl min-h-screen flex items-center justify-center">  
        <div className="spinner-border text-blue-500" role="status">  
          <span className="sr-only">Loading...</span>  
        </div>  
        Loading authors...  
      </div>  
    );  
  }  

  return (  
    <div className="overflow-x-auto w-full p-4">  
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Author List</h1>  
      <table className="min-w-full table-auto border-collapse border border-gray-300">  
        <thead>  
          <tr className="bg-gray-800 text-white">  
            <th className="px-4 py-2 text-left border-b">Photo</th>  
            <th className="px-4 py-2 text-left border-b">Name</th>  
            <th className="px-4 py-2 text-left border-b">Bio</th>  
            <th className="px-4 py-2 text-left border-b">Actions</th>  
          </tr>  
        </thead>  
        <tbody>  
          {authors.map((author) => (  
            <tr key={author._id} className="border-b">  
              <td className="px-4 py-2">  
                <img  
                  src={`http://localhost:5000/${author.authorPhoto}`}  
                  alt={author.name}  
                  className="w-10 h-10 rounded-full object-cover mr-4"  
                />  
              </td>  
              <td className="px-4 py-2 text-sm">{author.name}</td>  
              <td className="px-4 py-2 text-sm">{author.bio}</td>  
              <td className="px-4 py-2 text-sm flex justify-between">  
                <button  
                  className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"  
                >  
                  Edit  
                </button>  
                <button  
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"  
                >  
                  Delete  
                </button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
};

export default AuthorListPage;
