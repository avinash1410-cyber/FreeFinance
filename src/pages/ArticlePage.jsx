import React, { useContext, useEffect } from 'react';
import { ItemContext } from '../context/ItemContext';
import MainContent2 from '../components/MainContent2';
import axios from 'axios';



const Articles = () => {
    const { allData, setAllData, loading, setLoading } = useContext(ItemContext);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://dashboard-1-7drh.onrender.com/api/filter/');
            setAllData(response.data);
        } catch (error) {
            console.error('Error fetching all data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAllData();
    }, []);    


    if (loading) return <p>Loading...</p>;
 
    return (
        <div className="w-full"> 
        <h2 className="text-center text-2xl font-bold">Item View</h2>
        <MainContent2 data={allData} />
    </div>
    );
};

export default Articles;