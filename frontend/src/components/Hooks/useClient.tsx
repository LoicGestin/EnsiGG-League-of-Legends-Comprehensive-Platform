import { useState, useEffect } from 'react';
import { SummonerDTO} from "@/components/objects/SummonerDTO";
import { LeagueEntryDTO} from "@/components/objects/LeagueEntryDTO";
import {json} from "stream/consumers";

export function useClient(apiUrl: string) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    return data;
}

