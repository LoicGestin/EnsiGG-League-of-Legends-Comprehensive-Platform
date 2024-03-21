import { useState, useEffect } from 'react';
import { SummonerDTO} from "@/components/objects/SummonerDTO";
import { LeagueEntryDTO} from "@/components/objects/LeagueEntryDTO";

export function useLeagueInfo(summonerInfo: SummonerDTO, apiKey: string) {
    const [leagueInfo, setLeagueInfo] = useState(null);

    useEffect(() => {
        if (summonerInfo) {
            const apiUrlLeague = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.id}?api_key=${apiKey}`;
            fetch(apiUrlLeague)
                .then(response => response.json())
                .then(data => {
                    const leagueInfo = new LeagueEntryDTO(data) ;
                    // @ts-ignore
                    setLeagueInfo(leagueInfo);
                })
                .catch(error => {
                    console.error('Error fetching league data:', error);
                    setLeagueInfo(null);
                });
        }
    }, [summonerInfo, apiKey]);

    return leagueInfo;
}